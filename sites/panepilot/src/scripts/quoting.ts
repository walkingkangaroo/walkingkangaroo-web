// The Quoting demo (KAN-940): a simplified copy of the app's quote line editor. Loaded by tabs.ts
// the first time its tab is shown, which is on page load because Quoting is the first tab.
//
// The top of this file is plain functions with no DOM access. Quoting.astro imports them at build
// time to write the no-JavaScript starting state, so the page and the script cannot disagree about
// the money. Only init() touches the page.

/** The price book (decision 0039): Grant's example prices, in cents. Standard sits above Large. */
export const BOOK = {
  standard: { name: 'Standard pane', eachCents: 750 },
  large: { name: 'Large pane', eachCents: 1000 },
} as const;

export type Kind = keyof typeof BOOK;
export const KINDS: readonly Kind[] = ['standard', 'large'];

/** The one surcharge chip, "Ladder +50%" (decision 0039). */
export const LADDER_PERCENT = 50;
export const LADDER_LABEL = `Ladder +${LADDER_PERCENT}%`;

/** What is already quoted with JavaScript off. The script resets it to nothing quoted. */
export const START = {
  standard: { count: 6, ladder: true },
  large: { count: 4, ladder: false },
} as const;

/** Whole dollars and cents, as the app writes them: $1,234.50. */
export function money(cents: number): string {
  const dollars = Math.floor(cents / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${dollars}.${String(cents % 100).padStart(2, '0')}`;
}

/** Each as the input shows it: 7.50 */
export function eachText(cents: number): string {
  return money(cents).slice(1).replace(/,/g, '');
}

/** Count: a whole number, 0 to 999. Anything else is null. */
export function parseCount(text: string): number | null {
  const t = text.trim();
  return /^\d{1,3}$/.test(t) ? Number(t) : null;
}

/** Each: dollars with up to two decimal places, in cents. Anything else is null. */
export function parseEach(text: string): number | null {
  const m = /^(\d{1,4})(?:\.(\d{1,2}))?$/.exec(text.trim());
  if (!m) return null;
  return Number(m[1]) * 100 + Number((m[2] ?? '').padEnd(2, '0'));
}

/**
 * A line's money in integer cents. It copies the app's arithmetic (percentSteps in its
 * lib/pricing/surcharges.ts), in the same order: the unit price with the surcharge is worked out
 * in floating point and rounded to the cent first, then multiplied by the count. So 6 at $7.50
 * with Ladder +50% is 6 x $11.25 = $67.50.
 */
export function lineMoney(count: number, eachCents: number, ladder: boolean) {
  const base = eachCents / 100;
  const unit = ladder ? Math.round((base + (base * LADDER_PERCENT) / 100) * 100) : eachCents;
  return { total: unit * count, surcharge: (unit - eachCents) * count };
}

/** One kind's part of the sentence under the drawing. */
export function countedPhrase(kind: Kind, counted: number, of: number): string {
  if (counted <= 0) return `no ${kind} panes`;
  if (counted >= of) return of === 2 ? `both ${kind} panes` : `all ${of} ${kind} panes`;
  return `${counted} of its ${of} ${kind} ${of === 1 ? 'pane' : 'panes'}`;
}

/** The sentence under the drawing, "Counted on the shop: 6 of its 8 standard panes and all 4 large panes." */
export function countedSentence(counted: Record<Kind, number>, of: Record<Kind, number>): string {
  return `Counted on the shop: ${countedPhrase('standard', counted.standard, of.standard)} and ${countedPhrase('large', counted.large, of.large)}.`;
}

/** Wire up the Quoting panel. Called once by tabs.ts with the panel element. */
export function init(panel: HTMLElement): void {
  const must = <T extends Element>(selector: string): T => {
    const el = panel.querySelector<T>(selector);
    if (!el) throw new Error(`Quoting demo: ${selector} is missing`);
    return el;
  };
  const list = must<HTMLUListElement>('[data-lines]');
  const empty = must<HTMLElement>('[data-empty]');
  const addGroup = must<HTMLElement>('[data-add-group]');
  const totalOut = must<HTMLElement>('[data-total]');
  const countedOut = must<HTMLElement>('[data-counted]');
  const ladderArt = must<SVGGElement>('[data-ladder]');
  const addButtons = new Map<Kind, HTMLButtonElement>();
  const panes = {} as Record<Kind, SVGGElement[]>;
  for (const kind of KINDS) {
    addButtons.set(kind, must<HTMLButtonElement>(`[data-add="${kind}"]`));
    panes[kind] = [...panel.querySelectorAll<SVGGElement>(`.p[data-kind="${kind}"]`)];
  }

  // The no-JavaScript lines are the one source of the line markup: take them off the page, and put
  // each back (at its defaults) when its price book button is pressed.
  const lineFor = new Map<Kind, HTMLLIElement>();
  for (const li of list.querySelectorAll<HTMLLIElement>('.line')) {
    lineFor.set(li.dataset.kind as Kind, li);
    li.remove();
  }

  const lineOf = (kind: Kind) => list.querySelector<HTMLLIElement>(`.line[data-kind="${kind}"]`);
  const field = (li: HTMLElement, selector: string) => li.querySelector<HTMLInputElement>(selector)!;

  function render(): void {
    let total = 0;
    let valid = true;
    let ladderOn = false;
    const counted: Record<Kind, number> = { standard: 0, large: 0 };

    for (const li of list.querySelectorAll<HTMLLIElement>('.line')) {
      const kind = li.dataset.kind as Kind;
      const count = parseCount(field(li, '.count').value);
      const each = parseEach(field(li, '.each').value);
      const ladder = li.querySelector('.chip')!.getAttribute('aria-pressed') === 'true';
      const includes = li.querySelector<HTMLElement>('.includes')!;
      const out = li.querySelector<HTMLElement>('.line-total')!;

      if (count === null || each === null) {
        out.textContent = '—';
        includes.textContent = '';
        valid = false;
        continue;
      }
      const amount = lineMoney(count, each, ladder);
      total += amount.total;
      out.textContent = money(amount.total);
      includes.textContent = ladder && count > 0 ? `Includes ${LADDER_LABEL} · ${money(amount.surcharge)}.` : '';
      if (ladder && count > 0) ladderOn = true;
      counted[kind] = count;
    }

    for (const kind of KINDS) {
      panes[kind].forEach((pane, i) => pane.classList.toggle('lit', i < counted[kind]));
      addButtons.get(kind)!.hidden = lineOf(kind) !== null;
    }
    addGroup.hidden = KINDS.every((kind) => lineOf(kind) !== null);
    empty.hidden = list.children.length > 0;
    totalOut.textContent = valid ? money(total) : '—';
    ladderArt.classList.toggle('on', ladderOn);
    countedOut.textContent = countedSentence(counted, {
      standard: panes.standard.length,
      large: panes.large.length,
    });
  }

  function add(kind: Kind): void {
    if (lineOf(kind)) return;
    const li = lineFor.get(kind)!;
    field(li, '.count').value = '1';
    field(li, '.each').value = eachText(BOOK[kind].eachCents);
    li.querySelector('.chip')!.setAttribute('aria-pressed', 'false');
    // Keep the price book's order: Standard above Large.
    const after = KINDS.slice(KINDS.indexOf(kind) + 1).map(lineOf).find((el) => el !== null);
    list.insertBefore(li, after ?? null);
    render();
    const count = field(li, '.count');
    count.focus();
    count.select();
  }

  for (const kind of KINDS) addButtons.get(kind)!.addEventListener('click', () => add(kind));

  list.addEventListener('input', (e) => {
    if ((e.target as Element).matches('input')) render();
  });
  list.addEventListener('click', (e) => {
    const target = e.target as Element;
    const chip = target.closest('.chip');
    if (chip) {
      chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      render();
      return;
    }
    const remove = target.closest('.remove');
    if (remove) {
      const kind = remove.closest<HTMLElement>('.line')!.dataset.kind as Kind;
      lineOf(kind)!.remove();
      render();
      addButtons.get(kind)!.focus();
    }
  });

  render();
  // The page loaded with these two already written; from here on a change is read out. They carry
  // aria-live only now, so the reset on load isn't announced.
  for (const live of panel.querySelectorAll('[data-live]')) live.setAttribute('aria-live', 'polite');
}
