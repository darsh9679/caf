import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import spunkyLogo from '../assets/spunky-logo-ui.png';

function Preloader() {
  const [isMounted, setIsMounted] = useState(true);
  const preloaderRef = useRef(null);
  const wordRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(
    () => {
      document.body.classList.add('is-loading');

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.remove('is-loading');
        setIsMounted(false);
        return () => document.body.classList.remove('is-loading');
      }

      const split = new SplitText(wordRef.current, { type: 'chars' });
      const tl = gsap.timeline({
        onComplete: () => {
          split.revert();
          setIsMounted(false);
        },
      });

      tl.from(logoRef.current, {
        scale: 0.55,
        opacity: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.6)',
      })
        .from(
          split.chars,
          {
            y: 42,
            opacity: 0,
            stagger: 0.025,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.35',
        )
        .to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          delay: 0.35,
          ease: 'power4.inOut',
          onStart: () => document.body.classList.remove('is-loading'),
        });

      return () => {
        tl.kill();
        split.revert();
        document.body.classList.remove('is-loading');
      };
    },
    { scope: preloaderRef },
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-[#1C1008] px-6 text-center text-white"
      ref={preloaderRef}
    >
      <img
        className="h-24 w-auto sm:h-32"
        src={spunkyLogo}
        alt="Spunky Gourmet Cafe"
        width="180"
        height="176"
        ref={logoRef}
      />
      <p
        className="max-w-[92vw] font-display text-4xl font-semibold leading-tight text-[#F9A8D4] sm:text-7xl"
        ref={wordRef}
      >
        Spunky Gourmet Cafe
      </p>
    </div>
  );
}

export default Preloader;
