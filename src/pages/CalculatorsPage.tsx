import PageHeader from '../components/PageHeader';
import { calculators } from '../data/calculators';

export default function CalculatorsPage() {
  return (
    <>
      <PageHeader eyebrow="Free tools" title="Free calculators for small business owners">
        <p className="lede mt-8 max-w-[52ch] text-porcelain/70">
          Quick, free calculators for zakat, quarterly taxes, the S corp decision and Texas sales tax. They run in your
          browser, and nothing you enter is saved.
        </p>
      </PageHeader>
      <section className="bg-mist/60">
        <div className="wrap py-16 md:py-24">
          <ul className="grid gap-5 md:grid-cols-2">
            {calculators.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  className="group flex h-full flex-col rounded-[24px] bg-porcelain p-8 ring-1 ring-inset ring-ink/10 transition-shadow duration-500 hover:shadow-card-hover sm:p-10"
                >
                  <p className="text-sm text-fog">{c.tag}</p>
                  <h2 className="mt-4 text-2xl font-medium leading-tight tracking-tight">{c.name}</h2>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-fog">{c.description}</p>
                  <span className="mt-8 text-[15px] font-medium">
                    <span className="link-draw group-hover:[background-size:100%_1px]">Open the calculator</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[60ch] text-[15px] leading-relaxed text-fog">
            Calculators give estimates. For numbers based on your own books,{' '}
            <a href="/#book" className="link-draw text-ink">
              book a short intro call
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
