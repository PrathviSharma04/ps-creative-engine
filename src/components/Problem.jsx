import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Problem() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const split = new SplitText(".manifesto-text", { type: "words,chars" });
      
      gsap.from(split.words, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1
        },
        opacity: 0.1,
        stagger: 0.1,
        y: 20
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="problem" className="relative min-h-[150vh] bg-bg-primary py-32 px-6 flex items-center justify-center border-y border-text-primary/5">
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="w-12 h-px bg-text-primary/20"></div>
          <span className="text-accent-primary font-mono text-xs tracking-[0.3em] uppercase">The Status Quo</span>
          <div className="w-12 h-px bg-text-primary/20"></div>
        </div>
        
        <p className="manifesto-text font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] tracking-tight text-text-primary font-medium">
          The web has become a sea of identical templates. 
          Perfectly functional. <span className="text-text-primary/40 italic">Entirely forgettable.</span> Algorithms build grids, but they 
          do not understand <span className="text-accent-primary">tension, rhythm, or soul.</span> 
          We built an engine to change that.
        </p>
      </div>
    </section>
  );
}
