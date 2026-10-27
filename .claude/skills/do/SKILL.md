---
name: do
description: Work one Linear issue end to end. Plan, brief the implementer and reviewer, verify by running things yourself, commit on a feature branch, open a pull request for Grant, keep Linear current, and clean up after the merge. Invoke as /do KAN-### or /do next.
argument-hint: KAN-### | next [optional note]
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(gh *) Bash(bash .claude/scripts/*) Bash(cat docs/process/*) Read Grep Glob Edit Write
shell: bash
---

# /do: work a Linear issue

Issue to work: **$ARGUMENTS**

The first token is the issue identifier (for example `KAN-512`), or `next`, meaning the
lowest-numbered issue in this project's Ready for Build whose blockers are all in Human QA or
Done. Anything after it is a note from Grant, and it wins where it conflicts with the issue text.

This file comes from `process-template` and is the same in every project. Never edit it here.
Project facts live in `docs/process/`. A problem with the process itself becomes an issue in the
Linear project **Process** (see Rules). Some issues call their acceptance criteria "Done when";
it means the same thing.

## Project facts

```
!`cat docs/process/project.env 2>/dev/null || echo "docs/process/project.env is missing"`
```

!`cat docs/process/project.md 2>/dev/null || echo "**docs/process/project.md is missing.** Stop and tell Grant: this repo has not adopted the process template."`

Everything below names these facts in bold the first time it leans on one: **the project**,
**the default branch**, **the working copy mode**, **the green checks**, **the model table** and
so on. Where a fact and this file disagree, follow the fact and tell Grant, so the template gets
fixed.

## Current repo state

```
!`git status --short --branch 2>&1 || true`
```

Worktrees:

```
!`git worktree list 2>&1 || true`
```

Feature branches on this machine:

```
!`git branch --list 'feature/*' --format='%(refname:short) %(upstream:short)' 2>&1 || true`
```

Recent pull requests:

```
!`gh pr list --state all --limit 20 --json number,title,headRefName,state --template '{{range .}}#{{.number}} {{.state}} {{.headRefName}} {{.title}}{{"\n"}}{{end}}' 2>&1 || echo "(gh pr list failed)"`
```

## Roles

You are the **orchestrator**. You plan, choose models, brief subagents, review their work, run
every check yourself, and own every git write, pull request and Linear update. Subagents never
run a git command that writes (`add`, `commit`, `stash`, `checkout`, `switch`, `reset`, `merge`,
`rebase`), never push, and never touch Linear or GitHub.

**A subagent's report is a claim, not evidence.** Re-run the checks, read the diff, and look at
the result yourself before anything is committed. Real defects on Grant's projects were caught
only this way, and none would have been found by a test.

## Rules that always apply

- **Never commit to the default branch.** All work happens on the issue's feature branch.
- **Never merge a pull request or enable auto-merge.** Grant merges after Human QA.
- **Never set Done.** Linear's GitHub integration sets it when the pull request merges. If it
  doesn't, tell Grant; don't set it yourself.
- **Keep Linear current as you go**, not batched at the end. Every phase change below says which
  status to set and what to comment.
- **One issue per run.** If the issue is a parent with open sub-issues, list them and stop.
- **Out-of-scope work becomes a new Linear issue** (Backlog, this project, the same milestone
  where there is one), listed in the PR body. It never rides along in this PR.
- **Process problems become a Process issue.** If this file, an agent definition or a script is
  wrong or missing something, file an issue in the Linear project **Process** titled
  `[<this project>] <what is wrong>`, and carry on with your best reading. Don't edit the skills,
  agents or scripts that came from the template.
- **Commit subjects start with the issue id**, then an imperative subject in sentence case:
  `KAN-512: Add fog radius tweak`. This is the same in every project. Messages end with the
  Co-Authored-By trailer the harness specifies. Run `git branch --show-current` before every
  commit: a worktree has been seen to detach HEAD on its own.
- **In Linear, write the full GitHub pull-request URL**, never a bare `#57`: Linear links that to
  another repo's PR.
- **Shut down what you start**: dev servers, containers, emulators, anything listening on a port.
- **If the Linear tools are missing**, say so and wait for them rather than working from the
  title. They sometimes connect partway into a session.

## Choosing subagents and models

Decide per task from **the model table** in the project facts. Record each choice and a one-line
reason in the Linear plan comment. These two rows apply in every project:

| Task | Agent | Model |
| --- | --- | --- |
| Find code, map call sites, read docs | `Explore` | `haiku`; `sonnet` if it needs judgement |
| External research (library docs at the resolved version, APIs, formats) | `general-purpose` | `sonnet` |

- **Always pass `model` explicitly.** Allowed: `haiku`, `sonnet`, `opus`. **Never `fable`.**
- **You don't write the code.** This session runs on Opus at high effort so it can plan and
  verify. Small issues go to `implementer` on `haiku` or `sonnet`, with a short brief. The one
  exception is a fix of a few lines with no new logic, where writing the brief would cost more
  than the change: do that directly, and still run the review loop.
- **Parallel work follows the project's parallel rule.** Where it allows more than one
  implementer, they never share a file: state each agent's file list in its brief, and if the
  split isn't clean, run them one after another.
- **Fix rounds go back to the same agent** via `SendMessage`, so it keeps its context.
- If `implementer` or `reviewer` is missing from the agent list, tell Grant to restart the
  session (agent files only register at startup). Don't substitute a general-purpose agent.

### Implementer brief (subagents can't see this conversation)

The agent definition carries the standing rules, so the brief adds only:

- **The issue id and title**, and its required behaviour, non-goals and acceptance criteria
  pasted verbatim, plus Grant's note if any.
- **The working directory**, as an absolute path, when the project works in a worktree.
- **The files it owns**, explicitly: "You may not touch anything else without reporting it."
- **What already exists** that it builds on, by name and file: "Extend this, don't rebuild it."
- **What the next issue needs** from this one's design, so the seam is left open without being
  built.
- **Milestone-level criteria** that bear on it, where the milestone demands things no single
  issue names.
- **"State your rule"** for each judgement call the issue leaves open.
- **The issue's stop conditions**, from its **Stop and ask Grant if** line, verbatim: "If one
  of these happens, stop and report it."
- **How to verify**: named commands and expected numbers where the issue gives them, and for
  visual or UI work, what to look at and what it should show.

### Reviewer brief

The issue id, the acceptance criteria verbatim, the working directory, the diff base (the
default branch, or `origin/<default>` in a worktree), the files the implementer was allowed to
touch, and the implementer's report pasted whole.

## Decide which phase you're in

Fetch the issue from Linear (`get_issue`) with its project, state, labels, milestone, parent,
relations and `gitBranchName`. For `next`, list this project's issues in Ready for Build and take
the lowest-numbered one whose blockers are all in Human QA or Done.

- If its project isn't **the project** named in the facts, stop: "KAN-### belongs to <project>;
  /do in this repo only works <this project> issues."
- Branch name: the issue's `gitBranchName`, or `feature/kan-###` if that's empty.

Then check GitHub: `gh pr list --head <branch> --state all --json number,state,url`, and
`git worktree list` for a worktree already on the branch.

| Situation | Phase |
| --- | --- |
| Parent of open sub-issues | Stop, list them |
| A blocker isn't in Human QA or Done | Stop, list the blockers |
| A blocker is in Human QA with its PR still open | Ask Grant whether to wait for the merge or stack this branch on the blocker's branch, then **Start** |
| State is Discovery or Backlog | Stop: it hasn't been shaped. Ask Grant to run `/shape` on it, or to move it to Ready for Build |
| No branch, no PR | **Start** |
| Branch exists, no PR | **Resume** (then Build) |
| PR open | **Resume** (review feedback or CI) |
| PR merged | **Cleanup** |
| PR closed without merge | Stop and ask Grant |

## Phase: Start

1. **Working copy.** Follow **the working copy mode** (`WORKING_COPY` in the facts).
   - **`checkout`:** the working tree must be clean. If it isn't, stop and list what's
     uncommitted; don't stash it. Then:
     ```bash
     git checkout <default> && git pull --ff-only && git checkout -b <branch>
     ```
     When Grant chose to stack, branch from the blocker's branch instead and target the PR at it.
   - **`worktree`:** the main checkout is shared with other live sessions. Never switch
     branches, commit, stash or reset there, and treat unexplained changes in it as another
     session's work. `git fetch origin <default>`, then:
     - Session is in the shared checkout:
       `git worktree add -b <branch> <scratchpad>/wt-kan-### origin/<default>`. Keep the path
       short, and use absolute paths into it from then on: the shell's working directory resets
       between calls.
     - Session is already in an app-made worktree with a clean tree:
       `git checkout -b <branch> origin/<default>`.
     - If the tree isn't clean, stop and list what's uncommitted; don't stash it.
     - When Grant chose to stack, start from the blocker's branch in place of
       `origin/<default>` and target the PR at it.

     Then set the worktree up as the project facts say under **Setting up the worktree**.
2. **Baseline.** Run **the green checks** once before anything changes and record the test
   count, unless the project facts say to skip the baseline.
3. **Linear → In Progress**, assignee `me`, before anything is dispatched.
4. **Understand before planning.** Read the issue in full, `CLAUDE.md`, everything the project
   facts list under **Read before planning**, the decision records for its area, and the code it
   touches. Use Explore agents in parallel for anything broad.
5. **Sanity-check sizing.** If the real scope is far larger than the issue suggests, split it
   into two implementer runs and two commits on the same branch, and tell Grant you split it and
   why.
6. **Plan.** Tasks, the agent and model for each with the reason, and the files each owns. Copy
   in the issue's **Stop and ask Grant if** conditions verbatim, and say how you'll know if one
   is hit. Post it as a Linear comment (`save_comment`).
7. **Decisions that aren't yours.** If the acceptance criteria need a decision only Grant, or
   whoever the project facts name, can make, build what doesn't depend on it and everything that
   helps them decide, then ask plainly, with a recommendation. Never invent the answer. Once it's
   given, record it where the project facts say and in the PR body.
8. Continue to **Build**.

## Phase: Build

1. Dispatch `implementer` per the plan, in the background so Grant can interject.
2. When it returns, **Linear → AI Review**, dispatch `reviewer`, and run the review loop yourself
   while it works.

### Review loop: what "green" means

All of these, run by you in the working copy, not taken from a report. Never skip 1, 2 or 3.

1. **Every green check in the project facts passes**, with the results the facts expect. Compare
   the test count with the baseline: new logic without a new test is a finding.
2. **Read the whole diff yourself** (`git diff <default>`, or `origin/<default>` in a worktree,
   plus untracked files), especially anything outside the planned files, anything in the
   project's **risky areas**, and any of the **files that never change without their own
   issue**.
3. **Look at the result** the way the project facts describe: run the app, take the screenshot,
   record the frames, open the screen. Send what you saw to Grant with `SendUserFile` as soon as
   you have it. If you couldn't look, say so plainly.
4. **Every extra check** the project facts list for the areas this diff touches.
5. **Re-run every number the implementer claimed**: counts, timings, sizes.
6. **Docs still tell the truth.** `CLAUDE.md`, the spec, the topic docs and the decision records
   are updated in this PR wherever the change makes them untrue.
7. **Name what local checks can't see.** Anything only Grant can check (a real device, a
   signed-in flow, how it feels) becomes a numbered step for the PR body.
8. `reviewer` verdict is **GREEN**, or every finding is fixed or rebutted with a reason.
9. `git status` shows no stray files: no `_verify/`, and none of the ones the project facts
   list.

If anything fails, send the fixes back to the implementer (same agent via `SendMessage`) and
re-run the loop; re-review if the fix is more than a line or two. Record each round as a one-line
Linear comment, `Fix round 1: <what failed>`, so `/retro` can count them. **At most two fix
rounds.** After that, stop: comment on Linear what's failing and why, leave the issue in AI
Review, and ask Grant.

## Phase: Deliver

1. **Commit** in reasonable units, each subject starting `KAN-###:`. A spec change rides in the
   same commit as the code that caused it. Check `git branch --show-current` first.
2. **Push:** `git push -u origin <branch>`.
3. **Open the PR** against the default branch (or the stacked base), titled
   `KAN-###: <issue title in plain words>`. Grant has standing-authorised this; don't ask first.
   ```markdown
   Fixes KAN-###
   Linear: <issue url>

   ## What changed
   <two to five bullets>

   ## How it was verified
   <each check from the review loop and its result, with what you executed kept apart from
   what you only read; what you looked at, with the path of any screenshot; fix rounds: N>

   ## For Grant to check
   <numbered steps to try or judge by hand, decisions to confirm, or "nothing beyond the diff">

   ## Decisions and spec changes
   <what was decided or changed in a spec or doc, and why, or "none">

   ## Subagents
   <agent, model and one-line reason per dispatch>

   ## Follow-ups filed
   <new Linear issues as full URLs, or "none">

   <attribution line the harness specifies for PR descriptions>
   ```
   Write the body to a temp file and use
   `gh pr create --base <default> --head <branch> --title "..." --body-file <file>`.
4. **Wait for CI.** If the project facts say there is none, say so in the PR and move on.
   Otherwise:
   - In the Claude desktop app, bind the PR with the `ccd_pr` tools (`get_status`, then
     `bind_pr`), then turn on Auto-fix (`set_monitor` with `auto_fix: true` and the PR url).
     Grant wants it on for every PR. Let the app's CI monitor report back; don't poll CI yourself
     there.
   - Elsewhere, run `gh pr checks <number> --watch` in the background and wait for it.
   - **CI red:** stay in AI Review, read the failing log (`gh run view <id> --log-failed`), fix,
     push, and wait again. This counts toward the two fix rounds.
5. **CI green, or no CI → Linear → Human QA.** Attach the PR link (`links`) first, then set
   Human QA, then
   `save_comment` with the full PR URL, a one-paragraph summary and what Grant should check by
   hand. Linear's GitHub integration moves the issue to In Progress when the PR opens, and
   attaching a link can too, so set Human QA last. If the issue ships with a deliberate
   carve-out, say what was excluded, why, and which issue tracks it.
6. **Watch for the merge**, so Grant never has to say he merged. Start
   `bash .claude/scripts/wait-for-merge.sh <number>` with `run_in_background`. It checks every
   two minutes and exits when the PR is merged or closed, which wakes this session. On a merge
   it runs the cleanup script first, so the default branch in the main checkout is already up to
   date, and prints what that did. **Merged:** run Cleanup. **Closed without merging:** stop and ask Grant. If the session ends first, the
   `SessionStart` hook cleans up the local branch next time.
7. **Report to Grant:** the PR link, what you looked at, the numbered checks, and anything that
   needs his decision.

## Phase: Resume

1. **Get onto the branch.** `checkout` mode: `git checkout <branch>`. `worktree` mode: find the
   branch's worktree in `git worktree list` and work there; if there isn't one, make it as in
   Start (`git worktree add <scratchpad>/wt-kan-### <branch>`). In both modes the tree must be
   clean first, and `git pull --ff-only` if the branch has an upstream.
2. **PR open:** read review comments and CI (`gh pr view <n> --comments`, `gh pr checks <n>`).
   Set Linear → In Progress, address every unresolved comment through the implementer, run the
   review loop, push, reply on the PR with what changed, then wait for CI and move to Human QA as
   in Deliver. Comment on Linear that feedback was addressed.
3. **No PR yet:** work out from the branch diff and the Linear comments where it stopped. A
   subagent may have hit a rate limit mid-task, so look for half-added code. Then continue with
   Build.

## Phase: Cleanup

Only after `gh pr view <n> --json state,mergedAt` shows the PR merged. Usually this starts on its
own: the merge watcher exits (Deliver step 6), or the `SessionStart` hook reports a branch it
deleted. Some of the cleanup may already have happened:

- GitHub deletes the head branch on merge where that setting is on.
- Linear's GitHub integration moves the issue to Done.
- The merge watcher or the hook may already have deleted the local branch and fast-forwarded the
  default branch.

1. **Branches.**
   - `checkout` mode:
     ```bash
     git checkout <default> && git pull --ff-only
     git branch -d <branch>                # skip if it's already gone
     git push origin --delete <branch>     # skip if it's gone, or if a PR is stacked on it
     ```
   - `worktree` mode, from outside the worktree and never by switching branches in the shared
     checkout:
     ```bash
     git worktree remove <worktree path>   # skip if the session is in an app-made worktree
     git branch -d <branch>
     git push origin --delete <branch>     # skip if it's gone, or if a PR is stacked on it
     ```
     In an app-made worktree the session itself sits in,
     `git checkout --detach origin/<default>` first so the branch can be deleted; the app removes
     that worktree.

   Then, in both modes, run `bash .claude/scripts/cleanup-merged-branches.sh`. It brings the
   default branch in the main checkout up to date without switching its branch, which nothing
   above does in `worktree` mode. If it says the default branch was left behind, tell Grant why.

   If `git branch -d` refuses (squash merge), confirm the PR is merged, then use `-D`. Before
   deleting a remote branch, run `gh pr list --base <branch> --state open`: if a pull request is
   stacked on it, leave the remote branch where it is.
2. **Linear.** Confirm the issue shows Done. If it doesn't, tell Grant; don't set it. Add a
   comment naming the PR (full URL) and the merge commit.
3. **Shut down** anything still running for this issue.
4. **Milestone close-out**, if this was the milestone's last open issue:
   - Re-check the milestone's exit criteria line by line. Say which you verified by execution
     and which only by reading.
   - File follow-up issues for anything real that was left out, with enough detail to act on
     without this conversation.
   - Confirm every divergence from the spec was written into the spec, with the reasoning.
   - Do the close-out extras the project facts list.
   - Report gaps prominently. Something connected at one end only is not done.
   - Tell Grant the milestone is ready for `/retro <milestone>`.
5. **Report:** branch removed, the issue's Linear state, and the next Ready for Build issue in
   this project if there's an obvious one.

## When to stop and ask

Stop and ask Grant rather than guess when: the issue and the code disagree about what exists;
the acceptance criteria need a decision that isn't yours; the work would change an agreed
design, an Accepted decision or a spec; the change is growing well beyond the issue; a condition
the issue lists under **Stop and ask Grant if** is met, even narrowly; or any of the extra stop
conditions in the project facts applies. A stop condition is a stop: leave the issue in its
current status and ask, with what you measured and your recommendation. Don't carry on and report
it in the PR instead.
