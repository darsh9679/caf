import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import spunkyLogo from '../assets/spunky-logo-ui.png';

const menuUrl = 'https://spunkygourmetcafe2.vercel.app/';

function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useGSAP(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from('.navbar-logo', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.55)',
      });
    }

    const showNav = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.navbar', {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.set('.navbar', { y: 0 });
      }
    };

    const hideNav = () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.navbar', {
          y: -100,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.set('.navbar', { y: -100 });
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
      gsap.killTweensOf('.navbar-logo');
    };
  }, []);

  return (
    <header className="navbar fixed left-0 right-0 top-0 z-50 w-screen max-w-[100vw] overflow-hidden px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex h-20 w-[calc(100vw-24px)] max-w-7xl items-center justify-between rounded-full border px-3 transition-colors duration-500 sm:w-full sm:px-6 ${
          hasScrolled ? 'border-white/70 shadow-[0_18px_55px_rgba(28,16,8,0.12)] backdrop-blur-xl' : 'border-transparent'
        }`}
        style={{
          backgroundColor: hasScrolled ? 'rgba(255, 248, 251, 0.84)' : 'rgba(255,255,255,0.18)',
          color: hasScrolled ? 'var(--page-text-color)' : '#1a0800',
        }}
        aria-label="Primary navigation"
      >
        <a
          className="navbar-logo flex min-w-0 shrink items-center gap-2 sm:gap-3"
          href="#top"
          aria-label="Spunky Gourmet Cafe home"
        >
          <img
            className="h-11 w-auto shrink-0 drop-shadow-[0_4px_14px_rgba(0,0,0,0.18)] sm:h-12"
            src={spunkyLogo}
            alt="Spunky Gourmet Cafe"
            width="180"
            height="176"
            loading="lazy"
          />
          <span
            className="hidden truncate font-display text-xl font-semibold leading-none sm:block"
            style={{ color: hasScrolled ? 'var(--accent-color)' : '#1a0800' }}
          >
            Spunky Gourmet Cafe
          </span>
        </a>

        <a
          className="shrink-0 rounded-full bg-[#F9A8D4] px-4 py-3 text-sm font-black text-[#1a0800] shadow-[0_12px_32px_rgba(249,168,212,0.34)] transition hover:bg-[#93C5FD] focus:outline-none focus:ring-2 focus:ring-[#F9A8D4] sm:px-5"
          href={menuUrl}
          target="_blank"
          rel="noreferrer"
        >
          Menu
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
