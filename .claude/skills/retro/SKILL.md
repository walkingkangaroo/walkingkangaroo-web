---
name: retro
description: Milestone retro. Reads the tracker's status history and the pull requests for one milestone, writes a one-page retro with time per state, fix rounds and follow-ups, and files at most three process proposals in the tracker project Process. Invoke as /retro <milestone>.
argument-hint: <milestone name or number>
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(gh *) Bash(bash .claude/scripts/*) Bash(cat docs/process/*) Bash(cat .claude/process-template.version) Read Grep Glob Edit Write
shell: bash
---

# /retro: what a milestone cost, and what to change

Milestone: **$ARGUMENTS**

This file comes from `process-template` and is the same in every project. Never edit it here.
A retro changes nothing by itself. It measures, then proposes. Grant decides, and accepted
changes are made in `process-template`, not in this project.

## Project facts

```
!`cat docs/process/project.env 2>/dev/null || echo "docs/process/project.env is missing"`
```

!`cat docs/process/project.md 2>/dev/null || echo "**docs/process/project.md is missing.** Stop and tell Grant: this repo has not adopted the process template."`

Template version in this project:

```
!`cat .claude/process-template.version 2>/dev/null || echo "(no version stamp)"`
```

## Rules that always apply

- **Numbers are computed, not estimated.** Save the raw data to a file under `_verify/` and work
  the figures out with a script. Delete `_verify/` before you commit. Say what you could not
  measure instead of guessing.
- **At most three proposals.** Each needs evidence from this milestone: issue ids and numbers.
- **No product code, no process edits.** The only file you commit is the retro page. Never edit
  the skills, agents or scripts that came from the template.
- **Never commit to the default branch.** The page goes on the branch `retro/<slug>`, made as in
  `/do` Start following the project's working-copy mode, in a pull request titled
  `Retro: <milestone>`.
- Research and counting can go to `Explore` on `haiku`. Always pass `model` explicitly.

## Steps

1. **Find the work.** `bash .claude/scripts/tracker.sh list --milestone "<milestone>" --all --json`
   gives the milestone's issues with their bodies; the `## Log` section of each is its comments
   (the plan, fix rounds, questions to Grant). For each, `bash .claude/scripts/tracker.sh history <ID> --json` gives
   every status change with its time, and the minutes spent in each status. A milestone that
   started before its project moved off Linear has its earlier history in Linear only: say so
   and measure what the tracker holds.
2. **Find the pull requests.** For each issue's branch:
   `gh pr view <branch> --json number,body,additions,deletions,changedFiles,createdAt,mergedAt,reviews,comments`.
   Read the **Subagents** section of each PR body for the agent and model of every dispatch.
3. **Compute, per issue:**
   - minutes in In Progress, in AI Review and in Human QA, from the state history
   - fix rounds: the `Fix round N:` comments `/do` leaves on the issue
   - review comments Grant left on the PR
   - follow-up issues it filed
   - which model built it and which reviewed it
4. **Compute, for the milestone:**
   - the median and the longest of each time, and the share of all elapsed time spent in Human QA
   - issues that hit the two-round limit and stopped
   - issues that were reopened, or that had a bug filed against them after merge
   - follow-ups filed against follow-ups closed
   - hard problems sent to `opus`: how many, and whether the reviewer still found defects
5. **Read for patterns.** The same reviewer finding in three issues is a missing rule. A long
   Human QA wait is a gate problem. A brief that kept needing clarification is a `/shape`
   problem. An implementer on `opus` that a later fix round shows `sonnet` would have handled is
   a model-table problem.
6. **Token use.** There is no per-agent record to read. If Grant pastes `/usage` output for the
   milestone's sessions, include it; otherwise write "not measured".
7. **Write `docs/retros/<slug>.md`** from [retro-template.md](retro-template.md). One page.
8. **Commit, push and open the pull request** `Retro: <milestone>`, with the page as its body.
9. **File each proposal** in the tracker project **Process**:
   `bash .claude/scripts/tracker.sh new --project Process --title "[<this project>] <proposal>" --body-file -`, with
   the evidence and the full URL of the retro's pull request. Then add each issue's ID to the page, commit and push again.
10. **Report to Grant:** the three numbers that matter most, the proposals, and what each would
    change. The `SessionStart` hook removes the branch after he merges.

## When to stop and ask

Stop and ask Grant when the milestone name matches more than one milestone, or when fewer than
three of its issues are Done: there is not enough to measure yet.
