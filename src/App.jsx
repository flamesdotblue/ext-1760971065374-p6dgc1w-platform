import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import HorizontalSections from './components/HorizontalSections.jsx';
import Modal from './components/Modal.jsx';

export default function App() {
  const scrollerRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
  }, []);

  const handleNavigate = (id) => {
    const map = {
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    };
    const targetRef = map[id];
    const scroller = scrollerRef.current;
    if (targetRef?.current && scroller) {
      const left = targetRef.current.offsetLeft;
      scroller.scrollTo({ left, behavior: 'smooth' });
      // Move focus to section for accessibility
      setTimeout(() => {
        targetRef.current.focus();
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-200 antialiased selection:bg-[#7952B3]/40">
      <Navbar onNavigate={handleNavigate} />
      <main>
        <Hero onCta={() => handleNavigate('projects')} />
        <HorizontalSections
          scrollerRef={scrollerRef}
          aboutRef={aboutRef}
          projectsRef={projectsRef}
          contactRef={contactRef}
          ModalComponent={Modal}
        />
      </main>
      <footer className="px-6 py-8 text-sm text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="opacity-80">Built with React, Three.js (Spline), Tailwind, and Framer Motion.</p>
        </div>
      </footer>
    </div>
  );
}
