import type { ReactNode } from 'react';

// Dark band at the top of inner pages, so the navigation sits on it the same way it sits on the hero
export default function PageHeader({ eyebrow, title, children }: { eyebrow: ReactNode; title: string; children?: ReactNode }) {
  return (
    <section
      data-tone="dark"
      className="bg-[radial-gradient(120%_80%_at_85%_0%,rgb(var(--evergreen))_0%,rgb(var(--deep))_60%)] text-porcelain"
    >
      <div className="wrap pb-16 pt-36 md:pb-24 md:pt-44">
        <div className="fade-up text-[15px] text-porcelain/60 [--d:100ms]">{eyebrow}</div>
        <h1 className="heading fade-up mt-6 max-w-[22ch] [--d:200ms]">{title}</h1>
        {children && <div className="fade-up [--d:350ms]">{children}</div>}
      </div>
    </section>
  );
}
