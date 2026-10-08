import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import { postsByCategory } from '../lib/blog';

export default function BlogIndexPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Bookkeeping, payroll and tax, explained plainly">
        <p className="lede mt-8 max-w-[44ch] text-porcelain/70">
          Practical guides for small business owners in Texas and beyond, from an accountant with 38 years of practice.
        </p>
        <nav aria-label="Blog categories" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {postsByCategory.map(({ category, posts }) => (
              <li key={category.slug}>
                <a
                  href={`#${category.slug}`}
                  className="inline-flex rounded-full px-4 py-2 text-[15px] ring-1 ring-inset ring-porcelain/25 transition-colors hover:ring-porcelain/60"
                >
                  {category.name} <span className="ml-2 text-porcelain/50">{posts.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>
      <div className="bg-mist/60">
        {postsByCategory.map(({ category, posts }, i) => (
          <section
            key={category.slug}
            id={category.slug}
            aria-labelledby={`${category.slug}-heading`}
            className={`scroll-mt-20 ${i > 0 ? 'border-t border-ink/10' : ''}`}
          >
            <div className="wrap py-16 md:py-20">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 id={`${category.slug}-heading`} className="text-3xl font-medium tracking-tight">
                    {category.name}
                  </h2>
                  <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-fog">{category.description}</p>
                </div>
                <a href={category.service.href} className="link-draw shrink-0 text-[15px] font-medium">
                  {category.service.name}
                </a>
              </div>
              <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} showCategory={false} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
