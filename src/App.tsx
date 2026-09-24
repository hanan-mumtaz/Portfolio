import React from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <MotionConfig reducedMotion="never">
      <div className="bg-[#050508] text-zinc-100 min-h-screen relative overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
        {/* Subtle Interactive Ambient Lighting */}
        <CursorGlow />

        {/* Dynamic Canvas Particles */}
        <ParticleBackground />

        {/* Fixed Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Scroll to Top with Progress Circle */}
        <ScrollToTop />
      </div>
    </MotionConfig>
  );
}

export default App;
