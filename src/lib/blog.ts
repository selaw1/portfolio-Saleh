import { marked } from 'marked';

// Blog posts are Markdown files in src/content/blog. The file name is the post's
// address: texas-sales-tax.md is published at /blog/texas-sales-tax/.
// Each file starts with a front matter block:
//
// ---
// title: Post title, shown on the page and in Google
// description: One or two sentences for Google results and link previews
// date: 2026-10-08
// ---

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  html: string;
  readingMinutes: number;
};

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

function parse(path: string, raw: string): Post {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`blog: ${slug}.md is missing its --- front matter block`);

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  for (const key of ['title', 'description', 'date']) {
    if (!meta[key]) throw new Error(`blog: ${slug}.md needs a "${key}:" line in its front matter`);
  }

  const body = match[2];
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    updated: meta.updated,
    html: marked.parse(body, { async: false }),
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
  };
}

// Newest first
export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
