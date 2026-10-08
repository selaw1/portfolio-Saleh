import { marked } from 'marked';
import { blogCategories, type BlogCategory } from '../data/blogCategories';

// Blog posts are Markdown files in src/content/blog. The file name is the post's
// address: texas-sales-tax.md is published at /blog/texas-sales-tax/.
// Each file starts with a front matter block:
//
// ---
// title: Post title, shown on the page and in Google
// description: One or two sentences for Google results and link previews
// date: 2026-10-08
// category: bookkeeping   (a slug from src/data/blogCategories.ts)
// ---

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
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
  for (const key of ['title', 'description', 'date', 'category']) {
    if (!meta[key]) throw new Error(`blog: ${slug}.md needs a "${key}:" line in its front matter`);
  }

  const category = blogCategories.find((c) => c.slug === meta.category);
  if (!category) {
    const slugs = blogCategories.map((c) => c.slug).join(', ');
    throw new Error(`blog: ${slug}.md has category "${meta.category}"; use one of: ${slugs}`);
  }

  const body = match[2];
  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    updated: meta.updated,
    category,
    html: marked.parse(body, { async: false }),
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
  };
}

// Newest first
export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

// Posts grouped by category, in category order, leaving out empty categories
export const postsByCategory = blogCategories
  .map((category) => ({ category, posts: posts.filter((p) => p.category.slug === category.slug) }))
  .filter((group) => group.posts.length > 0);

// Other posts to suggest under a post: same category first, then the newest of the rest
export function relatedPosts(post: Post, count = 2): Post[] {
  const others = posts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category.slug === post.category.slug);
  return [...sameCategory, ...others.filter((p) => p.category.slug !== post.category.slug)].slice(0, count);
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
