import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onCta }) {
  return (
    <section id="home" className="relative h-[85vh] sm:h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/10 via-[#121212]/30 to-[#121212] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
          >
            Minimal, interactive 3D portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 text-neutral-300 max-w-2xl"
          >
            I build fast, accessible web experiences with immersive visuals. Scroll to explore.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 flex items-center gap-4"
          >
            <button
              onClick={onCta}
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[#7952B3] text-white font-medium shadow-lg shadow-[#7952B3]/20 hover:shadow-[#7952B3]/30 hover:bg-[#6b45a5] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7952B3] focus-visible:ring-offset-[#121212]"
            >
              View Projects
            </button>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); onCta?.('contact'); }}
              className="text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-2"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
