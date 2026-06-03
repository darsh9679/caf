import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DishCard from './DishCard.jsx';

function TimeSection({ period, dishes, bgColor, textColor, accentColor }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let mm;
    const ctx = gsap.context((self) => {
      const label = self.selector('.period-label');
      const cards = self.selector('.dish-card');
      const mobileReveal = self.selector('.mobile-section-reveal');

      mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.from(label, {
            clipPath: 'inset(0 100% 0 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          });
        }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.from(cards, {
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          });
        }
      });

      mm.add('(max-width: 768px)', () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.from([...mobileReveal, ...cards], {
            y: 28,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
            },
          });
        }
      });
    }, sectionRef);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id={period.key}
      className="time-section relative min-h-screen md:min-h-[140vh]"
      data-accent-color={accentColor}
      data-bg-color={bgColor}
      data-text-color={textColor}
      ref={sectionRef}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex min-h-screen items-center overflow-hidden py-24 md:sticky md:top-0">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-50"
          style={{ backgroundColor: accentColor }}
        />

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="period-label font-bold" style={{ color: textColor }}>
              {period.label}
            </p>
            <h2 className="mobile-section-reveal mt-5 font-display text-5xl font-semibold leading-tight sm:text-7xl">
              {period.title}
            </h2>
            <p className="mobile-section-reveal mt-6 max-w-md text-lg leading-8 opacity-80">
              {period.description}
            </p>
            <div className="mobile-section-reveal mt-10 flex items-center gap-4">
              <span
                className="h-12 w-12 rounded-full border"
                style={{ borderColor: accentColor }}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold" style={{ color: accentColor }}>
                {period.hours}
              </span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {dishes.slice(0, 2).map((dish) => (
              <DishCard dish={dish} accentColor={accentColor} key={dish.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimeSection;
