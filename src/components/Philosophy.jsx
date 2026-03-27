import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Philosophy() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Massive text reveals
      const split = new SplitText(".phil-line", { type: "lines,words" });
      
      gsap.from(split.words, {
        opacity: 0.1,
        stagger: 0.05,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true
        }
      });
      
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-52 px-6 min-h-[150vh] flex items-center justify-center bg-bg-primary">
      <div className="max-w-[1440px] mx-auto text-center w-full">
        <h2 className="font-display text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.9] tracking-tighter mx-auto flex flex-col gap-6 uppercase">
          <div className="pb-4">
            <span className="phil-line block text-text-primary/30">If it looks generic,</span>
          </div>
          <div className="pb-4">
            <span className="phil-line block line-through decoration-4 decoration-red-600 text-text-primary/50">it's rejected.</span>
          </div>
          <div className="pb-4 pt-12 md:pt-20">
            <span className="phil-line block text-text-primary/60">If it feels average,</span>
          </div>
          <div className="pb-4">
            <span className="phil-line block line-through decoration-4 decoration-red-600 text-text-primary/80">it's rebuilt.</span>
          </div>
          <div className="pb-4 pt-12 md:pt-20">
            <span className="phil-line block text-text-primary">If it wouldn't win awards,</span>
          </div>
          <div className="pb-4">
            <span className="phil-line block italic text-accent-primary font-light">it doesn't ship.</span>
          </div>
        </h2>
      </div>
    </section>
  );
}
