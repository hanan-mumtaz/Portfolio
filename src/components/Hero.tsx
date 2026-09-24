import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Sparkles, Zap, Terminal, Layers, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  const floatingIcons = useMemo(
    () => [
      { Icon: Code, x: '8%', y: '22%', delay: 0 },
      { Icon: Sparkles, x: '88%', y: '16%', delay: 0.2 },
      { Icon: Zap, x: '80%', y: '78%', delay: 0.4 },
      { Icon: Terminal, x: '12%', y: '82%', delay: 0.3 },
    ],
    []
  );

  const stats = [
    { label: 'Independent Learning', value: '1-3 Yrs' },
    { label: 'Self-Built Projects', value: '5+' },
    { label: 'Technologies Practiced', value: '10+' },
    { label: 'Curiosity & Learning', value: '100%' },
  ];

  const profileFallback = `${import.meta.env.BASE_URL}assets/profile-D6iLI1Rc.jpg`;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#050508] text-zinc-100 overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[350px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[200px] sm:w-[350px] h-[150px] sm:h-[250px] bg-purple-900/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Icons - Hidden on small mobile screens */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-400/15 pointer-events-none hidden md:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.8, ease: 'easeOut' }}
        >
          <Icon className="w-8 h-8 md:w-10 md:h-10" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
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
              <span>BS Computer Science Student • Self-Driven Projects</span>
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
              Passionate CS student with 1-3 years of hands-on experience building personal and academic projects. I love exploring{' '}
              <span className="text-purple-300 font-medium">React</span>,{' '}
              <span className="text-purple-400 font-medium">React Native</span>,{' '}
              <span className="text-zinc-200 font-medium">ASP.NET</span>, and{' '}
              <span className="text-purple-300 font-medium">multimodal AI</span> from the ground up.
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

          {/* Right Profile Column */}
          <motion.div
            className="flex-1 w-full max-w-xs sm:max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[360px] mx-auto">
              {/* Subtle Glowing Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/25 via-purple-900/20 to-zinc-900 rounded-3xl blur-lg" />
              <div className="absolute inset-[-3px] bg-gradient-to-tr from-purple-600/40 via-purple-500/20 to-zinc-800/40 rounded-3xl" />

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl p-1.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative group">
                  <img
                    src={imgError ? profileFallback : 'https://res.cloudinary.com/dnkaadogz/image/upload/v1772966191/about_jvyl6t.jpg'}
                    alt="Hanan Mumtaz"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fetchPriority="high"
                    loading="eager"
                    onError={() => setImgError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-50" />
                </div>
              </div>

              {/* Tech Badge 1 */}
              <div className="absolute -top-3 -right-2 sm:-right-4 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-purple-500/30 backdrop-blur-md shadow-xl flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-zinc-200">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Multimodal AI & PyTorch</span>
              </div>

              {/* Tech Badge 2 */}
              <div className="absolute -bottom-3 -left-2 sm:-left-4 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-purple-500/30 backdrop-blur-md shadow-xl flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-zinc-200">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>React & React Native</span>
              </div>
            </div>
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

