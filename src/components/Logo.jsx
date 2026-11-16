import React from 'react';
import officialLogo from '../assets/rulax-logo-official.jpg';

/**
 * RULAX TECHNOLOGY Official Circular Logo
 * Features:
 * - High-res official 3D neon RL monogram emblem
 * - Electric cyan and royal blue gradient border with hover glow
 * - Brand typography with "INNOVATE • BUILD • TRANSFORM" tagline
 */
export default function Logo({ size = 'md', showText = true, className = '', variant = 'default' }) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16'
  };

  return (
    <a 
      href="#home" 
      className={`inline-flex items-center gap-3 group focus:outline-none interactive-target ${className}`}
    >
      {/* Official Circular 3D Neon Emblem */}
      <div className={`relative ${iconSizes[size] || 'w-11 h-11'} flex items-center justify-center shrink-0`}>
        <div className="w-full h-full rounded-full p-0.5 bg-gradient-to-tr from-[#1769FF] via-[#00A3FF] to-[#38BDF8] shadow-electric group-hover:shadow-[0_0_20px_#00A3FF] group-hover:scale-105 transition-all duration-300">
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img 
              src={officialLogo} 
              alt="Rulax Technology Official Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tighter font-sans ${isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl'} ${
              variant === 'dark' ? 'text-white' : 'text-slate-900'
            } group-hover:text-[#1769FF] transition-colors`}>
              RULAX
            </span>
            <span className={`font-bold tracking-widest ${isLarge ? 'text-xl' : isSmall ? 'text-sm' : 'text-base'} text-[#1769FF]`}>
              TECHNOLOGY
            </span>
          </div>
          <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#00A3FF] mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
            INNOVATE • BUILD • TRANSFORM
          </span>
        </div>
      )}
    </a>
  );
}
