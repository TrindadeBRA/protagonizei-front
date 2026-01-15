'use client'

import { useState, useEffect } from 'react'

export function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    let rafId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const checkMobile = () => {
      // Usar requestAnimationFrame para evitar reflow forçado
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 1024); // 1024px is Tailwind's lg breakpoint
      });
    };

    // Debounce para resize events
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(checkMobile, 16); // ~60fps
    };
    
    // Check initial size
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [])

  return isMobile
}
