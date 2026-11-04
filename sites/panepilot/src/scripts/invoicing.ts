// The Invoicing demo (KAN-943): a copy of the app's invoice screen. The visitor chooses what the
// customer sees on each line, emails the draft, and records the payment. Loaded by tabs.ts the first
// time its tab is shown.
//
// The top of this file is plain functions with no DOM access, so node can import it and check the
// words headlessly, and Invoicing.astro imports them at build time so the no-JavaScript card and the
// script cannot disagree. Only init() touches the page. The wording copies the app's invoice screen
// (payments-card.tsx, line-details.ts and primary-action.ts in PanePilot).
import { money } from './quoting';
import { addDays, noonOf, weekdayDate } from './scheduling';

// ---- The words and numbers ------------------------------------------------------------------------

export const INVOICE = 'INV-1043';
export const CUSTOMER = 'Example Bakery, 1 Example St, Clare';
export const EMAIL_TO = 'accounts@example.com';

/** Days from sending to the due date. */
export const DUE_DAYS = 7;

/** The invoice's lines, from the Quoting demo's example prices. Amounts are in cents. */
export const LINES = [
  { name: 'Standard pane', totalCents: 13500, count: 12, eachCents: 750, surcharge: 'Includes Ladder +50%' },
  { name: 'Large pane', totalCents: 4000, count: 4, eachCents: 1000, surcharge: null },
] as const;

export type Line = (typeof LINES)[number];

/** The total owed, which is also the one payment the demo records. */
export const TOTAL_CENTS = LINES.reduce((sum, line) => sum + line.totalCents, 0);

/** The amount field shows it without the dollar sign, as the app's input does. */
export const AMOUNT_TEXT = money(TOTAL_CENTS).slice(1);

export const NOTICE_DRAFT = `Job completed. Draft invoice ${INVOICE} is ready to review.`;
export const NOTICE_SENT = `Emailed to ${EMAIL_TO}.`;
export const GST_TEXT = 'No GST. This business is not registered for GST, so none is charged.';

export const SWITCHES_HEADING = 'What customers see on each line';
export const SWITCHES_ALWAYS = "The description and the line's total always show.";
export const SWITCHES_SCOPE = 'Set once for the business. A customer can have their own.';
/** DRAFT for Grant to rewrite. Shown under the switches once the invoice has gone out. */
export const SWITCHES_LOCKED = 'Sent invoices keep the details they were sent with.';

/** The three line details, in the order the app lists them, with the app's labels. */
export const DETAILS = [
  { key: 'quantity', label: 'Pane count' },
  { key: 'unitRate', label: 'Price each' },
  { key: 'surcharges', label: 'Surcharge note' },
] as const;

export type DetailKey = (typeof DETAILS)[number]['key'];
export type Details = Record<DetailKey, boolean>;

/** Every switch on: how the business starts, and where Start again puts them back. */
export const DETAILS_ALL_ON: Details = { quantity: true, unitRate: true, surcharges: true };

/** The invoice's stage. The app has more, but these are the three this demo walks through. */
export type Stage = 'draft' | 'sent' | 'paid';

/** The app's invoice badges. */
export function badgeFor(stage: Stage): { label: string; kind: Stage } {
  if (stage === 'draft') return { label: 'Draft', kind: 'draft' };
  if (stage === 'sent') return { label: 'Sent', kind: 'sent' };
  return { label: 'Paid', kind: 'paid' };
}

/** The ways to pay that the app offers, with the word a screen reader hears after "by". */
export const METHODS = [
  { value: 'bank', label: 'Bank transfer', spoken: 'bank transfer' },
  { value: 'cash', label: 'Cash', spoken: 'cash' },
] as const;

export type Method = (typeof METHODS)[number]['value'];

const methodOf = (value: Method) => METHODS.find((m) => m.value === value) ?? METHODS[0];

/** One part of a line's details, or null when the line has no such part. */
export function partText(line: Line, key: DetailKey): string | null {
  if (key === 'quantity') return `× ${line.count}`;
  if (key === 'unitRate') return `${money(line.eachCents)} each`;
  return line.surcharge;
}

/** The green notice at the top of the card: the job's, then the email's, and none once it is paid. */
export function noticeFor(stage: Stage): string {
  if (stage === 'draft') return NOTICE_DRAFT;
  return stage === 'sent' ? NOTICE_SENT : '';
}

/**
 * The app's Dates list: Issued and Due. A draft is dated when it goes out, so it says "The day it is
 * sent" and "7 days after" (invoices/[id]/page.tsx). Once sent they are the days, as "Fri 16 Oct".
 */
export function issuedText(stage: Stage, sentOn: Date): string {
  return stage === 'draft' ? 'The day it is sent' : weekdayDate(sentOn);
}

export function dueDateText(stage: Stage, sentOn: Date): string {
  return stage === 'draft' ? `${DUE_DAYS} days after` : weekdayDate(addDays(sentOn, DUE_DAYS));
}

/** The payment row's left side: "Fri 16 Oct · Cash". */
export const paymentRowText = (method: Method, paidOn: Date): string =>
  `${weekdayDate(paidOn)} · ${methodOf(method).label}`;

/** What a screen reader is told after each change. Screen-reader text, not the app's words. */
export function spokenText(stage: Stage, method: Method): string {
  if (stage === 'sent') return `Sent. ${NOTICE_SENT}`;
  if (stage === 'paid') return `Paid. ${money(TOTAL_CENTS)} by ${methodOf(method).spoken}.`;
  return 'Back to a draft.';
}

// ---- The page -----------------------------------------------------------------------------------

/** Wire up the Invoicing panel. Called once by tabs.ts with the panel element. */
export function init(panel: HTMLElement): void {
  const must = <T extends Element>(selector: string): T => {
    const el = panel.querySelector<T>(selector);
    if (!el) throw new Error(`Invoicing demo: ${selector} is missing`);
    return el;
  };
  const badge = must<HTMLElement>('[data-badge]');
  const flash = must<HTMLElement>('[data-flash]');
  const issued = must<HTMLElement>('[data-issued]');
  const due = must<HTMLElement>('[data-due]');
  const primary = must<HTMLButtonElement>('[data-primary]');
  const reset = must<HTMLButtonElement>('[data-reset]');
  const form = must<HTMLFormElement>('[data-form]');
  const cancel = must<HTMLButtonElement>('[data-cancel]');
  const payments = must<HTMLElement>('[data-payments]');
  const paymentRow = must<HTMLElement>('[data-payment-row]');
  const locked = must<HTMLElement>('[data-locked]');
  const announce = must<HTMLElement>('[data-announce]');
  const switches = [...panel.querySelectorAll<HTMLInputElement>('[data-switch]')];
  const radios = [...panel.querySelectorAll<HTMLInputElement>('input[name="method"]')];
  const lines = [...panel.querySelectorAll<HTMLElement>('[data-line]')];

  // All of the demo's state lives here.
  let stage: Stage = 'draft';
  let paying = false; // the payment form is open
  let method: Method = 'bank';
  let sentOn = noonOf(new Date());
  let paidOn = sentOn;
  const details: Details = { ...DETAILS_ALL_ON };

  const setText = (el: HTMLElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };
  const say = (text: string) => setText(announce, text);
  const checkedMethod = (): Method => (radios.find((r) => r.checked)?.value as Method | undefined) ?? 'bank';

  function render(): void {
    const { label, kind } = badgeFor(stage);
    setText(badge, label);
    badge.className = `badge ${kind}`;

    const notice = noticeFor(stage);
    flash.hidden = notice === '';
    setText(flash, notice);

    setText(issued, issuedText(stage, sentOn));
    setText(due, dueDateText(stage, sentOn));

    // The one filled button: Email invoice on a draft, Record payment while it is owed. It goes while
    // the payment form is open (the form has its own filled button) and for good once the invoice is paid.
    setText(primary, stage === 'draft' ? 'Email invoice' : 'Record payment');
    primary.hidden = stage === 'paid' || paying;
    // Start again goes while the form is open, so a second click on Record payment cannot land on it.
    // The form's Cancel and Record payment are the two ways out.
    reset.hidden = stage === 'draft' || paying;
    form.hidden = !paying;

    payments.hidden = stage !== 'paid';
    setText(paymentRow, paymentRowText(method, paidOn));

    // The invoice fixes its line details when it is sent, so the switches are fixed from then on.
    for (const sw of switches) sw.disabled = stage !== 'draft';
    locked.hidden = stage === 'draft';
    // The sentence describes each disabled switch (as the app does) and only while it applies: a hidden
    // element still counts when something points at it.
    for (const sw of switches) {
      if (stage === 'draft') sw.removeAttribute('aria-describedby');
      else sw.setAttribute('aria-describedby', locked.id);
    }

    // Each part of each line is its own element, so a part comes back in its place. A line whose
    // parts are all off has no details line at all.
    for (const line of lines) {
      const parts = [...line.querySelectorAll<HTMLElement>('[data-part]')];
      for (const part of parts) part.hidden = !details[part.dataset.part as DetailKey];
      const holder = line.querySelector<HTMLElement>('[data-details]');
      if (holder) holder.hidden = parts.every((p) => p.hidden);
    }
  }

  for (const sw of switches) {
    sw.addEventListener('change', () => {
      details[sw.dataset.switch as DetailKey] = sw.checked;
      render();
    });
  }

  primary.addEventListener('click', (event) => {
    // One step per press: a double-click would otherwise send the email and open the form.
    if (event.detail > 1) return;
    if (stage === 'draft') {
      stage = 'sent';
      sentOn = noonOf(new Date());
      render();
      say(spokenText(stage, method));
      // The same button, now reading Record payment, so focus stays where it was.
    } else if (stage === 'sent') {
      paying = true;
      render();
      (radios.find((r) => r.checked) ?? radios[0]).focus(); // Record payment has gone
    }
  });

  cancel.addEventListener('click', () => {
    paying = false;
    form.reset(); // the app drops the sheet and what was chosen in it
    render();
    primary.focus(); // the form has gone; Record payment is back
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    method = checkedMethod();
    paidOn = noonOf(new Date());
    paying = false;
    stage = 'paid';
    render();
    say(spokenText(stage, method));
    reset.focus(); // the form and the filled button have gone
  });

  reset.addEventListener('click', () => {
    stage = 'draft';
    paying = false;
    method = 'bank';
    Object.assign(details, DETAILS_ALL_ON);
    for (const sw of switches) sw.checked = true;
    form.reset();
    render();
    say(spokenText(stage, method));
    primary.focus(); // Start again has gone
  });

  render();
  // The page loaded in its draft state; from here on a change is read out. The announcer carries
  // aria-live only now, so the first render isn't announced.
  for (const live of panel.querySelectorAll('[data-live]')) live.setAttribute('aria-live', 'polite');
}
