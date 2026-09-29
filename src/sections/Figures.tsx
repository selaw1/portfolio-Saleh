import CountUp from '../components/CountUp';
import { figures } from '../data/content';

export default function Figures() {
  return (
    <section aria-label="Experience in figures" className="wrap py-20 md:py-28">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {figures.map((fig, i) => (
          <div
            key={fig.label}
            className="reveal flex flex-col-reverse"
            style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
          >
            <dt className="mt-3 text-[15px] text-fog">{fig.label}</dt>
            <dd className="text-[clamp(3rem,6vw+1rem,5.5rem)] font-medium tabular-nums leading-none tracking-[-0.05em]">
              <CountUp value={fig.value} suffix={fig.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
