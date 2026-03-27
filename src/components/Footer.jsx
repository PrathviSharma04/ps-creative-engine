import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-bg-primary text-text-secondary border-t border-text-primary/5">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-sm tracking-[0.2em] font-medium uppercase">
          PS-Creative<span className="text-accent-primary">.Engine</span>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="https://www.npmjs.com/package/ps-creative-engine" className="hover:text-accent-primary transition-colors hover-target cursor-none">Docs</a>
          <a href="https://github.com/PrathviSharma04" className="hover:text-accent-primary transition-colors hover-target cursor-none">GitHub</a>
          <a href="https://www.npmjs.com/package/ps-creative-engine" className="hover:text-accent-primary transition-colors hover-target cursor-none">NPM</a>
        </div>
        
        <div className="text-xs text-text-primary/30 uppercase tracking-widest text-center md:text-right">
          &copy; {new Date().getFullYear()} Cinematic Proof.
        </div>
      </div>
    </footer>
  );
}
