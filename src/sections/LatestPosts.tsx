import PostCard from '../components/PostCard';
import { posts } from '../lib/blog';

export default function LatestPosts() {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="border-t border-ink/10 bg-mist/60">
      <div className="wrap py-24 md:py-36">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="heading reveal max-w-[14ch]">Notes on books and tax</h2>
          <a href="/blog" className="reveal link-draw text-[15px] font-medium">
            All articles
          </a>
        </div>
        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <li key={post.slug} className="reveal" style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
