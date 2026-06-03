import { useEffect, useMemo } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { heroDishes } from './data/menu.js';
import CursorFork from './components/CursorFork.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import PageTransition from './components/PageTransition.jsx';
import Preloader from './components/Preloader.jsx';
import TimeSection from './components/TimeSection.jsx';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
gsap.ticker.lagSmoothing(0);

const periods = [
  {
    key: 'morning',
    label: 'Morning',
    title: 'Golden starts, plated softly.',
    description:
      'Warm light, slow coffee, and breakfast classics for Bandra mornings that deserve a little ceremony.',
    hours: '6am-11am',
    bgColor: '#fdf6ec',
    textColor: '#2c1810',
    accentColor: '#c9933a',
  },
  {
    key: 'afternoon',
    label: 'Afternoon',
    title: 'Bright plates for a clean pause.',
    description:
      'Airy greens, open sandwiches, and crisp textures for the sunniest stretch of the day.',
    hours: '12pm-3pm',
    bgColor: '#f8f8f4',
    textColor: '#1a2420',
    accentColor: '#3d7a5c',
  },
  {
    key: 'evening',
    label: 'Evening',
    title: 'Terracotta hours, toasted edges.',
    description:
      'Small plates and comforting bites that move from workday appetite into easy conversation.',
    hours: '4pm-7pm',
    bgColor: '#f5e8e0',
    textColor: '#2d1a14',
    accentColor: '#c4622d',
  },
  {
    key: 'night',
    label: 'Night',
    title: 'Espresso mood, gold finish.',
    description:
      'Late plates with richer spice, softer shadows, and a dessert-before-goodbye kind of glow.',
    hours: '8pm-late',
    bgColor: '#1a0800',
    textColor: '#f5ede0',
    accentColor: '#c9933a',
  },
];

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smooth: true,
    });

    let frameId;

    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(frameId);
      if (typeof lenis.off === 'function') {
        lenis.off('scroll', ScrollTrigger.update);
      }
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const setPageTheme = (section) => {
      const { bgColor, textColor, accentColor } = section.dataset;

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(document.body, {
          backgroundColor: bgColor,
          color: textColor,
          duration: 0.8,
          ease: 'power2.inOut',
        });

        gsap.to(document.documentElement, {
          '--accent-color': accentColor,
          '--page-text-color': textColor,
          duration: 0.8,
          ease: 'power2.inOut',
        });
      } else {
        gsap.set(document.body, {
          backgroundColor: bgColor,
          color: textColor,
        });

        gsap.set(document.documentElement, {
          '--accent-color': accentColor,
          '--page-text-color': textColor,
        });
      }
    };

    const ctx = gsap.context(() => {
      gsap.set(document.documentElement, {
        '--accent-color': periods[0].accentColor,
        '--page-text-color': periods[0].textColor,
      });

      gsap.set(document.body, {
        backgroundColor: periods[0].bgColor,
        color: periods[0].textColor,
      });

      gsap.utils.toArray('.time-section').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setPageTheme(section),
          onEnterBack: () => setPageTheme(section),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const dishesByPeriod = useMemo(() => {
    return heroDishes.reduce((grouped, dish) => {
      grouped[dish.time] = grouped[dish.time] || [];
      grouped[dish.time].push(dish);
      return grouped;
    }, {});
  }, []);

  return (
    <>
      <div aria-hidden="true" className="grain" />
      <PageTransition />
      <Preloader />
      <CursorFork />
      <Navbar />
      <main id="menu">
        <Hero />
        {periods.map((period) => (
          <TimeSection
            accentColor={period.accentColor}
            bgColor={period.bgColor}
            dishes={dishesByPeriod[period.key] || []}
            key={period.key}
            period={period}
            textColor={period.textColor}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
