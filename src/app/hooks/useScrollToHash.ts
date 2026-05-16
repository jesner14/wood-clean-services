import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scroll vers l’ancre (#service-01…) après navigation — header fixe ~96px */
export function useScrollToHash(headerOffset = 108) {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };

    const t = window.setTimeout(scrollToTarget, 150);
    return () => window.clearTimeout(t);
  }, [hash, pathname, headerOffset]);
}
