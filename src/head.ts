import { SITE_URL } from './data/site';
import type { Head } from './routes';
import { ogImagePath } from './lib/og';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Builds the per-page <head> tags written into each prerendered HTML file
export function renderHead(head: Head) {
  const url = `${SITE_URL}${head.path}`;
  const title = escape(head.title);
  const description = escape(head.description);
  // Pages with a card get their own generated preview image; the rest share the site image
  const image = `${SITE_URL}${head.card ? ogImagePath(head.path) : '/og-image.png'}`;
  const imageAlt = escape(head.card ? head.card.title : 'Saleh Ahmad: Your books, finally in order.');
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    head.noindex
      ? '<meta name="robots" content="noindex" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    head.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${head.type ?? 'website'}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    ...(head.jsonLd ?? []).map(
      (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
    ),
  ];
  return tags.filter(Boolean).join('\n    ');
}
