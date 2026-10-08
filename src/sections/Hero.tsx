import { Check } from 'lucide-react';

const headline = ['Your', 'books,', 'finally', 'in', 'order.'];

const closeSteps = ['Bank accounts reconciled', 'Card transactions categorized', 'Payroll recorded', 'Statements delivered'];

// Illustrative bar heights for the sample report
const bars = [42, 55, 48, 63, 58, 74];
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

function ClosePanel() {
  return (
    <div className="rounded-[28px] bg-porcelain/[0.06] p-2 ring-1 ring-inset ring-porcelain/10 backdrop-blur-sm">
      <div className="rounded-[22px] bg-porcelain p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-fog">Monthly close</p>
            <p className="mt-1 text-2xl font-medium tracking-tight">September</p>
          </div>
          <span className="fade-up inline-flex items-center gap-2 rounded-full bg-evergreen px-3 py-1.5 text-xs font-medium text-porcelain [--d:2000ms]">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            Closed
          </span>
        </div>

        <ul className="mt-7 space-y-3.5">
          {closeSteps.map((step, i) => (
            <li key={step} className="flex items-center gap-3 text-[15px]">
              <span
                className="tick flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-evergreen text-porcelain"
                style={{ '--d': `${900 + i * 220}ms` } as React.CSSProperties}
              >
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {step}
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-ink/10 pt-6">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-fog">Net income</p>
            <p className="text-xs text-fog/70">Sample report</p>
          </div>
          <div className="mt-4 flex h-24 items-end gap-2 sm:gap-3" aria-hidden="true">
            {bars.map((h, i) => (
              <div key={months[i]} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`bar w-full rounded-md ${i === bars.length - 1 ? 'bg-evergreen' : 'bg-mist'}`}
                  style={{ height: `${h}px`, '--d': `${1100 + i * 90}ms` } as React.CSSProperties}
                />
                <span className="text-[11px] text-fog">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      data-tone="dark"
      className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_85%_0%,rgb(var(--evergreen))_0%,rgb(var(--deep))_60%)] text-porcelain"
    >
      <div className="wrap grid min-h-[min(100svh,60rem)] content-center gap-14 pb-16 pt-32 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-24 lg:pt-40">
        <div className="lg:col-span-7">
          <h1 className="fade-up text-[15px] font-normal text-porcelain/60 [--d:100ms]">
            Bookkeeping, accounting, payroll and tax services for small business
          </h1>
          <p className="display mt-6">
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="word" style={{ '--d': `${150 + i * 80}ms` } as React.CSSProperties}>
                  {word}
                </span>
                {i < headline.length - 1 && ' '}
              </span>
            ))}
          </p>
          <p className="lede fade-up mt-8 max-w-[34ch] text-porcelain/70 [--d:650ms]">
            Saleh Ahmad keeps the books, runs payroll and prepares taxes for businesses across Texas, the US and abroad,
            with 38 years of practice behind every close.
          </p>
          <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row [--d:800ms]">
            <a href="#book" className="pill-light">
              Book a call
            </a>
            <a href="#services" className="pill-ghost">
              See services
            </a>
          </div>
        </div>

        <div className="drift-out lg:col-span-5 lg:col-start-8">
          <div className="fade-up mx-auto max-w-md [--d:500ms] lg:max-w-none">
            <ClosePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
