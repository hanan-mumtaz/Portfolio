import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../utils/useIsMobile';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Strictly exclude mobile devices
    if (isMobile) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // The original rich palette: purple, light lavender, indigo, and blue
    const colors = [
      'rgba(147, 51, 234, ',  // deep purple
      'rgba(168, 85, 247, ',  // vibrant purple
      'rgba(192, 132, 252, ', // lavender
      'rgba(99, 102, 241, ',   // indigo
      'rgba(59, 130, 246, ',   // blue
    ];

    const particleCount = 100;

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mouseX = 0;
    let mouseY = 0;
    let mouseMovedAt = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseMovedAt = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const mouseActive = now - mouseMovedAt < 250;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // React to mouse
        if (mouseActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0) {
            const angle = Math.atan2(dy, dx);
            p.speedX -= Math.cos(angle) * 0.05;
            p.speedY -= Math.sin(angle) * 0.05;
          }
        }

        // Natural random drift
        p.speedX += (Math.random() - 0.5) * 0.01;
        p.speedY += (Math.random() - 0.5) * 0.01;

        const speed = Math.hypot(p.speedX, p.speedY);
        const maxSpeed = 0.5;
        if (speed > maxSpeed) {
          p.speedX = (p.speedX / speed) * maxSpeed;
          p.speedY = (p.speedY / speed) * maxSpeed;
        }

        // Wrap around screen
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();

        // Draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = dx * dx + dy * dy;
          if (dist < 10000) {
            const opacity = 0.1 * (1 - dist / 10000);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Strictly excluded on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ transform: 'translateZ(0)' }}
      aria-hidden="true"
    />
  );
}
