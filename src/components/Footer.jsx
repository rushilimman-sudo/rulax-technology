import React from 'react';
import { ArrowUp, Mail, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import Logo from './Logo';
import { WhatsAppIcon, InstagramIcon } from './SocialIcons';
import { SOCIAL_CONFIG, buildWhatsAppLink } from '../config/socialLinks';
import lakshithImg from '../assets/lakshith.jpg';
import rushilImg from '../assets/rushil.jpg';

export default function Footer({ onServiceClick }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const servicesList = [
    'Web Development',
    'Software Development',
    'Artificial Intelligence',
    'Mobile Applications',
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
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
    <footer className="bg-[#07152E] text-slate-400 pt-20 pb-12 border-t border-blue-900/40 relative overflow-hidden">
      {/* Soft Glow Ambient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00A3FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <Logo size="md" variant="dark" />

            <p className="text-white text-sm font-bold tracking-wide">
              "Turning Ideas Into Technology."
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              We transform bold ideas into powerful digital experiences through modern websites, intelligent software, AI solutions and mobile applications.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-blue-900/60 text-[11px] font-bold text-[#00A3FF]">
                <div className="flex -space-x-1.5 shrink-0">
                  <img src={lakshithImg} alt="Lakshith" className="w-5 h-5 rounded-full object-cover border border-slate-700" />
                  <img src={rushilImg} alt="Rushil" className="w-5 h-5 rounded-full object-cover border border-slate-700" />
                </div>
                <span>Est. 2027 • Founded by Lakshith & Rushil</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-[#00A3FF] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesList.map((srv, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      if (onServiceClick) {
                        e.preventDefault();
                        onServiceClick(srv);
                      } else {
                        handleLinkClick(e, '#services');
                      }
                    }}
                    className="hover:text-[#00A3FF] transition-colors"
                  >
                    {srv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="lg:col-span-3 text-left space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-4">
              Inquiries
            </h4>
            
            <a
              href={`mailto:${SOCIAL_CONFIG.email}`}
              className="flex items-start gap-2.5 text-xs text-slate-300 hover:text-white transition-colors group"
            >
              <Mail className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Business Email</span>
                <span className="font-semibold text-white">{SOCIAL_CONFIG.email}</span>
              </div>
            </a>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-xs text-slate-300 hover:text-emerald-400 transition-colors group"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">WhatsApp Business</span>
                <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{SOCIAL_CONFIG.whatsappDisplay}</span>
              </div>
            </a>

            <a
              href={SOCIAL_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-xs text-slate-300 hover:text-pink-400 transition-colors group"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Instagram Direct</span>
                <span className="font-semibold text-white group-hover:text-pink-400 transition-colors">{SOCIAL_CONFIG.instagramDisplay}</span>
              </div>
            </a>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Operations Hub</span>
                <span className="font-semibold text-white">Technology & Software Center</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            © 2027 RULAX TECHNOLOGY. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-[#00A3FF] font-semibold">
              Designing Tomorrow.
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-[#1769FF] text-slate-400 hover:text-white transition-all border border-slate-800"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
