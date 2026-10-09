import { readFileSync } from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import type { Plugin } from 'vite';

// Blog posts are converted from Markdown at build time, so visitors never download the
// Markdown parser or the text of posts they aren't reading. src/lib/blog.ts imports each
// post twice: `post.md?meta` (front matter and reading time, for lists and every page)
// and `post.md?html` (the article body, loaded only on that post's page).

// Links to other sites (sources, references) open in a new tab so readers keep the article open
marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : '';
      if (/^https?:\/\//.test(href)) {
        return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
      return `<a href="${href}"${titleAttr}>${text}</a>`;
    },
  },
});

function splitPost(file: string, raw: string) {
  const slug = path.basename(file, '.md');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`blog: ${slug}.md is missing its --- front matter block`);

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const key of ['title', 'description', 'date', 'category']) {
    if (!meta[key]) throw new Error(`blog: ${slug}.md needs a "${key}:" line in its front matter`);
  }
  return { meta, body: match[2] };
}

export default function blogMarkdown(): Plugin {
  return {
    name: 'blog-markdown',
    enforce: 'pre',
    load(id) {
      const match = id.match(/^(.+\.md)\?(meta|html)$/);
      if (!match) return;
      const [, file, part] = match;
      this.addWatchFile(file);
      const { meta, body } = splitPost(file, readFileSync(file, 'utf8'));
      const value =
        part === 'meta'
          ? {
              title: meta.title,
              description: meta.description,
              date: meta.date,
              updated: meta.updated,
              category: meta.category,
              readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
            }
          : marked.parse(body, { async: false });
      return `export default ${JSON.stringify(value)};`;
    },
  };
}
