import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // We only enable the custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    
    // Use GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e) => {
      // Offset by half the width/height to center the cursor
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover effect logic
    const handleHoverEnter = () => {
      gsap.to(cursor, { scale: 3, mixBlendMode: 'difference', backgroundColor: '#CCFF00', duration: 0.3 });
    };
    
    const handleHoverLeave = () => {
      gsap.to(cursor, { scale: 1, mixBlendMode: 'normal', backgroundColor: '#CCFF00', duration: 0.3 });
    };

    // Attach listeners to all interactive elements currently in the DOM
    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .hover-target');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleHoverEnter);
        el.addEventListener('mouseleave', handleHoverLeave);
      });
    };

    attachHoverListeners();

    // Re-attach via MutationObserver for dynamically added content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          attachHoverListeners();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
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
    />
  );
}
