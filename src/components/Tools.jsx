import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, MousePointer2, MoveDown, Layers, Palette, Baseline, Eye, ClipboardCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { icon: Settings, name: 'analyze_brief', desc: 'Extracts emotional and brand signals.' },
  { icon: MousePointer2, name: 'get_animation_patterns', desc: 'Cinematic choreography and physics.' },
  { icon: MoveDown, name: 'get_scroll_system', desc: 'Flawless Lenis integration.' },
  { icon: Layers, name: 'get_webgl_pattern', desc: 'Three.js 3D and liquid shaders.' },
  { icon: Palette, name: 'get_design_system', desc: 'Fluid layout & emotional palettes.' },
  { icon: Baseline, name: 'get_typography_system', desc: 'Editorial font pairing logic.' },
  { icon: Eye, name: 'check_uniqueness', desc: 'Prevent the "sea of sameness".' },
  { icon: ClipboardCheck, name: 'audit_output', desc: 'Final awwwards-level QA pass.' }
];

export default function Tools() {
  const gridRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.tool-card', 
        { autoAlpha: 0, y: 50, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tools" className="py-32 px-6 bg-bg-primary border-y border-white/5 relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none mb-20 text-text-primary max-w-2xl uppercase tracking-tighter">
          The Eight <span className="italic text-accent-primary font-light">Vectors</span><br/>of Intelligence.
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div 
                key={idx} 
                className="tool-card group p-8 flex flex-col items-start gap-12 wireframe-card rounded-xl hover:-translate-y-2 cursor-none relative overflow-hidden bg-bg-secondary"
              >
                {/* Subtle hover gradient fade-in */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.1)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10 z-10 group-hover:scale-110 transition-transform duration-500 group-hover:border-accent-primary/50 group-hover:bg-accent-primary/10">
                  <Icon className="w-6 h-6 text-text-primary group-hover:text-accent-primary transition-colors" strokeWidth={1.5} />
                </div>
                
                <div className="z-10 mt-auto">
                  <h4 className="font-mono text-sm uppercase tracking-[0.2em] text-text-primary mb-3 bg-white/5 inline-block px-3 py-1 rounded border border-white/10 group-hover:border-accent-primary/30 group-hover:text-accent-primary transition-colors">{tool.name}</h4>
                  <p className="text-text-secondary leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
