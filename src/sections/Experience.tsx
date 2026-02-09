import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Briefcase, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Self-Employed',
    role: 'Online Accounting & Financial Services',
    location: 'Global',
    period: 'April 2024 - Present',
    description: [
      'Providing comprehensive accounting and bookkeeping services for clients\' businesses across various markets',
      'Maintaining and recording all bank statement transactions to create monthly financial statements',
      'Delivering payroll services, taxation, and financial statement analysis services',
    ],
    achievements: [
      'Global client portfolio',
      'Consistent monthly reporting',
      'Full-service financial management',
    ],
  },
  {
    company: 'Al-Ashegaa Real Estate, LLC',
    role: 'Financial Manager',
    location: 'Amman, Jordan',
    period: 'May 2011 - December 2023',
    description: [
      'Reviewed accounting, audit (external/internal), and consultancy assignments for clients, effectively allocating resources to meet goals',
      'Implemented cost accounting tools to enhance cost efficiency and drive cost reductions in apartment production',
      'Maintained accurate financial documentation, reporting, and records, ensuring compliance and transparency',
      'Established and administered comprehensive operational control plans, including profit planning and capital investment programs',
    ],
    achievements: [
      '12+ years leadership',
      'Cost reduction initiatives',
      'Enhanced operational controls',
      'Improved accounting processes',
    ],
  },
  {
    company: 'MAZEN, INC',
    role: 'Financial Manager',
    location: 'Texas, USA',
    period: 'January 2001 - February 2011',
    description: [
      'Achieved significant cost savings of over $2 million through effective financial management and strategic decision-making',
      'Established and coordinated credit policies with the credit department to ensure effective credit management',
      'Maintained and controlled all cost accounting aspects related to products, optimizing cost efficiency and profitability',
      'Prepared and presented accurate financial statements for management, providing valuable insights for decision-making',
    ],
    achievements: [
      '$2M+ cost savings achieved',
      'Optimized cash flow management',
      'Strong banking relationships',
      'Tax compliance maintained',
    ],
  },
  {
    company: 'Paradise Fine Food, INC',
    role: 'Chief Accountant',
    location: 'Toronto, ON',
    period: 'May 1997 - December 2000',
    description: [
      'Monitored and supervised salaries and wages, ensuring accurate and timely processing',
      'Coordinated with bankers and financial institutions, maintaining strong relationships',
      'Proposed upgrades to the financial and accounting system to enhance efficiency',
      'Prepared comprehensive financial statements including P&L, Balance Sheet, and Cash Flow statements',
    ],
    achievements: [
      'System efficiency improvements',
      'Accurate payroll management',
      'Tax compliance ensured',
      'Budget alignment achieved',
    ],
  },
  {
    company: 'Lanka Trading Co',
    role: 'Administration & Financial Manager',
    location: 'Hatyai, Thailand',
    period: 'October 1995 - March 1997',
    description: [
      'Planned, organized, and managed divisional operations to ensure smooth functioning and achievement of objectives',
      'Conducted regular account reviews and liaised with group managers to identify and address potential problems',
      'Implemented upgrades to financial accounting systems, incorporating the latest field developments',
      'Developed policies, plans, and schedules to drive divisional objectives and ensure effective resource allocation',
    ],
    achievements: [
      'Division operations management',
      'System modernization',
      'Proactive problem resolution',
      'Team coordination excellence',
    ],
  },
  {
    company: 'Zakat House',
    role: 'Internal Auditor & Accountant',
    location: 'Kuwait',
    period: 'October 1986 - September 1995',
    description: [
      'Prepared, reviewed, and analyzed annual financial statements in compliance with IAS and IFRS',
      'Reviewed entity policies, procedure manuals, and internal control activities with comprehensive reporting',
      'Conducted internal audit assignments, producing detailed written reports with implementation solutions',
      'Executed detailed audit procedures ensuring accuracy by reviewing transactions, documents, and records',
    ],
    achievements: [
      '9 years audit experience',
      'IAS & IFRS compliance',
      'Internal control excellence',
      'Policy development expertise',
    ],
  },
];


export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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

      // Cards entrance
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
                  { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1 }
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
              key={exp.company + exp.period}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2 md:mr-8' : 'md:pl-1/2 md:ml-8'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 md:left-1/2 md:-ml-2.5 z-10" />

              {/* Experience Card */}
              <div className={`ml-16 md:ml-0 ${index % 2 === 1 ? 'md:ml-8' : 'md:mr-8'}`}>
                <div 
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="group relative p-6 lg:p-8 bg-card border-2 border-border rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl lg:text-2xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
                      <div className="flex items-center gap-2 font-semibold text-primary">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2.5 mb-5">
                    {exp.description.map((item, i) => (
                      <li 
                        key={i}
                        className="flex items-start gap-2.5 text-muted-foreground leading-relaxed text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Achievements Section */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="text-primary">★</span> Key Achievements
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/20"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-xs text-foreground font-medium">{achievement}</span>
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
