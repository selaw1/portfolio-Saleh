import type { ReactNode } from 'react';

// Shared pieces for the calculator pages (number helpers live in src/lib/numbers.ts)

export function AmountInput({
  id,
  label,
  hint,
  value,
  onChange,
  unit = '$',
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  unit?: '$' | '%';
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[15px] font-medium">{label}</span>
      <span className="mt-2 flex items-center rounded-xl bg-white ring-1 ring-inset ring-ink/15 focus-within:ring-2 focus-within:ring-evergreen">
        {unit === '$' && (
          <span className="pl-4 text-fog" aria-hidden="true">
            $
          </span>
        )}
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl bg-transparent py-3 text-[16px] outline-none ${unit === '$' ? 'px-2' : 'pl-4 pr-2'}`}
        />
        {unit === '%' && (
          <span className="pr-4 text-fog" aria-hidden="true">
            %
          </span>
        )}
      </span>
      <span className="mt-1.5 block text-sm leading-snug text-fog">{hint}</span>
    </label>
  );
}

export function Panel({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <fieldset className="rounded-[24px] bg-porcelain p-6 ring-1 ring-inset ring-ink/10 sm:p-8">
      <legend className="sr-only">{title}</legend>
      <p className="text-xl font-medium tracking-tight">{title}</p>
      {intro && <p className="mt-2 text-[15px] leading-relaxed text-fog">{intro}</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

export function Choice<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <label
          key={o.value}
          className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-[15px] ring-1 ring-inset ${
            value === o.value ? 'bg-evergreen text-porcelain ring-evergreen' : 'bg-white ring-ink/15'
          }`}
        >
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
          {o.label}
        </label>
      ))}
    </div>
  );
}

// Result box beside the inputs: neutral until there's a result, then green (good news) or red
export function ResultCard({
  tone,
  badge,
  label,
  headline,
  rows,
  note,
}: {
  tone: 'neutral' | 'good' | 'bad';
  badge?: string;
  label: string;
  headline: string;
  rows: [string, string][];
  note: ReactNode;
}) {
  return (
    <aside className="lg:sticky lg:top-24" aria-live="polite">
      <div
        className={`rounded-[24px] p-6 text-porcelain transition-colors duration-500 sm:p-8 ${
          tone === 'good' ? 'bg-evergreen ring-1 ring-inset ring-brass/40' : tone === 'bad' ? 'bg-[#8a2424]' : 'bg-deep'
        }`}
      >
        {badge && tone !== 'neutral' && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-porcelain/15 px-3 py-1.5 text-sm font-medium">
            <span className={`h-2 w-2 rounded-full ${tone === 'good' ? 'bg-[#7ee2a8]' : 'bg-[#ffb4a8]'}`} aria-hidden="true" />
            {badge}
          </p>
        )}
        <p className="text-sm text-porcelain/70">{label}</p>
        <p className="mt-2 text-5xl font-medium tracking-tight">{headline}</p>
        <dl className="mt-8 space-y-3 border-t border-porcelain/10 pt-6 text-[15px]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-porcelain/75">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 text-sm leading-relaxed text-porcelain/75">{note}</div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-fog">The calculator runs in your browser. Nothing you enter is sent or saved.</p>
    </aside>
  );
}

// Shared bottom of every calculator page: a short explanation, related reading, booking prompt and disclaimer
export function CalculatorFooter({
  heading,
  children,
  related,
  cta,
  disclaimer,
  sources = [],
}: {
  heading: string;
  children: ReactNode;
  related: { href: string; label: string }[];
  cta: string;
  disclaimer: string;
  sources?: { href: string; label: string }[];
}) {
  return (
    <>
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <h2 className="heading reveal max-w-[12ch] lg:col-span-5">{heading}</h2>
          <div className="lg:col-span-7">
            <div className="post-body">{children}</div>
            {related.length > 0 && (
              <div className="mt-10 border-t border-ink/10 pt-6">
                <p className="text-sm text-fog">Related reading</p>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.href}>
                      <a href={r.href} className="link-draw text-[17px] font-medium">
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sources.length > 0 && (
              <div className="mt-8 border-t border-ink/10 pt-6">
                <p className="text-sm text-fog">Sources</p>
                <ul className="mt-3 space-y-2 text-[15px]">
                  {sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
      <section data-tone="dark" className="bg-deep text-porcelain">
        <div className="wrap py-20 md:py-28">
          <h2 className="heading max-w-[18ch]">Want the real numbers for your business?</h2>
          <p className="lede mt-6 max-w-[48ch] text-porcelain/70">{cta}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="/#book" className="pill-light">
              Book a call
            </a>
            <a href="/calculators/" className="pill-ghost">
              More calculators
            </a>
          </div>
        </div>
      </section>
      <section className="wrap py-10">
        <p className="max-w-[80ch] text-sm italic leading-relaxed text-fog">{disclaimer}</p>
      </section>
    </>
  );
}
