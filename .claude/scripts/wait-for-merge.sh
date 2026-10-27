#!/usr/bin/env bash
# Waits until a pull request is merged or closed, then prints its final state and exits.
# /do and /shape run this in the background right after opening a PR: when it exits, the session
# is woken and runs its next phase (or asks Grant, if the PR was closed without merging).
# On a merge it runs cleanup-merged-branches.sh first, so the default branch is up to date in the
# main checkout straight away, not only when the next session starts.
# Comes from process-template and is the same in every project. Don't edit it in a project.
#
# Usage: wait-for-merge.sh <pr-number> [interval-seconds, default 120]
set -u
pr=${1:?usage: wait-for-merge.sh <pr-number> [interval-seconds]}
interval=${2:-120}

while :; do
  # A failed lookup (offline, rate limit) just means "try again later".
  state=$(gh pr view "$pr" --json state --jq .state 2>/dev/null || true)
  case "$state" in
    MERGED | CLOSED) break ;;
  esac
  sleep "$interval"
done

[ "$state" = MERGED ] && bash "$(dirname "$0")/cleanup-merged-branches.sh"

gh pr view "$pr" --json number,state,mergedAt,mergeCommit,headRefName \
  --jq '"PR #\(.number) (\(.headRefName)) is \(.state)"
        + (if .mergeCommit then ", merge commit \(.mergeCommit.oid[0:7]) at \(.mergedAt)" else "" end)
        + ". Run the next phase for it: /do Cleanup, or /shape Release for a shape/ branch."'
