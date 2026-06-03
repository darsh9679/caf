import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import spunkyLogo from '../assets/spunky-logo-ui.png';

const qrMenuUrl =
  'https://spunkygourmetcafe2.vercel.app/';

function Footer() {
  const footerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const ctx = gsap.context((self) => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.from(self.selector('.footer-reveal'), {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleButtonMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const btn = buttonRef.current;
    const rect = btn.getBoundingClientRect();

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(btn, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.3,
        y: (event.clientY - rect.top - rect.height / 2) * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleButtonLeave = () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.45)',
      });
    }
  };

  return (
    <footer
      className="bg-[#100500] px-5 py-16 text-[#f5ede0] sm:px-8"
      ref={footerRef}
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="footer-reveal">
          <img
            className="h-20 w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
            src={spunkyLogo}
            alt="Spunky Gourmet Cafe"
            width="180"
            height="176"
            loading="lazy"
          />
          <p className="period-label mt-5 text-[#c9933a]">
            Spunky Gourmet Cafe
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">
            Bandra, Mumbai
          </h2>
          <p className="mt-5 max-w-lg text-[#f5ede0]/72">
            All-day plates, specialty coffee, and late-night comfort near Mount Mary Steps.
          </p>
        </div>

        <div className="footer-reveal flex flex-col items-start gap-4 md:items-end">
          <a
            className="text-sm font-semibold text-[#c9933a] underline-offset-4 hover:underline"
            href="https://www.instagram.com/spunkygourmetcafe/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="rounded-full bg-[#c9933a] px-6 py-3 text-sm font-bold text-[#1a0800] transition hover:bg-[#f5ede0] focus:outline-none focus:ring-2 focus:ring-[#c9933a] focus:ring-offset-2 focus:ring-offset-[#100500]"
            href={qrMenuUrl}
            onMouseLeave={handleButtonLeave}
            onMouseMove={handleButtonMove}
            ref={buttonRef}
            target="_blank"
            rel="noreferrer"
          >
            View Full Menu →
          </a>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="mx-auto mt-12 max-w-7xl text-[11px] uppercase tracking-[0.2em] text-[#f5ede0]/60"
      >
        made with love in Bandra
      </p>
    </footer>
  );
}

export default Footer;
