import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import { Github, ExternalLink, Info, X, LayoutGrid, SlidersHorizontal, Check } from 'lucide-react';
import { useIsMobile } from '../utils/useIsMobile';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface Project {
  title: string;
  category: 'Full Stack' | 'Mobile' | 'AI & ML';
  projectType: string;
  description: string;
  longDescription?: string;
  highlights: string[];
  image: string;
  fallbackImage: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

const baseUrl = import.meta.env.BASE_URL;

const projects: Project[] = [
  {
    title: 'Psych.ai',
    category: 'AI & ML',
    projectType: 'Academic Research & Deep Learning',
    description: 'An explainable multimodal deep learning platform assisting in psychiatric interview analysis using cross-attention transformers.',
    longDescription: 'Developed as a deep learning research project, Psych.ai combines cross-attention transformers, facial action unit (AU) detection, and vocal prosody extraction. Built from scratch to explore how explainable attention maps can assist clinical assessments.',
    highlights: [
      'Self-implemented multimodal fusion (Audio + Video + Language)',
      'Facial action unit (AU) micro-expression tracking',
      'Explainable cross-attention heatmaps',
      'Asynchronous FastAPI backend with PyTorch inference',
    ],
    image: 'https://res.cloudinary.com/dnkaadogz/image/upload/v1790233826/Blue_Futuristic_Business_Presentation_pdouqv.jpg',
    fallbackImage: `${baseUrl}assets/da.png`,
    tags: ['PyTorch', 'Transformers', 'FastAPI', 'React-Native', 'Python'],
    github: 'https://github.com/Hanan-Mumtaz/Psych.ai',
    demo: 'https://github.com/Hanan-Mumtaz/Psych.ai',
    featured: true,
  },
  {
    title: 'Healthcove',
    category: 'Full Stack',
    projectType: 'Personal Full-Stack Web Application',
    description: 'A healthcare portal web application built with React, ASP.NET Core, and MongoDB for managing appointments and patient records.',
    longDescription: 'A self-initiated full-stack project designed to explore RESTful API architecture, role-based authentication, and MongoDB integration. Allows patients and doctors to view schedules and manage medical records.',
    highlights: [
      'Full-stack architecture built from scratch',
      'Role-based doctor/patient routing with JWT',
      'ASP.NET Core REST API backend',
      'MongoDB data modeling and aggregation queries',
    ],
    image: 'https://res.cloudinary.com/dnkaadogz/image/upload/v1772966158/Healthcove_oki7bn.png',
    fallbackImage: `${baseUrl}assets/Healthcove.png`,
    tags: ['React.js', 'ASP.NET', 'MongoDB', 'REST API', 'Tailwind CSS'],
    github: 'https://github.com/Hanan-Mumtaz/Healthcove',
    demo: 'http://healthcove.duckdns.org',
    featured: true,
  },
  {
    title: 'Teeze Store',
    category: 'Mobile',
    projectType: 'Personal Mobile Project',
    description: 'An e-commerce mobile application built with React Native and Expo featuring animated product discovery and cart management.',
    longDescription: 'Created as an independent project to practice cross-platform mobile UX, offline cart persistence with AsyncStorage, and smooth 60fps animations on iOS and Android.',
    highlights: [
      'Smooth mobile gestures and catalog transitions',
      'Offline cart and favorites persistence with AsyncStorage',
      'Expo Go workflow and native components',
      'Backend integration with ASP.NET Core & MongoDB',
    ],
    image: 'https://res.cloudinary.com/dnkaadogz/image/upload/v1772966155/teeze_puurog.png',
    fallbackImage: `${baseUrl}assets/teeze.png`,
    tags: ['React Native', 'Expo Go', 'ASP.NET', 'MongoDB'],
    github: 'https://github.com/Hanan-Mumtaz/teeze',
    demo: 'https://expo.dev/accounts/hanan_mumtaz/projects/teezestore/builds/2168163f-0ffd-41c1-a036-4b89107fb83a',
    featured: true,
  },
  {
    title: 'Matrix App',
    category: 'Mobile',
    projectType: 'Personal Mobile Application',
    description: 'Task coordination & team workflow mobile application built with React Native and ASP.NET Core.',
    longDescription: 'A personal productivity experiment exploring agile task boards on mobile screens. Built to practice state management, task sorting algorithms, and RESTful synchronizations.',
    highlights: [
      'Touch-friendly task cards and status columns',
      'State management and rapid local caching',
      'REST API connection with ASP.NET Core',
      'Responsive design tested across screen sizes',
    ],
    image: 'https://res.cloudinary.com/dnkaadogz/image/upload/v1773056142/matrix_ybjrda.png',
    fallbackImage: `${baseUrl}assets/matrix.png`,
    tags: ['React Native', 'Expo Go', 'ASP.NET', 'MongoDB'],
    github: 'https://github.com/Hanan-Mumtaz/Matrix',
    demo: 'https://github.com/Hanan-Mumtaz/Matrix',
    featured: false,
  },
  {
    title: 'GymPulse Fitness',
    category: 'Mobile',
    projectType: 'Personal Mobile Application',
    description: 'A workout companion and fitness tracker mobile app for logging sets, reps, and exercise volume.',
    longDescription: 'Built to solve my own need for a clean, distraction-free gym tracker. Implements workout logs, exercise libraries, and volume calculations without bloat.',
    highlights: [
      'Custom exercise routine logging',
      'Progressive overload volume calculation',
      'Simple, distraction-free dark mobile UI',
      'Offline-first data storage',
    ],
    image: `${baseUrl}assets/Gym.png`,
    fallbackImage: `${baseUrl}assets/Gym.png`,
    tags: ['React Native', 'TypeScript', 'Tailwind CSS', 'Mobile UX'],
    github: 'https://github.com/Hanan-Mumtaz',
    demo: 'https://github.com/Hanan-Mumtaz',
    featured: false,
  },
];

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onSelect }) => {
  const [imgSrc, setImgSrc] = useState(project.image);

  return (
    <div className="bg-zinc-900/60 rounded-2xl overflow-hidden h-full border border-zinc-800/90 hover:border-purple-500/40 transition-all duration-300 group flex flex-col shadow-lg hover:shadow-glow-sm backdrop-blur-sm">
      {/* Image container */}
      <div className="relative overflow-hidden aspect-video bg-zinc-950">
        <img
          src={imgSrc}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(project.fallbackImage)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        {/* Featured Tag */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-md border border-purple-400/30">
            Featured
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-zinc-900/85 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-zinc-300 border border-zinc-700/60">
          {project.category}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onSelect(project)}
            className="p-3 bg-zinc-800/90 hover:bg-purple-600 text-white rounded-full transition-all duration-200 border border-zinc-700 hover:border-purple-400 hover:scale-110 shadow-lg"
            aria-label={`View details for ${project.title}`}
          >
            <Info size={20} />
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800/90 hover:bg-purple-600 text-white rounded-full transition-all duration-200 border border-zinc-700 hover:border-purple-400 hover:scale-110 shadow-lg"
              aria-label={`GitHub repo for ${project.title}`}
            >
              <Github size={20} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800/90 hover:bg-purple-600 text-white rounded-full transition-all duration-200 border border-zinc-700 hover:border-purple-400 hover:scale-110 shadow-lg"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 mb-5 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/70">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-purple-950/40 border border-purple-500/20 rounded-md text-purple-300 text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 bg-zinc-800/60 rounded-md text-zinc-400 text-[11px] font-medium">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default function Projects() {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const categories = ['All', 'Full Stack', 'Mobile', 'AI & ML'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="projects" className="py-24 bg-[#050508] text-zinc-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-3 uppercase tracking-wider">
            Personal Projects
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Independent{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Projects & Prototypes
            </span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Hands-on applications, mobile experiments, and deep learning architectures built independently to master the stack.
          </p>
        </motion.div>

        {/* Filter Controls & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('carousel')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'carousel' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
              title="Carousel View"
              aria-label="Carousel View"
            >
              <SlidersHorizontal size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Main Display: Carousel vs Grid */}
        {viewMode === 'carousel' ? (
          <div className="relative">
            <Swiper
              key={selectedCategory}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              navigation={true}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={activeModalProject ? false : { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              grabCursor={true}
              touchRatio={1.2}
              resistance={true}
              resistanceRatio={0.8}
              keyboard={{ enabled: true, onlyInViewport: true }}
              modules={[Navigation, Pagination, Autoplay, Keyboard]}
              className="!pb-14 !px-1 sm:!px-2"
            >
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={`${project.title}-${index}`}>
                  <ProjectCard project={project} onSelect={setActiveModalProject} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={`${project.title}-${index}`}
                initial={isMobile ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} onSelect={setActiveModalProject} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex mt-14 items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              style={{ WebkitOverflowScrolling: 'touch', transform: 'translateZ(0)' }}
              className="bg-zinc-950 border border-purple-500/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative overscroll-contain"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="sticky top-4 float-right mr-4 -mb-10 p-2 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-30 shadow-lg backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Modal Banner */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = activeModalProject.fallbackImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="px-2.5 py-1 rounded-full bg-purple-600/90 text-white text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {activeModalProject.longDescription || activeModalProject.description}
                </p>

                {/* Key Architecture Highlights */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-3">
                    Key Engineering Highlights
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    {activeModalProject.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-3">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-zinc-900 border border-purple-500/25 rounded-lg text-purple-300 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800">
                  {activeModalProject.demo && (
                    <a
                      href={activeModalProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40"
                    >
                      <span>Live Demo / App</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {activeModalProject.github && (
                    <a
                      href={activeModalProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 font-semibold text-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>View GitHub</span>
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
