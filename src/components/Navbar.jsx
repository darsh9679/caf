import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import spunkyLogo from '../assets/spunky-logo-ui.png';

const menuUrl = 'https://spunkygourmetcafe2.vercel.app/';

function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const showNav = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.navbar', {
          yPercent: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.set('.navbar', { yPercent: 0 });
      }
    };

    const hideNav = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.navbar', {
          yPercent: -100,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.set('.navbar', { yPercent: -100 });
      }
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setHasScrolled(self.scroll() > 12);

        if (self.scroll() < 120 || self.direction === -1) {
          showNav();
        } else {
          hideNav();
        }
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf('.navbar');
    };
  }, []);

  return (
    <header
      className="navbar fixed left-0 top-0 z-50 w-full"
    >
      <nav
        className={`mx-auto flex h-20 max-w-7xl items-center justify-between px-5 transition-colors duration-500 sm:px-8 ${
          hasScrolled ? 'shadow-sm backdrop-blur-xl' : ''
        }`}
        style={{
          backgroundColor: hasScrolled ? 'rgba(253, 246, 236, 0.82)' : 'transparent',
          color: hasScrolled ? 'var(--page-text-color)' : '#fdf6ec',
        }}
        aria-label="Primary navigation"
      >
        <a
          className="flex items-center gap-3"
          href="#top"
          aria-label="Spunky Gourmet Cafe home"
        >
          <img
            className="h-12 w-auto drop-shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
            src={spunkyLogo}
            alt="Spunky Gourmet Cafe"
            width="180"
            height="176"
            loading="lazy"
          />
          <span
            className="hidden font-display text-xl font-semibold leading-none sm:block"
            style={{ color: hasScrolled ? 'var(--accent-color)' : 'inherit' }}
          >
            Spunky Gourmet Cafe
          </span>
        </a>

        <div className="flex items-center gap-2 text-sm font-medium">
          <a
            className="rounded-full px-4 py-2 transition hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current"
            href={menuUrl}
            target="_blank"
            rel="noreferrer"
          >
            Menu
          </a>
          <a
            className="rounded-full border border-current px-4 py-2 transition hover:bg-current hover:text-white focus:outline-none focus:ring-2 focus:ring-current"
            href="tel:+918591022020"
            style={{
              borderColor: hasScrolled ? 'var(--accent-color)' : 'currentColor',
            }}
          >
            Reserve
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
