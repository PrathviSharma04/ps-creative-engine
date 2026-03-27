import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Tools from './components/Tools';
import HowItWorks from './components/HowItWorks';
import Philosophy from './components/Philosophy';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      autoRaf: false, // Critical: Disable autoRaf so GSAP can drive it
      lerp: 0.08,
    });

    // 2. Connect Lenis to GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); 
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-bg-primary text-text-primary overflow-hidden min-h-screen font-body selection:bg-accent-primary selection:text-bg-primary">
      <CustomCursor />
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Tools />
      <HowItWorks />
      <Philosophy />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
