# Retro: Content

Project: walkingkangaroo.com · Template version: 1.0.1 · Written: 2026-10-07
Issues: 10 Done of 10 · First started: 2026-10-06 · Last merged: 2026-10-07 (UTC)

## The numbers

Times are minutes, from Linear's state history. "Start to Done" runs from the first In Progress
to Done; time waiting in Ready for Build is not counted.

| Measure | Median | Longest | Note |
| --- | --- | --- | --- |
| In Progress (minutes) | 2.1 | 4.6 (KAN-769) | 21.6 in all |
| AI Review (minutes) | 3.2 | 25.0 (KAN-754) | 61.6 in all; KAN-754's includes two stops waiting on Grant |
| Human QA (minutes) | 12.1 | 456.4 (KAN-757) | 627.4 in all; KAN-757 waited overnight |
| Start to Done (minutes) | 26.0 | 462.8 (KAN-757) | 710.6 in all |

- Share of elapsed time waiting in Human QA: 88.3% (69.0% without KAN-757's overnight wait)
- Fix rounds: 4 issues needed one (KAN-754, 756, 760, 769), 0 needed two, 0 stopped at the
  limit. KAN-754 also hit its stop condition twice and waited on Grant both times.
- Reopened or bug filed after merge: none
- Follow-ups: 3 filed (KAN-769 from KAN-754, KAN-772 from KAN-760, KAN-773 at close-out), 3
  closed in this milestone; none filed against a follow-up
- Models: 8 issues built by implementers on sonnet (KAN-760 used five in parallel), 2 made
  directly by the orchestrator (KAN-772, KAN-773), 0 on haiku or opus. Reviews: 8 on opus
  (4 of them ran a second pass), 2 on sonnet
- Grant's review comments on the 10 pull requests: 0
- Size: 312 lines added, 146 removed, 32 files, over 10 pull requests
- Token use: not measured

## Per issue

| Issue | In Progress | AI Review | Human QA | Fix rounds | Built by | Follow-ups |
| --- | --- | --- | --- | --- | --- | --- |
| KAN-754 | 2.2 | 25.0 | 9.5 | 1 | sonnet | KAN-769 |
| KAN-755 | 1.7 | 2.2 | 87.3 | 0 | sonnet | |
| KAN-756 | 2.2 | 3.3 | 26.9 | 1 | sonnet | |
| KAN-757 | 2.2 | 4.2 | 456.4 | 0 | sonnet | |
| KAN-758 | 2.1 | 3.0 | 14.6 | 0 | sonnet | |
| KAN-759 | 1.7 | 3.2 | 2.8 | 0 | sonnet | |
| KAN-760 | 3.3 | 11.1 | 22.0 | 1 | sonnet ×5 | KAN-772 |
| KAN-769 | 4.6 | 7.1 | 3.0 | 1 | sonnet | |
| KAN-772 | 1.2 | 1.8 | 1.2 | 0 | orchestrator | |
| KAN-773 | 0.5 | 0.8 | 3.7 | 0 | orchestrator | |

## What worked

- The opus reviewer earned its place on copy. It traced every draft to its project's repo and
  stopped two merges that would have published false claims: KAN-756 (planned work written as
  built) and KAN-760 (four of five posts said things their repos contradict). Nothing it passed
  needed fixing later.
- Stop conditions did their job. KAN-754's "the cover's subject is lost in the hero" fired at
  tablet width, and Grant chose a new cover plus a layout change (KAN-769, decision 0022) instead
  of shipping a hidden subject.
- Five parallel implementers on disjoint files (KAN-760) built five posts in 3.3 minutes of
  In Progress with no file conflicts.
- No bugs after merge, against one (KAN-738) in the last milestone.
- Small changes stayed small: KAN-772 and KAN-773 went from start to Done in 4.2 and 5.0
  minutes, written by the orchestrator with a sonnet review.

## What came back

- **Temporary test edits during review, again.** Last retro's proposal 2
  ([KAN-742](https://linear.app/walkingkangaroo/issue/KAN-742/walkingkangaroocom-the-orchestrator-makes-temporary-content-edits-only))
  is still in Backlog. In KAN-772 the reviewer's only blocking finding was the orchestrator's
  temporary cover on the Arcsine post, already reverted. No new issue is filed for it; the new
  evidence is added to KAN-742.

## Proposals

At most three. Each one is also a Process issue.

### 1. /shape checks each acceptance criterion against the code that would render it

- **Evidence:** three of ten issues had criteria the code couldn't meet as written, and one gap
  no issue covered.
  - KAN-754 asked for a "home card (3:4)", but the featured project never renders as a card
    (`src/pages/index.astro:12`). Grant struck it mid-issue. Its hero overlay also hid the
    cover's subject at tablet width, which a look at the hero during shaping would have shown.
    That cost two stops (25.0 minutes in AI Review, the milestone's longest) and spawned KAN-769
    (176 changed lines and a decision record).
  - KAN-772 assumed project pages use `PostCard`. They use `ProjectDevlog`, and the plan had to
    ask Grant whether to change them.
  - KAN-773: `src/pages/devlog/index.astro` still carried a "draft for Grant" comment that no
    Content issue covered. It was found at close-out.
- **Expected saving:** two stops and one question to Grant in this milestone, and two of its
  three follow-ups (KAN-769 was a design choice either way; KAN-773 would have been part of
  KAN-759).
- **Risk:** /shape takes a little longer: a grep per component a criterion names, and a sweep for
  draft markers when a round replaces drafts.
- **How we'd know it worked:** at the next retro, no criterion struck or reworded during /do, and
  no follow-up filed at close-out for something the round's goal already covered.
- **Process issue:** https://linear.app/walkingkangaroo/issue/KAN-782/walkingkangaroocom-shape-checks-each-acceptance-criterion-against-the

### 2. /do records Grant's verdict on copy in the pull request before it is merged

- **Evidence:** decision 0014 says Grant rewrites each draft before merge. Seven pull requests
  carried draft copy (KAN-754 to KAN-760). Each asked him to rewrite it; KAN-754 said "before
  merging" and the later six said "if you want to". None has a commit or a comment from Grant
  (0 review comments on all 10 pull requests), and `git log` shows no change to the five
  descriptions or the bio since they merged. Human QA on KAN-759 lasted 2.8 minutes and on
  KAN-754 9.5. So the repo can't tell an accepted draft from a deferred rewrite. KAN-759's meta
  descriptions and KAN-773 show the fix: Grant confirmed the wording in session, and the plan
  comment records it.
- **Expected saving:** a launch-time pass over 11 texts (5 descriptions, 1 bio, 5 posts) to find
  out which are still drafts. The five posts stay drafts until launch by design (decision 0020),
  so this matters most for the six live texts.
- **Risk:** one more question to Grant per copy issue, while he's at the keyboard.
- **How we'd know it worked:** every copy pull request at the next retro says "confirmed",
  "rewritten" or "draft kept until <issue>".
- **Process issue:** https://linear.app/walkingkangaroo/issue/KAN-783/walkingkangaroocom-do-records-grants-verdict-on-copy-in-the-pull

## Could not measure

- Token use: there is no per-agent record, and no `/usage` output was pasted.
- Whether Grant read the drafts and accepted them as his words, or deferred the rewrite: there is
  no record either way (proposal 2).
- Who found KAN-769's stage meter overlap: the fix-round comment says what was fixed, not
  whether the reviewer or the orchestrator found it.
- Subagent wall-clock time per dispatch: Linear's In Progress and AI Review include the
  orchestrator's own checks and, for KAN-754, time waiting on Grant.
- Time in Ready for Build: all seven shaped issues were made ready together at 04:07 UTC on
  2026-10-06 and built in order, so the wait reflects build order, not delay.
