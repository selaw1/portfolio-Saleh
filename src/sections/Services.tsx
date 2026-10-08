import { useState } from 'react';
import { Plus } from 'lucide-react';
import { alsoOffered, services } from '../data/content';

type Service = (typeof services)[number];

function Includes({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-[15px]">
          <span className="h-px w-5 bg-brass" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Detail({ service }: { service: Service }) {
  return (
    <>
      <p className="lede max-w-[40ch] text-ink">{service.summary}</p>
      <div className="mt-8">
        <Includes items={service.includes} />
      </div>
      <a href={service.href} className="link-draw mt-8 inline-block text-[15px] font-medium">
        {service.name} in detail
      </a>
    </>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-mist/60">
      <div className="wrap py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 className="heading reveal max-w-[12ch]">What I handle for you</h2>

            <ul className="mt-12 border-t border-ink/10 md:mt-16" role="tablist" aria-orientation="vertical">
              {services.map((service, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={service.name}
                    className="reveal border-b border-ink/10"
                    style={{ '--d': `${i * 70}ms` } as React.CSSProperties}
                  >
                    <button
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`service-${i}`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => window.matchMedia('(min-width: 1024px)').matches && setActive(i)}
                      className="group flex w-full items-center justify-between py-5 text-left md:py-6"
                    >
                      <span
                        className={`text-[clamp(1.9rem,3.2vw+0.8rem,3.4rem)] font-medium leading-none tracking-[-0.035em] transition-[color,transform] duration-500 ease-expo ${
                          isActive ? 'text-ink lg:translate-x-3' : 'text-ink/35 group-hover:text-ink/60'
                        }`}
                      >
                        {service.name}
                      </span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-ink/50 transition-transform duration-500 lg:hidden ${
                          isActive ? 'rotate-45' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Mobile and tablet: detail opens inline */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-expo lg:hidden ${
                        isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-8 pt-1">
                          <Detail service={service} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="reveal mt-10 max-w-[44ch] text-[15px] leading-relaxed text-fog">
              Also available: {alsoOffered.join(', ')}.
            </p>
          </div>

          {/* Desktop: detail panel beside the list */}
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:flex lg:items-end">
            <div
              id={`service-${active}`}
              role="tabpanel"
              className="w-full rounded-[28px] bg-porcelain p-10 xl:p-12"
            >
              <div key={active} className="fade-up">
                <p className="text-sm text-fog">
                  {String(active + 1).padStart(2, '0')} of {String(services.length).padStart(2, '0')}
                </p>
                <p className="mb-8 mt-2 text-3xl font-medium tracking-tight">{services[active].name}</p>
                <Detail service={services[active]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
