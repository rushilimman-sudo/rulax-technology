import React, { useState } from 'react';
import { ArrowRight, Eye, Code, Cpu, Globe, Smartphone, Layers, ExternalLink, Activity, Server, Zap } from 'lucide-react';
import MagneticButton from './MagneticButton';

export const projectsData = [
  {
    id: 'nexacore-erp',
    category: 'Software',
    name: 'NexaCore ERP Platform',
    badge: 'Enterprise Architecture',
    shortDesc: 'A centralized business operations engine featuring real-time inventory synchronization, role-based workflows, and automated financial auditing.',
    fullDesc: 'Designed to replace fragmented operational spreadsheets with a unified system. NexaCore provides multi-warehouse inventory tracking, procurement approvals, and automated financial reconciliation.',
    tech: ['React 19', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    type: 'Software Prototype',
    telemetry: {
      metric1: '50ms Latency',
      metric2: '100% ACID',
      metric3: '99.99% SLA'
    },
    highlights: [
      'Multi-branch real-time inventory ledger',
      'Configurable role-based authorization rules',
      'Automated PDF invoice generation & ledger export',
      'Sub-50ms query response on complex relational tables'
    ],
    architecture: 'Microservices with PostgreSQL database & Redis caching layer'
  },
  {
    id: 'omnipulse-ai',
    category: 'AI',
    name: 'OmniPulse AI Engine',
    badge: 'Cognitive Intelligence',
    shortDesc: 'An autonomous workflow automation and predictive intelligence platform that processes unstructured customer inquiries and documentation.',
    fullDesc: 'An intelligent AI pipeline combining vector search and modern LLM APIs to categorize support tickets, extract metadata from invoices, and assist customer service reps in real time.',
    tech: ['Python AI', 'FastAPI', 'Vector DB', 'LLM API', 'React'],
    type: 'AI Concept Prototype',
    telemetry: {
      metric1: '99.4% Accuracy',
      metric2: 'Zero-Shot RAG',
      metric3: 'Sub-second Inference'
    },
    highlights: [
      'Zero-shot semantic document parsing and routing',
      'Contextual knowledge retrieval via vector embeddings',
      '99.4% accuracy on structured JSON entity extraction',
      'Private cloud deployment capability for data protection'
    ],
    architecture: 'RAG (Retrieval Augmented Generation) pipeline with FastAPI & Vector Store'
  },
  {
    id: 'novastore-web',
    category: 'Web',
    name: 'NovaStore Headless Commerce',
    badge: 'High-Performance Web',
    shortDesc: 'An ultra-fast headless e-commerce frontend architecture featuring sub-second page transitions, dynamic cart state, and seamless payment integration.',
    fullDesc: 'Built for modern digital retail brands that demand speed, mobile responsiveness, and SEO dominance. NovaStore achieves perfect Lighthouse audit scores with instant image optimization and edge caching.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Stripe API', 'GraphQL'],
    type: 'Web System Showcase',
    telemetry: {
      metric1: '100/100 Core Vitals',
      metric2: '0.4s First Paint',
      metric3: 'Edge Distributed'
    },
    highlights: [
      'Perfect 100/100 Core Web Vitals performance score',
      'Instant search with typeahead debounce filtering',
      'Responsive design fine-tuned across all screen sizes',
      'Modular component structure for rapid store branding'
    ],
    architecture: 'Static generation with incremental edge revalidation and secure payment webhooks'
  },
  {
    id: 'horizon-mobile',
    category: 'Mobile',
    name: 'Horizon Mobile Wellness App',
    badge: 'Cross-Platform Mobile',
    shortDesc: 'A sleek, cross-platform mobile application for appointment booking, health metrics logging, and encrypted practitioner messaging.',
    fullDesc: 'Engineered with React Native for unified iOS and Android release. Horizon provides offline biometric data storage, end-to-end encrypted messaging, and calendar synchronization.',
    tech: ['React Native', 'TypeScript', 'Firebase', 'Secure Storage', 'Node.js'],
    type: 'Mobile App Prototype',
    telemetry: {
      metric1: '60 FPS Native',
      metric2: 'Offline SQLite',
      metric3: 'AES-256 Encrypted'
    },
    highlights: [
      'Fluid 60fps animations and native gesture responsiveness',
      'Offline-first data sync with local encrypted store',
      'Push notification alerts for scheduling and reminders',
      'Cross-platform codebase reducing maintenance by 40%'
    ],
    architecture: 'React Native with Redux Toolkit and offline SQLite sync'
  }
];

export default function Projects({ onViewProject }) {
  const [filter, setFilter] = useState('All');
  const [previewTab, setPreviewTab] = useState({});

  const categories = ['All', 'Web', 'Software', 'AI', 'Mobile'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  const toggleTab = (id, tab) => {
    setPreviewTab(prev => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="projects" className="py-12 lg:py-16 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header with Premium Typography */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-bold tracking-widest uppercase mb-4 border border-[#00A3FF]/30">
            [ 03 // PORTFOLIO & PROTOTYPES ]
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#101828] tracking-tighter font-sans uppercase">
            PROJECT GALLERY.
          </h2>
          <p className="mt-4 text-lg text-[#667085] leading-relaxed">
            Large interactive system architectures and application prototypes crafted by our engineering team.
          </p>
          <div className="mt-3 inline-block bg-[#EAF3FF]/80 px-4 py-1.5 rounded-full text-xs text-[#1769FF] font-mono font-bold border border-[#00A3FF]/20">
            * Showcase prototypes & concept designs ready for custom enterprise deployment.
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 interactive-target ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#1769FF] to-[#00A3FF] text-white shadow-electric scale-105'
                  : 'bg-white text-[#667085] hover:text-[#1769FF] hover:bg-[#EAF3FF] border border-[#EAF3FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upgrade 9: Large Interactive Project Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => {
            const currentTab = previewTab[project.id] || 'preview';

            return (
              <div
                key={project.id}
                className="glass-card-3d rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Large Interactive Viewport Frame */}
                <div className="relative bg-[#07152E] border-b border-slate-800">
                  {/* Browser Window Chrome Topbar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/90">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">
                        rulax://systems/{project.id}
                      </span>
                    </div>

                    {/* Interactive Tab Toggle: Preview vs Architecture */}
                    <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => toggleTab(project.id, 'preview')}
                        className={`px-2 py-0.5 rounded ${
                          currentTab === 'preview' ? 'bg-[#1769FF] text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        UI
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleTab(project.id, 'arch')}
                        className={`px-2 py-0.5 rounded ${
                          currentTab === 'arch' ? 'bg-[#1769FF] text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        ARCH
                      </button>
                    </div>
                  </div>

                  {/* Viewport Content */}
                  <div className="h-56 p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#07152E] via-[#0B254E] to-[#1769FF]/40">
                    <div className="absolute inset-0 bg-futuristic-grid opacity-30 pointer-events-none" />
                    
                    {currentTab === 'preview' ? (
                      <>
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                            {project.badge}
                          </span>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00A3FF]">
                            {project.type}
                          </span>
                        </div>

                        {/* Telemetry Metrics Strip */}
                        <div className="relative z-10 grid grid-cols-3 gap-2 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-blue-900/60 my-auto">
                          <div>
                            <p className="text-[9px] font-mono text-slate-400">LATENCY</p>
                            <p className="text-xs font-mono font-bold text-cyan-300">{project.telemetry.metric1}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-mono text-slate-400">INTEGRITY</p>
                            <p className="text-xs font-mono font-bold text-emerald-300">{project.telemetry.metric2}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-mono text-slate-400">STATUS</p>
                            <p className="text-xs font-mono font-bold text-blue-300">{project.telemetry.metric3}</p>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between">
                          <h3 className="text-2xl font-black text-white tracking-tight">
                            {project.name}
                          </h3>
                        </div>
                      </>
                    ) : (
                      <div className="relative z-10 flex flex-col justify-center h-full space-y-2 text-left">
                        <span className="text-xs font-mono text-[#00A3FF] font-bold">SYSTEM BLUEPRINT:</span>
                        <p className="text-sm font-mono text-slate-200 bg-slate-950/80 p-3 rounded-lg border border-blue-900/60">
                          {project.architecture}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          High-res enterprise diagram available on full review.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[#667085] text-sm leading-relaxed mb-6 font-normal">
                      {project.shortDesc}
                    </p>

                    <div className="mb-6">
                      <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        Technology Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-bold border border-[#00A3FF]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#EAF3FF] flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#00A3FF]">
                      ENTERPRISE READY
                    </span>
                    <MagneticButton
                      onClick={() => onViewProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#00A3FF] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-electric transition-all"
                    >
                      <span>View Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
