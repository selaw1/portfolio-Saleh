import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'Bachelor of Commerce in Accounting',
    institution: 'Nagpur University',
    location: 'Nagpur, India',
    period: '1983 - 1986',
  },
  {
    degree: 'Master of Commerce in Accounting',
    institution: 'Nagpur University',
    location: 'Nagpur, India',
    period: '1986 - 1989',
  },
];

export default function Education() {
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

      // Cards entrance
      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 80%',
              onEnter: () => {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 50, scale: 0.95 },
                  { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.15 }
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
      id="education"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background dark:bg-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--primary)) 35px, hsl(var(--primary)) 36px)'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
          >
            <span className="text-primary">Education</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Academic foundation for professional excellence
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <div
              key={edu.degree}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative p-6 lg:p-8 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Badge */}
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <div>
                {/* Degree */}
                <h3 className="text-xl lg:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                  {edu.degree}
                </h3>
                
                {/* Institution */}
                <div className="text-lg font-semibold text-primary mb-4">
                  {edu.institution}
                </div>
                
                {/* Meta Info */}
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {edu.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {edu.period}
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
