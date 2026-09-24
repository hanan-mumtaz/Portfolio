import React, { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Strictly disable on touch, mobile, and small screens
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 768 ||
      'ontouchstart' in window
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 transition-opacity duration-300 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        width: '550px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(147, 51, 234, 0.03) 40%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}

