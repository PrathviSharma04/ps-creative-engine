import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';

const socialIcons = [
  {
    name: 'GitHub',
    url: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: '#',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
      
      const tl = gsap.timeline();
      tl.to(".menu-overlay", { 
        clipPath: "circle(150% at 100% 0%)", 
        duration: 1.2, 
        ease: "power4.inOut" 
      })
      .from(".menu-link", { 
        y: 80, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.6")
      .from(".social-link", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
      
      gsap.to(".menu-overlay", { 
        clipPath: "circle(0% at 100% 0%)", 
        duration: 1, 
        ease: "power4.inOut" 
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = (e) => {
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
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-500 ${isScrolled ? 'bg-bg-primary/70 backdrop-blur-md border-b border-text-primary/10 py-4' : 'py-8'}`}>
      <div className="max-w-[1440px] mx-auto px-10 flex justify-between items-center transition-all duration-500">
        {/* Logo */}
        <div 
          onClick={(e) => {
            scrollToSection(e, 'body');
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 pointer-events-auto hover-target group cursor-none"
        >
          <img
            src={theme === 'dark' ? '/Light Logo.svg' : '/Dark Logo.svg'}
            alt="PS Creative Engine Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-95 duration-300"
          />
          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-text-primary uppercase">
            PS-CREATIVE<span className="text-accent-primary">.ENGINE</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 pointer-events-auto">
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

        {/* Mobile & Tablet Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-4 pointer-events-auto">
          <button 
            onClick={toggleTheme} 
            className="w-10 h-10 rounded-full bg-text-primary/5 border border-text-primary/10 text-text-primary flex items-center justify-center hover-target cursor-none"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 hover-target cursor-none group"
            aria-label="Toggle menu"
          >
            <div className={`w-8 h-0.5 bg-text-primary transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}></div>
            <div className={`w-8 h-0.5 bg-text-primary transition-all duration-500 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}></div>
            <div className={`w-8 h-0.5 bg-text-primary transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}></div>
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div className="menu-overlay fixed inset-0 bg-bg-primary/95 backdrop-blur-2xl z-[-1] pointer-events-auto flex flex-col justify-center px-10 md:px-20 lg:hidden" style={{ clipPath: "circle(0% at 100% 0%)" }}>
        <div className="space-y-6">
          {[
            { label: 'ARCHETYPE', id: '#problem' },
            { label: 'INTELLIGENCE', id: '#solution' },
            { label: 'CAPABILITY', id: '#tools' }
          ].map((item, i) => (
            <div key={i} className="overflow-hidden">
              <a 
                href={item.id} 
                className="menu-link block font-display text-5xl md:text-7xl font-bold text-text-primary hover:text-accent-primary transition-colors tracking-tighter"
                onClick={(e) => {
                  scrollToSection(e, item.id);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}.
              </a>
            </div>
          ))}
          <div className="overflow-hidden pt-8">
            <button 
              onClick={(e) => {
                scrollToSection(e, '#final-cta');
                setIsMenuOpen(false);
              }}
              className="menu-link w-full md:w-auto px-10 py-5 bg-text-primary text-bg-primary rounded-full text-xl font-bold hover:bg-accent-primary transition-colors"
            >
              INITIALIZE ENGINE
            </button>
          </div>
        </div>

        {/* Social Icons Hub */}
        <div className="absolute bottom-12 left-8 md:left-20 flex items-center gap-8">
          {socialIcons.map((social, i) => (
            <a 
              key={i} 
              href={social.url} 
              className="social-link text-text-secondary hover:text-accent-primary transition-transform hover:-translate-y-1"
              aria-label={social.name}
            >
              {social.svg}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
