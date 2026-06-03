import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const scrollCueRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let split;

    const ctx = gsap.context(() => {
      split = new SplitText(titleRef.current, { type: 'words' });

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.from(split.words, {
          y: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
        });
      }

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(scrollCueRef.current, {
          y: 10,
          yoyo: true,
          repeat: -1,
          duration: 0.8,
          ease: 'power1.inOut',
        });
      }

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(imageRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-end overflow-hidden bg-[#1a0800] text-[#fdf6ec]"
      ref={sectionRef}
    >
      <img
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        ref={imageRef}
        src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=75"
        srcSet="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=72 800w, https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=75 1200w, https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=78 1600w"
        sizes="100vw"
        alt="A refined cafe table set with plated dishes"
        loading="lazy"
        width="1200"
        height="800"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0800] via-[#1a0800]/45 to-[#1a0800]/20" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-5 pb-24 pt-28 sm:px-8 lg:pb-28">
        <p className="period-label mb-5 text-[#c9933a]">Time of Day × Tasting Menu</p>
        <h1
          className="hero-title max-w-5xl font-display text-6xl font-semibold leading-[0.95] sm:text-8xl lg:text-9xl"
          ref={titleRef}
        >
          Gourmet, Reimagined
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[#f5ede0]/88 sm:text-2xl">
          All-day dining · Bandra, Mumbai
        </p>

        <div className="mt-16 flex items-center gap-3 text-sm font-medium text-[#f5ede0]/75">
          <span className="h-px w-12 bg-[#c9933a]" />
          <span>Scroll</span>
          <span
            className="scroll-cue block h-8 w-px bg-[#f5ede0]/70"
            ref={scrollCueRef}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
