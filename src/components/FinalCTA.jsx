import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const ctaRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Scaled entrance
      gsap.from('.cta-content', {
        scale: 0.95,
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 85%',
        }
      });
      
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="final-cta" ref={ctaRef} className="py-52 px-6 relative overflow-hidden bg-bg-primary border-t border-text-primary/5">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[800px] h-[800px] bg-accent-primary/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="cta-content max-w-5xl mx-auto text-center relative z-10">
        <h2 className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.85] tracking-tighter text-text-primary mb-16 uppercase">
          Initialize <br/><span className="italic text-accent-primary font-light">The Engine.</span>
        </h2>

        <div 
          onClick={() => {
            navigator.clipboard.writeText('npm i ps-creative-engine');
            window.dispatchEvent(new CustomEvent('show-toast'));
          }}
          className="inline-block hover-target cursor-none group active:scale-95 transition-transform duration-200"
        >
          <div className="relative px-12 py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 bg-bg-secondary rounded-2xl border border-text-primary/10 transition-transform duration-500 group-hover:scale-105 group-hover:border-accent-primary/50 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, var(--color-accent-primary) 0%, transparent 100%)' }}></div>
            
            <code className="text-text-primary font-mono text-xl md:text-3xl font-medium tracking-widest relative z-10 text-center">npm i ps-creative-engine</code>
            
            <div className="hidden md:block w-px h-12 bg-text-primary/20 relative z-10"></div>
            
            <button className="text-sm md:text-lg uppercase tracking-[0.2em] text-accent-primary font-bold flex items-center gap-3 group-hover:gap-5 transition-all duration-300 relative z-10">
              Copy Command <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
