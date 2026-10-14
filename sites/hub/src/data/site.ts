export interface SiteInfo {
  /** The "Hi, I'm Grant." paragraph. Null leaves it out. */
  bio: string | null;
  links: { label: string; href: string }[];
}

export const site: SiteInfo = {
  bio: "I make games and apps as Walking Kangaroo. There are four games and one app on the go, and none of them are out yet. This site shows how far along each one is, and there's a devlog too.",
  links: [],
};
