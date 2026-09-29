import { process } from '../data/content';

export default function Process() {
  return (
    <section id="approach" className="wrap py-24 md:py-36">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <h2 className="heading reveal lg:col-span-6">How it works</h2>
        <p className="lede reveal max-w-[36ch] text-fog lg:col-span-4 lg:col-start-9 lg:self-end">
          Three steps from the first call to a clean close every month.
        </p>
      </div>

      <ol className="reveal relative mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8">
        {/* Connecting line draws across on reveal (desktop) and down (mobile) */}
        <span className="draw-x absolute left-0 right-0 top-[7px] hidden h-px bg-ink/15 md:block" aria-hidden="true" />
        <span className="draw-y absolute bottom-0 left-[7px] top-2 w-px bg-ink/15 md:hidden" aria-hidden="true" />

        {process.map((step, i) => (
          <li key={step.title} className="relative pl-10 md:pl-0 md:pr-8">
            <span
              className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border border-ink/20 bg-porcelain md:relative md:block"
              aria-hidden="true"
            >
              <span className="absolute inset-[4px] rounded-full bg-evergreen" />
            </span>
            <p className="text-sm text-fog md:mt-8">Step {i + 1}</p>
            <h3 className="mt-2 text-[1.75rem] font-medium tracking-[-0.03em]">{step.title}</h3>
            <p className="mt-3 max-w-[32ch] leading-relaxed text-fog">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
