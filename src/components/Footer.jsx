import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import spunkyLogo from '../assets/spunky-logo-ui.png';

const qrMenuUrl = 'https://spunkygourmetcafe2.vercel.app/';

function Footer() {
  const footerRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return undefined;
      }

      gsap.from('.footer-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: footerRef },
  );

  const handleButtonMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const btn = buttonRef.current;
    const rect = btn.getBoundingClientRect();

    gsap.to(btn, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.3,
      y: (event.clientY - rect.top - rect.height / 2) * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
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
      className="bg-[#1C1008] px-5 py-16 text-[#f5ede0] sm:px-8"
      ref={footerRef}
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_0.8fr] md:items-end">
        <div className="footer-reveal">
          <img
            className="h-24 w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
            src={spunkyLogo}
            alt="Spunky Gourmet Cafe"
            width="180"
            height="176"
            loading="lazy"
          />
          <p className="period-label mt-5 font-bold text-[#F9A8D4]">
            Spunky Gourmet Cafe
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">
            Bandra, Mumbai
          </h2>
          <p className="mt-5 max-w-2xl text-[#f5ede0]/78">
            All-day gourmet plates, artisanal coffee and house-made breads — near Mount Mary
            Steps, Bandra West, Mumbai
          </p>
        </div>

        <div className="footer-reveal flex flex-col items-start gap-5 md:items-end md:text-right">
          <p className="max-w-sm text-sm leading-6 text-[#f5ede0]/72">
            Tertullian Road, Next to St. Stephen&apos;s Steps, Mount Mary, Bandra (W),
            Mumbai – 400050
          </p>
          <a className="font-bold text-[#93C5FD]" href="tel:+919619234545">
            +91 96192 34545
          </a>
          <a
            className="font-bold text-[#F9A8D4] underline-offset-4 hover:underline"
            href="https://www.instagram.com/spunkygourmetcafe"
            target="_blank"
            rel="noreferrer"
          >
            @spunkygourmetcafe
          </a>
          <a
            className="rounded-full bg-[#F9A8D4] px-8 py-4 text-sm font-black text-[#1a0800] shadow-[0_20px_50px_rgba(249,168,212,0.32)] transition hover:bg-[#93C5FD] focus:outline-none focus:ring-2 focus:ring-[#F9A8D4] focus:ring-offset-2 focus:ring-offset-[#1C1008]"
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

      <p className="footer-reveal mx-auto mt-12 max-w-7xl text-sm font-black uppercase tracking-[0.2em] text-[#F9A8D4]">
        Made with love in Bandra ♥
      </p>
    </footer>
  );
}

export default Footer;
