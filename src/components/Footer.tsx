import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://github.com/Hanan-Mumtaz', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/hanan-mumtaz', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:hananmumtaz55@gmail.com', icon: Mail, label: 'Email' },
  ];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#050508] border-t border-zinc-800/80 text-zinc-400 py-12 overflow-hidden z-10">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo / Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#" className="flex items-center gap-2 group mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-900/50 group-hover:scale-105 transition-transform">
                HM
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Hanan<span className="text-purple-400">.dev</span>
              </span>
            </a>
            <p className="text-xs text-zinc-500 max-w-xs">
              Designing and developing intelligent, high-impact web and mobile experiences.
              Computer Science student building personal full-stack web, mobile, and AI projects.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-purple-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials & Status */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-purple-500/20 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for opportunities</span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Building & Learning</span>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-purple-400 hover:border-purple-500/40 transition-colors shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 text-center">
          <p>© {currentYear} Hanan Mumtaz. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400/40" /> and <Sparkles className="w-3.5 h-3.5 text-purple-400" /> using React, Vite & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

