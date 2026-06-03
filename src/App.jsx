import { useEffect, useMemo } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { heroDishes } from './data/menu.js';
import CategoryFilter from './components/CategoryFilter.jsx';
import CursorFork from './components/CursorFork.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import PageTransition from './components/PageTransition.jsx';
import Preloader from './components/Preloader.jsx';
import TimeSection from './components/TimeSection.jsx';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip);
gsap.ticker.lagSmoothing(0);

const periods = [
  {
    key: 'morning',
    label: 'Morning',
    title: 'Golden starts, plated softly.',
    description:
      'Warm light, house breads, bold coffee and breakfast plates for Bandra mornings that deserve a little ceremony.',
    hours: '10am-1pm',
    bgColor: '#FDF8F3',
    textColor: '#2c1810',
    accentColor: '#F9A8D4',
  },
  {
    key: 'afternoon',
    label: 'Afternoon',
    title: 'Bright plates for a clean pause.',
    description:
      'Airy greens, open sandwiches, and crisp textures for the sunniest stretch of the day.',
    hours: '1pm-5pm',
    bgColor: '#F5EDE0',
    textColor: '#1a2420',
    accentColor: '#93C5FD',
  },
  {
    key: 'evening',
    label: 'Evening',
    title: 'Mains, melted and golden.',
    description:
      'Hearty sandwiches, wood-fired pizzas and pasta crafted for the longest part of your day.',
    hours: '5pm-9pm',
    bgColor: '#2C1F0E',
    textColor: '#f5ede0',
    accentColor: '#F9A8D4',
  },
  {
    key: 'night',
    label: 'Night',
    title: 'Espresso mood, gold finish.',
    description:
      'End well. Desserts, specialty coffee and late-night drinks that close the evening right.',
    hours: '9pm-11pm',
    bgColor: '#1C1008',
    textColor: '#f5ede0',
    accentColor: '#93C5FD',
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

  useGSAP(() => {
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
          start: 'top 80%',
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
        <CategoryFilter />
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
