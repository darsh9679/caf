import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function DishCard({ dish, accentColor }) {
  const isVeg = dish.tag === 'veg';
  const showSteam = dish.time === 'morning' || dish.time === 'evening';
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const handleMouseEnter = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(card, {
          scale: 1.03,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    const ctx = gsap.context((self) => {
      const steamPaths = self.selector('.steam-path');

      if (steamPaths.length) {
        gsap.set(steamPaths, {
          y: 8,
          opacity: 0.7,
        });

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          gsap.to(steamPaths, {
            y: -30,
            opacity: 0,
            duration: 1.8,
            stagger: 0.3,
            repeat: -1,
            ease: 'power1.in',
          });
        }
      }
    }, card);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(card);
      ctx.revert();
    };
  }, []);

  return (
    <article
      className="dish-card group overflow-hidden rounded-lg bg-white/75 text-[#1a0800] shadow-soft backdrop-blur-sm will-change-transform"
      ref={cardRef}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/10">
        <img
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          src={dish.image}
          srcSet={`${dish.imageSmall} 480w, ${dish.image} 760w, ${dish.imageLarge} 1200w`}
          sizes="(min-width: 1024px) 38vw, (min-width: 640px) 45vw, 90vw"
          alt={dish.name}
          width="760"
          height="570"
          loading="lazy"
        />
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
            className="dish-card-badge inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase"
            style={{ borderColor: 'var(--accent-color)', color: '#1a0800' }}
          >
            <span
              className={`h-2 w-2 rounded-full ${isVeg ? 'bg-[#3d7a5c]' : 'bg-[#c4622d]'}`}
            />
            {isVeg ? 'Veg' : 'Non-veg'}
          </span>
          <span
            className="text-lg font-bold"
            style={{ color: accentColor || 'var(--accent-color)' }}
          >
            ₹{dish.price}
          </span>
        </div>

        <h3 className="font-display text-3xl font-semibold leading-tight">
          {dish.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 opacity-75">
          {dish.description}
        </p>
      </div>
    </article>
  );
}

export default DishCard;
