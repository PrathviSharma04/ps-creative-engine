import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = (e) => {
    // Capture click coordinates for the circular reveal origin
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--click-x', `${x}px`);
    document.documentElement.style.setProperty('--click-y', `${y}px`);

    const newTheme = theme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      document.documentElement.classList.toggle('light', newTheme === 'light');
      setTheme(newTheme);
      return;
    }

    // Trigger the cinematic View Transition
    document.startViewTransition(() => {
      document.documentElement.classList.toggle('light', newTheme === 'light');
      setTheme(newTheme);
    });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(id, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cinematic easing
      });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-500 ${isScrolled ? 'bg-bg-primary/70 backdrop-blur-md border-b border-text-primary/10 py-4' : 'py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-6 flex justify-between items-center transition-all duration-500">
        {/* Logo */}
        <div 
          onClick={(e) => scrollToSection(e, 'body')}
          className="flex items-center gap-3 pointer-events-auto hover-target group cursor-none"
        >
          <img
            src={theme === 'dark' ? '/Light Logo.svg' : '/Dark Logo.svg'}
            alt="PS Creative Engine Logo"
            className="w-12 h-12 object-contain transition-transform group-hover:scale-95 duration-300"
          />
          <span className="font-display font-bold text-xl tracking-tight text-text-primary">
            PS-CREATIVE<span className="text-accent-primary">.ENGINE</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          <a 
            href="#problem" 
            onClick={(e) => scrollToSection(e, '#problem')}
            className="text-sm font-semibold tracking-wide text-text-secondary hover:text-text-primary transition-colors hover-target cursor-none"
          >
            ARCHETYPE
          </a>
          <a 
            href="#solution" 
            onClick={(e) => scrollToSection(e, '#solution')}
            className="text-sm font-semibold tracking-wide text-text-secondary hover:text-text-primary transition-colors hover-target cursor-none"
          >
            INTELLIGENCE
          </a>
          <a 
            href="#tools" 
            onClick={(e) => scrollToSection(e, '#tools')}
            className="text-sm font-semibold tracking-wide text-text-secondary hover:text-text-primary transition-colors hover-target cursor-none"
          >
            CAPABILITY
          </a>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => scrollToSection(e, '#final-cta')}
              className="px-6 py-2 border border-text-primary text-text-primary rounded-full text-sm font-semibold hover:bg-text-primary hover:text-bg-primary transition-colors hover-target cursor-none"
            >
              INITIALIZE
            </button>
            <button 
              onClick={toggleTheme} 
              className="w-10 h-10 rounded-full bg-text-primary text-bg-primary flex items-center justify-center hover:scale-110 transition-transform hover-target cursor-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
