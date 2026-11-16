import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageSquareCode, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ activeSection = 'home', onLetsTalk }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Solutions', href: '#solutions', id: 'solutions' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 85;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`flex items-center justify-between px-5 sm:px-7 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled 
              ? 'glass-nav-floating' 
              : 'bg-white/80 backdrop-blur-md border border-[#EAF3FF] shadow-sm'
          }`}
        >
          
          {/* RULAX TECHNOLOGY Geometric Monogram Logo on Left */}
          <Logo />

          {/* Center/Right Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                    isActive 
                      ? 'text-[#1769FF] bg-[#EAF3FF]' 
                      : 'text-[#667085] hover:text-[#1769FF] hover:bg-[#EAF3FF]/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-[#00A3FF] rounded-full shadow-electric" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Prominent Blue "Let's Talk" Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              type="button"
              onClick={onLetsTalk || ((e) => handleLinkClick(e, '#contact'))}
              className="relative group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#00A3FF] hover:from-[#1357d6] hover:to-[#008fdb] text-white text-sm font-bold shadow-electric hover:shadow-electric-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#07152E] hover:text-[#1769FF] hover:bg-[#EAF3FF] focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1769FF]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-nav-floating p-4 shadow-xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive 
                      ? 'bg-[#EAF3FF] text-[#1769FF]' 
                      : 'text-[#101828] hover:bg-[#EAF3FF]/50 hover:text-[#1769FF]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onLetsTalk) onLetsTalk();
                  else {
                    const el = document.querySelector('#contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#00A3FF] text-white font-bold text-center shadow-electric"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
