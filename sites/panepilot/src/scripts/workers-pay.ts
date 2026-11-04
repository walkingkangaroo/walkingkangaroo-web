// The Workers' pay demo (KAN-944): a copy of the app's Time review for Sam Sample's last week. The
// visitor corrects a time, sees the 15-minute rounding, approves the entries and pays what is approved.
// Loaded by tabs.ts the first time its tab is shown.
//
// The top of this file is plain functions with no DOM access, so node can import it and check the
// sums headlessly, and WorkersPay.astro imports them at build time so the no-JavaScript card and the
// script cannot disagree. Only init() touches the page. The wording and the sums copy the app's Time
// review (workers/time/page.tsx, time-review-rules.ts, time-entry-rules.ts and EditTimes in PanePilot).
// Money is whole cents throughout.
import { money } from './quoting';
import { addDays, clock, mondayOf, noonOf, weekdayShort } from './scheduling';
import { formatMinutes, roundToPayable } from './visits';

// ---- The words and numbers ------------------------------------------------------------------------

export const WORKER = 'Sam Sample';
export const TITLE = 'Time review';
export const DESCRIPTION = "Each worker's time for the week, to check and approve.";
/** The sentence under the card, as the app words it. */
export const RULE =
  'Pay uses the rate in force on the day the work started. Approved time is final: its pay changes only with a bonus or deduction.';

/** Example figures: the hourly rate and the share are the demo's, not PanePilot's. */
export const RATE_CENTS = 3200;
export const SHARE_PERCENT = 40;

export type Basis = 'hourly' | 'share';

/** How Sam Sample is paid: the app's radio group (pay-fields.tsx and PAY_METHOD_DISPLAY), in its words. */
export const BASIS_LEGEND = 'How they are paid';
export const BASES: readonly { value: Basis; label: string }[] = [
  { value: 'hourly', label: 'By the hour' },
  { value: 'share', label: 'A share of the invoice' },
];
export const START_BASIS: Basis = 'hourly';

/** DRAFT for Grant to rewrite. Said beside the radios, because the rate and the share are the demo's. */
export const EXAMPLE_FIGURES = `${WORKER}'s ${money(RATE_CENTS)} an hour and ${SHARE_PERCENT}% of the invoice are example figures.`;

/** The app's words for a correction (EditTimes in job-time-card.tsx and time-changes.ts). */
export const CORRECT_LABEL = `Correct ${WORKER}'s times`;
export const CORRECT_INTRO = 'For the button nobody pressed. Times are on the day the work started.';
export const REASON_LABEL = 'Why it is changing';
export const REASON_HINT = 'Kept with the entry, in the audit trail.';
export const SAVE_LABEL = 'Save times';

/** The app's messages for a typed correction. */
export const TIME_FORMAT_MESSAGE = 'Enter a time like 07:30.';
export const REASON_MESSAGE = 'Say why the time is changing — it is kept with the entry.';
export const TOO_LONG_MESSAGE = 'That is more than 16 hours on one job — check the times.';
/**
 * DRAFT for Grant to check. The app has no message for this: it reads a finish before the start as a
 * job that ran past midnight. The demo's week is all daytime, so it refuses instead, in its own words.
 */
export const FINISH_AFTER_START_MESSAGE = 'The finish must be after the start.';

const MAX_SHIFT_MINUTES = 16 * 60;
const REASON_MIN_LENGTH = 3;

export type Status = 'awaiting' | 'approved' | 'paid';

export interface Entry {
  id: string;
  /** Days after the Monday of the week: 0 is Monday. */
  dayOffset: number;
  job: string;
  /** The visit's invoice, which a share is taken from. */
  invoiceCents: number;
  /** Minutes after midnight. */
  start: number;
  finish: number;
  status: Status;
  /**
   * How the entry's pay was worked out when it was approved. Null while it awaits approval, so it
   * follows the pay radios until then. Approved time keeps its pay: the app snapshots the rate.
   */
  basis: Basis | null;
}

/** Sam Sample's week as it starts: Monday, Wednesday and Friday, every entry awaiting approval. */
export const ENTRIES: readonly Entry[] = [
  { id: 'jo', dayOffset: 0, job: 'Jo Example, Clare', invoiceCents: 9500, start: 8 * 60 + 2, finish: 9 * 60 + 29, status: 'awaiting', basis: null },
  { id: 'bakery', dayOffset: 2, job: 'Example Bakery, Clare', invoiceCents: 10000, start: 9 * 60 + 30, finish: 10 * 60 + 45, status: 'awaiting', basis: null },
  { id: 'cafe', dayOffset: 4, job: 'Mock Cafe, Clare', invoiceCents: 6000, start: 14 * 60, finish: 14 * 60 + 44, status: 'awaiting', basis: null },
];

export const freshEntries = (): Entry[] => ENTRIES.map((e) => ({ ...e }));

// ---- The sums -------------------------------------------------------------------------------------

export const workedMinutes = (e: Entry): number => e.finish - e.start;
/** The worked minutes rounded to the nearest quarter hour: what the worker is paid for. */
export const payableMinutes = (e: Entry): number => roundToPayable(workedMinutes(e));

/** An entry awaiting approval follows the pay radios; an approved or paid one keeps the basis it had. */
export const basisOf = (e: Entry, current: Basis): Basis => e.basis ?? current;

/** The entry's base pay in cents: the payable time at the hourly rate, or the share of its invoice. */
export function payCents(e: Entry, basis: Basis): number {
  if (basis === 'share') return Math.round((e.invoiceCents * SHARE_PERCENT) / 100);
  return Math.round((payableMinutes(e) * RATE_CENTS) / 60);
}

const entryPay = (e: Entry, current: Basis): number => payCents(e, basisOf(e, current));

export const rateText = (basis: Basis): string =>
  basis === 'share' ? `${SHARE_PERCENT}% of invoice` : `${money(RATE_CENTS)}/h`;

/** "1 h 30 min payable (1 h 27 min worked) · $48.00 at $32.00/h". The "worked" part only when rounding moved it. */
export function payLine(e: Entry, current: Basis): string {
  const basis = basisOf(e, current);
  const rounded = workedMinutes(e) !== payableMinutes(e);
  return `${formatMinutes(payableMinutes(e))} payable${rounded ? ` (${formatMinutes(workedMinutes(e))} worked)` : ''} · ${money(payCents(e, basis))} at ${rateText(basis)}`;
}

/** What a share awaiting approval was worked out from, under its figure; nothing for any other entry. */
export function basisLine(e: Entry, current: Basis): string {
  if (e.status !== 'awaiting' || basisOf(e, current) !== 'share') return '';
  return `${SHARE_PERCENT}% of the ${money(e.invoiceCents)} invoice`;
}

/** The line under the worker's name. */
export function summaryText(entries: readonly Entry[], current: Basis): string {
  const payable = entries.reduce((sum, e) => sum + payableMinutes(e), 0);
  const base = entries.reduce((sum, e) => sum + entryPay(e, current), 0);
  const awaiting = entries.filter((e) => e.status === 'awaiting').length;
  return `${formatMinutes(payable)} payable · ${money(base)} base pay${awaiting > 0 ? ` · ${awaiting} not yet approved` : ''}`;
}

/** The approved time that is not yet paid. */
export function toPay(entries: readonly Entry[], current: Basis): { count: number; cents: number } {
  const due = entries.filter((e) => e.status === 'approved');
  return { count: due.length, cents: due.reduce((sum, e) => sum + entryPay(e, current), 0) };
}

export const countAwaiting = (entries: readonly Entry[]): number =>
  entries.filter((e) => e.status === 'awaiting').length;

/** Whether anything differs from the start, which is when Start again is offered. */
export function isChanged(entries: readonly Entry[], current: Basis): boolean {
  return (
    current !== START_BASIS ||
    entries.some((e, i) => e.status !== ENTRIES[i].status || e.start !== ENTRIES[i].start || e.finish !== ENTRIES[i].finish)
  );
}

// ---- The words for one entry ----------------------------------------------------------------------

/** The app's badges (STATUS_DISPLAY): Awaiting approval is the attention tone, the other two are success. */
export function badgeFor(status: Status): { label: string; kind: 'attention' | 'success' } {
  if (status === 'awaiting') return { label: 'Awaiting approval', kind: 'attention' };
  return { label: status === 'approved' ? 'Approved' : 'Paid', kind: 'success' };
}

export const timesText = (e: Entry): string => `${clock(e.start)} – ${clock(e.finish)}`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** The week the dates come from. Null is the build's own render, which does not know today. */
export type Week = { monday: Date; today: Date } | null;

const dayNoYear = (d: Date): string => `${weekdayShort(d)}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;

/** "Mon, 26 Oct": the app's formatDay, which names the year only when it is not this one. */
export function dayText(d: Date, today: Date, alwaysYear = false): string {
  return alwaysYear || d.getFullYear() !== today.getFullYear() ? `${dayNoYear(d)} ${d.getFullYear()}` : dayNoYear(d);
}

/** The Monday of the week before the one holding today. */
export const lastMonday = (today: Date): Date => addDays(mondayOf(noonOf(today)), -7);

/** "Mon, 26 Oct – Sun, 1 Nov": the app's formatDayRange. */
export function rangeText(week: NonNullable<Week>): string {
  const sunday = addDays(week.monday, 6);
  const left =
    week.monday.getFullYear() === sunday.getFullYear()
      ? dayNoYear(week.monday)
      : dayText(week.monday, week.today, true);
  return `${left} – ${dayText(sunday, week.today)}`;
}

/** The day, in the app's words, or just the weekday where the dates are not known yet. */
export const dayOf = (e: Entry, week: Week): string =>
  week ? dayText(addDays(week.monday, e.dayOffset), week.today) : WEEKDAYS[e.dayOffset];

/** "Mon, 26 Oct · Jo Example, Clare". */
export const entryTitle = (e: Entry, week: Week): string => `${dayOf(e, week)} · ${e.job}`;

// Accessible names. Each starts with the button's visible words, so the name contains them.
export const approveAria = (e: Entry, week: Week): string =>
  `Approve ${WORKER}'s time on ${dayOf(e, week)} at ${e.job}`;
export const approveAllText = (count: number): string => (count === 1 ? 'Approve 1 entry' : `Approve ${count} entries`);
export const approveAllAria = (count: number): string =>
  `${approveAllText(count)} for ${WORKER}'s week`;
export const payText = (cents: number): string => `Pay ${money(cents)}`;
export const payAria = (cents: number): string => `${payText(cents)} to ${WORKER} for the week`;

// ---- A correction ---------------------------------------------------------------------------------

const TIME_VALUE = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Minutes after midnight from a time input's value ("08:02"), or null when it is empty or not a time. */
export function minutesOf(value: string): number | null {
  const v = value.trim();
  return TIME_VALUE.test(v) ? Number(v.slice(0, 2)) * 60 + Number(v.slice(3)) : null;
}

/** A time input's value, from minutes after midnight. */
export const timeValue = (mins: number): string =>
  `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

export interface Problem {
  field: 'start' | 'finish' | 'reason';
  message: string;
}

/**
 * The first thing wrong with a correction, or null. The app checks the times first and the reason
 * second. Its 16-hour limit is kept. A finish at or before the start is refused here, where the app
 * would read it as a night shift (see FINISH_AFTER_START_MESSAGE).
 */
export function checkTimes(start: string, finish: string, reason: string): Problem | null {
  const from = minutesOf(start);
  const to = minutesOf(finish);
  if (from === null) return { field: 'start', message: TIME_FORMAT_MESSAGE };
  if (to === null) return { field: 'finish', message: TIME_FORMAT_MESSAGE };
  if (to <= from) return { field: 'finish', message: FINISH_AFTER_START_MESSAGE };
  if (to - from > MAX_SHIFT_MINUTES) return { field: 'finish', message: TOO_LONG_MESSAGE };
  if (reason.trim().length < REASON_MIN_LENGTH) return { field: 'reason', message: REASON_MESSAGE };
  return null;
}

/** What a screen reader is told after each change. Screen-reader text, not the app's words. */
export const spokenApproved = (e: Entry, week: Week): string => `Approved. ${entryTitle(e, week)}.`;
export const spokenApprovedAll = (count: number): string =>
  `Approved ${count === 1 ? '1 entry' : `${count} entries`}.`;
export const spokenSaved = (e: Entry, current: Basis, week: Week): string =>
  `Times saved. ${entryTitle(e, week)}: ${timesText(e)}. ${payLine(e, current)}.`;
export const spokenPaid = (count: number, cents: number): string =>
  `Paid ${money(cents)} for ${count === 1 ? '1 approved entry' : `${count} approved entries`}.`;
export const spokenBasis = (entries: readonly Entry[], current: Basis): string =>
  `${WORKER} is paid ${current === 'share' ? `a share of the invoice, ${SHARE_PERCENT}%` : `by the hour, ${money(RATE_CENTS)}/h`}. ${summaryText(entries, current)}.`;
export const SPOKEN_RESET = 'Back to the start.';

// ---- The page -----------------------------------------------------------------------------------

/** Wire up the Workers' pay panel. Called once by tabs.ts with the panel element. */
export function init(panel: HTMLElement): void {
  const must = <T extends Element>(selector: string, within: ParentNode = panel): T => {
    const el = within.querySelector<T>(selector);
    if (!el) throw new Error(`Workers' pay demo: ${selector} is missing`);
    return el;
  };
  const radios = [...panel.querySelectorAll<HTMLInputElement>('input[name="pay-basis"]')];
  if (radios.length === 0) throw new Error("Workers' pay demo: the pay radios are missing");
  const range = must<HTMLElement>('[data-range]');
  const sum = must<HTMLElement>('[data-sum]');
  const actions = must<HTMLElement>('[data-actions]');
  const approveAll = must<HTMLButtonElement>('[data-approve-all]');
  const approveAllLabel = must<HTMLElement>('[data-label]', approveAll);
  const payButton = must<HTMLButtonElement>('[data-pay]');
  const payLabel = must<HTMLElement>('[data-label]', payButton);
  const reset = must<HTMLButtonElement>('[data-reset]');
  const announce = must<HTMLElement>('[data-announce]');

  const rows = [...panel.querySelectorAll<HTMLElement>('[data-entry]')].map((row) => ({
    id: row.dataset.entry as string,
    title: must<HTMLElement>('[data-title]', row),
    times: must<HTMLElement>('[data-times]', row),
    badge: must<HTMLElement>('[data-badge]', row),
    payline: must<HTMLElement>('[data-payline]', row),
    basis: must<HTMLElement>('[data-basis-line]', row),
    approve: must<HTMLButtonElement>('[data-approve]', row),
    edit: must<HTMLDetailsElement>('[data-edit]', row),
    summary: must<HTMLElement>('summary', row),
    form: must<HTMLFormElement>('[data-form]', row),
    start: must<HTMLInputElement>('[data-start]', row),
    finish: must<HTMLInputElement>('[data-finish]', row),
    reason: must<HTMLInputElement>('[data-reason]', row),
    errors: {
      start: must<HTMLElement>('[data-error="start"]', row),
      finish: must<HTMLElement>('[data-error="finish"]', row),
      reason: must<HTMLElement>('[data-error="reason"]', row),
    },
  }));

  // All of the demo's state lives here. "Last week" is the Monday-to-Sunday week before the one
  // holding the visitor's today.
  const today = noonOf(new Date());
  const week: NonNullable<Week> = { monday: lastMonday(today), today };
  let basis: Basis = START_BASIS;
  let entries = freshEntries();

  const setText = (el: HTMLElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };
  const say = (text: string) => setText(announce, text);
  const entryOf = (id: string): Entry => entries.find((e) => e.id === id) as Entry;

  function clearErrors(row: (typeof rows)[number]): void {
    for (const field of ['start', 'finish', 'reason'] as const) {
      row.errors[field].hidden = true;
      setText(row.errors[field], '');
      row[field].removeAttribute('aria-invalid');
    }
  }

  function render(): void {
    setText(range, rangeText(week));
    range.hidden = false;
    setText(sum, summaryText(entries, basis));

    const awaiting = countAwaiting(entries);
    approveAll.hidden = awaiting === 0;
    if (awaiting > 0) {
      setText(approveAllLabel, approveAllText(awaiting));
      approveAll.setAttribute('aria-label', approveAllAria(awaiting));
    }
    const due = toPay(entries, basis);
    payButton.hidden = due.count === 0;
    if (due.count > 0) {
      setText(payLabel, payText(due.cents));
      payButton.setAttribute('aria-label', payAria(due.cents));
    }
    actions.hidden = approveAll.hidden && payButton.hidden;

    for (const row of rows) {
      const e = entryOf(row.id);
      setText(row.title, entryTitle(e, week));
      setText(row.times, timesText(e));
      const { label, kind } = badgeFor(e.status);
      setText(row.badge, label);
      row.badge.className = `badge ${kind}`;
      setText(row.payline, payLine(e, basis));
      const line = basisLine(e, basis);
      setText(row.basis, line);
      row.basis.hidden = line === '';

      // Approving is final, so an approved or paid entry has neither Approve nor a correction.
      const open = e.status === 'awaiting';
      row.approve.hidden = !open;
      row.approve.setAttribute('aria-label', approveAria(e, week));
      row.edit.hidden = !open;
      if (!open && row.edit.open) row.edit.open = false;
    }

    // Start again goes while a correction is open, so a second click on Save times cannot land on it.
    reset.hidden = !isChanged(entries, basis) || rows.some((row) => row.edit.open);
  }

  for (const radio of radios) {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;
      basis = radio.value as Basis;
      render();
      say(spokenBasis(entries, basis));
    });
  }

  for (const row of rows) {
    row.approve.addEventListener('click', (event) => {
      // One step per press: a double-click would otherwise land on whatever takes this button's place.
      if (event.detail > 1) return;
      const e = entryOf(row.id);
      if (e.status !== 'awaiting') return;
      e.status = 'approved';
      e.basis = basis;
      render();
      say(spokenApproved(e, week));
      row.title.focus(); // Approve has gone; the entry's own line is where it was
    });

    row.edit.addEventListener('toggle', () => render());

    for (const field of ['start', 'finish', 'reason'] as const) {
      row[field].addEventListener('input', () => {
        row.errors[field].hidden = true;
        setText(row.errors[field], '');
        row[field].removeAttribute('aria-invalid');
      });
    }

    row.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const e = entryOf(row.id);
      if (e.status !== 'awaiting') return;
      clearErrors(row);
      const problem = checkTimes(row.start.value, row.finish.value, row.reason.value);
      if (problem) {
        const input = row[problem.field];
        setText(row.errors[problem.field], problem.message);
        row.errors[problem.field].hidden = false;
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      e.start = minutesOf(row.start.value) as number;
      e.finish = minutesOf(row.finish.value) as number;
      row.reason.value = '';
      row.edit.open = false;
      render();
      say(spokenSaved(e, basis, week));
      row.summary.focus(); // the form has gone; the correction's own row is where it was
    });
  }

  approveAll.addEventListener('click', (event) => {
    if (event.detail > 1) return;
    const waiting = entries.filter((e) => e.status === 'awaiting');
    if (waiting.length === 0) return;
    // Every entry awaiting approval: the demo's times are always valid, so none is held back.
    for (const e of waiting) {
      e.status = 'approved';
      e.basis = basis;
    }
    render();
    say(spokenApprovedAll(waiting.length));
    payButton.focus(); // Approve has gone; Pay is the next step and has just appeared
  });

  payButton.addEventListener('click', (event) => {
    if (event.detail > 1) return;
    const due = toPay(entries, basis);
    if (due.count === 0) return;
    for (const e of entries) if (e.status === 'approved') e.status = 'paid';
    render();
    say(spokenPaid(due.count, due.cents));
    // Pay has gone. Start again is the next step, unless a correction is open, which hides it.
    (reset.hidden ? sum : reset).focus();
  });

  reset.addEventListener('click', (event) => {
    if (event.detail > 1) return;
    entries = freshEntries();
    basis = START_BASIS;
    for (const radio of radios) radio.checked = radio.value === START_BASIS;
    for (const row of rows) {
      const e = entryOf(row.id);
      row.edit.open = false;
      row.start.value = timeValue(e.start);
      row.finish.value = timeValue(e.finish);
      row.reason.value = '';
      clearErrors(row);
    }
    render();
    say(SPOKEN_RESET);
    approveAll.focus(); // Start again has gone; the first step is back
  });

  render();
  // The page loaded in its starting state; from here on a change is read out. The announcer carries
  // aria-live only now, so the first render isn't announced.
  for (const live of panel.querySelectorAll('[data-live]')) live.setAttribute('aria-live', 'polite');
}
