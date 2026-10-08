import { services } from '../data/content';
import { formatDate, posts } from '../lib/blog';

export default function NotFoundPage() {
  return (
    <>
      <section
        data-tone="dark"
        className="bg-[radial-gradient(120%_80%_at_85%_0%,rgb(var(--evergreen))_0%,rgb(var(--deep))_60%)] text-porcelain"
      >
        <div className="wrap grid min-h-[min(80svh,46rem)] content-end gap-10 pb-16 pt-36 md:pb-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="fade-up text-[15px] text-porcelain/60 [--d:100ms]">Error 404</p>
            <h1 className="display fade-up mt-6 [--d:200ms]">This page is off the books.</h1>
            <p className="lede fade-up mt-8 max-w-[40ch] text-porcelain/70 [--d:350ms]">
              The page you're looking for doesn't exist or has moved. Everything else is still in order.
            </p>
            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row [--d:500ms]">
              <a href="/" className="pill-light">
                Go to the homepage
              </a>
              <a href="/#book" className="pill-ghost">
                Book a call
              </a>
            </div>
          </div>
          <p
            className="fade-up hidden select-none text-right text-[clamp(8rem,18vw,16rem)] font-medium leading-none tracking-[-0.06em] text-brass/40 lg:col-span-5 lg:block [--d:300ms]"
            aria-hidden="true"
          >
            404
          </p>
        </div>
      </section>

      <section className="wrap grid gap-14 py-20 md:grid-cols-2 md:gap-8 md:py-28">
        <div>
          <h2 className="text-3xl font-medium tracking-tight">Services</h2>
          <ul className="mt-8 border-t border-ink/10">
            {services.map((s) => (
              <li key={s.href} className="border-b border-ink/10">
                <a href={s.href} className="group flex items-center justify-between py-5 text-xl">
                  <span className="link-draw">{s.name}</span>
                  <span className="text-fog transition-transform duration-500 ease-expo group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-medium tracking-tight">Latest articles</h2>
          <ul className="mt-8 border-t border-ink/10">
            {posts.slice(0, 4).map((p) => (
              <li key={p.slug} className="border-b border-ink/10">
                <a href={`/blog/${p.slug}/`} className="block py-5">
                  <span className="link-draw text-lg leading-snug">{p.title}</span>
                  <span className="mt-1 block text-sm text-fog">{formatDate(p.date)}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="/blog/" className="link-draw mt-6 inline-block text-[15px] font-medium">
            All articles
          </a>
        </div>
      </section>
    </>
  );
}
