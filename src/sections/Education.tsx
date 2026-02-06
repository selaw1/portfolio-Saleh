import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'Bachelor of Science in Accounting',
    institution: 'Wayne State University',
    location: 'Detroit, Michigan',
    period: '2014 - 2018',
    gpa: '3.8/4.0',
    honors: 'Magna Cum Laude',
    highlights: [
      'Dean\'s List all semesters',
      'Recipient of Academic Excellence Scholarship',
      'Active member of Beta Alpha Psi (Accounting Honor Society)',
      'Completed advanced coursework in taxation, auditing, and financial analysis',
    ],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

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

      // Card entrance
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              cardRef.current,
              { opacity: 0, y: 50, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
            );
          },
          once: true
        })
      );

      // Highlight items stagger
      itemsRef.current.forEach((item, i) => {
        if (item) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: item,
              start: 'top 90%',
              onEnter: () => {
                gsap.fromTo(
                  item,
                  { opacity: 0, x: -20 },
                  { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.1 }
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

        {/* Education Card */}
        {education.map((edu) => (
          <div
            key={edu.institution}
            ref={cardRef}
            className="max-w-4xl mx-auto"
          >
            <div className="group relative p-8 lg:p-10 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border rounded-2xl hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              {/* Icon Badge */}
              <div className="absolute -top-6 left-8 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <div className="pt-6">
                {/* Degree and Honors */}
                <div className="mb-6">
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xl font-semibold text-primary">{edu.institution}</span>
                    {edu.honors && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full border border-primary/20">
                        {edu.honors}
                      </span>
                    )}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </div>
                    {edu.gpa && (
                      <div className="px-3 py-1 bg-accent/10 text-accent font-semibold text-sm rounded-lg">
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="text-primary">★</span> Achievements & Activities
                  </h4>
                  <ul className="space-y-3">
                    {edu.highlights.map((highlight, i) => (
                      <li 
                        key={i}
                        ref={(el) => { itemsRef.current[i] = el; }}
                        className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
