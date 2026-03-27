import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Check } from 'lucide-react';

export default function Toast() {
  const [isVisible, setIsVisible] = useState(false);
  const toastRef = useRef(null);

  useEffect(() => {
    const showToast = () => {
      setIsVisible(true);
      
      // Reset if already playing
      gsap.set(toastRef.current, { clearProps: "all" });

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            gsap.to(toastRef.current, {
              y: 20,
              opacity: 0,
              scale: 0.9,
              duration: 0.6,
              ease: "power3.inOut",
              onComplete: () => setIsVisible(false)
            });
          }, 2000);
        }
      });

      tl.fromTo(toastRef.current, 
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.8)" }
      );
    };

    window.addEventListener('show-toast', showToast);
    return () => window.removeEventListener('show-toast', showToast);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={toastRef}
      className="fixed bottom-8 right-8 z-100 pointer-events-none"
    >
      <div className="flex items-center gap-4 bg-bg-secondary border border-accent-primary/50 px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(204,255,0,0.1)] backdrop-blur-xl">
        <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
          <Check className="w-5 h-5 text-accent-primary" strokeWidth={3} />
        </div>
        <div>
          <p className="text-accent-primary font-mono text-xs tracking-widest uppercase font-bold">Success</p>
          <p className="text-text-primary font-display font-medium">Command Copied</p>
        </div>
      </div>
    </div>
  );
}
