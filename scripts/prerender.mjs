// Writes each page's rendered HTML (dist/index.html, dist/blog/index.html,
// dist/blog/<post>/index.html, dist/404.html) so search engines and link previews
// get the full content without running JavaScript. Also writes sitemap.xml.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const { render, routes, SITE_URL } = await import('../dist-server/entry-server.js');

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');

for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);
}

const fill = ({ head, html }) => template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);

for (const { path } of routes) {
  const dir = new URL(`.${path}`, dist);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), fill(render(path)));
}
await writeFile(new URL('404.html', dist), fill(render('/404')));

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map(
    ({ path, lastModified }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastModified ?? today}</lastmod>
  </url>`
  )
  .join('\n');
await writeFile(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);

await rm(new URL('../dist-server', import.meta.url), { recursive: true, force: true });

console.log(`prerender: wrote ${routes.length} pages, 404.html and sitemap.xml`);
