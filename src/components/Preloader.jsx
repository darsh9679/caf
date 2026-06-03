import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

const word = 'Spunky Gourmet Cafe';

function Preloader() {
  const [isMounted, setIsMounted] = useState(true);
  const wordRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('is-loading');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.remove('is-loading');
      setIsMounted(false);
      return () => document.body.classList.remove('is-loading');
    }

    const split = new SplitText(wordRef.current, { type: 'chars' });
    let hasRevertedSplit = false;

    const revertSplit = () => {
      if (!hasRevertedSplit) {
        split.revert();
        hasRevertedSplit = true;
      }
    };

    const exitCall = gsap.delayedCall(2, () => {
      document.body.classList.remove('is-loading');

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.preloader', {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            revertSplit();
            setIsMounted(false);
          },
        });
      }
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from(split.chars, {
        y: 80,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: 'power3.out',
      });
    }

    return () => {
      exitCall.kill();
      gsap.killTweensOf('.preloader');
      revertSplit();
      document.body.classList.remove('is-loading');
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
    >
      <p
        className="px-5 text-center font-display text-4xl font-semibold leading-tight sm:text-7xl"
        ref={wordRef}
      >
        {word}
      </p>
    </div>
  );
}

export default Preloader;
