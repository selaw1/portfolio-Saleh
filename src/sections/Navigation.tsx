import { useEffect, useState } from 'react';

// Absolute links so they work from the blog pages too; on the homepage they just scroll
const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Approach', href: '/#approach' },
  { label: 'About', href: '/#about' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Zakat calculator', href: '/zakat-calculator/' },
];

export default function Navigation() {
  const [onDark, setOnDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      // Light-on-dark while over a dark section (the hero or the booking section)
      const darkSections = document.querySelectorAll<HTMLElement>('[data-tone="dark"]');
      setOnDark(
        Array.from(darkSections).some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 40 && rect.bottom >= 40;
        })
      );
      setHidden(y > 120 && y > lastY);
      setScrolled(y > 24);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const light = onDark || menuOpen;

  return (
    <>
      {/* Phones: a full-width bar that hides while scrolling down.
          Desktop: stays visible and shrinks into a floating rounded bar once the page scrolls,
          the reverse of the booking section opening up to full width. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-expo ${
          hidden && !menuOpen ? 'max-md:-translate-y-full' : ''
        } ${light ? 'text-porcelain' : 'text-ink max-md:bg-porcelain/80 max-md:backdrop-blur-xl'}`}
      >
        <div
          className={`wrap flex h-16 items-center justify-between md:transition-[max-width,margin,height,padding,border-radius,background-color,box-shadow] md:duration-700 md:ease-expo ${
            scrolled && !menuOpen
              ? `md:mt-3 md:h-14 md:w-[calc(100%-2rem)] md:max-w-[1040px] md:rounded-full md:px-6 lg:px-7 md:backdrop-blur-xl ${
                  light
                    ? 'md:bg-deep/75 md:shadow-[0_12px_40px_-12px_rgb(0_0_0/0.5),inset_0_0_0_1px_rgb(var(--porcelain)/0.1)]'
                    : 'md:bg-porcelain/85 md:shadow-[0_12px_40px_-16px_rgb(0_0_0/0.25),inset_0_0_0_1px_rgb(var(--ink)/0.08)]'
                }`
              : 'md:mt-0 md:h-20 md:max-w-[1320px] md:rounded-none'
          }`}
        >
          <a href="/" onClick={() => setMenuOpen(false)} className="text-[17px] font-semibold tracking-tight">
            Saleh Ahmad
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="link-draw text-[15px] opacity-80 hover:opacity-100">
                {link.label}
              </a>
            ))}
            <a href="/#book" className={light ? 'pill-light min-h-[42px] px-5' : 'pill-dark min-h-[42px] px-5'}>
              Book a call
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-expo ${
                menuOpen ? 'rotate-45' : '-translate-y-[4px]'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-6 bg-current transition-transform duration-500 ease-expo ${
                menuOpen ? '-rotate-45' : 'translate-y-[4px]'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-deep px-5 pb-10 pt-28 text-porcelain transition-[opacity,visibility] duration-500 md:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`border-b border-porcelain/10 py-4 text-4xl font-medium tracking-tight transition-[opacity,transform] duration-700 ease-expo ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/#book" onClick={() => setMenuOpen(false)} className="pill-light mt-auto w-full">
          Book a call
        </a>
      </div>
    </>
  );
}
