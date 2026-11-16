import React from 'react';
import { Layers, ShieldCheck, Zap, Server, Network, ArrowRight } from 'lucide-react';

export default function Solutions({ onSelectSolution }) {
  const solutions = [
    {
      title: 'Cloud-Native Web Infrastructure',
      subtitle: 'Global Performance',
      description: 'Distributed edge caching, static site generation, and sub-100ms response architectures engineered for scale.',
      icon: Zap,
      metrics: '< 100ms Global TTFB',
    },
    {
      title: 'Autonomous Business Automation',
      subtitle: 'Operational Efficiency',
      description: 'Automate back-office workflows, order pipelines, and multi-department approval processes with zero data friction.',
      icon: Layers,
      metrics: '10x Faster Processing',
    },
    {
      title: 'Enterprise AI & Vector Pipelines',
      subtitle: 'Intelligent Systems',
      description: 'Private LLM deployments, semantic search engines, and real-time document extraction built for corporate compliance.',
      icon: Network,
      metrics: 'Enterprise Security',
    },
    {
      title: 'Unified Mobile Architectures',
      subtitle: 'Seamless Experience',
      description: 'Shared codebase architectures with native performance on both iOS and Android, minimizing development overhead.',
      icon: Server,
      metrics: '99.9% Crash-Free',
    },
  ];

  return (
    <section id="solutions" className="py-10 lg:py-14 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="px-3.5 py-1.5 rounded-full bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-bold tracking-widest uppercase border border-[#00A3FF]/20">
              [ 02 // ARCHITECTURAL SYSTEMS ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#101828] mt-4 tracking-tighter uppercase font-sans">
              ENTERPRISE SOLUTIONS.
            </h2>
            <p className="text-base sm:text-lg text-[#667085] mt-2">
              Future-proof systems built to withstand the demands of modern commerce and high-volume data.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1769FF] hover:text-[#00A3FF] transition-colors"
          >
            <span>Request Architecture Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-7 border border-[#EAF3FF] shadow-sm hover:shadow-card-3d-hover hover:border-[#00A3FF]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] group-hover:bg-[#1769FF] text-[#1769FF] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-[#00A3FF] uppercase tracking-wider block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-[#101828] mb-2 group-hover:text-[#1769FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAF3FF] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1769FF] bg-[#EAF3FF] px-2.5 py-1 rounded-md">
                    {item.metrics}
                  </span>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-[#101828] transition-colors">
                    Est. 2027
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
