import { useEffect } from 'react';
import gsap from 'gsap';

function PageTransition() {
  useEffect(() => {
    const handleLinkClick = (event) => {
      const link = event.target.closest('a[href]');

      if (
        !link ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      const href = link.getAttribute('href');

      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const url = new URL(href, window.location.href);
      const isSamePageHash =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.hash;

      event.preventDefault();
      gsap.set('.page-transition', {
        scaleY: 0,
        transformOrigin: 'bottom',
      });

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.page-transition', {
          scaleY: 1,
          duration: 0.5,
          ease: 'power4.in',
          onComplete: () => {
            if (isSamePageHash) {
              const target = document.querySelector(url.hash);
              window.history.pushState(null, '', url.hash);
              target?.scrollIntoView({ behavior: 'auto', block: 'start' });

              gsap.set('.page-transition', {
                transformOrigin: 'top',
              });

              if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                gsap.to('.page-transition', {
                  scaleY: 0,
                  duration: 0.5,
                  ease: 'power4.out',
                });
              }
              return;
            }

            window.location.href = url.href;
          },
        });
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      gsap.killTweensOf('.page-transition');
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="page-transition pointer-events-none fixed inset-0 z-[10000] origin-bottom scale-y-0 bg-[#1a0800]"
    />
  );
}

export default PageTransition;
