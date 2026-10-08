import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import { process } from '../data/content';
import { servicePages, type ServicePage as Service } from '../data/servicePages';
import { posts } from '../lib/blog';

export default function ServicePage({ service }: { service: Service }) {
  const related = service.relatedPosts.flatMap((slug) => posts.filter((p) => p.slug === slug));
  const others = servicePages.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={
          <nav aria-label="Breadcrumb">
            <a href="/#services" className="link-draw hover:text-porcelain">
              Services
            </a>
          </nav>
        }
        title={service.heading}
      >
        <p className="lede mt-8 max-w-[48ch] text-porcelain/70">{service.intro}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="/#book" className="pill-light">
            Book a call
          </a>
          <a href="#included" className="pill-ghost">
            What's included
          </a>
        </div>
      </PageHeader>

      <section id="included" className="wrap py-20 md:py-28">
        <h2 className="heading reveal max-w-[14ch]">What's included</h2>
        <ul className="mt-12 grid gap-x-8 gap-y-10 border-t border-ink/10 pt-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {service.included.map((item, i) => (
            <li key={item.title} className="reveal" style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
              <span className="block h-px w-8 bg-brass" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-[38ch] leading-relaxed text-fog">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {service.steps && (
        <section className="border-t border-ink/10">
          <div className="wrap py-20 md:py-28">
            <h2 className="heading reveal max-w-[16ch]">How the system is set up</h2>
            <ol className="mt-12 grid gap-x-8 gap-y-10 md:mt-16 md:grid-cols-2">
              {service.steps.map((step, i) => (
                <li key={step.title} className="reveal flex gap-5" style={{ '--d': `${(i % 2) * 80}ms` } as React.CSSProperties}>
                  <span className="text-sm leading-8 text-fog">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight">{step.title}</h3>
                    <p className="mt-2 max-w-[48ch] leading-relaxed text-fog">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="bg-mist/60">
        <div className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Who it's for</h2>
            <ul className="mt-8 space-y-4">
              {service.forWho.map((line) => (
                <li key={line} className="flex gap-3 leading-relaxed">
                  <span className="mt-[0.7em] h-px w-5 shrink-0 bg-brass" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">How we start</h2>
            <ol className="mt-8 space-y-6">
              {process.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="text-sm leading-7 text-fog">0{i + 1}</span>
                  <div>
                    <p className="text-lg font-medium">{step.title}</p>
                    <p className="mt-1 leading-relaxed text-fog">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <h2 className="heading reveal lg:col-span-4">Questions</h2>
          <dl className="border-t border-ink/10 lg:col-span-7 lg:col-start-6">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="border-b border-ink/10 py-7">
                <dt className="text-lg font-medium">{faq.q}</dt>
                <dd className="mt-2 max-w-[60ch] leading-relaxed text-fog">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-mist/60">
          <div className="wrap py-20 md:py-28">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Related articles</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {related.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section data-tone="dark" className="bg-deep text-porcelain">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 className="heading max-w-[12ch]">Let's talk about your books</h2>
            <p className="lede mt-6 max-w-[38ch] text-porcelain/70">
              A short call about your business and what you need. Based in Weatherford, Texas, working with clients
              everywhere online.
            </p>
            <a href="/#book" className="pill-light mt-10">
              Book a call
            </a>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-sm text-porcelain/50">Other services</p>
            <ul className="mt-4 space-y-3 text-lg">
              {others.map((s) => (
                <li key={s.slug}>
                  <a href={`/${s.slug}/`} className="link-draw">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
