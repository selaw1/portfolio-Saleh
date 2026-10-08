import { formatDate, type Post } from '../lib/blog';

// showCategory is off on the blog page, where posts already sit under their category heading
export default function PostCard({ post, showCategory = true }: { post: Post; showCategory?: boolean }) {
  return (
    <a href={`/blog/${post.slug}/`} className="group flex h-full flex-col rounded-[24px] bg-porcelain p-8 ring-1 ring-inset ring-ink/10 transition-shadow duration-500 hover:shadow-card-hover sm:p-10">
      <p className="text-sm text-fog">
        {showCategory && <>{post.category.name} · </>}
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </p>
      <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight">{post.title}</h3>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-fog">{post.description}</p>
      <span className="mt-8 text-[15px] font-medium">
        <span className="link-draw group-hover:[background-size:100%_1px]">Read the article</span>
      </span>
    </a>
  );
}
