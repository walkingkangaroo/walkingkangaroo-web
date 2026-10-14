import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** One file per project (decision 0002). The Markdown body is the longer description. */
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      type: z.enum(['Game', 'App']),
      /** 1 Idea, 2 Prototype, 3 Alpha, 4 Beta, 5 Launch. */
      stage: z.number().int().min(1).max(5),
      oneLiner: z.string(),
      platforms: z.array(z.string()),
      /** Exactly one project is featured; `getProjects()` fails the build otherwise. */
      featured: z.boolean().default(false),
      order: z.number(),
      cover: image().optional(),
      /** Path to a video under `public/`, for example `/clips/common-ground.mp4`. */
      clip: z.string().optional(),
      workingOn: z.array(z.string()).optional(),
      target: z.string().optional(),
    }),
});

const devlog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/devlog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      project: reference('projects').optional(),
      summary: z.string(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, devlog };
