import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Check, MapPin, ExternalLink, AlertCircle, Sparkles, ArrowRight, Share2 } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './SocialIcons';
import { SOCIAL_CONFIG, buildWhatsAppLink, buildInstagramBrief } from '../config/socialLinks';

export default function Contact({ preselectedService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: 'Web Development',
    projectDescription: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedInstagram, setCopiedInstagram] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: preselectedService,
      }));
    }
  }, [preselectedService]);

  const servicesList = [
    'Web Development',
    'Software Development',
    'Artificial Intelligence',
    'Mobile Applications',
    'Custom Enterprise Platform',
    'Technical Consultation',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  // Standard Form Submit (Records to backend database + email dispatch)
  const handleSubmit = async (e, channel = 'WEB', shouldOpenWhatsApp = false) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.projectDescription.trim()) {
      setErrorMsg('Please complete your name, email, and a brief project description.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          channel,
          socialForwarded: shouldOpenWhatsApp ? 'WHATSAPP' : null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit enquiry. Please try again.');
      }

      setSubmissionData(result.data);
      setSubmitted(true);

      if (shouldOpenWhatsApp && result.data?.whatsappUrl) {
        window.open(result.data.whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (shouldOpenWhatsApp) {
        const fallbackUrl = buildWhatsAppLink(formData);
        window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      } else {
        setErrorMsg(err.message || 'Unable to connect to the server. Please try reaching us directly on WhatsApp or Email.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct WhatsApp Enquiry (Saves to backend if filled, or directly opens WhatsApp)
  const handleWhatsAppEnquiry = (e) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.email.trim() && formData.projectDescription.trim()) {
      handleSubmit(e, 'WHATSAPP', true);
    } else {
      const waUrl = buildWhatsAppLink(formData);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Direct Instagram Enquiry (Copies brief + opens Instagram DM)
  const handleInstagramEnquiry = (e) => {
    e.preventDefault();
    const brief = buildInstagramBrief(formData);
    navigator.clipboard.writeText(brief).catch(() => {});
    setCopiedInstagram(true);
    setTimeout(() => setCopiedInstagram(false), 3000);

    window.open(SOCIAL_CONFIG.instagramDmUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceRequired: 'Web Development',
      projectDescription: '',
    });
    setSubmissionData(null);
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-10 lg:py-14 bg-[#FFFFFF] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3FF] text-[#1769FF] text-xs font-mono font-bold tracking-widest uppercase mb-4 border border-[#00A3FF]/30">
            [ 05 // INITIATE COLLABORATION ]
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#101828] tracking-tighter font-sans uppercase">
            START YOUR PROJECT.
          </h2>
          <p className="mt-4 text-lg text-[#667085] leading-relaxed">
            Have a project in mind, need software built, or want to discuss AI integration? Enquire online, connect with us on <span className="font-semibold text-emerald-600">WhatsApp</span>, or reach out on <span className="font-semibold text-pink-600">Instagram</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <h3 className="text-2xl font-extrabold text-[#101828] mb-2">
                Official Channels
              </h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                Connect directly with our engineering founders through your preferred communication platform.
              </p>
            </div>

            <div className="space-y-3.5">
              
              {/* WhatsApp Direct Chat Card */}
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-sm flex items-center justify-between hover:border-emerald-500 hover:shadow-md transition-all duration-200 block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">WhatsApp Business</p>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#101828] mt-0.5">
                      {SOCIAL_CONFIG.whatsappDisplay}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-semibold">Instant reply • Direct chat with founders</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <span>Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Instagram Official Card */}
              <a
                href={SOCIAL_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-5 rounded-2xl border border-pink-200/80 shadow-sm flex items-center justify-between hover:border-pink-500 hover:shadow-md transition-all duration-200 block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <InstagramIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-pink-600 uppercase tracking-wider">Instagram Direct</p>
                    <p className="text-sm font-bold text-[#101828] mt-0.5">
                      {SOCIAL_CONFIG.instagramDisplay}
                    </p>
                    <span className="text-[11px] text-[#667085] font-medium">Updates, tech insights & direct DM</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-pink-50 text-pink-600 text-xs font-bold flex items-center gap-1 group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-purple-600 group-hover:text-white transition-colors">
                  <span>DM Us</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Business Email */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAF3FF] shadow-sm flex items-center justify-between hover:border-[#00A3FF]/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] text-[#1769FF] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Email</p>
                    <a
                      href={`mailto:${SOCIAL_CONFIG.email}`}
                      className="text-sm font-bold text-[#101828] hover:text-[#1769FF] transition-colors mt-0.5 block select-all"
                    >
                      {SOCIAL_CONFIG.email}
                    </a>
                    <span className="text-[10px] text-[#00A3FF] font-semibold">Formal Proposals & RFPs</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl text-slate-400 hover:text-[#1769FF] hover:bg-[#EAF3FF] transition-colors"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Development Office / Hub */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAF3FF] shadow-sm flex items-center gap-4 hover:border-[#00A3FF]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] text-[#1769FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operations</p>
                  <p className="text-sm font-bold text-[#101828] mt-0.5">
                    Technology & Development Hub
                  </p>
                  <span className="text-[10px] text-[#00A3FF] font-medium">Global Hybrid Operations</span>
                </div>
              </div>
            </div>

            {/* Quick Links Pills */}
            <div className="bg-white p-5 rounded-2xl border border-[#EAF3FF] shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Connect Directly
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={SOCIAL_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-pink-50 text-pink-700 text-xs font-bold flex items-center gap-1.5 hover:bg-pink-600 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#EAF3FF]/80 text-[#1769FF] text-xs font-bold flex items-center gap-1.5 hover:bg-[#1769FF] hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form & Fast-Track Actions */}
          <div className="lg:col-span-7">
            <div className="glass-card-3d rounded-3xl p-8 sm:p-10 text-left relative">
              
              {submitted ? (
                <div className="text-center py-10 space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold mb-2">
                      Inquiry ID: {submissionData?.id || 'LOGGED'}
                    </span>
                    <h4 className="text-2xl font-extrabold text-[#101828]">
                      Enquiry Received Successfully!
                    </h4>
                    <p className="text-sm text-[#667085] max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <span className="font-bold text-[#101828]">{formData.fullName}</span>. Your enquiry for <span className="font-bold text-[#1769FF]">{formData.serviceRequired}</span> has been logged into our database.
                    </p>
                  </div>

                  {/* WhatsApp & Instagram Fast-Track Action Box */}
                  <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      <Sparkles className="w-4 h-4 text-[#1769FF]" />
                      <span>Want an instant response?</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Continue this conversation directly with our founding engineers on WhatsApp or Instagram with your inquiry reference pre-attached:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <a
                        href={submissionData?.whatsappUrl || buildWhatsAppLink({ ...formData, inquiryId: submissionData?.id })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all text-center"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <a
                        href={submissionData?.instagramDmUrl || SOCIAL_CONFIG.instagramDmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-xs font-bold shadow-sm transition-all text-center"
                      >
                        <InstagramIcon className="w-4 h-4" />
                        <span>Message on Instagram</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
                    >
                      <span>Submit Another Enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, 'WEB', false)} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#101828] tracking-tight">
                        Start Your Project
                      </h3>
                      <p className="text-xs sm:text-sm text-[#667085] mt-1">
                        Submit online or enquiry instantly through WhatsApp / Instagram.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Fast Tracks:</span>
                      <button
                        type="button"
                        onClick={handleWhatsAppEnquiry}
                        title="Chat via WhatsApp"
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleInstagramEnquiry}
                        title="Message via Instagram"
                        className="p-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:text-white transition-colors"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {copiedInstagram && (
                    <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs flex items-center gap-2 animate-in fade-in">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Project brief copied to clipboard! Opening Instagram DM...</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name <span className="text-[#00A3FF]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#EAF3FF] focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 text-[#101828] text-sm outline-none transition-all placeholder:text-slate-400 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address <span className="text-[#00A3FF]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#EAF3FF] focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 text-[#101828] text-sm outline-none transition-all placeholder:text-slate-400 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 88380 99509"
                        className="w-full px-4 py-3 rounded-xl border border-[#EAF3FF] focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 text-[#101828] text-sm outline-none transition-all placeholder:text-slate-400 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Service Required <span className="text-[#00A3FF]">*</span>
                      </label>
                      <select
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#EAF3FF] focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 text-[#101828] text-sm outline-none transition-all bg-white"
                      >
                        {servicesList.map((srv, idx) => (
                          <option key={idx} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Project Description <span className="text-[#00A3FF]">*</span>
                    </label>
                    <textarea
                      name="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Briefly describe your objectives, target audience, technical preferences, or timeline..."
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#EAF3FF] focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 text-[#101828] text-sm outline-none transition-all placeholder:text-slate-400 resize-y bg-white"
                    />
                  </div>

                  {/* Submission Action Buttons */}
                  <div className="space-y-3 pt-2">
                    
                    {/* Primary Web Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#1769FF] to-[#00A3FF] hover:from-[#1357d6] hover:to-[#008fdb] text-white font-bold text-base shadow-electric hover:shadow-electric-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Official Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Social Fast-Track Options Header */}
                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-4 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Or Enquire Instantly Via
                      </span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    {/* WhatsApp & Instagram Dual Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* WhatsApp Enquiry Button */}
                      <button
                        type="button"
                        onClick={handleWhatsAppEnquiry}
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <WhatsAppIcon className="w-4 h-4 shrink-0" />
                        <span>Enquire on WhatsApp</span>
                      </button>

                      {/* Instagram Enquiry Button */}
                      <button
                        type="button"
                        onClick={handleInstagramEnquiry}
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <InstagramIcon className="w-4 h-4 shrink-0" />
                        <span>Enquire on Instagram</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center pt-1">
                      Confidential submission • Encrypted communication • Direct founder response.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
