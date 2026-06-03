import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function CursorFork() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cursor, { display: 'none' });
      return undefined;
    }

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 0.9,
      rotate: -12,
    });

    const handleMouseMove = (event) => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.cursor-fork', {
          x: event.clientX,
          y: event.clientY,
          opacity: 1,
          duration: 0.12,
          ease: 'power2.out',
        });
      }
    };

    const handleCardOver = (event) => {
      const card = event.target.closest('.dish-card');

      if (!card || card.contains(event.relatedTarget)) {
        return;
      }

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.cursor-fork', {
          rotate: 45,
          scale: 1.3,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    };

    const handleCardOut = (event) => {
      const card = event.target.closest('.dish-card');

      if (!card || card.contains(event.relatedTarget)) {
        return;
      }

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.cursor-fork', {
          rotate: -12,
          scale: 0.9,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleCardOver);
    document.addEventListener('mouseout', handleCardOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleCardOver);
      document.removeEventListener('mouseout', handleCardOut);
      gsap.killTweensOf('.cursor-fork');
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="cursor-fork pointer-events-none fixed left-0 top-0 z-[90] hidden h-12 w-12 text-[var(--accent-color)] mix-blend-difference md:block"
      ref={cursorRef}
    >
      <svg fill="none" viewBox="0 0 48 48">
        <path
          d="M18 4V20M24 4V20M30 4V20M18 20C18 26 24 28 24 34V44M30 20C30 26 24 28 24 34"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

export default CursorFork;
