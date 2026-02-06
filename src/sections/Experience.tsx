import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Self-Employed',
    role: 'Freelance Accountant & Tax Consultant',
    location: 'Michigan, USA',
    period: 'September 2020 - Present',
    description: [
      'Provide comprehensive bookkeeping, financial reporting, and tax preparation services to 50+ individual and business clients',
      'Specialize in QuickBooks Online and Desktop setup, customization, and training for small to medium-sized businesses',
      'Prepare and file federal and state tax returns with 98% accuracy rate, maximizing deductions and ensuring compliance',
      'Conduct financial analysis and budget planning to help clients make informed business decisions and improve profitability',
      'Manage accounts payable/receivable, payroll processing, and bank reconciliations with meticulous attention to detail',
      'Implement efficient accounting systems and procedures that reduce errors and save clients an average of 15 hours per month',
    ],
    achievements: [
      '50+ satisfied clients with recurring engagements',
      '98% tax return accuracy rate',
      '15+ hours monthly time saved per client',
      'Zero compliance violations in 4+ years',
    ],
  },
  {
    company: 'RSM US LLP',
    role: 'Staff Accountant',
    location: 'Detroit, Michigan',
    period: 'January 2019 - August 2020',
    description: [
      'Performed detailed financial audits and reviews for clients in manufacturing, retail, and service industries',
      'Prepared complex financial statements, tax returns, and management reports in compliance with GAAP and tax regulations',
      'Assisted in quarterly and annual report preparation, ensuring accuracy and timeliness of all submissions',
      'Conducted detailed variance analysis and reconciliations of general ledger accounts',
      'Collaborated with senior accountants and managers on audit planning, fieldwork execution, and report finalization',
      'Utilized QuickBooks, Excel, and accounting software to streamline data analysis and reporting processes',
    ],
    achievements: [
      'Completed 30+ successful audits',
      'Reduced audit time by 20% through process improvements',
      'Recognized for exceptional attention to detail',
      'Mentored 3 junior staff members',
    ],
  },
];


export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const descriptionsRef = useRef<(HTMLLIElement | null)[]>([]);

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
              { opacity: 0, y: 50, rotateX: 10 },
              { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' }
            );
          },
          once: true
        })
      );

      // Description items stagger
      descriptionsRef.current.forEach((item, i) => {
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
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-light-bg/30 to-background dark:from-brand-dark-gray dark:to-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4"
          >
            Professional <span className="text-primary">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Building trust through precision and expertise
          </p>
        </div>

        {/* Modern Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary md:left-1/2 md:-ml-px" />

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              ref={cardRef}
              className={`relative mb-12 md:mb-20 ${
                index % 2 === 0 ? 'md:pr-1/2 md:mr-8' : 'md:pl-1/2 md:ml-8'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 md:left-1/2 md:-ml-2.5 z-10" />

              {/* Experience Card */}
              <div className={`ml-16 md:ml-0 ${index % 2 === 1 ? 'md:ml-8' : 'md:mr-8'}`}>
                <div className="group relative p-8 bg-card border-2 border-border rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>

                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2 font-semibold text-primary">
                        <Briefcase className="w-5 h-5" />
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, i) => (
                      <li 
                        key={i} 
                        ref={(el) => { descriptionsRef.current[i] = el; }}
                        className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Achievements Section */}
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="text-primary">★</span> Key Achievements
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {exp.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm text-foreground font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
