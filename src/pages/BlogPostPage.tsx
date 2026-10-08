import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import { contact } from '../data/content';
import { formatDate, posts, type Post } from '../lib/blog';

export default function BlogPostPage({ post }: { post: Post }) {
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <PageHeader
        eyebrow={
          <nav aria-label="Breadcrumb">
            <a href="/blog/" className="link-draw hover:text-porcelain">
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
        <div className="post-body mx-auto max-w-[46rem]" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside
          aria-label="About the author"
          className="mx-auto mt-16 max-w-[46rem] border-t border-ink/10 pt-10"
        >
          <p className="text-sm text-fog">Written by</p>
          <p className="mt-2 text-2xl font-medium tracking-tight">Saleh Ahmad, ACPA</p>
          <p className="mt-3 text-[15px] leading-relaxed text-fog">
            Accountant with 38 years of experience in bookkeeping, payroll, tax and financial management across six
            countries, including ten years as a financial manager in Texas. Arab Certified Professional Accountant and
            Master of Commerce in Accounting. Based in {contact.base}, working with clients online.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
            <a href="/#about" className="link-draw">
              More about Saleh
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-draw">
              LinkedIn
            </a>
          </div>
        </aside>

        <aside className="mx-auto mt-12 max-w-[46rem] rounded-[24px] bg-deep p-8 text-porcelain sm:p-10">
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
