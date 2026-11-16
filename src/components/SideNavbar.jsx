import React from 'react';
import { 
  Home, 
  Layers, 
  Cpu, 
  Briefcase, 
  Users, 
  MessageSquare, 
  ArrowRight, 
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import Logo from './Logo';
import lakshithImg from '../assets/lakshith.jpg';
import rushilImg from '../assets/rushil.jpg';

export default function SideNavbar({ 
  currentScreen = 0, 
  onNavigate, 
  screens = [], 
  mobileOpen = false, 
  setMobileOpen,
  antigravityActive = false,
  onToggleAntigravity
}) {
  const navItems = [
    { id: 0, name: 'Home', label: '01', icon: Home, desc: '3D Futuristic Experience' },
    { id: 1, name: 'Services', label: '02', icon: Layers, desc: 'What We Create' },
    { id: 2, name: 'Solutions', label: '03', icon: Cpu, desc: 'Enterprise Systems' },
    { id: 3, name: 'Projects', label: '04', icon: Briefcase, desc: 'Architectural Showcases' },
    { id: 4, name: 'About Us', label: '05', icon: Users, desc: 'Founders & Mission' },
    { id: 5, name: 'Contact', label: '06', icon: MessageSquare, desc: "Let's Talk" },
  ];

  const handleSelect = (idx) => {
    onNavigate(idx);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 animate-in fade-in duration-200"
        />
      )}

      {/* Futuristic Side Navigation Bar (Fixed Left Dock) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-2xl border-r border-[#EAF3FF] flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Logo & Mobile Close */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#EAF3FF]">
            <Logo size="md" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-[#EAF3FF] hover:text-[#1769FF]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 px-1 flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00A3FF]">
              SYSTEM NAVIGATION
            </span>
            <span className="text-[11px] font-bold text-[#1769FF] bg-[#EAF3FF] px-2 py-0.5 rounded-md">
              0{currentScreen + 1} / 0{navItems.length}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1769FF] to-[#00A3FF] text-white shadow-electric'
                      : 'text-[#667085] hover:text-[#1769FF] hover:bg-[#EAF3FF]/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[#EAF3FF] text-[#1769FF] group-hover:bg-[#1769FF] group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold leading-tight ${isActive ? 'text-white' : 'text-[#101828] group-hover:text-[#1769FF]'}`}>
                        {item.name}
                      </p>
                      <p className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-white/80' : 'text-slate-300 group-hover:text-[#00A3FF]'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Let's Talk CTA & Founders Attribution */}
        <div className="pt-5 border-t border-[#EAF3FF] space-y-3">
          <div className="w-full flex items-center justify-between py-2 px-3 rounded-xl border text-xs font-mono font-bold bg-gradient-to-r from-[#1769FF] to-[#00A3FF] text-white border-cyan-300 shadow-[0_0_15px_rgba(0,163,255,0.4)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-200 animate-ping" />
              Antigravity Field
            </span>
            <span className="text-[10px] uppercase font-bold">PERMANENT</span>
          </div>

          <button
            type="button"
            onClick={() => handleSelect(5)}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#00A3FF] hover:from-[#1357d6] hover:to-[#008fdb] text-white text-sm font-bold shadow-electric hover:shadow-electric-lg transition-all"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 rounded-xl bg-[#EAF3FF]/60 border border-[#EAF3FF] text-left flex items-center gap-3">
            <div className="flex -space-x-2 shrink-0">
              <img 
                src={lakshithImg} 
                alt="Lakshith - Co-Founder" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs" 
              />
              <img 
                src={rushilImg} 
                alt="Rushil - Co-Founder" 
                className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#1769FF] uppercase tracking-wider truncate">
                RULAX TECHNOLOGY • EST. 2027
              </p>
              <p className="text-[11px] text-[#667085] mt-0.5 truncate">
                Co-Founders <span className="font-semibold text-slate-800">Lakshith</span> & <span className="font-semibold text-slate-800">Rushil</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
