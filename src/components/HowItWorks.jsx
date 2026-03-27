import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Analysis', desc: 'The engine parses your prompt, extracting emotional intent, brand archetype, and technical constraints before writing a single line of code.' },
  { num: '02', title: 'Choreography', desc: 'It consults the internal GSAP choreo matrix, deciding how elements should reveal, scroll, and interact based on the parsed mood.' },
  { num: '03', title: 'Typography', desc: 'It selects exact typographic pairings, calculating fluid clamp() scales that respect the golden ratio and editorial hierarchy.' },
  { num: '04', title: 'Execution', desc: 'The architecture is built in real-time. Lenis, Barba, and GSAP are initialized flawlessly, resulting in an immersive experience.' }
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal scroll logic for the timeline points
      const panels = gsap.utils.toArray('.choreo-step');
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          start: 'top 10%',
          end: () => "+=" + trackRef.current.offsetWidth
        }
      });
      
      // Progress line animation
      gsap.to('.progress-line-fill', {
        width: '100%',
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 10%',
          end: () => "+=" + trackRef.current.offsetWidth,
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-bg-primary overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 mb-20 relative z-10">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none mb-8 text-text-primary uppercase tracking-tighter">
          The <span className="italic text-accent-primary font-light">Cognitive</span> Flow.
        </h2>
        <p className="text-xl text-text-secondary max-w-xl">
          It doesn't just generate HTML. It plans the entire performance.
        </p>
      </div>

      {/* The Scroll Track */}
      <div className="relative pl-6 md:pl-[10vw] flex flex-col justify-center min-h-[50vh]">
        {/* Progress Line Background */}
        <div className="absolute top-[80px] left-0 w-full h-px bg-white/10 z-0"></div>
        {/* Progress Line Fill */}
        <div className="progress-line-fill absolute top-[80px] left-0 h-px bg-accent-primary z-10 w-0 drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"></div>

        <div ref={trackRef} className="flex gap-20 md:gap-40 w-max pr-[20vw]">
          {steps.map((step, idx) => (
            <div key={idx} className="choreo-step relative w-[300px] md:w-[400px] shrink-0 pt-20">
              {/* Node Point */}
              <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-primary z-20 -mt-2"></div>
              
              <div className="font-mono text-sm text-accent-primary mb-6 tracking-[0.2em] uppercase">Phase // {step.num}</div>
              <h3 className="font-display text-4xl mb-4 text-text-primary uppercase tracking-tight">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {step.desc}
              </p>
              
              {/* Decorative wireframe element */}
              <div className="mt-12 h-32 w-full wireframe-card rounded flex items-center justify-center border-white/5 bg-white-[0.02]">
                 <div className="flex gap-2 opacity-30">
                   <div className="w-1 h-8 bg-white/20"></div>
                   <div className="w-1 h-12 bg-white/20"></div>
                   <div className="w-1 h-4 bg-accent-primary"></div>
                   <div className="w-1 h-16 bg-white/20"></div>
                   <div className="w-1 h-8 bg-white/20"></div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
