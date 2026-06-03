import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import DishCard from './DishCard.jsx';

function TimeSection({ period, dishes, bgColor, textColor, accentColor }) {
  const sectionRef = useRef(null);

  const groupedDishes = useMemo(() => {
    return dishes.reduce((groups, dish) => {
      groups[dish.category] = groups[dish.category] || [];
      groups[dish.category].push(dish);
      return groups;
    }, {});
  }, [dishes]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return undefined;
      }

      gsap.from('.section-heading', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.time-badge', {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.dish-card', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.dish-card img', {
        scale: 0.95,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: sectionRef, dependencies: [dishes.length] },
  );

  return (
    <section
      id={period.key}
      className="time-section relative overflow-hidden px-5 py-20 sm:px-8 lg:py-28"
      data-accent-color={accentColor}
      data-bg-color={bgColor}
      data-text-color={textColor}
      ref={sectionRef}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: period.key === 'afternoon' ? '#F9A8D4' : '#93C5FD' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="section-heading">
            <p className="period-label font-bold" style={{ color: accentColor }}>
              {period.label}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-tight sm:text-7xl">
              {period.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 opacity-80 sm:text-lg">
              {period.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <span
              className="time-badge rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.18em]"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {period.hours}
            </span>
            <span className="rounded-full bg-white/40 px-5 py-3 text-sm font-bold text-current backdrop-blur">
              {dishes.length} plates
            </span>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {Object.entries(groupedDishes).map(([category, categoryDishes]) => (
            <div key={category}>
              <div className="mb-5 flex items-center gap-4">
                <h3 className="font-display text-3xl font-semibold">{category}</h3>
                <span
                  className="h-px flex-1 opacity-40"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {categoryDishes.map((dish) => (
                  <DishCard dish={dish} accentColor={accentColor} key={dish.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TimeSection;
