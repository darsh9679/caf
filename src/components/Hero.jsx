import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollLineRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return undefined;
      }

      const split = new SplitText(titleRef.current, { type: 'words' });
      const tl = gsap.timeline();

      tl.from(split.words, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      }).from(
        subtitleRef.current,
        {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.25',
      );

      gsap.to(imageRef.current, {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.fromTo(
        scrollLineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          repeat: -1,
          duration: 1.2,
          ease: 'power2.inOut',
        },
      );

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#fff8fb] text-[#1a0800]"
      ref={sectionRef}
    >
      <img
        className="absolute inset-0 h-[115%] w-full object-cover"
        ref={imageRef}
        src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=78"
        srcSet="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=72 800w, https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=78 1400w, https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=80 1800w"
        sizes="100vw"
        alt="Bright warm gourmet cafe table with coffee and food"
        loading="lazy"
        width="1400"
        height="933"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,251,0.96)_0%,rgba(255,248,251,0.82)_42%,rgba(255,248,251,0.22)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDF8F3] to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl content-end gap-8 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.72fr] lg:items-end lg:pb-24">
        <div className="min-w-0 max-w-full">
          <p className="period-label mb-5 font-bold text-[#9f476f]">
            Bandra, Mumbai · Gourmet Cafe
          </p>
          <h1
            className="hero-title max-w-[calc(100vw-40px)] break-words font-display text-5xl font-semibold leading-[0.92] sm:max-w-5xl sm:text-8xl lg:text-9xl"
            ref={titleRef}
          >
            Gourmet, Reimagined
          </h1>
          <p
            className="mt-6 max-w-[330px] text-lg leading-8 text-[#40261d] sm:max-w-2xl sm:text-2xl"
            ref={subtitleRef}
          >
            Fresh breads, bold coffee & gourmet plates — near Mount Mary Steps
          </p>

          <div className="mt-8 flex max-w-[calc(100vw-40px)] flex-wrap gap-3 sm:max-w-none">
            <a
              className="rounded-full bg-[#F9A8D4] px-6 py-3 text-sm font-bold text-[#1a0800] shadow-[0_18px_45px_rgba(249,168,212,0.38)] transition hover:bg-[#93C5FD]"
              href="#morning"
            >
              Explore dishes
            </a>
            <a
              className="rounded-full border border-[#1a0800]/18 bg-white/60 px-6 py-3 text-sm font-bold text-[#1a0800] backdrop-blur transition hover:border-[#93C5FD]"
              href="https://spunkygourmetcafe2.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              View full menu
            </a>
          </div>

          <div className="mt-14 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#40261d]/70">
            <span>Scroll</span>
            <span className="h-px w-24 overflow-hidden bg-[#1a0800]/15">
              <span
                className="block h-full w-full bg-[#F9A8D4]"
                ref={scrollLineRef}
              />
            </span>
          </div>
        </div>

        <aside className="grid min-w-0 max-w-[calc(100vw-40px)] gap-3 sm:max-w-none sm:grid-cols-3 lg:grid-cols-1">
          {[
            ['Now serving', 'Breakfast 10am-1pm'],
            ['Signature', 'House breads & bold coffee'],
            ['Find us', 'Near Mount Mary Steps'],
          ].map(([label, value]) => (
            <div
              className="rounded-2xl border border-white/70 bg-white/72 p-4 shadow-[0_20px_55px_rgba(42,24,16,0.12)] backdrop-blur-xl"
              key={label}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9f476f]">
                {label}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold leading-tight text-[#1a0800]">
                {value}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

export default Hero;
