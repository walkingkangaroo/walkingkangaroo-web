import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'devlog'>;

/** Index 0 is stage 1. A project's `stage` field is 1 to 5. */
export const STAGE_NAMES = ['Idea', 'Prototype', 'Alpha', 'Beta', 'Launch'] as const;
export const STAGE_COUNT = STAGE_NAMES.length;

/** The name of stage `n` (1 to 5). */
export function stageName(n: number): string {
  const name = STAGE_NAMES[n - 1];
  if (!name) throw new Error(`stageName: stage must be an integer from 1 to ${STAGE_COUNT}, got ${n}.`);
  return name;
}

/**
 * Every project, sorted by `order`. This is also where the "exactly one featured project" rule is
 * enforced: every page that lists projects goes through here, so the build fails with the names.
 */
export async function getProjects(): Promise<Project[]> {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const featured = projects.filter((p) => p.data.featured);
  if (featured.length !== 1) {
    const found = featured.length
      ? `${featured.length} are: ${featured.map((p) => `"${p.data.name}" (${p.id}.md)`).join(', ')}`
      : 'none is';
    throw new Error(
      `Exactly one project must have "featured: true" in src/content/projects/, but ${found}. ` +
        'Set featured: true on one project and remove it from the rest.',
    );
  }
  return projects;
}

export async function getFeaturedProject(): Promise<Project> {
  const projects = await getProjects();
  return projects.find((p) => p.data.featured)!;
}

/**
 * Devlog posts, newest first. Drafts are left out when building for production and shown in dev.
 * `project` may be a project entry or a project id (its file name without `.md`).
 */
export async function getPublishedPosts(project?: Project | string): Promise<Post[]> {
  const projectId = typeof project === 'string' ? project : project?.id;
  const posts = await getCollection('devlog', ({ data }) => !(import.meta.env.PROD && data.draft));
  return posts
    .filter((post) => projectId === undefined || post.data.project?.id === projectId)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
