import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText);

export default function Hero() {
  const container = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const split = new SplitText(".hero-title-line", { type: "lines,chars", linesClass: "overflow-hidden" });
      
      const tl = gsap.timeline();
      
      tl.from(split.chars, {
        yPercent: 120,
        autoAlpha: 0,
        stagger: 0.02,
        duration: 1.2,
        ease: "expo.out",
        onComplete: () => split.revert()
      })
      .from('.hero-badge', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.6")
      .from('.hero-npm-card', { y: 30, opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out' }, "-=0.6");
        
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-12 bg-bg-primary">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)' }}></div>
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto layout-grid grid-cols-12 gap-6 items-center">
        
        <div className="col-span-12 lg:col-span-12 flex flex-col items-center text-center">
          <div className="hero-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-text-primary/10 mb-12 bg-text-primary/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_8px_var(--color-accent-primary)] animate-pulse"></span>
            <span className="text-sm font-medium tracking-widest text-text-primary uppercase">v1.0.1 // Cinematic Web</span>
          </div>
          
          <h1 className="font-display text-[clamp(4rem,10vw,12rem)] leading-[0.85] tracking-tighter mb-8 text-text-primary uppercase">
            <div className="hero-title-line text-left">Intelligence</div>
            <div className="hero-title-line text-right lg:-mt-4 text-accent-primary">Rendered.</div>
          </h1>
          
          <div className="hero-subtitle flex flex-col items-center gap-8 mt-4">
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-text-secondary max-w-xl leading-relaxed">
              We ditched the templates. We ditched the generic SaaS waves. This is high-octane creative execution powered by an internal thinking engine.
            </p>
            
            <div className="hero-npm-card hover-target cursor-none group relative">
              <div className="absolute -inset-1 bg-linear-to-r from-accent-primary to-accent-hover rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-8 py-5 flex items-center gap-6 bg-bg-secondary rounded-xl border border-text-primary/10">
                <code className="text-text-primary font-mono text-lg font-medium tracking-widest">npm i ps-creative-engine</code>
                <div className="w-px h-6 bg-text-primary/20"></div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('npm i ps-creative-engine');
                    window.dispatchEvent(new CustomEvent('show-toast'));
                  }}
                  className="text-accent-primary group-hover:text-text-primary transition-all hover:scale-125 active:scale-90"
                  aria-label="Copy install command"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
