import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Sparkles, Zap, Terminal, Layers, ArrowRight } from 'lucide-react';

const defaultSpring = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
};

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const [deviceTier, setDeviceTier] = useState<{ isHighGfx: boolean; isMobile: boolean }>({
    isHighGfx: true,
    isMobile: false,
  });

  useEffect(() => {
    const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
    const cores = navigator.hardwareConcurrency || 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setDeviceTier({
      isMobile: isMobileDevice,
      isHighGfx: !isMobileDevice && cores >= 4 && !prefersReducedMotion,
    });
  }, []);

  const { isHighGfx, isMobile } = deviceTier;

  const floatingIcons = useMemo(
    () => [
      { Icon: Code, x: '8%', y: '22%', delay: 0 },
      { Icon: Sparkles, x: '88%', y: '16%', delay: 0.2 },
      { Icon: Zap, x: '82%', y: '78%', delay: 0.4 },
      { Icon: Terminal, x: '10%', y: '82%', delay: 0.3 },
    ],
    []
  );

  const stats = [
    { label: 'Independent Learning', value: '1-3 Yrs' },
    { label: 'Self-Built Projects', value: '5+' },
    { label: 'Technologies Practiced', value: '10+' },
    { label: 'Curiosity & Dedication', value: '100%' },
  ];

  const profileFallback = `${import.meta.env.BASE_URL}assets/profile-D6iLI1Rc.jpg`;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-[#050508] text-zinc-100 overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Top subtle gradient wave */}
      <div className="absolute top-0 left-0 right-0 w-full h-24 sm:h-32 overflow-hidden pointer-events-none opacity-30">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="heroGradientWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#9333ea" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heroGradientWave)"
            d="M0,120 C320,60 640,160 960,100 C1280,40 1440,120 1440,120 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[380px] bg-purple-600/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[200px] sm:w-[350px] h-[150px] sm:h-[250px] bg-purple-900/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating decorative icons - active on desktop */}
      {!isMobile &&
        floatingIcons.map(({ Icon, x, y, delay }, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-400/20 pointer-events-none hidden md:block"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.8, ease: 'easeOut' }}
          >
            <Icon className="w-8 h-8 md:w-9 md:h-9" />
          </motion.div>
        ))}

      <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* Left Text Column */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-purple-500/30 text-xs font-medium text-purple-300 mb-5 backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Frontend & Full-Stack Developer • CS Student</span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.2] mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-200 bg-clip-text text-transparent">
                Hanan Mumtaz
              </span>
            </h1>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-zinc-400 mb-7 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              Passionate developer crafting modern, responsive frontend interfaces and end-to-end applications with 1-3 years of hands-on experience across{' '}
              <span className="text-purple-300 font-medium">React</span>,{' '}
              <span className="text-purple-400 font-medium">React Native</span>,{' '}
              <span className="text-zinc-200 font-medium">ASP.NET Core</span>, and{' '}
              <span className="text-purple-300 font-medium">multimodal AI</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-600/50 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-purple-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
              </a>
            </motion.div>

            {/* Honest Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10 pt-6 border-t border-zinc-800/80 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left bg-zinc-950/40 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Profile Column: Dynamic GFX Rotating Backdrop Cards */}
          <motion.div
            className="flex-1 w-full max-w-xs sm:max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="relative w-full aspect-square max-w-[270px] sm:max-w-[340px] md:max-w-[370px] mx-auto"
              whileHover={isHighGfx ? { scale: 1.03 } : undefined}
              transition={defaultSpring}
            >
              {/* Outer Ambient Glow */}
              <motion.div
                className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-purple-600/30 via-fuchsia-600/20 to-purple-900/30 rounded-3xl blur-xl pointer-events-none"
                animate={isHighGfx ? { scale: [1, 1.05, 1], opacity: [0.35, 0.55, 0.35] } : { opacity: 0.35 }}
                transition={isHighGfx ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
              />

              {/* Dynamic Rotating Card 1: -rotate-6 with gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-purple-800 rounded-3xl -rotate-6 shadow-2xl shadow-purple-950/50"
                animate={isHighGfx ? { rotate: ['-7deg', '7deg', '-7deg'] } : { rotate: -5 }}
                transition={isHighGfx ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
              />

              {/* Dynamic Rotating Card 2: +rotate-6 with deep purple gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-950 rounded-3xl rotate-6 opacity-75 shadow-xl shadow-purple-950/60"
                animate={isHighGfx ? { rotate: ['7deg', '-7deg', '7deg'] } : { rotate: 5 }}
                transition={isHighGfx ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
              />

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-700/80 shadow-2xl p-1.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative group">
                  <img
                    src={imgError ? profileFallback : 'https://res.cloudinary.com/dnkaadogz/image/upload/v1772966191/about_jvyl6t.jpg'}
                    alt="Hanan Mumtaz - Frontend Developer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fetchPriority="high"
                    loading="eager"
                    onError={() => setImgError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Badge 1: Frontend Developer (Requested by user) */}
              <motion.div
                className="absolute -top-3 sm:-top-4 -right-2 sm:-right-4 px-3.5 py-1.5 rounded-xl bg-zinc-900/95 border border-purple-500/40 backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold text-white z-20"
                animate={isHighGfx ? { y: [0, -5, 0] } : undefined}
                transition={isHighGfx ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
              >
                <Code className="w-4 h-4 text-purple-400" />
                <span>AI & Deep Learning</span>
              </motion.div>

              {/* Badge 2: Full-Stack & React */}
              <motion.div
                className="absolute -bottom-3 sm:-bottom-4 -left-2 sm:-left-4 px-3.5 py-1.5 rounded-xl bg-zinc-900/95 border border-purple-500/40 backdrop-blur-md shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-100 z-20"
                animate={isHighGfx ? { y: [0, 5, 0] } : undefined}
                transition={isHighGfx ? { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } : undefined}
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Full-Stack Developer</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        className="mt-8 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold">Scroll</span>
        <ArrowDown className="text-purple-400 w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}

