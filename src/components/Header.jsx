import { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-500 ${isScrolled ? 'bg-bg-primary/70 backdrop-blur-md border-b border-white/5 py-4 mix-blend-normal' : 'mix-blend-difference py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center transition-all duration-500">
        {/* Logo */}
        <div className="flex items-center gap-3 pointer-events-auto hover-target group cursor-none">
          <div className="w-10 h-10 rounded-lg bg-text-primary flex items-center justify-center transition-transform group-hover:scale-95 duration-300">
            <Code className="text-bg-primary w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-text-primary">
            PS-CREATIVE<span className="text-accent-primary">.ENGINE</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          <a href="#problem" className="text-sm font-semibold tracking-wide text-text-secondary hover:text-text-primary transition-colors hover-target cursor-none">
            ARCHETYPE
          </a>
          <a href="#solution" className="text-sm font-semibold tracking-wide text-text-secondary hover:text-text-primary transition-colors hover-target cursor-none">
            INTELLIGENCE
          </a>
          <a href="#tools" className="text-sm font-semibold tracking-wide text-text-secondary hover:text-text-primary transition-colors hover-target cursor-none">
            CAPABILITY
          </a>
          <button className="px-6 py-2 border border-text-primary rounded-full text-sm font-semibold hover:bg-text-primary hover:text-bg-primary transition-colors hover-target cursor-none">
            INITIALIZE
          </button>
        </nav>
      </div>
    </header>
  );
}
