import { formatDate, type Post } from '../lib/blog';
import { ogImagePath } from '../lib/og';

// showCategory is off on the blog page, where posts already sit under their category heading
export default function PostCard({ post, showCategory = true }: { post: Post; showCategory?: boolean }) {
  const href = `/blog/${post.slug}/`;
  return (
    <a
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-porcelain ring-1 ring-inset ring-ink/10 transition-shadow duration-500 hover:shadow-card-hover"
    >
      {/* The post's generated preview image (scripts/og.mjs); decorative, since the title follows */}
      <div className="aspect-[1200/630] overflow-hidden bg-deep">
        <img
          src={ogImagePath(href)}
          alt=""
          width={1200}
          height={630}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <p className="text-sm text-fog">
          {showCategory && <>{post.category.name} · </>}
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
        <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight">{post.title}</h3>
        <p className="mt-4 flex-1 text-[15px] leading-relaxed text-fog">{post.description}</p>
        <span className="mt-8 text-[15px] font-medium">
          <span className="link-draw group-hover:[background-size:100%_1px]">Read the article</span>
        </span>
      </div>
    </a>
  );
}
