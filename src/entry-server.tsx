/* eslint-disable react-refresh/only-export-components -- build-time entry for scripts/prerender.mjs, never hot-reloaded */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { renderHead } from './head';
import { notFound, pages } from './routes';

export { SITE_URL } from './data/site';
export { posts } from './lib/blog';
export { ogImagePath } from './lib/og';

// Every address the site publishes; scripts/prerender.mjs writes one HTML file for each
export const routes = pages.map((page) => ({ path: page.head.path, lastModified: page.head.lastModified, card: page.head.card }));

// Used at build time by scripts/prerender.mjs to write each page's HTML
export function render(path: string) {
  const page = pages.find((p) => p.head.path === path) ?? notFound;
  return {
    head: renderHead(page.head),
    html: renderToString(
      <StrictMode>
        <App path={path} />
      </StrictMode>
    ),
  };
}
