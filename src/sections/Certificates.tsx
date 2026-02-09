import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: 'Arab Certified Professional Accountant (ACPA)',
    issuer: 'University of Cambridge',
    date: '2010',
    description: 'Comprehensive certification covering auditing, financial accounting, taxation, and business environment concepts.',
    featured: true,
  },
  {
    title: 'CIMA Islamic Finance Diploma',
    issuer: 'University of Cambridge',
    date: '2012',
    description: 'Specialized certification in Islamic finance principles, Sharia-compliant accounting practices, and ethical financial management.',
    featured: true,
  },
  {
    title: 'Zakat Accounting Diploma',
    issuer: 'Kuwait Zakat House',
    date: '2020',
    description: 'Expert certification in Zakat calculation, Islamic charitable accounting principles, and religious financial obligations.',
    featured: true,
  },
  {
    title: 'Advanced Excel Expert Certification',
    issuer: 'Microsoft',
    date: '2013',
    description: 'Advanced Microsoft Excel certification including complex formulas, pivot tables, and data analysis.',
  }
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Headline
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

      // Certificate cards
      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 85%',
              onEnter: () => {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 50, rotateX: 10 },
                  { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.08 }
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
      id="certificates"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-light-bg/30 to-background dark:from-brand-dark-gray dark:to-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
          >
            Certifications & <span className="text-primary">Credentials</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications demonstrating commitment to excellence and continuous learning
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <div
              key={cert.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`group relative p-6 bg-card border-2 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                cert.featured 
                  ? 'border-primary/50 bg-gradient-to-br from-card to-primary/5' 
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {/* Featured Badge */}
              {cert.featured && (
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                  Featured
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                cert.featured ? 'bg-primary/20' : 'bg-primary/10'
              } group-hover:scale-110 transition-transform`}>
                <Award className={`w-7 h-7 ${cert.featured ? 'text-primary' : 'text-primary'}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              {/* Issuer and Date */}
              <div className="space-y-1 mb-4">
                <p className="text-sm font-semibold text-primary">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cert.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
