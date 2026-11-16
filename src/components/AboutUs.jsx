import React, { useState } from 'react';
import { Target, Compass, Terminal, Code2, Sparkles, Shield, Cpu, ExternalLink, Award, CheckCircle } from 'lucide-react';
import lakshithImg from '../assets/lakshith.jpg';
import rushilImg from '../assets/rushil.jpg';
import MagneticButton from './MagneticButton';

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('all');

  const founders = [
    {
      name: 'Lakshith',
      role: 'Co-Founder • Head of Product & AI',
      image: lakshithImg,
      initials: 'L',
      focus: 'Product Innovation & AI Systems',
      description: 'Co-leading product architecture, intelligent generative AI models, and intuitive user-centric experiences, turning complex computational algorithms into seamless business software.',
      metrics: [
        { label: 'DISCIPLINE', val: 'Product & AI' },
        { label: 'SYSTEM FOCUS', val: 'User Experience' },
        { label: 'CO-LEADERSHIP', val: 'Est. 2027' }
      ],
      skills: ['Product Strategy', 'Artificial Intelligence', 'UI/UX Innovation', 'Agentic Workflows', 'Design Systems']
    },
    {
      name: 'Rushil',
      role: 'Co-Founder • Chief Technology Architect',
      image: rushilImg,
      initials: 'R',
      focus: 'Distributed Systems & Cloud Architecture',
      description: 'Co-leading core engineering direction, scalable distributed cloud architectures, and full-stack software integrity, ensuring enterprise security, low latency, and infinite scaling.',
      metrics: [
        { label: 'DISCIPLINE', val: 'Core Architecture' },
        { label: 'SYSTEM FOCUS', val: 'Cloud Scalability' },
        { label: 'CO-LEADERSHIP', val: 'Est. 2027' }
      ],
      skills: ['Distributed Systems', 'Software Engineering', 'System Architecture', 'High-Load Databases', 'DevOps & Cloud']
    }
  ];

  return (
    <section id="about" className="py-12 lg:py-16 bg-[#FFFFFF] relative overflow-hidden">
      {/* Ambient Electric Glow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#00A3FF]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1769FF]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-bold tracking-widest uppercase mb-4 border border-[#00A3FF]/30">
            [ 04 // EXECUTIVE LEADERSHIP & IDENTITY ]
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#101828] tracking-tighter font-sans uppercase">
            THE MINDS BEHIND RULAX.
          </h2>
          <p className="mt-4 text-lg text-[#667085] leading-relaxed">
            RULAX TECHNOLOGY is an upcoming technology company founded by Lakshith and Rushil, focused on creating websites, software, AI solutions and mobile applications.
          </p>
        </div>

        {/* Story & Vision Architecture Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono font-extrabold text-[#00A3FF] uppercase tracking-widest">
              OUR IDENTITY & CORE PURPOSE
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-[#101828] tracking-tight">
              Turning Bold Ideas Into Next-Generation Technology.
            </h3>
            <p className="text-[#667085] text-base leading-relaxed">
              Established with a clear vision for 2027, Rulax Technology operates at the intersection of aesthetic design and complex software engineering. We believe modern businesses need digital tools that are not just functional, but transformative.
            </p>
            <p className="text-[#667085] text-base leading-relaxed">
              Our multidisciplinary engineering team architects production-grade websites, custom enterprise software, artificial intelligence integrations, and mobile applications engineered to scale globally.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#EAF3FF]/60 border border-[#EAF3FF]">
                <span className="text-3xl font-black text-[#1769FF]">2027</span>
                <p className="text-xs font-bold text-[#101828] mt-1 uppercase">Foundation Year</p>
                <p className="text-[11px] text-[#667085]">Born for tomorrow</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#EAF3FF]/60 border border-[#EAF3FF]">
                <span className="text-3xl font-black text-[#00A3FF]">4 Pillars</span>
                <p className="text-xs font-bold text-[#101828] mt-1 uppercase">Tech Disciplines</p>
                <p className="text-[11px] text-[#667085]">Web, Software, AI, Mobile</p>
              </div>
            </div>
          </div>

          {/* Futuristic Terminal Architecture Display */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#07152E] p-8 sm:p-10 text-white shadow-2xl border border-blue-900/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1769FF] to-[#00A3FF] flex items-center justify-center text-white shadow-electric">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg">RULAX TECHNOLOGY</h4>
                      <p className="text-xs font-mono text-[#00A3FF]">"Turning Ideas Into Technology."</p>
                    </div>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#1769FF]/30 text-[#00A3FF] text-xs font-mono font-bold border border-[#00A3FF]/40">
                    Est. 2027
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#1769FF]/20 text-[#00A3FF] flex items-center justify-center shrink-0 mt-0.5">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white uppercase tracking-wider">Our Mission</h5>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        To empower ambitious businesses with high-performance, intelligent, and beautifully crafted technology systems that convert vision into real-world impact.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#1769FF]/20 text-[#00A3FF] flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white uppercase tracking-wider">Our Values</h5>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Uncompromising code quality, transparency, zero unnecessary complexity, and a dedicated partnership with every enterprise client.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Upgrade 8: Futuristic Co-Founders Showcase with Real Photos */}
        <div className="border-t border-[#EAF3FF] pt-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-extrabold text-[#00A3FF] uppercase tracking-widest">
              [ CO-FOUNDERS & CHIEF DIRECTORS ]
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-[#101828] mt-2 tracking-tight">
              Executive Leadership
            </h3>
            <p className="text-base text-[#667085] mt-2">
              The founding engineers guiding the software architecture, product roadmap, and artificial intelligence systems of Rulax Technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="glass-card-3d rounded-3xl p-8 sm:p-10 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Holographic glowing corner bracket accents */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#00A3FF]/50" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#00A3FF]/50" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#00A3FF]/50" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#00A3FF]/50" />

                <div>
                  {/* Founder Photo & Holographic Frame */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                    <div className="relative group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl p-1 bg-gradient-to-tr from-[#1769FF] via-[#00A3FF] to-[#38BDF8] shadow-electric">
                        <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900">
                          <img 
                            src={founder.image} 
                            alt={`${founder.name} - ${founder.role}`}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-white border-2 border-[#EAF3FF] flex items-center gap-1 text-[#1769FF] shadow-md text-[10px] font-mono font-bold">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>VERIFIED</span>
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <span className="text-xs font-mono font-extrabold text-[#00A3FF] uppercase tracking-wider">
                        CO-FOUNDER 0{index + 1}
                      </span>
                      <h4 className="text-3xl font-black text-[#101828] mt-1 tracking-tight">
                        {founder.name}
                      </h4>
                      <p className="text-sm font-bold text-[#1769FF] mt-1">
                        {founder.role}
                      </p>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#1769FF] text-xs font-semibold border border-[#00A3FF]/20">
                        {founder.focus}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#667085] leading-relaxed mb-6 font-normal">
                    {founder.description}
                  </p>

                  {/* Telemetry Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#EAF3FF] mb-6 text-center">
                    {founder.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <p className="text-[10px] font-mono text-[#667085] uppercase">{m.label}</p>
                        <p className="text-xs font-bold text-[#101828] mt-0.5">{m.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {founder.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-[#EAF3FF]/80 text-[#1769FF] text-xs font-mono font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
