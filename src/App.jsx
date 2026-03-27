import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Critical components loaded immediately
import Header from './components/Header';
import Toast from './components/Toast';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';

// Light-weight Loading Fallback
const Fallback = () => <div className="h-screen w-full flex items-center justify-center bg-bg-primary text-text-secondary font-mono tracking-widest text-sm uppercase">Loading Chunk...</div>;

// Below-the-fold components code-split for massive performance boost
const Problem = lazy(() => import('./components/Problem'));
const Solution = lazy(() => import('./components/Solution'));
const Tools = lazy(() => import('./components/Tools'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Philosophy = lazy(() => import('./components/Philosophy'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // 1. Initialize High-Performance Lenis smooth scroll
    const lenis = new Lenis({
      autoRaf: false, // Critical: Disable autoRaf so GSAP can drive it
      lerp: 0.08,
      syncTouch: true,
      smoothTouch: true,
    });

    // Make lenis accessible globally for scrollTo functionality
    window.lenis = lenis;

    // 2. Connect Lenis to GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); 
    });
    gsap.ticker.lagSmoothing(0);

    // 3. Refresh ScrollTrigger after lazy chunks render (one-time, not interval)
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 1500);

    // 4. ResizeObserver to refresh ScrollTrigger when layout changes
    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    ro.observe(document.body);

    return () => {
      clearTimeout(refreshTimer);
      ro.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-bg-primary text-text-primary overflow-hidden min-h-screen font-body selection:bg-accent-primary selection:text-bg-primary">
      <CustomCursor />
      <Toast />
      <Header />
      <Hero />
      <Suspense fallback={<Fallback />}>
        <Problem />
        <Solution />
        <Tools />
        <HowItWorks />
        <Philosophy />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
