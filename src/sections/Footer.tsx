import { contact, services } from '../data/content';

export default function Footer() {
  return (
    <footer data-tone="dark" className="bg-deep text-porcelain/60">
      <div className="wrap flex flex-col gap-6 border-t border-porcelain/10 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-semibold text-porcelain">Saleh Ahmad</span>
          <span className="ml-3">Accounting, payroll and tax. Based in {contact.base}.</span>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {services.map((s) => (
            <a key={s.href} href={s.href} className="link-draw hover:text-porcelain">
              {s.name}
            </a>
          ))}
          <a href="/blog" className="link-draw hover:text-porcelain">
            Blog
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-draw hover:text-porcelain">
            LinkedIn
          </a>
          <a href={`mailto:${contact.email}`} className="link-draw hover:text-porcelain">
            Email
          </a>
          <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
