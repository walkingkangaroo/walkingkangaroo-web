// The Visits demo (KAN-942): a copy of the app's job card. The visitor starts a clock, takes breaks,
// ticks the checklist, finishes and completes the job. Loaded by tabs.ts the first time its tab is
// shown.
//
// The top of this file is plain functions with no DOM access, so node can import it and check the
// arithmetic headlessly, and Visits.astro imports the words at build time so the no-JavaScript
// card and the script cannot disagree. Only init() touches the page. The wording and the sums copy
// the app (time-entry-rules.ts and job-time-card.tsx in PanePilot).

// ---- The words and numbers ------------------------------------------------------------------------

/** The app's one sentence about paid time (PAID_TIME_RULE). */
export const PAY_RULE =
  'Paid for time on site only, rounded to the nearest 15 minutes. Travel between jobs is not paid.';

/** The visit's checklist, in the order the card lists it. */
export const CHECKLIST = ['Front windows, inside and out', 'Door glass', 'Upstairs windows'] as const;

export const NOT_STARTED = 'Not started';
export const COMPLETED_MESSAGE = 'Job completed. Draft invoice INV-1044 is ready to review.';

/** Start is pressed at 9:31 am, in minutes after midnight. */
export const ARRIVE = 9 * 60 + 31;

/** Payable time is rounded to the nearest quarter hour. */
export const ROUNDING_MINUTES = 15;

/** The demo clock adds one minute every half second. */
export const TICK_MS = 500;

export type Phase = 'notStarted' | 'running' | 'onBreak' | 'finished' | 'completed';

/** The app's visit statuses as the card's badge shows them. */
export function badgeFor(phase: Phase): { label: string; kind: 'scheduled' | 'progress' | 'done' } {
  if (phase === 'notStarted') return { label: 'Scheduled', kind: 'scheduled' };
  if (phase === 'completed') return { label: 'Completed', kind: 'done' };
  return { label: 'In progress', kind: 'progress' };
}

export const checklistCount = (done: number): string => `${done} of ${CHECKLIST.length} done`;

// ---- The arithmetic -------------------------------------------------------------------------------

/** 9:31 am, from minutes after midnight. */
export function clock(mins: number): string {
  const h = Math.floor(mins / 60);
  return `${((h + 11) % 12) + 1}:${String(mins % 60).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
}

/** 105 is "1 h 45 min", 60 is "1 h", 0 is "0 min". */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

/** The worked minutes rounded to the nearest 15: what the worker is paid for. */
export function roundToPayable(minutes: number): number {
  return Math.max(0, Math.round(minutes / ROUNDING_MINUTES) * ROUNDING_MINUTES);
}

/** The payable line: the rounded figure, and the worked minutes beside it when rounding moved them. */
export function payableText(worked: number): string {
  const payable = roundToPayable(worked);
  return worked === payable
    ? `${formatMinutes(payable)} payable`
    : `${formatMinutes(payable)} payable (${formatMinutes(worked)} worked, rounded to the nearest ${ROUNDING_MINUTES} min)`;
}

/**
 * When the clock stopped, in minutes after midnight. The visitor started at 9:31 am and every demo
 * minute, worked or on a break, is a minute of the clock, so the finish is 9:31 am plus worked
 * minutes plus break minutes. `open` is a break still running, which counts here too.
 */
export const finishMinute = (worked: number, breaks: number, open = 0): number =>
  ARRIVE + worked + breaks + open;

/**
 * The line under the payable one: "Started 9:31 am · 10 min of breaks · on a break now".
 *
 * As in the app, a break is added to the break total only when it ends, so `breaks` is the closed
 * breaks. During a first break the line has no "of breaks", and during a later one it shows only the
 * earlier breaks. `open` (the break running now) is used only for the finish time.
 */
export function sinceText(phase: Phase, worked: number, breaks: number, open = 0): string {
  if (phase === 'notStarted') return '';
  const stopped = phase === 'finished' || phase === 'completed';
  const when = stopped ? `Finished ${clock(finishMinute(worked, breaks, open))}` : `Started ${clock(ARRIVE)}`;
  return `${when}${breaks > 0 ? ` · ${formatMinutes(breaks)} of breaks` : ''}${phase === 'onBreak' ? ' · on a break now' : ''}`;
}

/**
 * What a screen reader is told: the phase and the rounded figure, never the worked minutes, which
 * would be stale by the time they are read. It changes only when the phase or that figure does.
 */
export function spokenText(phase: Phase, worked: number): string {
  if (phase === 'notStarted') return '';
  if (phase === 'completed') return COMPLETED_MESSAGE;
  const figure = `${formatMinutes(roundToPayable(worked))} payable`;
  if (phase === 'finished') return `Finished. ${figure}`;
  if (phase === 'onBreak') return `On a break. ${figure}`;
  return figure;
}

// ---- The page -----------------------------------------------------------------------------------

/** Wire up the Visits panel. Called once by tabs.ts with the panel element. */
export function init(panel: HTMLElement): void {
  const must = <T extends Element>(selector: string): T => {
    const el = panel.querySelector<T>(selector);
    if (!el) throw new Error(`Visits demo: ${selector} is missing`);
    return el;
  };
  const badge = must<HTMLElement>('[data-badge]');
  const flash = must<HTMLElement>('[data-flash]');
  const payable = must<HTMLElement>('[data-payable]');
  const since = must<HTMLElement>('[data-since]');
  const start = must<HTMLButtonElement>('[data-start]');
  const brk = must<HTMLButtonElement>('[data-break]');
  const finish = must<HTMLButtonElement>('[data-finish]');
  const complete = must<HTMLButtonElement>('[data-complete]');
  const reset = must<HTMLButtonElement>('[data-reset]');
  const count = must<HTMLElement>('[data-count]');
  const announce = must<HTMLElement>('[data-announce]');
  const ticks = [...panel.querySelectorAll<HTMLButtonElement>('[data-tick]')];

  // All of the demo's state lives here, so the next demo (Invoicing) cannot reach it.
  let phase: Phase = 'notStarted';
  let worked = 0; // minutes
  let breaks = 0; // minutes of breaks that have ended
  let open = 0; // minutes of the break running now; folded into breaks when it ends
  let timer: ReturnType<typeof setInterval> | null = null;
  let spokenKey = '';

  const setText = (el: HTMLElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };
  const clockOn = () => phase === 'running' || phase === 'onBreak';
  const away = () => panel.hidden || document.visibilityState !== 'visible';

  function render(): void {
    start.hidden = phase !== 'notStarted';
    brk.hidden = finish.hidden = !clockOn();
    setText(brk, phase === 'onBreak' ? 'Back to work' : 'Break');
    complete.hidden = phase === 'completed';
    complete.disabled = phase === 'notStarted';
    reset.hidden = phase === 'notStarted';
    for (const tick of ticks) tick.disabled = phase === 'completed';

    setText(payable, phase === 'notStarted' ? NOT_STARTED : payableText(worked));
    const line = sinceText(phase, worked, breaks, open);
    setText(since, line);
    since.hidden = line === '';

    const { label, kind } = badgeFor(phase);
    setText(badge, label);
    badge.className = `badge ${kind}`;

    setText(count, checklistCount(ticks.filter((t) => t.getAttribute('aria-pressed') === 'true').length));

    flash.hidden = phase !== 'completed';
    setText(flash, phase === 'completed' ? COMPLETED_MESSAGE : '');

    // The payable line changes twice a second, so it is not a live region. This hidden one is told
    // only when the phase or the rounded payable figure changes: every 15 demo minutes, not every tick.
    const key = `${phase}|${roundToPayable(worked)}`;
    if (key !== spokenKey) {
      spokenKey = key;
      setText(announce, spokenText(phase, worked));
    }
  }

  // The one interval exists only while the clock is running or on a break, this panel is showing and
  // the page is visible. It is started or cleared here, from the current state, after every change.
  function tick(): void {
    if (phase === 'running') worked++;
    else if (phase === 'onBreak') open++;
    render();
    sync();
  }

  function sync(): void {
    const wanted = clockOn() && !away();
    if (wanted && timer === null) timer = setInterval(tick, TICK_MS);
    else if (!wanted && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  /** End the break running now, adding its minutes to the breaks taken. */
  function closeBreak(): void {
    breaks += open;
    open = 0;
  }

  /** Stop the clock if it is running or on a break; the finish time follows from the minutes. */
  function stopClock(): void {
    if (!clockOn()) return;
    closeBreak();
    phase = 'finished';
  }

  start.addEventListener('click', () => {
    phase = 'running';
    worked = 0;
    breaks = 0;
    open = 0;
    render();
    sync();
    brk.focus(); // Start has gone; Break is where it was
  });
  brk.addEventListener('click', () => {
    if (!clockOn()) return;
    if (phase === 'onBreak') {
      closeBreak();
      phase = 'running';
    } else {
      phase = 'onBreak';
    }
    render();
    sync();
  });
  finish.addEventListener('click', () => {
    stopClock();
    render();
    sync();
    complete.focus(); // Break and Finish have gone; Complete job is the next step
  });
  complete.addEventListener('click', () => {
    stopClock();
    phase = 'completed';
    render();
    sync();
    reset.focus(); // Complete job has gone
  });
  reset.addEventListener('click', () => {
    phase = 'notStarted';
    worked = 0;
    breaks = 0;
    open = 0;
    for (const t of ticks) t.setAttribute('aria-pressed', 'false');
    render();
    sync();
    start.focus(); // Start again has gone
  });
  for (const t of ticks) {
    t.addEventListener('click', () => {
      t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      render();
    });
  }

  // Leaving puts a running clock on a break, and the interval is cleared. Coming back leaves it on
  // the break until the visitor taps "Back to work".
  function leaveOrReturn(): void {
    if (away() && phase === 'running') {
      phase = 'onBreak';
      render();
    }
    sync();
  }
  // tabs.ts hides this panel with the hidden attribute when another tab is chosen.
  new MutationObserver(leaveOrReturn).observe(panel, { attributes: true, attributeFilter: ['hidden'] });
  document.addEventListener('visibilitychange', leaveOrReturn);

  render();
  // The page loaded in its starting state; from here on a change is read out. These carry aria-live
  // only now, so the first render isn't announced.
  for (const live of panel.querySelectorAll('[data-live]')) live.setAttribute('aria-live', 'polite');
}
