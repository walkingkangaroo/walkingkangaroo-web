#!/usr/bin/env bash
# Tidies up after pull requests that merged, and brings the default branch up to date.
# Run by the SessionStart hook in .claude/settings.json, by wait-for-merge.sh when a PR merges,
# and by /do Cleanup; safe to run by hand.
# Comes from process-template and is the same in every project. Don't edit it in a project.
#
# Reads two facts from docs/process/project.env:
#   DEFAULT_BRANCH  main or master. Falls back to origin/HEAD, then main, then master.
#   WORKING_COPY    checkout or worktree. Falls back to worktree, the careful mode.
#
# For each local feature/*, shape/*, retro/* and chore/* branch whose PR is merged on GitHub:
#   - keep it if its tip isn't exactly the commit the PR merged (there's unmerged work)
#   - checkout mode: if it's the current branch and the tree is clean, switch to the default
#     branch first; keep it if the tree has uncommitted changes
#   - worktree mode: the main checkout is shared with other live sessions, so never switch
#     branches and never remove a worktree
#   - either mode: keep it if it's checked out in any worktree (a session may still be there)
#   - otherwise delete it, and its remote branch if GitHub kept it and no open PR is based on it
# Then fast-forward the default branch where that is safe, and say why when it can't. Prints a
# summary only when it did something or something needs Grant; the hook adds that to Claude's context so the session can finish the rest of the
# Cleanup phase.
set -u

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0
command -v gh >/dev/null 2>&1 || exit 0
git fetch --prune --quiet origin 2>/dev/null || exit 0

# fact KEY: the value of KEY in docs/process/project.env, or nothing. Tolerates CRLF line endings
# and a trailing comment.
fact() {
  [ -f docs/process/project.env ] || return 0
  sed -n "s/^$1=\([A-Za-z0-9_.\/-]*\).*/\1/p" docs/process/project.env | head -n 1
}

default=$(fact DEFAULT_BRANCH)
if [ -z "$default" ]; then
  default=$(git symbolic-ref --short -q refs/remotes/origin/HEAD 2>/dev/null | sed 's|^origin/||')
fi
if [ -z "$default" ]; then
  for candidate in main master; do
    if git show-ref --verify --quiet "refs/remotes/origin/$candidate"; then
      default=$candidate
      break
    fi
  done
fi
[ -n "$default" ] || exit 0

mode=$(fact WORKING_COPY)
[ "$mode" = checkout ] || mode=worktree

worktree_branches() { git worktree list --porcelain | sed -n 's|^branch refs/heads/||p'; }

checked_out=$(worktree_branches)
current=$(git symbolic-ref --short -q HEAD || true)
if [ -z "$(git status --porcelain)" ]; then clean=yes; else clean=no; fi
deleted=()
kept=()

for branch in $(git for-each-ref --format='%(refname:short)' \
  'refs/heads/feature/*' 'refs/heads/shape/*' 'refs/heads/retro/*' 'refs/heads/chore/*'); do
  pr=$(gh pr view "$branch" --json number,state,headRefOid \
    --jq '"\(.number) \(.state) \(.headRefOid)"' 2>/dev/null) || continue
  read -r number state head <<<"$pr"
  [ "$state" = "MERGED" ] || continue

  if [ "$(git rev-parse "$branch")" != "$head" ]; then
    kept+=("$branch: has commits that weren't in merged PR #$number")
    continue
  fi

  if [ "$mode" = checkout ] && [ "$branch" = "$current" ]; then
    if [ "$clean" != yes ]; then
      kept+=("$branch: checked out with uncommitted changes (PR #$number merged)")
      continue
    fi
    if ! git checkout --quiet "$default" 2>/dev/null; then
      kept+=("$branch: could not switch to $default (PR #$number merged)")
      continue
    fi
    current=$default
    checked_out=$(worktree_branches)
  fi

  if printf '%s\n' "$checked_out" | grep -qxF "$branch"; then
    kept+=("$branch: checked out in a worktree (PR #$number merged)")
    continue
  fi

  git branch -D --quiet "$branch" >/dev/null 2>&1 || continue

  # Delete the remote branch too, unless an open PR is stacked on it.
  if git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
    stacked=$(gh pr list --base "$branch" --state open --json number --jq 'length' 2>/dev/null || echo 1)
    if [ "$stacked" = 0 ] && git push --quiet origin --delete "$branch" >/dev/null 2>&1; then
      deleted+=("$branch and its remote branch (PR #$number)")
    else
      deleted+=("$branch (PR #$number; its remote branch was left in place)")
    fi
  else
    deleted+=("$branch (PR #$number)")
  fi
done

# Bring the default branch up to date, fast-forward only. New sessions load skills and agents
# from the checkout that has the default branch, so a stale one hides them. Where the default
# branch is checked out, only a tree with no tracked changes is moved; untracked files are fine,
# since a fast-forward refuses to overwrite one.
note=""
tree=$(git worktree list --porcelain |
  awk -v ref="branch refs/heads/$default" '/^worktree /{path=substr($0,10)} $0==ref{print path}')
before=$(git rev-parse --short "$default" 2>/dev/null)
# Commits on the default branch that origin doesn't have can't be fast-forwarded past. They were
# committed straight to it, which the process never does, so leave them for Grant.
ahead=$(git rev-list --count "origin/$default..$default" 2>/dev/null || echo 0)
if [ "$ahead" != 0 ]; then
  note="$default has $ahead commit(s) that origin/$default doesn't, so it was left at $before. Ask Grant whether to open a pull request for them or drop them"
elif [ -z "$tree" ]; then
  git fetch --quiet origin "$default:$default" 2>/dev/null ||
    note="$default could not fast-forward to origin/$default"
elif [ -z "$(git -C "$tree" status --porcelain --untracked-files=no)" ]; then
  git -C "$tree" merge --ff-only --quiet "origin/$default" >/dev/null 2>&1 ||
    note="$default in $tree could not fast-forward to origin/$default"
else
  note="$default in $tree has uncommitted changes, so it was left at $before"
fi
after=$(git rev-parse --short "$default" 2>/dev/null)
if [ -z "$note" ] && [ "$before" != "$after" ]; then
  note="$default fast-forwarded $before -> $after"
fi

if [ ${#deleted[@]} -gt 0 ] || [ ${#kept[@]} -gt 0 ] || [ -n "$note" ]; then
  echo "Merged-PR cleanup (.claude/scripts/cleanup-merged-branches.sh):"
  [ -n "$note" ] && echo "- $note"
  for line in ${deleted[@]+"${deleted[@]}"}; do echo "- deleted local branch $line"; done
  for line in ${kept[@]+"${kept[@]}"}; do echo "- kept $line"; done
  echo "Now on $(git symbolic-ref --short -q HEAD || git rev-parse --short HEAD)."
  if printf '%s\n' ${deleted[@]+"${deleted[@]}"} | grep -q '^feature/'; then
    echo "For each deleted feature/ branch, finish /do's Cleanup phase: confirm Linear shows Done (never set it yourself; tell Grant if it doesn't), comment with the PR and merge commit, and run milestone close-out if one just finished."
  fi
  if printf '%s\n' ${deleted[@]+"${deleted[@]}"} | grep -q '^shape/'; then
    echo "For each deleted shape/ branch, run /shape <slug> to finish its Release phase: move the shaped issues from Backlog to Ready for Build and remove the Needs Grant label."
  fi
  if printf '%s\n' ${deleted[@]+"${deleted[@]}"} | grep -q 'remote branch was left in place'; then
    echo "A remote branch was left in place because an open pull request is stacked on it. Don't delete it."
  fi
  if [ ${#kept[@]} -gt 0 ] && [ "$mode" = worktree ]; then
    echo "A kept branch in a scratchpad worktree whose session has ended can be removed with git worktree remove."
  fi
fi
exit 0
