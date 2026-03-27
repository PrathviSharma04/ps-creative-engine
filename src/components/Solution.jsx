import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Solution() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax effect on floating shapes
      gsap.to('.solution-shape', {
        y: (i) => (i + 1) * -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Reveal the massive text block
      const splitTextLines = gsap.utils.toArray('.solution-text-reveal');
      splitTextLines.forEach(line => {
        gsap.from(line, {
          opacity: 0,
          y: 60,
          rotationX: 45,
          transformOrigin: "center top",
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="solution" className="py-40 px-6 relative overflow-hidden bg-bg-secondary border-y border-text-primary/5">
      {/* Decorative Parallax Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="solution-shape absolute w-64 h-64 border border-accent-primary rounded-full top-[10%] -left-10 opacity-30"></div>
        <div className="solution-shape absolute w-96 h-96 bg-accent-primary mix-blend-overlay blur-[120px] rounded-full bottom-[20%] right-[-10%] opacity-20"></div>
        <div className="solution-shape absolute w-32 h-32 border border-text-primary rounded-lg rotate-12 top-[60%] left-[15%] opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-4 mb-16">
          <div className="w-12 h-px bg-accent-primary"></div>
          <span className="text-accent-primary font-mono text-xs tracking-[0.3em] uppercase">The Architecture</span>
          <div className="w-12 h-px bg-accent-primary"></div>
        </div>

        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-tighter text-text-primary max-w-5xl perspective-[1000px] uppercase">
          <div className="solution-text-reveal pb-2">It decides how things move.</div>
          <div className="solution-text-reveal pb-2">It decides how things feel.</div>
          <div className="solution-text-reveal pb-6 text-accent-primary italic font-light">It decides how things are structured.</div>
        </h2>

        <div className="mt-20 max-w-3xl px-12 py-12 wireframe-card rounded-2xl mx-auto transition-transform hover:-translate-y-2 duration-700 bg-bg-primary/50 backdrop-blur-xl relative group">
          <div className="absolute inset-0 bg-accent-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="font-display text-4xl text-text-primary mb-6 uppercase tracking-tight relative z-10">
            "This is not a tool. <br/><span className="text-accent-primary italic">It's a creative brain.</span>"
          </h3>
          <p className="text-lg text-text-secondary leading-relaxed relative z-10">
            By acting as a Model Context Protocol, the engine hooks directly into your AI workflow, 
            providing instant access to elite design systems, GSAP choreography matrices, WebGL 
            patterns, and rigorous anti-generic auditing.
          </p>
        </div>
      </div>
    </section>
  );
}
