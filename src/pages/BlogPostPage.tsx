import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import { formatDate, posts, type Post } from '../lib/blog';

export default function BlogPostPage({ post }: { post: Post }) {
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <PageHeader
        eyebrow={
          <nav aria-label="Breadcrumb">
            <a href="/blog" className="link-draw hover:text-porcelain">
              Blog
            </a>
          </nav>
        }
        title={post.title}
      >
        <p className="mt-8 text-[15px] text-porcelain/60">
          By Saleh Ahmad · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
      </PageHeader>

      <div className="wrap py-16 md:py-24">
        <div className="post-body mx-auto max-w-[68ch]" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="mx-auto mt-16 max-w-[68ch] rounded-[24px] bg-deep p-8 text-porcelain sm:p-10">
          <p className="text-2xl font-medium tracking-tight">Want this handled for you?</p>
          <p className="mt-3 text-[15px] leading-relaxed text-porcelain/70">
            I keep the books, run payroll and prepare taxes for businesses in Texas, across the US and abroad, all
            online. A short call is the easiest way to start.
          </p>
          <a href="/#book" className="pill-light mt-8">
            Book a call
          </a>
        </aside>
      </div>

      {more.length > 0 && (
        <section className="border-t border-ink/10 bg-mist/60">
          <div className="wrap py-20 md:py-28">
            <h2 className="text-3xl font-medium tracking-tight">More articles</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {more.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
