import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, Users, TrendingUp, Award, Star, PieChart, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 92, suffix: '%', label: 'Client Retention', color: 'text-primary' },
  { icon: Star, value: 95, suffix: '%', label: 'Client Satisfaction', color: 'text-primary' },
  { icon: Building2, value: 15, suffix: '+', label: 'Industries Served', color: 'text-accent' },
  { icon: Award, value: 10, suffix: '+', label: 'Certifications', color: 'text-accent' },
];

const highlights = [
  { 
    icon: Calculator, 
    title: 'QuickBooks Expert', 
    desc: 'Mastery of QuickBooks Online and Desktop for comprehensive financial management and reporting' 
  },
  { 
    icon: TrendingUp, 
    title: 'Financial Analysis', 
    desc: 'Expert in analyzing financial data, identifying trends, and providing strategic insights for business growth' 
  },
  { 
    icon: PieChart, 
    title: 'Tax Optimization', 
    desc: 'Specialized in tax planning and compliance, maximizing deductions while ensuring full regulatory adherence' 
  },
];


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [countedStats, setCountedStats] = useState(stats.map(() => 0));

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

      // Highlight cards
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
                  { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15 }
                );
              },
              once: true
            })
          );
        }
      });

      // Stats with counter animation
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: stat,
              start: 'top 85%',
              onEnter: () => {
                gsap.fromTo(
                  stat,
                  { opacity: 0, scale: 0.8 },
                  { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: i * 0.1 }
                );

                // Counter animation
                const targetValue = stats[i].value;
                gsap.to({}, {
                  duration: 1.5,
                  ease: 'power2.out',
                  delay: i * 0.1,
                  onUpdate: function() {
                    const progress = this.progress();
                    setCountedStats(prev => {
                      const newStats = [...prev];
                      newStats[i] = Math.floor(targetValue * progress);
                      return newStats;
                    });
                  },
                  onComplete: () => {
                    setCountedStats(prev => {
                      const newStats = [...prev];
                      newStats[i] = targetValue;
                      return newStats;
                    });
                  }
                });
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
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-secondary/50 dark:bg-brand-black overflow-hidden transition-colors"
    >
      {/* Diagonal stripes pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--primary)) 35px, hsl(var(--primary)) 36px)'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
          >
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group relative p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                ref={(el) => { statsRef.current[i] = el; }}
                className="relative p-6 bg-card border border-border rounded-xl text-center hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                
                {/* Value */}
                <div className="text-3xl font-serif font-bold text-foreground mb-1">
                  {countedStats[i]}{stat.suffix}
                </div>
                
                {/* Label */}
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <div className="relative p-8 lg:p-10 bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/20 rounded-2xl">
            <div className="absolute top-4 left-4 text-6xl text-primary/10 font-serif">"</div>
            <div className="absolute bottom-4 right-4 text-6xl text-primary/10 font-serif">"</div>
            <p className="text-xl lg:text-2xl font-serif text-foreground leading-relaxed relative z-10">
              I believe in delivering <span className="text-primary font-bold">precise financial solutions</span> with integrity and transparency. 
              Every client deserves accounting services that not only ensure compliance but <span className="text-accent font-bold">drive strategic growth</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
