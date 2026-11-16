import React, { useState, useEffect, useRef } from 'react';
import officialLogo from '../assets/rulax-logo-official.jpg';

/**
 * Epic 6-Second Full-Screen Cinematic Logo Intro & Supernova "BOOM" Reveal
 * - Covers 100% of the screen (z-[999999]) - no navigation bar, no HUD, pure cinema
 * - Full 6.0 Second Cinematic Timeline:
 *   - 0.0s - 1.5s: Ingress from deep cosmic void with converging energy particles
 *   - 1.5s - 4.5s: Official Rulax circular emblem powers up, concentric energy rings spin, telemetry counts 0% -> 100%
 *   - 4.5s - 5.3s: Critical Overload! Pulsing electric glow and warning telemetry
 *   - 5.3s - 6.0s: SUPERNOVA "BOOM" shockwave detonation, white-cyan energy flash, shattering darkness into live website
 */
export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState('ingress'); // 'ingress' | 'charging' | 'critical' | 'boom' | 'exit'
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Exact 6-second timeline (6000ms total)
    // 0ms -> 4600ms: Smooth 0% to 100% telemetry counter
    const startTime = Date.now();
    const chargeDuration = 4600; // 4.6 seconds of charging

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / chargeDuration) * 100));
      setProgress(pct);

      if (pct >= 50 && phase === 'ingress') {
        setPhase('charging');
      }

      if (pct >= 100) {
        clearInterval(timer);
        setPhase('critical');

        // At 5.3s: Detonate BOOM explosion!
        setTimeout(() => {
          setPhase('boom');

          // At 6.0s: Reveal full website
          setTimeout(() => {
            setPhase('exit');
            if (onComplete) onComplete();
          }, 700);
        }, 700);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  // High-density energy particle vortex
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (canvas.width / 2) + 120;
      particles.push({
        angle,
        dist,
        speed: Math.random() * 5 + 3,
        size: Math.random() * 2.5 + 1,
        color: Math.random() > 0.4 ? '#00A3FF' : '#1769FF',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.dist -= p.speed;
        if (p.dist < 40) {
          p.dist = Math.random() * (canvas.width / 2) + 200;
          p.angle = Math.random() * Math.PI * 2;
        }

        const x = centerX + Math.cos(p.angle) * p.dist;
        const y = centerY + Math.sin(p.angle) * p.dist;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSkip = () => {
    setPhase('boom');
    setTimeout(() => {
      setPhase('exit');
      if (onComplete) onComplete();
    }, 450);
  };

  if (phase === 'exit') return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[999999] w-screen h-screen bg-[#020617] overflow-hidden select-none flex flex-col items-center justify-center ${
        phase === 'boom' ? 'pointer-events-none' : 'cursor-pointer'
      }`}
      style={{
        opacity: phase === 'boom' ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Converging Energy Particle Vortex */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-85" />

      {/* Futuristic Deep Spatial Grid */}
      <div className="absolute inset-0 bg-futuristic-grid opacity-25 pointer-events-none" />

      {/* Skip Intro Control */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-8 right-8 z-[1000000] px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-mono font-bold tracking-widest transition-all shadow-lg hover:border-cyan-400"
      >
        SKIP INTRO // ESC
      </button>

      {/* SUPERNOVA BOOM FLASH OVERLAY */}
      <div
        className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-300 z-50 ${
          phase === 'boom' ? 'opacity-95' : 'opacity-0'
        }`}
      />

      {/* SHOCKWAVE EXPANDING RINGS ON BOOM */}
      {phase === 'boom' && (
        <>
          <div className="absolute w-44 h-44 rounded-full border-4 border-[#00A3FF] shadow-[0_0_120px_#00A3FF] animate-ping pointer-events-none z-40" />
          <div 
            className="absolute w-96 h-96 rounded-full border-2 border-white shadow-[0_0_180px_#1769FF] pointer-events-none z-40 transition-transform duration-700 ease-out"
            style={{ transform: 'scale(16)', opacity: 0 }}
          />
        </>
      )}

      {/* CENTRAL OFFICIAL LOGO WITH SUPERNOVA ENERGY AURA */}
      <div className="relative z-30 flex flex-col items-center">
        {/* Tier 1: Outer Rotating Tech Orbit Ring */}
        <div 
          className="absolute -inset-16 sm:-inset-24 rounded-full border border-dashed border-[#00A3FF]/40 pointer-events-none animate-spin"
          style={{ animationDuration: '14s' }}
        />

        {/* Tier 2: Mid Concentric Aura Halo Ring */}
        <div 
          className={`absolute -inset-8 sm:-inset-12 rounded-full border-2 border-[#1769FF]/50 pointer-events-none transition-all duration-700 ${
            phase === 'critical' ? 'scale-125 border-cyan-300 animate-ping' : 'scale-100 animate-pulse'
          }`}
        />

        {/* The Official Circular RULAX Emblem */}
        <div
          className={`relative w-56 h-56 sm:w-72 sm:h-72 md:w-84 md:h-84 rounded-full p-2.5 bg-gradient-to-tr from-[#1769FF] via-[#00A3FF] to-[#38BDF8] shadow-[0_0_80px_rgba(0,163,255,0.8)] transition-all duration-600 ${
            phase === 'boom'
              ? 'scale-[3.8] opacity-0 filter blur-md'
              : phase === 'critical'
              ? 'scale-115 shadow-[0_0_140px_rgba(0,163,255,1)] animate-bounce'
              : 'scale-100 animate-in zoom-in-75 duration-1000'
          }`}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative shadow-inner">
            <img
              src={officialLogo}
              alt="Rulax Technology Official Logo"
              className="w-full h-full object-cover rounded-full select-none"
            />
            {/* Luminous Light Sweep Across Emblem */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Telemetry Progress Indicator */}
        <div 
          className={`mt-10 sm:mt-12 flex flex-col items-center space-y-3.5 transition-opacity duration-300 ${
            phase === 'boom' ? 'opacity-0 scale-90' : 'opacity-100'
          }`}
        >
          {/* Progress Bar */}
          <div className="w-64 sm:w-84 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/80 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#1769FF] via-[#00A3FF] to-[#38BDF8] shadow-[0_0_20px_#00A3FF] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Telemetry Status String */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xs font-mono text-center">
            <span className="text-[#00A3FF] font-black tracking-widest text-sm">
              ENGINE CHARGE: {progress}%
            </span>
            <span className="hidden sm:inline text-slate-500">//</span>
            <span className="text-slate-200 font-bold tracking-wider uppercase">
              {progress < 25 && '[ 01/04 ] INITIALIZING RULAX SYSTEM ENGINE...'}
              {progress >= 25 && progress < 60 && '[ 02/04 ] SYNCHRONIZING QUANTUM ZERO-G CORES...'}
              {progress >= 60 && progress < 90 && '[ 03/04 ] ENGAGING RL MONOGRAM REACTION MATRIX...'}
              {progress >= 90 && progress < 100 && '[ 04/04 ] STABILIZING CYBERNETIC FREQUENCY...'}
              {progress === 100 && 'CRITICAL MASS REACHED // DETONATING WARP INGRESS!'}
            </span>
          </div>

          <p className="text-[11px] font-mono text-slate-400 pt-1 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            [ 6.0S CINEMATIC LAUNCH • CLICK ANYWHERE TO IGNITE NOW ]
          </p>
        </div>

      </div>
    </div>
  );
}
