import React, { useEffect, useRef } from 'react';
import { Sparkles, Compass, Rocket } from 'lucide-react';

/**
 * Antigravity Mode Visual Physics Engine
 * Generates upward drifting zero-gravity cosmic dust and futuristic HUD telemetry.
 */
export default function AntigravityField({ active = true, onToggle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate upward drifting zero-G particles
    const particleCount = 65;
    const particles = [];
    const colors = ['#00A3FF', '#1769FF', '#38BDF8', '#818CF8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: -(Math.random() * 1.8 + 0.6), // Negative velocity = floating UP against gravity
        vx: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * 0.05,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.5;
        p.alpha += Math.sin(p.y * 0.05) * 0.02;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return (
    <>
      {active && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 opacity-80 transition-opacity duration-500"
        />
      )}

      {/* Floating HUD Telemetry Pill */}
      <div className="fixed bottom-5 left-5 lg:left-76 z-40 flex items-center gap-2">
        <div
          className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 shadow-lg transition-all duration-300 border bg-gradient-to-r from-[#1769FF] to-[#00A3FF] text-white border-cyan-300 shadow-[0_0_20px_rgba(0,163,255,0.6)] animate-pulse"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-200 animate-ping" />
          <Rocket className="w-3.5 h-3.5 rotate-[-45deg] text-white" />
          <span>ANTIGRAVITY: ZERO-G PERMANENT</span>
        </div>
      </div>
    </>
  );
}
