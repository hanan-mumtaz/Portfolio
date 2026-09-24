import React, { useEffect, useRef } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isPageVisible = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Black, Purple, and Grey palette
    const colors = [
      'rgba(168, 85, 247, ', // vibrant purple
      'rgba(192, 132, 252, ', // light lavender
      'rgba(147, 51, 234, ',  // deep purple
      'rgba(161, 161, 170, ', // zinc grey
      'rgba(113, 113, 122, ', // dark grey
    ];

    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    const cores = navigator.hardwareConcurrency || 4;
    const isHighGfx = !isMobile && cores >= 4;
    // Adapt particle count to device tier: light on mobile, rich on desktop
    const particleCount = isMobile ? 16 : isHighGfx ? 50 : 28;

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.8,
      speedX: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.35),
      speedY: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.35),
      opacity: Math.random() * 0.3 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mouseX = -1000;
    let mouseY = -1000;
    let mouseMovedAt = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseMovedAt = Date.now();
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Pause rendering when tab is hidden to save battery
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastFrameTime = performance.now();
    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    const animate = (timestamp: number) => {
      if (!isPageVisible) return;

      const currentTime = timestamp || performance.now();
      const elapsed = currentTime - lastFrameTime;

      if (elapsed < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      // Pause drawing when modal is open
      if (document.body.style.overflow === 'hidden') {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const mouseActive = !isMobile && now - mouseMovedAt < 250;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        if (mouseActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0) {
            const angle = Math.atan2(dy, dx);
            p.speedX -= Math.cos(angle) * 0.03;
            p.speedY -= Math.sin(angle) * 0.03;
          }
        }

        // Slight natural drift
        p.speedX += (Math.random() - 0.5) * 0.01;
        p.speedY += (Math.random() - 0.5) * 0.01;

        const speed = Math.hypot(p.speedX, p.speedY);
        const maxSpeed = 0.5;
        if (speed > maxSpeed) {
          p.speedX = (p.speedX / speed) * maxSpeed;
          p.speedY = (p.speedY / speed) * maxSpeed;
        }

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();

        // Connect nearby particles with subtle purple/grey glow lines on high GFX devices
        if (isHighGfx) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 7500) {
              const opacity = 0.07 * (1 - distSq / 7500);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ transform: 'translateZ(0)' }}
      aria-hidden="true"
    />
  );
}

