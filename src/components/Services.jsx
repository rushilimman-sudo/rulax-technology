import React from 'react';
import { Globe, Code2, Cpu, Smartphone, ArrowRight, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import Service3DObject from './Service3DObject';
import MagneticButton from './MagneticButton';

export const servicesData = [
  {
    id: 'web-dev',
    title: 'WEB DEVELOPMENT',
    badge: 'Digital Architecture',
    desc: 'Ultra-fast, responsive web applications engineered for high conversion and enterprise scale.',
    features: [
      'Business platforms & SaaS',
      'High-throughput E-commerce',
      'Interactive 3D web experiences',
      'Edge-rendered web applications'
    ],
    techStack: ['React 19', 'Three.js', 'Tailwind CSS', 'Node.js', 'Edge Workers'],
    visualType: 'web-dev',
    accentColor: '#00A3FF',
    fullDesc: 'We build ultra-fast, search-engine-optimized websites and custom web applications that combine award-winning visual aesthetics with rock-solid performance.'
  },
  {
    id: 'software-dev',
    title: 'SOFTWARE DEVELOPMENT',
    badge: 'Enterprise Engine',
    desc: 'Custom enterprise software and distributed backends designed to eliminate operational friction.',
    features: [
      'ERP & Business management systems',
      'Inventory & supply automation',
      'Fault-tolerant microservices',
      'Secure data pipeline architecture'
    ],
    techStack: ['Python', 'TypeScript', 'PostgreSQL', 'Docker', 'REST / GraphQL'],
    visualType: 'software-dev',
    accentColor: '#1769FF',
    fullDesc: 'Custom business management software engineered to eliminate repetitive manual bottlenecks, centralize company operations, and scale with your growth.'
  },
  {
    id: 'ai-solutions',
    title: 'ARTIFICIAL INTELLIGENCE',
    badge: 'Cognitive Systems',
    desc: 'Intelligent AI models, autonomous agents, and predictive machine learning integrations.',
    features: [
      'Autonomous agentic pipelines',
      'Document intelligence & RAG',
      'Custom LLM integrations',
      'Automated predictive workflows'
    ],
    techStack: ['LLM APIs', 'Vector DB', 'LangChain', 'Python AI', 'Embeddings'],
    visualType: 'ai-solutions',
    accentColor: '#00A3FF',
    fullDesc: 'Harness state-of-the-art AI language models, automated agentic pipelines, and custom machine learning workflows to 10x your team’s productivity.'
  },
  {
    id: 'mobile-dev',
    title: 'MOBILE APPLICATIONS',
    badge: 'iOS & Android',
    desc: 'Native-grade cross-platform mobile apps with fluid 60fps animations and offline sync.',
    features: [
      'High-performance iOS apps',
      'Modern Android ecosystem',
      'Biometric authentication',
      'Offline-first synchronization'
    ],
    techStack: ['React Native', 'Flutter', 'Swift / Kotlin', 'Firebase', 'Secure Enclave'],
    visualType: 'mobile-dev',
    accentColor: '#1769FF',
    fullDesc: 'Intuitive, native-grade mobile applications built with smooth 60fps animations, offline data synchronization, and enterprise security for mobile users.'
  }
];

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-12 lg:py-16 bg-[#FFFFFF] relative overflow-hidden">
      {/* Background Dot Matrix & Ambient Glows */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00A3FF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#1769FF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header with Premium Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-bold tracking-widest uppercase mb-4 border border-[#00A3FF]/30">
            [ 01 // CAPABILITIES & SYSTEMS ]
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#101828] tracking-tighter font-sans uppercase">
            WHAT WE CREATE.
          </h2>
          <p className="mt-4 text-lg text-[#667085] leading-relaxed">
            High-precision technology solutions architected to elevate ambitious enterprises.
          </p>
        </div>

        {/* 4 Interactive 3D Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              className="glass-card-3d rounded-3xl p-8 sm:p-10 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Light Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1769FF] to-[#00A3FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-bold uppercase tracking-wider border border-[#00A3FF]/20">
                    {service.badge}
                  </span>
                  <span className="text-sm font-mono font-extrabold text-[#00A3FF] tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                {/* Real Animated 3D WebGL Object for each card */}
                <div className="mb-6 w-full h-48 rounded-2xl bg-gradient-to-b from-[#EAF3FF]/80 via-white to-[#EAF3FF]/50 border border-[#EAF3FF] p-2 flex items-center justify-center relative overflow-hidden group-hover:border-[#00A3FF]/50 transition-colors shadow-inner">
                  <div className="absolute top-2 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/80 border border-slate-200/60 text-[9px] font-mono text-[#1769FF] z-10 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-ping" />
                    3D ENGINE
                  </div>
                  <Service3DObject type={service.id} />
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#101828] mb-3 group-hover:text-[#1769FF] transition-colors tracking-tight">
                  {service.title}
                </h3>
                <p className="text-base text-[#667085] leading-relaxed mb-6 font-normal">
                  {service.desc}
                </p>

                {/* Bullet Features */}
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-[#101828]">
                      <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions & Tech Chips */}
              <div className="pt-6 border-t border-[#EAF3FF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.slice(0, 3).map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 rounded-md bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <MagneticButton
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1769FF] hover:bg-[#00A3FF] text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
                >
                  <span>Explore Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
