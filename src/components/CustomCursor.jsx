import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';

const CustomCursor = memo(function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch (desktop) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    
    // Use GSAP quickTo for GPU-accelerated tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    // Passive listener = no jank from the browser waiting to see if preventDefault is called
    window.addEventListener("mousemove", moveCursor, { passive: true });

    // Hover effect logic
    const handleHoverEnter = () => {
      gsap.to(cursor, { scale: 3, mixBlendMode: 'difference', backgroundColor: 'var(--accent-primary)', duration: 0.3 });
    };
    
    const handleHoverLeave = () => {
      gsap.to(cursor, { scale: 1, mixBlendMode: 'normal', backgroundColor: 'var(--accent-primary)', duration: 0.3 });
    };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .hover-target');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleHoverEnter, { passive: true });
        el.addEventListener('mouseleave', handleHoverLeave, { passive: true });
      });
    };

    attachHoverListeners();

    // Debounced MutationObserver to avoid thrashing on rapid DOM changes (lazy load chunks)
    let debounceTimer;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(attachHoverListeners, 200);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      clearTimeout(debounceTimer);
      const interactives = document.querySelectorAll('a, button, .hover-target');
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 bg-accent-primary rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-normal"
      style={{ willChange: 'transform' }}
    />
  );
});

export default CustomCursor;
