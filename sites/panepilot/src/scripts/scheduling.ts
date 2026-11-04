// The Scheduling demo (KAN-941): a copy of the app's calendar that fills in as the visitor sets how
// often Jo Example comes and how often each shop on the Shops run comes. Loaded by tabs.ts the first
// time its tab is shown.
//
// The top of this file is plain functions with no DOM access, so node can import it and check the
// schedule headlessly. Scheduling.astro imports the option lists at build time. Only init() touches
// the page. Every date is built at local noon, so a daylight-saving change can never move one to
// the day before or after.

// ---- What the visitor can choose ----------------------------------------------------------------

export type JoFreq = 'w1' | 'w2' | 'w4' | 'm1' | 'm3';

/** Jo Example's frequencies, as the app's editor words them. The first letter is weeks or months. */
export const JO_FREQUENCIES: readonly { value: JoFreq; label: string }[] = [
  { value: 'w1', label: 'Weekly' },
  { value: 'w2', label: 'Fortnightly' },
  { value: 'w4', label: 'Every 4 weeks' },
  { value: 'm1', label: 'Monthly on a date' },
  { value: 'm3', label: 'Every 3 months' },
];
export const JO_DEFAULT: JoFreq = 'w4';

export type Cadence = 1 | 2 | 3;
export const CADENCES: readonly { value: Cadence; label: string }[] = [
  { value: 1, label: 'Every run' },
  { value: 2, label: 'Every 2nd run' },
  { value: 3, label: 'Every 3rd run' },
];

/** The shops on the Shops run, in the run's order, with how often each comes to begin with. */
export const SHOPS = [
  { id: 'bakery', name: 'Example Bakery', cadence: 1 },
  { id: 'cafe', name: 'Mock Cafe', cadence: 2 },
  { id: 'deli', name: 'Test Deli', cadence: 3 },
] as const;
export type ShopId = (typeof SHOPS)[number]['id'];

export interface Options {
  jo: JoFreq;
  cadence: Record<ShopId, Cadence>;
}

export const DEFAULTS: Options = {
  jo: JO_DEFAULT,
  cadence: { bakery: 1, cafe: 2, deli: 3 },
};

// ---- Dates, always at local noon -------------------------------------------------------------

/** How many months the demo covers: the month containing today, and the next two. */
export const MONTHS = 3;

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const at = (year: number, month: number, day: number): Date => new Date(year, month, day, 12);
export const addDays = (d: Date, n: number): Date => at(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** The Monday on or before d. */
export const mondayOf = (d: Date): Date => addDays(d, -((d.getDay() + 6) % 7));
export const noonOf = (d: Date): Date => at(d.getFullYear(), d.getMonth(), d.getDate());
/** 2026-11-04: one key per calendar day, whatever the time zone. */
export const dateKey = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** 8:00 am, 12:00 pm, from minutes after midnight. */
export function clock(mins: number): string {
  const h = Math.floor(mins / 60);
  return `${((h + 11) % 12) + 1}:${String(mins % 60).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
}

/** 1 h 30 min, 1 h 15 min, 1 h. */
export function lengthText(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`;
}

export const shortDate = (d: Date): string => `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}`;
export const longDate = (d: Date): string => `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
export const weekdayShort = (d: Date): string => DAY_NAMES[d.getDay()].slice(0, 3);
export const weekdayDate = (d: Date): string => `${weekdayShort(d)} ${shortDate(d)}`;
export const monthTitle = (d: Date): string => `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;

// ---- The schedule -----------------------------------------------------------------------------

export type StatusId = 'paid' | 'approve' | 'scheduled';
export interface Status {
  id: StatusId;
  label: string;
}
const PAID: Status = { id: 'paid', label: 'Paid' };
const APPROVE: Status = { id: 'approve', label: 'To approve' };
const SCHEDULED: Status = { id: 'scheduled', label: 'Scheduled' };

/**
 * The app's badges. Before this week's Monday is Paid; from that Monday up to, but not including,
 * today is To approve; today and later is Scheduled.
 */
export function statusOf(day: Date, today: Date): Status {
  const t = noonOf(today);
  const d = noonOf(day);
  if (d < mondayOf(t)) return PAID;
  if (d < t) return APPROVE;
  return SCHEDULED;
}

export interface VisitItem {
  kind: 'visit';
  date: Date;
  /** Minutes after midnight. */
  start: number;
  /** Minutes. */
  length: number;
  who: string;
  where: string;
  crew: string;
  status: Status;
}

export interface Stop {
  /** Minutes after midnight. */
  start: number;
  shop: string;
}

export interface RunItem {
  kind: 'run';
  date: Date;
  start: number;
  /** When the last stop ends, in minutes after midnight. */
  end: number;
  /** Which run day this is, counting the first Thursday in the grid as 0. */
  k: number;
  stops: Stop[];
  crew: string;
  /** True when the run day is before today, so its stops are all done. */
  done: boolean;
}

export type Item = VisitItem | RunItem;

const RUN_START = 9 * 60 + 30;
const STOP_LENGTH = 50;
const RUN_CREW = 'Alex Example, Sam Sample';

/** Two customers from the demo business who come on a fixed round, so the month reads like a real one. */
const FIXED = [
  { who: 'Demo Motel', where: '9 Demo Lane, Clare', start: 7 * 60 + 30, length: 75, crew: 'Alex Example, Sam Sample', weekday: 1, every: 1 },
  { who: 'Chris Test', where: '8 Test Ave, Clare', start: 10 * 60, length: 60, crew: 'Sam Sample', weekday: 2, every: 4 },
] as const;

export interface Schedule {
  today: Date;
  /** The Monday of today's week. */
  thisWeek: Date;
  /** The first of each of the MONTHS months, the first being the month containing today. */
  months: Date[];
  /** The Monday on or before the 1st of this month: the schedule begins here. */
  gridStart: Date;
  /** The Monday after the last grid row of the last month: the schedule ends before this. */
  horizon: Date;
  /** Whole weeks from gridStart to horizon. */
  weeks: number;
  /** Jo Example's visit dates, in order. */
  joDates: Date[];
  /** Everything on each day, by dateKey, sorted by start time. */
  days: Map<string, Item[]>;
}

/** Jo Example's visit dates: every 1, 2 or 4 weeks from gridStart, or the same date every 1 or 3 months. */
function joDatesFor(freq: JoFreq, gridStart: Date, horizon: Date): Date[] {
  const out: Date[] = [];
  const step = Number(freq.slice(1));
  if (freq[0] === 'w') {
    for (let d = gridStart; d < horizon; d = addDays(d, step * 7)) out.push(d);
  } else {
    // "Monthly on a date" keeps gridStart's day of the month; in a shorter month it is the last day.
    for (let m = 0; ; m += step) {
      const first = at(gridStart.getFullYear(), gridStart.getMonth() + m, 1);
      const lastDay = at(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      const d = at(first.getFullYear(), first.getMonth(), Math.min(gridStart.getDate(), lastDay));
      if (d >= horizon) break;
      out.push(d);
    }
  }
  return out;
}

/**
 * Everything the calendar shows, for a given today and the visitor's choices.
 *
 * - "This month" is the calendar month containing today, with no special case for its last days.
 *   The schedule starts on the Monday on or before its 1st and runs through the last row of the
 *   third month.
 * - Jo Example comes on gridStart, then every 1, 2 or 4 weeks (all Mondays), or on the same date
 *   every 1 or 3 months.
 * - The Shops run is every Thursday. The first Thursday in the grid is run day k = 0, and a shop
 *   comes on run day k when k is a multiple of its cadence, so k = 0 has every shop.
 * - Demo Motel is every Tuesday and Chris Test every 4th Wednesday, the first being in the first row.
 */
export function buildSchedule(todayIn: Date, opts: Options): Schedule {
  const today = noonOf(todayIn);
  const thisWeek = mondayOf(today);
  const months = Array.from({ length: MONTHS }, (_, i) => at(today.getFullYear(), today.getMonth() + i, 1));
  const gridStart = mondayOf(months[0]);
  const lastDay = at(today.getFullYear(), today.getMonth() + MONTHS, 0);
  const horizon = addDays(mondayOf(lastDay), 7);
  const weeks = Math.round((horizon.getTime() - gridStart.getTime()) / (7 * 864e5));
  const joDates = joDatesFor(opts.jo, gridStart, horizon);

  const days = new Map<string, Item[]>();
  const put = (item: Item) => {
    const key = dateKey(item.date);
    const list = days.get(key);
    if (list) list.push(item);
    else days.set(key, [item]);
  };
  const visit = (date: Date, v: { who: string; where: string; start: number; length: number; crew: string }) =>
    put({
      kind: 'visit',
      date,
      start: v.start,
      length: v.length,
      who: v.who,
      where: v.where,
      crew: v.crew,
      status: statusOf(date, today),
    });

  for (const date of joDates) {
    visit(date, { who: 'Jo Example', where: '11 Sample Rd, Clare', start: 8 * 60, length: 90, crew: 'Sam Sample' });
  }
  for (const f of FIXED) {
    for (let w = 0; w < weeks; w += f.every) visit(addDays(gridStart, w * 7 + f.weekday), f);
  }
  for (let k = 0; k < weeks; k++) {
    const shops = SHOPS.filter((s) => k % opts.cadence[s.id] === 0);
    if (shops.length === 0) continue;
    const date = addDays(gridStart, k * 7 + 3);
    put({
      kind: 'run',
      date,
      start: RUN_START,
      end: RUN_START + shops.length * STOP_LENGTH,
      k,
      stops: shops.map((s, i) => ({ start: RUN_START + i * STOP_LENGTH, shop: s.name })),
      crew: RUN_CREW,
      done: date < today,
    });
  }
  for (const list of days.values()) list.sort((a, b) => a.start - b.start);

  return { today, thisWeek, months, gridStart, horizon, weeks, joDates, days };
}

/** The days of one month's grid: whole Monday-to-Sunday rows from the Monday on or before the 1st. */
export function monthDays(first: Date): Date[] {
  const gridStart = mondayOf(first);
  const lastOfMonth = at(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const rows = Math.ceil(((first.getDay() + 6) % 7 + lastOfMonth) / 7);
  return Array.from({ length: rows * 7 }, (_, i) => addDays(gridStart, i));
}

/** Jo Example's visits from today on, up to three, as "26 Oct, 23 Nov, 21 Dec". */
export function nextJoVisits(s: Schedule, count = 3): Date[] {
  return s.joDates.filter((d) => d >= s.today).slice(0, count);
}

/** The line under the calendar. */
export function summaryText(s: Schedule): string {
  const next = nextJoVisits(s);
  const tail = 'Tap the run to see its stops in order.';
  if (next.length === 0) return `Jo Example has no more visits in these three months. ${tail}`;
  return `Jo Example's next ${next.length === 1 ? 'visit' : 'visits'}: ${next.map(shortDate).join(', ')}. ${tail}`;
}

// ---- The page -----------------------------------------------------------------------------------

const REPEAT =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>';
const CHEVRON =
  '<svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

const shopsText = (n: number): string => `${n} ${n === 1 ? 'shop' : 'shops'}`;
const stopsList = (run: RunItem): string =>
  run.stops.map((s) => `<li><b>${clock(s.start)}</b><span>${s.shop}</span></li>`).join('');

/** Wire up the Scheduling panel. Called once by tabs.ts with the panel element. */
export function init(panel: HTMLElement): void {
  const must = <T extends Element>(selector: string): T => {
    const el = panel.querySelector<T>(selector);
    if (!el) throw new Error(`Scheduling demo: ${selector} is missing`);
    return el;
  };
  const demo = must<HTMLElement>('[data-sched]');
  const joSelect = must<HTMLSelectElement>('[data-jo]');
  const shopSelects = SHOPS.map((s) => ({ id: s.id, el: must<HTMLSelectElement>(`[data-shop="${s.id}"]`) }));
  const moPrev = must<HTMLButtonElement>('[data-mo-prev]');
  const moNext = must<HTMLButtonElement>('[data-mo-next]');
  const moLabel = must<HTMLElement>('[data-mo-label]');
  const grid = must<HTMLElement>('[data-mgrid]');
  const runsheet = must<HTMLElement>('[data-runsheet]');
  const wkPrev = must<HTMLButtonElement>('[data-wk-prev]');
  const wkNext = must<HTMLButtonElement>('[data-wk-next]');
  const wkLabel = must<HTMLElement>('[data-wk-label]');
  const strip = must<HTMLElement>('[data-strip]');
  const dayview = must<HTMLElement>('[data-dayview]');
  const summary = must<HTMLElement>('[data-sum]');

  const read = (): Options => ({
    jo: joSelect.value as JoFreq,
    cadence: Object.fromEntries(shopSelects.map((s) => [s.id, Number(s.el.value) as Cadence])) as Options['cadence'],
  });

  const today = new Date();
  let sched = buildSchedule(today, read());
  let month = 0;
  let week = Math.round((sched.thisWeek.getTime() - sched.gridStart.getTime()) / (7 * 864e5));
  let pick = (noonOf(today).getDay() + 6) % 7; // today's place in the week, Monday = 0
  let openRun: string | null = null; // the month view's open run, by day
  const openCards = new Set<string>(); // the day view's open run cards, by day

  const itemsOn = (key: string): Item[] => sched.days.get(key) ?? [];
  const runOn = (key: string): RunItem | undefined => itemsOn(key).find((it): it is RunItem => it.kind === 'run');

  // ---- Month view (wide screens) ----

  function runChip(run: RunItem): string {
    const key = dateKey(run.date);
    return `<button type="button" class="chip-r" data-day="${key}" aria-expanded="${openRun === key}" aria-controls="sched-runsheet" aria-label="Shops run, ${shopsText(run.stops.length)}, ${longDate(run.date)}">${REPEAT}<span>Shops · ${run.stops.length}</span></button>`;
  }

  function visitChip(v: VisitItem): string {
    return `<span class="chip-v ${v.status.id}"><span><b>${clock(v.start)}</b> ${v.who}</span><span class="visually-hidden"> · ${v.status.label}</span></span>`;
  }

  function renderMonth(): void {
    const first = sched.months[month];
    const todayKey = dateKey(sched.today);
    grid.innerHTML = monthDays(first)
      .map((d) => {
        const key = dateKey(d);
        const items = itemsOn(key);
        const shown = items.slice(0, 3);
        const more = items.length - shown.length;
        const isToday = key === todayKey;
        const label = items.length ? ` role="group" aria-label="${longDate(d)}${isToday ? ', today' : ''}"` : '';
        const chips = shown.map((it) => (it.kind === 'run' ? runChip(it) : visitChip(it))).join('');
        return `<div class="mcell${d.getMonth() === first.getMonth() ? '' : ' out'}"${label}><span class="dn${isToday ? ' today' : ''}"${items.length ? ' aria-hidden="true"' : ''}>${d.getDate()}${isToday && !items.length ? '<span class="visually-hidden"> today</span>' : ''}</span>${chips}${more > 0 ? `<span class="more">+${more} more</span>` : ''}</div>`;
      })
      .join('');
    moLabel.textContent = monthTitle(first);
    moPrev.disabled = month === 0;
    moNext.disabled = month === MONTHS - 1;
    renderRunSheet(false);
  }

  /** Show the open run's stops under the grid, in place so the focused chip stays focused. */
  function renderRunSheet(scroll: boolean): void {
    const run = openRun ? runOn(openRun) : undefined;
    if (!run) openRun = null;
    for (const chip of grid.querySelectorAll<HTMLElement>('.chip-r')) {
      chip.setAttribute('aria-expanded', String(chip.dataset.day === openRun));
    }
    runsheet.hidden = !run;
    if (!run) return;
    runsheet.innerHTML = `<h4>Shops run</h4><p>${longDate(run.date)} · ${shopsText(run.stops.length)} · ${clock(run.start)}–${clock(run.end)}</p><ol class="stops" aria-label="Stops on the Shops run, in order">${stopsList(run)}</ol>`;
    if (scroll) runsheet.scrollIntoView({ block: 'nearest' });
  }

  // ---- Day view (phones) ----

  const weekStart = () => addDays(sched.gridStart, week * 7);

  function renderStrip(): void {
    const wk = weekStart();
    strip.innerHTML = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(wk, i);
      // The app counts each of a run's stops as a visit.
      const n = itemsOn(dateKey(d)).reduce((sum, it) => sum + (it.kind === 'run' ? it.stops.length : 1), 0);
      return `<button type="button" data-i="${i}"${n ? ' class="work"' : ''}${i === pick ? ' aria-current="date"' : ''} aria-label="${longDate(d)}, ${n} ${n === 1 ? 'visit' : 'visits'}"><span class="wd" aria-hidden="true">${weekdayShort(d)}</span><b aria-hidden="true">${d.getDate()}</b><i aria-hidden="true"></i></button>`;
    }).join('');
    wkLabel.textContent = `${weekdayDate(wk)} – ${weekdayDate(addDays(wk, 6))}`;
    wkPrev.disabled = week === 0;
    wkNext.disabled = week === sched.weeks - 1;
  }

  function visitCard(v: VisitItem): string {
    return `<div class="vc"><div class="top"><span class="time">${clock(v.start)}</span><span class="dur">${lengthText(v.length)}</span></div><span class="who">${v.who}</span><span class="where">${v.where}</span><span class="badge ${v.status.id}">${v.status.label}</span><span class="crew">${v.crew}</span></div>`;
  }

  function runCard(run: RunItem): string {
    const key = dateKey(run.date);
    const open = openCards.has(key);
    const n = run.stops.length;
    return `<div class="rb" data-run="${key}"><button type="button" class="rb-head" aria-expanded="${open}" aria-controls="stops-${key}"><span class="top"><span class="name">${REPEAT}Shops run</span>${CHEVRON}</span><span class="meta">${shopsText(n)} · ${clock(run.start)}–${clock(run.end)}</span><span class="meta">${run.done ? n : 0} of ${n} done</span><span class="crew">${run.crew}</span></button><ol class="stops" id="stops-${key}" aria-label="Stops on the Shops run, in order"${open ? '' : ' hidden'}>${stopsList(run)}</ol></div>`;
  }

  function renderDay(): void {
    const d = addDays(weekStart(), pick);
    const cards = itemsOn(dateKey(d)).map((it) => (it.kind === 'run' ? runCard(it) : visitCard(it))).join('');
    dayview.innerHTML = `<h4>${longDate(d)}</h4>${cards || '<p class="empty">No visits on this day.</p>'}`;
  }

  function renderAll(): void {
    renderMonth();
    renderStrip();
    renderDay();
    summary.textContent = summaryText(sched);
  }

  function rebuild(): void {
    sched = buildSchedule(today, read());
    renderAll();
  }

  // ---- Events ----

  // A button that has just become disabled can't keep focus, so hand it to its partner.
  function step(button: HTMLButtonElement, partner: HTMLButtonElement): void {
    if (button.disabled) partner.focus();
  }

  grid.addEventListener('click', (e) => {
    const chip = (e.target as Element).closest<HTMLElement>('.chip-r');
    if (!chip) return;
    openRun = openRun === chip.dataset.day ? null : chip.dataset.day!;
    renderRunSheet(true);
  });
  dayview.addEventListener('click', (e) => {
    const head = (e.target as Element).closest<HTMLElement>('.rb-head');
    if (!head) return;
    const card = head.closest<HTMLElement>('.rb')!;
    const key = card.dataset.run!;
    const open = !openCards.has(key);
    if (open) openCards.add(key);
    else openCards.delete(key);
    head.setAttribute('aria-expanded', String(open));
    card.querySelector<HTMLElement>('.stops')!.hidden = !open;
  });
  strip.addEventListener('click', (e) => {
    const button = (e.target as Element).closest<HTMLElement>('button[data-i]');
    if (!button) return;
    pick = Number(button.dataset.i);
    for (const b of strip.querySelectorAll<HTMLElement>('button[data-i]')) {
      if (b === button) b.setAttribute('aria-current', 'date');
      else b.removeAttribute('aria-current');
    }
    renderDay();
  });
  moPrev.addEventListener('click', () => {
    month = Math.max(0, month - 1);
    openRun = null;
    renderMonth();
    step(moPrev, moNext);
  });
  moNext.addEventListener('click', () => {
    month = Math.min(MONTHS - 1, month + 1);
    openRun = null;
    renderMonth();
    step(moNext, moPrev);
  });
  wkPrev.addEventListener('click', () => {
    week = Math.max(0, week - 1);
    renderStrip();
    renderDay();
    step(wkPrev, wkNext);
  });
  wkNext.addEventListener('click', () => {
    week = Math.min(sched.weeks - 1, week + 1);
    renderStrip();
    renderDay();
    step(wkNext, wkPrev);
  });
  joSelect.addEventListener('change', rebuild);
  for (const s of shopSelects) s.el.addEventListener('change', rebuild);

  renderAll();
  // The demo shows only now that it has today's date. Live regions carry aria-live only from here,
  // so filling them in for the first time isn't announced.
  demo.hidden = false;
  panel.querySelector('[data-needs-js]')?.remove();
  for (const live of panel.querySelectorAll('[data-live]')) live.setAttribute('aria-live', 'polite');
}
