import React, { useEffect, useState, useRef } from 'react';

/**
 * Sleek Futuristic Electric-Blue Custom Cursor
 * Features:
 * - Fluid lagging outer glow ring (lerp smoothing)
 * - Precision center laser dot
 * - Interactive magnetic hover states for clickable elements
 * - Click ripple burst animation
 * - Graceful fallback on touch devices
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop fine-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable = target.closest('button, a, input, textarea, select, [role="button"], .interactive-target, .glass-card-3d');
      setHovered(!!isClickable);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth render loop for trailing ring
    const animate = () => {
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Precision Center Laser Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-transform duration-75 ease-out ${
          hovered ? 'w-2 h-2 bg-[#1769FF]' : 'w-2.5 h-2.5 bg-[#00A3FF]'
        } shadow-[0_0_10px_#00A3FF]`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Fluid Magnetic Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
          hovered
            ? 'w-14 h-14 bg-[#00A3FF]/15 border-2 border-[#00A3FF] scale-110 shadow-[0_0_20px_rgba(0,163,255,0.4)] backdrop-blur-[1px]'
            : clicked
            ? 'w-8 h-8 bg-[#1769FF]/20 border border-[#1769FF] scale-90'
            : 'w-10 h-10 border border-[#00A3FF]/60 shadow-[0_0_12px_rgba(0,163,255,0.2)]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {hovered && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-ping" />
        )}
      </div>
    </>
  );
}
