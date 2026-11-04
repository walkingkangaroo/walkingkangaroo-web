// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from the domain root (decision 0040), so no `base`.
export default defineConfig({
  site: 'https://panepilot.au',
  output: 'static',
  integrations: [sitemap()],
});
