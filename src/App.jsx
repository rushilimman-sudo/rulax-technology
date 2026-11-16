import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Logo from './components/Logo';
import SideNavbar from './components/SideNavbar';
import ScreenPaginationHUD from './components/ScreenPaginationHUD';
import Hero from './components/Hero';
import ScrollingAnnouncement from './components/ScrollingAnnouncement';
import Services from './components/Services';
import ServiceModal from './components/ServiceModal';
import Solutions from './components/Solutions';
import WhyChooseUs from './components/WhyChooseUs';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AntigravityField from './components/AntigravityField';
import CinematicIntro from './components/CinematicIntro';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [preselectedService, setPreselectedService] = useState('');
  const [antigravityActive, setAntigravityActive] = useState(true);

  const totalScreens = 6;
  const screenTitles = [
    'Home',
    'Services',
    'Solutions',
    'Projects',
    'About Us',
    'Contact'
  ];

  const isTransitioningRef = useRef(false);

  // Navigate to specific screen with smooth state lock
  const goToScreen = useCallback((index) => {
    if (index < 0 || index >= totalScreens) return;
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setCurrentScreen(index);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 600);
  }, [totalScreens]);

  const nextScreen = useCallback(() => {
    if (currentScreen < totalScreens - 1) {
      goToScreen(currentScreen + 1);
    }
  }, [currentScreen, totalScreens, goToScreen]);

  const prevScreen = useCallback(() => {
    if (currentScreen > 0) {
      goToScreen(currentScreen - 1);
    }
  }, [currentScreen, goToScreen]);

  // Handle Inquiries & Navigation Links
  const handleInquireForService = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    goToScreen(5); // Go to Contact screen
  };

  const handleInquireForProject = (projectName) => {
    setPreselectedService('Software Development');
    goToScreen(5); // Go to Contact screen
  };

  return (
    <div 
      className={`h-screen w-screen overflow-hidden bg-white text-[#101828] font-sans selection:bg-[#00A3FF] selection:text-white flex relative ${
        antigravityActive ? 'antigravity-active' : ''
      }`}
    >
      {/* Sleek Blue Custom Interactive Cursor */}
      <CustomCursor />

      {/* Cinematic Logo Intro with Supernova BOOM Reveal */}
      {showIntro && (
        <CinematicIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Antigravity Zero-G Physics Simulation Field */}
      <AntigravityField 
        active={antigravityActive} 
        onToggle={() => setAntigravityActive(!antigravityActive)} 
      />

      {/* 1. LEFT SIDE NAVIGATION BAR (Docks on left on desktop, drawer on mobile) */}
      <SideNavbar 
        currentScreen={currentScreen}
        onNavigate={goToScreen}
        screens={screenTitles}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        antigravityActive={antigravityActive}
        onToggleAntigravity={() => setAntigravityActive(!antigravityActive)}
      />

      {/* 2. RIGHT SIDE PAGINATION HUD (Dots & Arrow buttons on far right) */}
      <ScreenPaginationHUD 
        currentScreen={currentScreen}
        totalScreens={totalScreens}
        onNext={nextScreen}
        onPrev={prevScreen}
        onSelectScreen={goToScreen}
        screenTitles={screenTitles}
      />

      {/* 3. MOBILE TOP HEADER BAR (Only visible on screens < lg) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#EAF3FF] px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-xl text-[#07152E] hover:bg-[#EAF3FF] hover:text-[#1769FF]"
          aria-label="Open side navigation"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Logo size="sm" />

        <button
          type="button"
          onClick={() => goToScreen(5)}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1769FF] to-[#00A3FF] text-white text-xs font-bold shadow-xs"
        >
          Let's Talk
        </button>
      </div>

      {/* 4. MAIN SCREEN DISPLAY CONTAINER (ONLY SHOWS THE CURRENT SCREEN WITH CINEMATIC REVEAL) */}
      <main className="flex-1 h-screen lg:ml-72 relative overflow-hidden bg-white">
        
        {/* Floating Chapter Telemetry Bar */}
        <div className="hidden lg:flex fixed top-4 right-16 z-30 items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs text-[11px] font-mono pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse" />
          <span className="text-slate-400">CHAPTER 0{currentScreen + 1} //</span>
          <span className="font-bold text-[#1769FF] uppercase tracking-wider">{screenTitles[currentScreen]}</span>
        </div>

        {/* SCREEN 0: HERO (3D Futuristic Experience) */}
        {currentScreen === 0 && (
          <div className="h-full w-full screen-scroll-container overflow-y-auto cinematic-reveal pt-16 lg:pt-0">
            <Hero 
              onExploreServices={() => goToScreen(1)}
              onStartProject={() => goToScreen(5)}
              antigravity={antigravityActive}
            />
          </div>
        )}

        {/* SCREEN 1: SERVICES ("WHAT WE CREATE") */}
        {currentScreen === 1 && (
          <div className="h-full w-full screen-scroll-container overflow-y-auto cinematic-reveal pt-16 lg:pt-0">
            <ScrollingAnnouncement />
            <Services 
              onSelectService={(service) => setSelectedService(service)}
            />
          </div>
        )}

        {/* SCREEN 2: SOLUTIONS & WHY PARTNER */}
        {currentScreen === 2 && (
          <div className="h-full w-full screen-scroll-container overflow-y-auto cinematic-reveal pt-16 lg:pt-0">
            <Solutions 
              onSelectSolution={() => goToScreen(5)}
            />
            <WhyChooseUs />
          </div>
        )}

        {/* SCREEN 3: PROJECTS (ARCHITECTURAL PROTOTYPES) */}
        {currentScreen === 3 && (
          <div className="h-full w-full screen-scroll-container overflow-y-auto cinematic-reveal pt-16 lg:pt-0">
            <Projects 
              onViewProject={(project) => setSelectedProject(project)}
            />
          </div>
        )}

        {/* SCREEN 4: ABOUT US & CO-FOUNDERS */}
        {currentScreen === 4 && (
          <div className="h-full w-full screen-scroll-container overflow-y-auto cinematic-reveal pt-16 lg:pt-0">
            <AboutUs />
          </div>
        )}

        {/* SCREEN 5: CONTACT / LET'S TALK */}
        {currentScreen === 5 && (
          <div className="h-full w-full screen-scroll-container overflow-y-auto cinematic-reveal pt-16 lg:pt-0">
            <Contact 
              preselectedService={preselectedService}
            />
            <Footer 
              onServiceClick={(srv) => {
                setPreselectedService(srv);
                goToScreen(5);
              }}
            />
          </div>
        )}

        {/* Floating Quick Screen Indicator on Bottom (Mobile / Tablet helper) */}
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#EAF3FF] shadow-md">
          <button
            type="button"
            disabled={currentScreen === 0}
            onClick={prevScreen}
            className="p-1 rounded-md text-[#1769FF] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#101828]">
            {screenTitles[currentScreen]} ({currentScreen + 1}/{totalScreens})
          </span>
          <button
            type="button"
            disabled={currentScreen === totalScreens - 1}
            onClick={nextScreen}
            className="p-1 rounded-md text-[#1769FF] disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* Interactive Service Details Modal */}
      <ServiceModal 
        service={selectedService}
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        onSelectForInquiry={handleInquireForService}
      />

      {/* Interactive Project Details Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireForProject}
      />
    </div>
  );
}
