import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Brain, Sparkles } from 'lucide-react';
import { useIsMobile } from '../utils/useIsMobile';

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  icon: React.ElementType;
  description: string;
  skills: SkillItem[];
  technologies: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend & Mobile',
    icon: Layout,
    description: 'Responsive, accessible, and reactive user interfaces across web and mobile platforms.',
    skills: [
      { name: 'React Native & Expo', level: 92 },
      { name: 'React.js & Modern Hooks', level: 88 },
      { name: 'TypeScript & JavaScript (ES6+)', level: 85 },
      { name: 'Tailwind CSS & Framer Motion', level: 90 },
    ],
    technologies: ['React Native', 'React', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'Expo'],
  },
  {
    name: 'Backend & APIs',
    icon: Server,
    description: 'Scalable services, secure authentication, and microservice architectures.',
    skills: [
      { name: 'ASP.NET Core (C#)', level: 88 },
      { name: 'FastAPI (Python)', level: 84 },
      { name: 'RESTful API Architecture', level: 90 },
      { name: 'Authentication (JWT, OAuth)', level: 85 },
    ],
    technologies: ['ASP.NET Core', 'FastAPI', 'C#', 'Python', 'REST', 'JWT Auth'],
  },
  {
    name: 'AI & Deep Learning',
    icon: Brain,
    description: 'Multimodal transformer models, computer vision, and neural network inference.',
    skills: [
      { name: 'PyTorch & HuggingFace', level: 82 },
      { name: 'Multimodal Transformers', level: 80 },
      { name: 'Facial Action Units & CV', level: 78 },
      { name: 'Explainable AI (XAI)', level: 75 },
    ],
    technologies: ['PyTorch', 'Transformers', 'OpenCV', 'Scikit-learn', 'NumPy', 'Pandas'],
  },
  {
    name: 'Databases & DevOps',
    icon: Database,
    description: 'High-availability data stores, schema design, and CI/CD pipelines.',
    skills: [
      { name: 'MongoDB & NoSQL Aggregation', level: 90 },
      { name: 'Git & GitHub Workflows', level: 88 },
      { name: 'REST API Integration', level: 92 },
      { name: 'Performance Optimization', level: 82 },
    ],
    technologies: ['MongoDB', 'SQL', 'Git', 'GitHub Actions', 'Postman', 'Docker Basics'],
  },
];

export default function Skills() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 bg-[#050508] text-zinc-100 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[300px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-zinc-800/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-3 uppercase tracking-wider">
            Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Skills & Stack
            </span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Battle-tested technologies and toolchains utilized to deliver robust, high-performance applications.
          </p>
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            const isHovered = activeCategory === i;

            return (
              <motion.div
                key={category.name}
                initial={isMobile ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0 : i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setActiveCategory(i)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`bg-zinc-900/50 rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between backdrop-blur-sm ${
                  isHovered
                    ? 'border-purple-500/50 bg-zinc-900/80 shadow-glow-sm -translate-y-1'
                    : 'border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-950/70 border border-purple-500/30 rounded-xl text-purple-400 shadow-md">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Progress Bars */}
                  <div className="space-y-4 mb-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="font-medium text-zinc-300">{skill.name}</span>
                          <span className="text-purple-400 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-zinc-800/90 rounded-full overflow-hidden p-0.5 border border-zinc-700/40">
                          <motion.div
                            initial={isMobile ? { width: `${skill.level}%` } : { width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: isMobile ? 0 : 0.2, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-400 shadow-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-zinc-800/70">
                  <div className="flex flex-wrap gap-1.5">
                    {category.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-zinc-950/80 border border-zinc-800 rounded text-[11px] font-medium text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Bottom Banner */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl bg-zinc-900/40 border border-purple-500/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 hidden sm:block">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Continuous Lifelong Learning</h4>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Constantly expanding expertise into distributed systems, generative AI models, and next-generation frameworks.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-zinc-800/90 hover:bg-purple-600 border border-zinc-700 hover:border-purple-400 text-xs font-semibold text-white transition-all duration-200 whitespace-nowrap shadow-sm hover:scale-105"
          >
            Discuss a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
