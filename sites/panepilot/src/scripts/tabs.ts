// The tabs for "Try each step of the round" (the ARIA tabs pattern), and the loader for each demo.
//
// Without JavaScript the tablist is hidden and every panel shows in turn. This script reveals the
// tablist, hides every panel but the chosen one, and calls a panel's loader the first time that
// panel is shown. A tab's `data-script` names its demo's script; the loader for it imports that
// script, which exports init(panel).

export interface Demo {
  init: (panel: HTMLElement) => void;
}

/** The demo scripts' loaders, keyed by path, as import.meta.glob returns them. */
export type Loaders = Record<string, () => Promise<Demo>>;

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]';

export function initTabs(loaders: Loaders): void {
  const root = document.querySelector<HTMLElement>('[data-tabs]');
  if (!root) return;
  const tablist = root.querySelector<HTMLElement>('[role="tablist"]')!;
  const tabs = [...tablist.querySelectorAll<HTMLElement>('[role="tab"]')];
  const panelOf = (tab: HTMLElement) => document.getElementById(tab.getAttribute('aria-controls')!)!;
  const started = new Set<string>();

  function start(tab: HTMLElement): void {
    const id = tab.dataset.tab!;
    const name = tab.dataset.script;
    const path = name && Object.keys(loaders).find((key) => key.endsWith(`/${name}.ts`));
    const load = path ? loaders[path] : undefined;
    if (!load || started.has(id)) return;
    started.add(id);
    // If the script fails to load, the panel keeps its server-written starting state and the
    // next time the tab is opened it tries again.
    load()
      .then((demo) => demo.init(panelOf(tab)))
      .catch(() => started.delete(id));
  }

  function show(chosen: HTMLElement): void {
    for (const tab of tabs) {
      const on = tab === chosen;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      panelOf(tab).hidden = !on;
    }
    start(chosen);
  }

  tablist.hidden = false;
  // The panels carry no tab roles in the page, so without this script nothing says "tab panel".
  for (const tab of tabs) {
    const panel = panelOf(tab);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
  }
  // A panel with nothing to tab to in it is itself a stop, so a keyboard user can reach its text.
  for (const tab of tabs) {
    const panel = panelOf(tab);
    if (!panel.querySelector(FOCUSABLE)) panel.tabIndex = 0;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => show(tab));
    tab.addEventListener('keydown', (e) => {
      // Leave the browser's own shortcuts alone, such as Alt+Left for Back.
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      let next: number;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      const target = tabs[next];
      show(target);
      target.focus();
      target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  });

  show(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? tabs[0]);
}
