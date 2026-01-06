"use client"

import { useEffect } from "react";

export default function AOS_Init() {

  useEffect(() => {
    const loadAOS = async () => {
      if (typeof window === 'undefined') return;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const [{ default: AOS }] = await Promise.all([
        import('aos'),
        import('aos/dist/aos.css'),
      ]);

      AOS.init({
        once: true,
        duration: 700,
        easing: 'ease-out',
        offset: 80,
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadAOS);
    } else {
      setTimeout(loadAOS, 0);
    }
  }, []);

  return null;
}