export interface SiteInfo {
  /** The "Hi, I'm Grant." paragraph. Null leaves it out. */
  bio: string | null;
  /** The home page's Rust wall (0049): its `h1`, then the one sentence under it. Claude's drafts, for Grant to rewrite (0014). */
  wall: { line: string; sub: string };
  links: { label: string; href: string }[];
}

export const site: SiteInfo = {
  bio: "I make games and apps as Walking Kangaroo.",
  wall: {
    line: 'I make games and apps.',
    sub: 'The first one to go live is PanePilot, an app for window cleaners. More exciting projects are underway.',
  },
  links: [],
};
