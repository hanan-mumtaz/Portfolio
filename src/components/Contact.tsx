import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { useIsMobile } from '../utils/useIsMobile';

export default function Contact() {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hananmumtaz55@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);

    // Prepare mailto link with encoded parameters
    const subject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hananmumtaz55@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#050508] text-zinc-100 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-3 uppercase tracking-wider">
            Connect
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Let's Connect &{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Collaborate
            </span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Always excited to talk about software development, share project ideas, or discuss technology. Feel free to drop a message!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Contact Cards */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            {/* Quick Email Card with Copy button */}
            <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 sm:p-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-purple-400">
                  <Mail size={20} />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 text-xs text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <h4 className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Direct Email</h4>
              <a
                href="mailto:hananmumtaz55@gmail.com"
                className="text-sm sm:text-base md:text-lg font-bold text-white hover:text-purple-400 transition-colors break-all"
              >
                hananmumtaz55@gmail.com
              </a>
            </div>

            {/* Phone / WhatsApp Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-purple-400">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Phone / WhatsApp</h4>
                  <a
                    href="tel:+923556403625"
                    className="text-sm sm:text-base md:text-lg font-bold text-white hover:text-purple-400 transition-colors"
                  >
                    +92 355 6403625
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-purple-950/70 border border-purple-500/30 text-purple-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Location</h4>
                  <p className="text-sm sm:text-base font-bold text-white">
                    Mirpur, Azad Kashmir, PK
                  </p>
                  <p className="text-xs text-purple-400 mt-0.5">Open to Remote Connections</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Send a Message</h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-400 mx-auto flex items-center justify-center">
                  <Check size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white">Opening Email Client!</h4>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                  Your message has been formatted. If your email application did not launch automatically, feel free to contact me directly at{' '}
                  <span className="text-purple-300 font-medium">hananmumtaz55@gmail.com</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Smith"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-zinc-100 placeholder-zinc-600 text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Your Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-zinc-100 placeholder-zinc-600 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry, Mentorship, or Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-zinc-100 placeholder-zinc-600 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Message <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Hanan, I checked out your projects and would love to connect about..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-zinc-100 placeholder-zinc-600 text-sm outline-none transition-all resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-xs font-medium bg-red-950/30 border border-red-500/20 px-3.5 py-2 rounded-lg">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-900/40 hover:shadow-purple-600/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Send Message via Email</span>
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
