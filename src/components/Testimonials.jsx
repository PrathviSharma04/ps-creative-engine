import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "It didn't just write HTML. It literally built a completely custom Lenis and GSAP integration with staggered entrance animations.", author: "Frontend Lead", company: "Unicorn Defi" },
  { quote: "The closest thing to having a Senior Interactive Developer living inside your editor.", author: "Creative Director", company: "Studio XYZ" },
  { quote: "I asked for a landing page and it gave me a cinematic experience with liquid scrolling and custom cursors. Absolutely wild.", author: "Founder", company: "Tech Startup" }
];

export default function Testimonials() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.test-card', 
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-32 px-6 bg-bg-primary border-y border-white/5 relative">
      <div className="max-w-[1440px] mx-auto">
        
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-text-primary uppercase tracking-tighter mb-20">
          The Proof.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="test-card wireframe-card p-10 flex flex-col relative group overflow-hidden rounded-xl bg-bg-secondary cursor-none">
              <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="text-accent-primary font-display text-6xl leading-none mb-4 absolute top-6 left-6 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-500">"</div>
              
              <p className="text-text-primary text-lg leading-relaxed mb-12 relative z-10 pt-8">
                {test.quote}
              </p>
              
              <div className="mt-auto relative z-10">
                <p className="font-display text-text-primary uppercase tracking-wider">{test.author}</p>
                <p className="text-sm text-text-secondary uppercase tracking-widest">{test.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
