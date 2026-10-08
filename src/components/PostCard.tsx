import { formatDate, type Post } from '../lib/blog';

export default function PostCard({ post }: { post: Post }) {
  return (
    <a href={`/blog/${post.slug}`} className="group flex h-full flex-col rounded-[24px] bg-porcelain p-8 ring-1 ring-inset ring-ink/10 transition-shadow duration-500 hover:shadow-card-hover sm:p-10">
      <p className="text-sm text-fog">
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
