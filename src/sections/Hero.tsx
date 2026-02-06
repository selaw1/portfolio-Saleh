import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, TrendingUp, FileCheck, ChevronDown } from 'lucide-react';
import FloatingNumbers from '../components/FloatingNumbers';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Headline entrance
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.1 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-brand-light-bg to-brand-mint dark:from-brand-black dark:via-brand-dark-gray dark:to-brand-black transition-colors"
    >
      {/* Floating Numbers Background */}
      <FloatingNumbers />

      {/* Animated Pattern Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, hsl(var(--primary)) 50px, hsl(var(--primary)) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, hsl(var(--primary)) 50px, hsl(var(--primary)) 51px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-brand-yellow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Certified QuickBooks Expert</span>
          </div>

          {/* Main Heading */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-foreground mb-6 relative"
          >
            <span className="text-foreground">Saleh </span>
            <span className="text-primary">Alselawi</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto font-medium"
          >
            <Calculator className="inline-block w-6 h-6 mr-2 text-primary" />
            Certified Accountant <span className="text-primary">|</span> QuickBooks Specialist
          </p>

          {/* Specialization Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {[
              { icon: Calculator, text: 'QuickBooks Online' },
              { icon: FileCheck, text: 'Financial Analysis' },
              { icon: TrendingUp, text: 'Tax Planning' },
            ].map((item, i) => (
              <div
                key={item.text}
                className="px-5 py-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-105 transition-all duration-300 cursor-default group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-semibold text-foreground">{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 pt-8">
            <a
              href="/Saleh_Resume.pdf"
              download
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              <span className="relative z-10">Download Resume</span>
              <FileCheck className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground font-semibold rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              Let's Connect
              <TrendingUp className="w-5 h-5" />
            </a>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
            {[
              { number: '5+', label: 'Years Experience' },
              { number: '98%', label: 'Accuracy Rate' },
              { number: '50+', label: 'Clients Served' }
            ].map((stat, i) => (
              <div 
                key={stat.label}
                className="p-4 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            className="inline-block pt-12 text-muted-foreground hover:text-primary transition-colors animate-bounce cursor-pointer"
          >
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30" />
    </section>
  );
}
