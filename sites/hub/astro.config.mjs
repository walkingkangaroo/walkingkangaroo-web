// @ts-check
import { defineConfig } from 'astro/config';

// Served from the domain root (decision 0011), so no `base`.
export default defineConfig({
  site: 'https://walkingkangaroo.com',
  output: 'static',
  // Code blocks in posts use the brand colours from src/styles/prose.css, not a highlighter theme.
  markdown: { syntaxHighlight: false },
});
