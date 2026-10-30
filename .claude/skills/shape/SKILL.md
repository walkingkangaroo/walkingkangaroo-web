---
name: shape
description: Turn a topic or a Discovery issue into shaped work. Research it, put numbered questions to Grant in a decision round kept in the repo, then record his answers as decisions, revise the spec and write Ready for Build issues. Invoke as /shape <topic or KAN-###>.
argument-hint: <topic in words | KAN-###> [note or answers]
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(gh *) Bash(bash .claude/scripts/*) Bash(cat docs/process/*) Bash(grep -l *) Read Grep Glob Edit Write
shell: bash
---

# /shape: research, decide, then write the issues

Topic to shape: **$ARGUMENTS**

The first part is a topic in plain words or an issue identifier (for example `KAN-593`).
Anything after it is a note from Grant. If it carries answers to an open round (for example
`1: B, 2: yes, 3: use your recommendation`), go to **Record**.

This file comes from `process-template` and is the same in every project. Never edit it here.
`/shape` is the front half of the loop: it ends where `/do` begins, at Ready for Build.

## Project facts

```
!`cat docs/process/project.env 2>/dev/null || echo "docs/process/project.env is missing"`
```

!`cat docs/process/project.md 2>/dev/null || echo "**docs/process/project.md is missing.** Stop and tell Grant: this repo has not adopted the process template."`

## Current repo state

```
!`git status --short --branch 2>&1 || true`
```

Decision rounds waiting on an answer:

```
!`grep -l '^Status: Waiting' docs/rounds/*.md 2>/dev/null || echo "(none)"`
```

Shape branches and their pull requests:

```
!`git branch --list 'shape/*' --format='%(refname:short) %(upstream:short)' 2>&1 || true`
!`gh pr list --state all --limit 40 --json number,title,headRefName,state --jq '.[] | select(.headRefName | startswith("shape/")) | "#\(.number) \(.state) \(.headRefName) \(.title)"' 2>&1 || echo "(gh pr list failed)"`
```

## Roles

You are the **orchestrator**. In `/shape` you write documents and Linear issues, never product
code. Research goes to subagents: `Explore` on `haiku` (or `sonnet` where it needs judgement) to
map the code, and `general-purpose` on `sonnet` for anything outside the repo. Always pass
`model` explicitly, and never `fable`.

**A research report is a claim, not evidence.** Before a question or a recommendation rests on a
fact, check it yourself: open the page, read the file, run the command.

## Rules that always apply

- **Decision rounds live in the repo.** The questions and Grant's answers are in
  `docs/rounds/<slug>.md`. Linear carries only the `Needs Grant` label and a link.
- **Never invent an answer.** An unanswered question stays open. Its stated default applies only
  when Grant says to use the defaults.
- **Never reopen an Accepted decision** without Grant asking for it.
- **Never commit to the default branch.** Everything is on the branch `shape/<slug>`, in one pull
  request titled `Shape: <topic>`.
- **One topic per run, and no more than one milestone of work.** If it is bigger, propose the
  split and stop.
- **Hold out, don't drop.** Anything real that this milestone doesn't need goes to the project's
  hold-out milestone, or to Backlog where it has none. It is never built and never lost.
- **Nothing reaches Ready for Build until the shape pull request has merged.** `/do` starts from
  the default branch, so the decisions and the spec must be there first.
- **Never set Done.** Linear's GitHub integration does that on merge.
- Process problems become an issue in the Linear project **Process**, as in `/do`.

`<slug>` is the topic in lowercase with hyphens, or `kan-###-<short-title>` for an issue.

## Decide which phase you're in

| Situation | Phase |
| --- | --- |
| No `docs/rounds/<slug>.md` and no `shape/<slug>` branch | **Research** |
| The round says `Status: Waiting on Grant` and no answers have been given | Stop: show the open questions and how to answer them |
| Answers exist, and the round is not yet `Status: Answered` | **Record** |
| The round is `Status: Answered` and the shape pull request is open | Stop: it is waiting for Grant to merge. Show the pull request |
| The shape pull request is merged | **Release** |
| The shape pull request was closed without merging | Stop and ask Grant |

## Phase: Research

1. **Working copy.** As in `/do` Start, following the project's working-copy mode, but on the
   branch `shape/<slug>`.
2. **The issue.** If you were given a Discovery issue, leave it in Discovery. If you were given a
   topic in words, create an issue in this project, in Discovery, titled `Shape: <topic>`, so the
   queue has something to show.
3. **Understand.** Read `CLAUDE.md`, the decision index, the spec or brief, and the code the
   topic touches. Dispatch research one agent at a time, as in `/do`. Give each agent one
   question and ask for sources.
4. **Write `docs/research/<slug>.md`** from [research-template.md](research-template.md): what
   exists today, two to four options with their cost and risk, what can't be known without
   building, and the sources.
5. **Write `docs/rounds/<slug>.md`** from [round-template.md](round-template.md).
   - Ask only what changes what gets built. If you would build the same thing either way, decide
     it yourself and note it under "Decided without asking".
   - Each question is one sentence, with its options, your recommendation and the reason, and
     what happens by default.
   - Mark any question that belongs to someone else the project facts name (for example Becky)
     with their name.
   - More than about seven questions means the topic is too big. Split it.
6. **Commit, push and open a draft pull request** titled `Shape: <topic>`. Paste the questions
   into the body so they can be read on a phone. Start the body with `Part of KAN-###`, or
   `Fixes KAN-###` when the issue exists only to make this decision.
7. **Linear.** Add the `Needs Grant` label to the issue (and the other decider's label where the
   project has one), and comment one line with the full pull-request URL. No question text in
   Linear. If Linear's GitHub integration moved the issue when the pull request opened, set it
   back to Discovery.
8. **Report to Grant and stop.** Give the questions in full, your recommendation for each, and
   the three ways to answer: reply here, run `/shape <slug> <answers>`, or edit the `Answer:`
   lines in the round file.

## Phase: Record

1. **Collect the answers** from the note, the round file and the pull-request comments
   (`gh pr view <n> --comments`). Write each one under its question, in Grant's words, with the
   date. Where he said to use the defaults, write "default taken". If a question that blocks the
   work is still open, ask again and stop.
2. Set the round to `Status: Answered`.
3. **Record the decisions** the way the project facts say: one record per decision in
   `docs/decisions/` plus a row in `docs/DECISIONS.md`, or the project's own equivalent.
4. **Revise the design.** Update the spec, the design doc and `CLAUDE.md` wherever the decisions
   change them. Instruction files keep only the decision and a link; how and why stays in the
   research and round files.
5. **Write the issues** in Linear, in this project and the right milestone, in **Backlog** for
   now, from [issue-template.md](issue-template.md).
   - One issue is one pull request: a vertical slice that can be verified on its own.
   - Acceptance criteria are things that can be checked, with numbers where they exist.
   - Name the files each issue owns, and set the blocked-by relations between them.
   - Give each a risk level: `high` if it touches the project's risky areas or is judged by feel,
     otherwise `low`.
   - If the original issue is itself the work, rewrite its description as a brief instead of
     creating a duplicate.
   - Held-out items get a plain title and one paragraph in the hold-out milestone. No brief yet.
6. **List the issues** (full URLs) under "Outcome" in the round file and in the pull-request
   body. Commit, push and mark the pull request ready for review.
7. **Linear.** Comment on the original issue that the answers are recorded and the pull request
   is ready to merge, with its full URL. Leave `Needs Grant` on: the merge is his.
8. **Watch for the merge**: `bash .claude/scripts/wait-for-merge.sh <number>` with
   `run_in_background`.
9. **Report to Grant:** the decisions recorded, the issues written, what was held out, and that
   merging the pull request releases them to Ready for Build.

## Phase: Release

Only after `gh pr view <n> --json state,mergedAt` shows the pull request merged.

1. **Branches.** Clean up as in `/do` Cleanup.
2. **Move the shaped issues from Backlog to Ready for Build.** Leave any that still wait on an
   open question in Backlog and say which.
3. **The original issue.** Remove `Needs Grant`. If it is itself the work, it moves to Ready for
   Build with the others. If it existed only for the decision, the merge closes it; confirm that
   and tell Grant if it didn't.
4. **Report:** what is now Ready for Build, in build order, and the first `/do` to run.

## When to stop and ask

Stop and ask Grant rather than guess when: the topic is larger than one milestone; the research
contradicts an Accepted decision; two answers conflict with each other; an answer would break a
constraint in the project facts; or you can't tell which milestone the work belongs to.
