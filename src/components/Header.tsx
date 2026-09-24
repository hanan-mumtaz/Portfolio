import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = ['About', 'Projects', 'Skills', 'Contact'];
  const logoImg = `${import.meta.env.BASE_URL}assets/bg5.png`;

  const socialLinks = [
    { href: 'https://github.com/Hanan-Mumtaz', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/hanan-mumtaz', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:hananmumtaz55@gmail.com', icon: Mail, label: 'Email' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled
          ? 'bg-[#050508]/90 backdrop-blur-md border-b border-purple-500/15 shadow-lg shadow-black/50 py-3'
          : 'bg-[#050508]/60 backdrop-blur-sm py-3.5 sm:py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center relative z-10">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src={logoImg}
              alt="Logo"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform duration-300 group-hover:rotate-12"
            />
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm group-hover:bg-purple-500/40 transition-colors" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
            Hanan<span className="text-purple-400">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
              className="text-zinc-300 hover:text-purple-300 font-medium text-sm transition-colors relative py-1 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-300 group-hover:w-full rounded-full" />
            </motion.a>
          ))}
        </nav>

        {/* Desktop Socials & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-zinc-800 pr-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-zinc-400 hover:text-purple-300 hover:bg-zinc-800/60 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          <a
            href="#contact"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-md shadow-purple-900/40 hover:shadow-purple-700/50 transition-all hover:scale-105"
          >
            Say Hello
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-800 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-purple-500/20 px-6 py-5 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-zinc-200 hover:text-purple-400 py-2 border-b border-zinc-800/60 transition-colors"
                >
                  {item}
                </a>
              ))}

              <div className="flex items-center justify-between pt-3">
                <div className="flex gap-2.5">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-purple-400 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 transition-all shadow-md"
                >
                  Say Hello
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

