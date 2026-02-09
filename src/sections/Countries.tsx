import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const countries = [
  { name: 'Global', flag: '🌍' },
  { name: 'Amman, Jordan', flag: '🇯🇴' },
  { name: 'Texas, USA', flag: '🇺🇸' },
  { name: 'Toronto, Canada', flag: '🇨🇦' },
  { name: 'Hatyai, Thailand', flag: '🇹🇭' },
  { name: 'Kuwait', flag: '🇰🇼' },
];

export default function Countries() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const countryItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Headline
      if (headlineRef.current) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: headlineRef.current,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                headlineRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
              );
            },
            once: true
          })
        );
      }

      // Country items
      countryItemsRef.current.forEach((item, i) => {
        if (item) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: item,
              start: 'top 90%',
              onEnter: () => {
                gsap.fromTo(
                  item,
                  { opacity: 0, scale: 0.8, y: 20 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', delay: i * 0.08 }
                );
              },
              once: true
            })
          );
        }
      });

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="countries"
      ref={sectionRef}
      className="relative py-12 lg:py-16 bg-gradient-to-b from-background to-secondary/30 dark:from-brand-black dark:to-brand-dark-gray/50 overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-xs">International Expertise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
            Countries I've <span className="text-primary">Served</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-3" />
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            38+ years of financial excellence across six countries and three continents
          </p>
        </div>
        
        {/* Countries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {countries.map((country, i) => (
            <div
              key={i}
              ref={(el) => { countryItemsRef.current[i] = el; }}
              className="group relative p-4 bg-card border-2 border-border rounded-xl text-center hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl lg:text-4xl mb-2 group-hover:scale-110 transition-transform">
                {country.flag}
              </div>
              <div className="text-xs lg:text-sm font-semibold text-foreground">
                {country.name}
              </div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
