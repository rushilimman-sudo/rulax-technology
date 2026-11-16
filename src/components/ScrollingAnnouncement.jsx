import React from 'react';
import { Sparkles, Zap, Cpu, Code2, Globe, Smartphone, ShieldCheck, Database, Layers } from 'lucide-react';

/**
 * High-Tech Infinite Dual Ticker
 * Upgrade 7: Animated technology keywords scrolling seamlessly across screens
 */
export default function ScrollingAnnouncement() {
  const row1 = [
    { text: 'DISTRIBUTED SYSTEMS', icon: Database },
    { text: 'NEURAL AI AGENTS', icon: Cpu },
    { text: 'THREE.JS 3D SPATIAL COMPUTING', icon: Sparkles },
    { text: 'REACT 19 FULL-STACK', icon: Code2 },
    { text: 'HIGH-THROUGHPUT GRAPHQL', icon: Zap },
    { text: 'ENTERPRISE CLOUD ARCHITECTURES', icon: Globe },
    { text: 'ZERO-TRUST SECURITY', icon: ShieldCheck },
  ];

  const row2 = [
    { text: 'NATIVE 60FPS MOBILE RUNTIMES', icon: Smartphone },
    { text: 'VECTOR EMBEDDING PIPELINES', icon: Cpu },
    { text: 'EDGE MICROSERVICES', icon: Layers },
    { text: 'SUB-MILLISECOND LATENCY', icon: Zap },
    { text: 'CROSS-PLATFORM INTEGRATIONS', icon: Globe },
    { text: 'ESTABLISHED FOR 2027 & BEYOND', icon: Sparkles },
  ];

  const ticker1 = [...row1, ...row1, ...row1];
  const ticker2 = [...row2, ...row2, ...row2];

  return (
    <div className="w-full bg-[#FFFFFF] border-y border-[#EAF3FF] py-6 overflow-hidden relative shadow-xs space-y-3">
      {/* Soft gradient masks for smooth edge fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Flowing Left */}
      <div className="flex w-max animate-marquee space-x-12 items-center">
        {ticker1.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="inline-flex items-center gap-3.5 shrink-0 group">
              <span className="w-2 h-2 rounded-full bg-[#00A3FF] shadow-electric" />
              <span className="text-xs sm:text-sm font-mono font-black tracking-widest text-[#07152E] group-hover:text-[#1769FF] transition-colors uppercase">
                {item.text}
              </span>
              <Icon className="w-4 h-4 text-[#00A3FF] group-hover:rotate-12 transition-transform" />
            </div>
          );
        })}
      </div>

      {/* Row 2: Flowing Right (Reverse) */}
      <div 
        className="flex w-max space-x-12 items-center"
        style={{
          animation: 'marquee 32s linear infinite reverse',
        }}
      >
        {ticker2.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="inline-flex items-center gap-3.5 shrink-0 group opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769FF]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#667085] group-hover:text-[#00A3FF] transition-colors uppercase">
                {item.text}
              </span>
              <span className="text-xs text-[#00A3FF]/40">//</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
