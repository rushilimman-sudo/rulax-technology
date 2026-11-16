import React from 'react';
import { ArrowRight, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import MagneticButton from './MagneticButton';

export default function Hero({ onExploreServices, onStartProject, antigravity = false }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 85;
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-full py-12 lg:py-10 overflow-hidden bg-white flex items-center">
      {/* Futuristic Background Grids with Electric Blue Lighting Accents */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-75 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-[#EAF3FF] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#00A3FF]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Label, Text & Actions */}
          <div className="lg:col-span-7 text-left space-y-7 z-10">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#EAF3FF] border border-[#00A3FF]/30 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-ping" />
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#1769FF]">
                [ 00 // NEXT-GEN TECH LAB ]
              </span>
            </div>

            {/* Monumental Premium Typography Heading */}
            <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-black text-[#101828] tracking-tighter leading-[0.96] font-sans">
              BUILDING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-[#1769FF] to-[#00A3FF] filter drop-shadow-sm">
                FUTURE
              </span> OF <br />
              TECHNOLOGY.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#667085] max-w-xl leading-relaxed font-normal">
              We transform bold ideas into powerful digital experiences through modern websites, intelligent software, AI solutions and mobile applications.
            </p>

            {/* Two Magnetic Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <MagneticButton
                onClick={onExploreServices || (() => scrollTo('services'))}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#00A3FF] hover:from-[#1357d6] hover:to-[#008fdb] text-white font-extrabold text-base shadow-electric hover:shadow-electric-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>

              <MagneticButton
                onClick={onStartProject || (() => scrollTo('contact'))}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white hover:bg-[#EAF3FF]/50 text-[#101828] font-bold text-base border-2 border-[#EAF3FF] hover:border-[#00A3FF]/60 shadow-sm hover:shadow transition-all duration-200"
              >
                <span>Start a Project</span>
              </MagneticButton>
            </div>

            {/* Quick Metrics / Trust Indicators */}
            <div className="pt-8 border-t border-[#EAF3FF] flex flex-wrap items-center gap-6 sm:gap-10">
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A3FF]">ESTABLISHED</p>
                <p className="text-2xl font-black text-[#101828]">2027</p>
              </div>
              <div className="w-px h-8 bg-[#EAF3FF]" />
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A3FF]">ARCHITECTURE</p>
                <p className="text-2xl font-black text-[#101828]">Enterprise Grade</p>
              </div>
              <div className="w-px h-8 bg-[#EAF3FF]" />
              <div>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A3FF]">GLOBAL IMPACT</p>
                <p className="text-2xl font-black text-[#101828]">Worldwide Delivery</p>
              </div>
            </div>

          </div>

          {/* Right Column: Giant Floating Chrome & Blue Cyber Core */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Hero3DCanvas antigravity={antigravity} />
          </div>

        </div>
      </div>
    </section>
  );
}
