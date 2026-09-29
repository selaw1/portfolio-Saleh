import { credentials, route } from '../data/content';

export default function About() {
  return (
    <section id="about" className="border-t border-ink/10">
      <div className="wrap py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <h2 className="heading reveal max-w-[14ch] lg:col-span-7">Thirty-eight years of keeping the books.</h2>
          <div className="reveal space-y-6 lg:col-span-4 lg:col-start-9 lg:pt-3" style={{ '--d': '120ms' } as React.CSSProperties}>
            <p className="lede text-fog">
              I started as an internal auditor in Kuwait in 1986, then ran finance for companies in Thailand, Canada,
              the United States and Jordan. At MAZEN in Texas, that work saved the company more than $2 million.
            </p>
            <p className="lede text-fog">Today I bring that experience to smaller businesses, working fully online.</p>
            <a href="/Saleh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="link-draw inline-block font-medium">
              Read the full résumé (PDF)
            </a>
          </div>
        </div>

        {/* Career route */}
        <ol className="reveal relative mt-20 grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:mt-28 lg:grid-cols-6">
          <span className="draw-x absolute left-0 right-0 top-0 hidden h-px bg-ink/15 lg:block" aria-hidden="true" />
          {route.map((stop, i) => (
            <li
              key={stop.year}
              className="reveal relative border-t border-ink/15 pr-4 pt-6 lg:border-t-0"
              style={{ '--d': `${200 + i * 90}ms` } as React.CSSProperties}
            >
              <span
                className={`absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full ${
                  i === route.length - 1 ? 'bg-brass' : 'bg-evergreen'
                }`}
                aria-hidden="true"
              />
              <p className="text-sm text-fog">{stop.year}</p>
              <p className="mt-1 text-xl font-medium tracking-tight">{stop.place}</p>
              <p className="mt-1 text-[15px] text-fog">{stop.role}</p>
            </li>
          ))}
        </ol>

        {/* Credentials */}
        <div className="reveal mt-24 grid gap-6 md:mt-32 lg:grid-cols-12 lg:gap-8">
          <h3 className="text-sm text-fog lg:col-span-3">Credentials</h3>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:col-span-9">
            {credentials.map((item) => (
              <li key={item} className="text-lg leading-snug tracking-tight">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
