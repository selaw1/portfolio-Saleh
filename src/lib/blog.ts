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
//
// plugins/blogMarkdown.ts turns each file into its details (?meta) and its HTML (?html) at build time.

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  readingMinutes: number;
};

type PostMeta = Omit<Post, 'slug' | 'category'> & { category: string };

const metas = import.meta.glob<PostMeta>('../content/blog/*.md', { query: '?meta', import: 'default', eager: true });
// Each post's HTML is its own small file, fetched only where it is shown
const bodies = import.meta.glob<string>('../content/blog/*.md', { query: '?html', import: 'default' });

function toPost(path: string, meta: PostMeta): Post {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const category = blogCategories.find((c) => c.slug === meta.category);
  if (!category) {
    const slugs = blogCategories.map((c) => c.slug).join(', ');
    throw new Error(`blog: ${slug}.md has category "${meta.category}"; use one of: ${slugs}`);
  }
  return { ...meta, slug, category };
}

// Newest first
export const posts: Post[] = Object.entries(metas)
  .map(([path, meta]) => toPost(path, meta))
  .sort((a, b) => b.date.localeCompare(a.date));

const loadedHtml: Record<string, string> = {};

// Loads a post's article HTML; main.tsx waits for it before hydrating a post page,
// and scripts/prerender.mjs loads them all before writing pages
export async function loadPostHtml(slug: string) {
  const load = bodies[`../content/blog/${slug}.md`];
  if (load && !(slug in loadedHtml)) loadedHtml[slug] = await load();
}

export const loadAllPostHtml = () => Promise.all(posts.map((p) => loadPostHtml(p.slug)));

export const postHtml = (slug: string) => loadedHtml[slug] ?? '';

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
