import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const tagStyles = {
  veg: { label: 'VEG', dot: '#16a34a', border: '#16a34a', bg: '#ecfdf5' },
  'non-veg': { label: 'NON-VEG', dot: '#dc2626', border: '#dc2626', bg: '#fef2f2' },
  'veg+non-veg': {
    label: 'VEG+NON-VEG',
    dot: '#f97316',
    border: '#f97316',
    bg: '#fff7ed',
  },
  vegan: { label: 'VEGAN', dot: '#0f766e', border: '#0f766e', bg: '#f0fdfa' },
  jain: { label: 'JAIN', dot: '#7c3aed', border: '#7c3aed', bg: '#f5f3ff' },
  coffee: { label: 'COFFEE', dot: '#7c2d12', border: '#7c2d12', bg: '#fff7ed' },
  drink: { label: 'DRINKS', dot: '#2563eb', border: '#2563eb', bg: '#eff6ff' },
};

function DishCard({ dish, accentColor }) {
  const showSteam = dish.time === 'morning' || dish.time === 'evening';
  const cardRef = useRef(null);
  const priceRef = useRef(null);
  const tag = tagStyles[dish.tag] || tagStyles.veg;

  useGSAP(
    () => {
      const card = cardRef.current;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (priceRef.current) {
          priceRef.current.textContent = dish.price;
        }
        return undefined;
      }

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.025,
          y: -4,
          duration: 0.28,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      const counter = { value: 0 };
      gsap.to(counter, {
        value: dish.price,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          if (priceRef.current) {
            priceRef.current.textContent = Math.round(counter.value);
          }
        },
      });

      const steamPaths = card.querySelectorAll('.steam-path');
      if (steamPaths.length) {
        gsap.set(steamPaths, { y: 8, opacity: 0.7 });
        gsap.to(steamPaths, {
          y: -30,
          opacity: 0,
          duration: 1.8,
          stagger: 0.3,
          repeat: -1,
          ease: 'power1.in',
        });
      }

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        gsap.killTweensOf(card);
        gsap.killTweensOf(counter);
        gsap.killTweensOf(steamPaths);
      };
    },
    { scope: cardRef, dependencies: [dish.price] },
  );

  return (
    <article
      className="dish-card group overflow-hidden rounded-2xl border border-white/70 bg-white/82 text-[#1a0800] shadow-[0_22px_70px_rgba(28,16,8,0.14)] backdrop-blur-xl will-change-transform"
      ref={cardRef}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/10">
        <img
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          src={dish.image}
          srcSet={`${dish.imageSmall} 480w, ${dish.image} 760w, ${dish.imageLarge} 1200w`}
          sizes="(min-width: 1280px) 28vw, (min-width: 640px) 44vw, 90vw"
          alt={dish.name}
          width="760"
          height="570"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/42 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#1a0800] backdrop-blur">
          {dish.category}
        </span>
        {showSteam ? (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-3 z-10 h-24 w-28 -translate-x-1/2 text-white/80 drop-shadow"
            fill="none"
            viewBox="0 0 112 96"
          >
            <path
              className="steam-path"
              d="M32 78C20 61 45 55 32 38C24 27 31 18 41 12"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              className="steam-path"
              d="M56 82C45 64 69 56 56 39C48 28 56 17 67 10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              className="steam-path"
              d="M80 78C68 60 92 54 80 37C72 26 80 18 91 12"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
        ) : null}
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"
            style={{
              borderColor: tag.border,
              backgroundColor: tag.bg,
              color: tag.border,
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.dot }} />
            {tag.label}
          </span>
          <span className="text-lg font-black" style={{ color: accentColor }}>
            ₹<span ref={priceRef}>0</span>
          </span>
        </div>

        <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
          {dish.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#3c2a22]/76">
          {dish.description}
        </p>
      </div>
    </article>
  );
}

export default DishCard;
