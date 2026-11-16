import React, { useRef, useState } from 'react';

/**
 * Magnetic Button Component
 * Subtly and fluidly attracts toward cursor coordinates on hover.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.35,
  as: Component = 'button',
  ...props
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerPos, setInnerPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
    setInnerPos({ x: deltaX * 0.4, y: deltaY * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setInnerPos({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`interactive-target transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      {...props}
    >
      <span
        className="inline-flex items-center justify-center gap-2 w-full h-full transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: `translate3d(${innerPos.x}px, ${innerPos.y}px, 0)`,
        }}
      >
        {children}
      </span>
    </Component>
  );
}
