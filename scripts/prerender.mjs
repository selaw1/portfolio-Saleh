// Writes each page's rendered HTML (dist/index.html, dist/blog/index.html,
// dist/blog/<post>/index.html, dist/404.html) so search engines and link previews
// get the full content without running JavaScript. Also writes sitemap.xml.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

import { writeOgImages } from './og.mjs';

const { render, routes, posts, loadAllPostHtml, SITE_URL, ogImagePath, servicePages, contact, credentials } = await import('../dist-server/entry-server.js');
await loadAllPostHtml();

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

// List every blog post in llms.txt, so AI assistants can find the articles
const llms = new URL('llms.txt', dist);
const llmsText = await readFile(llms, 'utf8');
if (!llmsText.includes('<!--blog-posts-->')) throw new Error('prerender: <!--blog-posts--> not found in llms.txt');
const postList = posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/): ${p.description}`).join('\n');
await writeFile(llms, llmsText.replace('<!--blog-posts-->', postList));

// Machine-readable files for AI assistants (/ai/*.json, /.well-known/ai.txt).
// Everything here comes from content already on the site; nothing new is stated.
// The business name, the same one used in the site's structured data (index.html); change both together.
const NAME = 'AlSelawi Financial Services';
const homeDescription = render('/').head.match(/<meta name="description" content="([^"]*)"/)[1].replace(/&amp;/g, '&');
const json = (data) => `${JSON.stringify(data, null, 2)}\n`;
await mkdir(new URL('ai/', dist), { recursive: true });
await mkdir(new URL('.well-known/', dist), { recursive: true });
await writeFile(
  new URL('ai/summary.json', dist),
  json({
    name: NAME,
    description: homeDescription,
    url: `${SITE_URL}/`,
    location: contact.base,
    contact: { email: contact.email, phone: contact.phone, linkedin: contact.linkedin },
    credentials,
    services: servicePages.map((s) => ({ name: s.name, url: `${SITE_URL}/${s.slug}/` })),
    blog: `${SITE_URL}/blog/`,
    llms: `${SITE_URL}/llms.txt`,
    lastModified: today,
  })
);
await writeFile(
  new URL('ai/faq.json', dist),
  json({
    name: NAME,
    faqs: servicePages.flatMap((s) =>
      s.faqs.map((f) => ({ question: f.q, answer: f.a, service: s.name, url: `${SITE_URL}/${s.slug}/` }))
    ),
  })
);
await writeFile(
  new URL('ai/service.json', dist),
  json({
    name: NAME,
    description: homeDescription,
    url: `${SITE_URL}/`,
    capabilities: servicePages.map((s) => ({
      name: s.name,
      description: s.description,
      url: `${SITE_URL}/${s.slug}/`,
    })),
  })
);
await writeFile(
  new URL('.well-known/ai.txt', dist),
  `# ${NAME}
# ${SITE_URL}/
# AI crawlers are welcome to read and cite this site.

User-agent: *
Allow: /

Summary: ${SITE_URL}/ai/summary.json
FAQ: ${SITE_URL}/ai/faq.json
Services: ${SITE_URL}/ai/service.json
LLMs: ${SITE_URL}/llms.txt
Sitemap: ${SITE_URL}/sitemap.xml
`
);

// RSS feed of the blog, linked from every page's <head>
const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rfc822 = (d) => new Date(`${d}T00:00:00Z`).toUTCString();
const items = posts
  .map(
    (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}/</guid>
      <description>${xml(p.description)}</description>
      <category>${xml(p.category.name)}</category>
      <pubDate>${rfc822(p.date)}</pubDate>
    </item>`
  )
  .join('\n');
await writeFile(
  new URL('blog/rss.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(NAME)} Blog</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${xml(render('/blog/').head.match(/<meta name="description" content="([^"]*)"/)[1].replace(/&amp;/g, '&'))}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
);

const ogCount = await writeOgImages(routes, dist, ogImagePath);

await rm(new URL('../dist-server', import.meta.url), { recursive: true, force: true });

console.log(`prerender: wrote ${routes.length} pages, 404.html, sitemap.xml, llms.txt, rss.xml, /ai files and ${ogCount} preview images`);
