import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingNumbersProps {
  className?: string;
}

export default function FloatingNumbers({ className = '' }: FloatingNumbersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const numbers = [
      '$', '€', '£', '¥', '%', 
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      '+', '-', '=', '×', '÷',
      '.00', '.99', ',', 
      '📊', '📈', '💰', '💵', '💳'
    ];

    const createFloatingNumber = () => {
      if (!containerRef.current) return;

      const number = numbers[Math.floor(Math.random() * numbers.length)];
      const element = document.createElement('div');
      element.textContent = number;
      element.className = 'floating-number absolute text-primary/20 dark:text-primary/10 font-bold pointer-events-none';
      element.style.fontSize = `${Math.random() * 30 + 20}px`;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;

      containerRef.current.appendChild(element);

      gsap.to(element, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        rotation: Math.random() * 360 - 180,
        duration: Math.random() * 3 + 4,
        ease: 'power1.out',
        onComplete: () => {
          element.remove();
        }
      });
    };

    const interval = setInterval(createFloatingNumber, 400);

    // Create initial burst
    for (let i = 0; i < 15; i++) {
      setTimeout(createFloatingNumber, i * 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
