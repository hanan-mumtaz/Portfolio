import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Server, Brain, Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '../utils/useIsMobile';

export default function About() {
  const isMobile = useIsMobile();
  const [imgError, setImgError] = useState(false);
  const profileFallback = `${import.meta.env.BASE_URL}assets/profile-D6iLI1Rc.jpg`;

  const fadeInUp = {
    initial: isMobile ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: isMobile ? 0 : 0.15 },
    transition: { duration: 0.45, ease: 'easeOut' },
  };

  const capabilities = [
    {
      icon: Code,
      title: 'Frontend Web Apps',
      desc: 'Building responsive user interfaces with React, Tailwind CSS, TypeScript, and modern component states.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      desc: 'Developing cross-platform iOS & Android mobile apps using React Native and Expo Go.',
    },
    {
      icon: Server,
      title: 'Backend & APIs',
      desc: 'Designing REST APIs with ASP.NET Core, FastAPI (Python), and structured data modeling.',
    },
    {
      icon: Brain,
      title: 'Applied Machine Learning',
      desc: 'Hands-on experimentation with PyTorch, transformer architectures, and multimodal computer vision.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 bg-[#050508] text-zinc-100 relative overflow-hidden">
      {/* Background glow subtle */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-3 uppercase tracking-wider">
            About My Journey
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Learning By{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Building Real Projects
            </span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed">
            I believe the best way to master computer science is by writing code, architecting systems, and building functional applications from scratch.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Image Card */}
          <motion.div {...fadeInUp} className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[260px] sm:max-w-[320px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/25 to-zinc-700/20 rounded-2xl blur-lg" />
              <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-purple-500/25 p-1.5 shadow-2xl">
                <img
                  src={imgError ? profileFallback : 'https://res.cloudinary.com/dnkaadogz/image/upload/v1772966204/profile_wnucej.jpg'}
                  alt="Hanan Mumtaz"
                  className="w-full aspect-[4/5] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-50" />
              </div>

              {/* Pill on image */}
              <div className="absolute -bottom-3 right-2 sm:right-4 bg-zinc-900/95 border border-purple-500/30 px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md">
                <p className="text-[10px] sm:text-xs text-zinc-400 font-medium">Focus Area</p>
                <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Full-Stack & Deep Learning
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Capabilities & Education */}
          <motion.div {...fadeInUp} className="lg:col-span-8 space-y-8">
            {/* Bio */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-7 backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2.5">
                Self-Driven Developer & Computer Science Student
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-4 text-xs sm:text-sm md:text-base">
                Over the past 1 to 3 years, I have dedicated myself to hands-on programming through self-initiated projects. Rather than corporate work, I have focused on architecting and completing my own full-stack web and mobile apps, as well as researching multimodal deep learning to turn theoretical knowledge into functional code.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-purple-300">
                {['1-3 Years Self-Driven Projects', 'Clean Code', 'Hands-on Builder', 'Curious Learner'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/25 flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* What I Do Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
              {capabilities.map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-purple-500/40 rounded-xl p-4 sm:p-5 transition-all duration-300 group shadow-sm"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-purple-950/70 border border-purple-500/30 text-purple-400">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">
                        {item.title}
                      </h4>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic & Learning Journey */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-1">
              {/* Education Card */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="p-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-purple-400">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Education & Studies</h5>
                    <p className="text-[11px] text-zinc-500">Degree & Courses</p>
                  </div>
                </div>
                <ul className="text-zinc-400 text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>BS in Computer Science</strong> (In Progress)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Core courses: Data Structures, Algorithms, OS, DBMS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Self-taught full-stack web and mobile engineering</span>
                  </li>
                </ul>
              </div>

              {/* Highlights Card */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="p-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-purple-400">
                    <Award size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs sm:text-sm">Project Milestones</h5>
                    <p className="text-[11px] text-zinc-500">Self-Directed Work</p>
                  </div>
                </div>
                <ul className="text-zinc-400 text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Engineered 5+ independent applications from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Developed Psych.ai deep learning interview analysis model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Open-source projects hosted on GitHub</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
