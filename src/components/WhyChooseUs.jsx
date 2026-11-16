import React from 'react';
import { Cpu, Lightbulb, ShieldCheck, HeartHandshake, Check, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      title: 'Modern Technology',
      subtitle: 'Future-Proof Architecture',
      icon: Cpu,
      description: 'We build on modern development stacks, cloud-native infrastructure, and proven design patterns to ensure maximum speed, security, and long-term maintainability.',
      highlights: [
        'Modern frameworks & clean codebases',
        'Cloud-ready, scalable infrastructure',
        'Optimized for high speed & security'
      ]
    },
    {
      title: 'Creative Solutions',
      subtitle: 'Tailored Innovation',
      icon: Lightbulb,
      description: 'Every business is unique. We do not use cookie-cutter templates; instead, we craft tailored solutions that solve specific operational challenges and elevate user experiences.',
      highlights: [
        'Custom-engineered digital experiences',
        'User-centric UI/UX and intuitive flows',
        'Creative problem-solving for complex workflows'
      ]
    },
    {
      title: 'Reliable Development',
      subtitle: 'Rock-Solid Delivery',
      icon: ShieldCheck,
      description: 'Reliability is at the core of our engineering. We adhere to rigorous development standards, robust testing methodologies, and defensive security best practices.',
      highlights: [
        'Strict code quality & thorough testing',
        'High availability and zero data loss safeguards',
        'Dependable release cycles and documentation'
      ]
    },
    {
      title: 'Customer-Focused Approach',
      subtitle: 'Collaborative Partnership',
      icon: HeartHandshake,
      description: 'We treat your business goals as our own. Expect transparent communication, regular milestone updates, and ongoing technical guidance from our founding team.',
      highlights: [
        'Direct founder-led technical communication',
        'Transparent timelines & clear milestones',
        'Dedicated post-launch assistance'
      ]
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3 border border-blue-100">
            Our Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Partner With Rulax Technology?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We combine engineering precision with product vision, giving ambitious businesses the technology leverage they need to lead.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                    {pillar.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="pt-5 border-t border-slate-100 space-y-2.5">
                  {pillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Engineering Philosophy Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-500/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-2 max-w-2xl">
              <span className="text-blue-300 font-semibold text-xs tracking-wider uppercase">Our Commitment</span>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Crafted With Precision. Engineered For Scale.
              </h4>
              <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
                Whether creating your first website or deploying mission-critical AI systems, Rulax Technology is dedicated to clean architecture, reliable timelines, and transparent collaboration.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all duration-200"
            >
              <span>Discuss Your Project</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
