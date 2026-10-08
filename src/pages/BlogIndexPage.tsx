import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import { posts } from '../lib/blog';

export default function BlogIndexPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Bookkeeping, payroll and tax, explained plainly">
        <p className="lede mt-8 max-w-[44ch] text-porcelain/70">
          Practical guides for small business owners in Texas and beyond, from an accountant with 38 years of practice.
        </p>
      </PageHeader>
      <section className="bg-mist/60">
        <div className="wrap py-20 md:py-28">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
