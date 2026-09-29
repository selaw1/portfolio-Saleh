import { useEffect } from 'react';

// Adds `is-in` to every `.reveal` element the first time it enters the viewport.
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
