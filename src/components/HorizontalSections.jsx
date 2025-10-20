import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, Mail } from 'lucide-react';

export default function HorizontalSections({ scrollerRef, aboutRef, projectsRef, contactRef, ModalComponent }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef?.current;
    if (!scroller) return;

    const onWheel = (e) => {
      // Convert vertical scroll to horizontal for this container
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scroller.scrollBy({ left: e.deltaY, behavior: 'smooth' });
      }
    };

    scroller.addEventListener('wheel', onWheel, { passive: false });
    return () => scroller.removeEventListener('wheel', onWheel);
  }, [scrollerRef]);

  // Simple parallax background dots
  const [scrollLeft, setScrollLeft] = useState(0);
  useEffect(() => {
    const scroller = scrollerRef?.current;
    if (!scroller) return;
    const onScroll = () => setScrollLeft(scroller.scrollLeft);
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [scrollerRef]);

  const projects = useMemo(() => [
    {
      id: 'p1',
      title: '3D Product Showcase',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600&auto=format&fit=crop',
      alt: '3D rendered computer with neon accents',
      description: 'A WebGL-driven product microsite with realtime materials and AR preview. Built with Three.js and React.',
      tags: ['Three.js', 'React', 'WebGL', 'AR'],
      url: 'https://example.com',
    },
    {
      id: 'p2',
      title: 'Interactive Data Story',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop',
      alt: 'Abstract data visualization with lines and nodes',
      description: 'Scrollytelling narrative with sticky scenes, layered parallax, and high-contrast dark mode.',
      tags: ['D3', 'Framer Motion', 'Accessibility'],
      url: 'https://example.com',
    },
    {
      id: 'p3',
      title: 'Minimalist Portfolio',
      image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1600&auto=format&fit=crop',
      alt: 'Minimal workspace setup in dark mood',
      description: 'Lightning-fast personal site with horizontal scrolling and tasteful 3D touches. The one you are viewing.',
      tags: ['Vite', 'Tailwind', 'Framer Motion'],
      url: 'https://example.com',
    },
  ], []);

  const openProject = (p) => {
    setActiveProject(p);
    setModalOpen(true);
  };

  const closeProject = () => {
    setModalOpen(false);
    setActiveProject(null);
  };

  return (
    <section aria-label="Content sections" className="relative">
      {/* Parallax dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute w-64 h-64 rounded-full bg-[#7952B3]/20 blur-3xl"
          style={{ top: '10%', left: `${-100 + scrollLeft * 0.1}px` }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-[#7952B3]/10 blur-3xl"
          style={{ bottom: '5%', right: `${-150 + scrollLeft * 0.15}px` }}
        />
      </div>

      <div
        ref={scrollerRef}
        className="relative overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
        aria-label="Horizontal sections scroller"
      >
        <div ref={innerRef} className="flex min-w-full" style={{ width: 'max-content' }}>
          {/* About */}
          <SectionContainer id="about" refEl={aboutRef} title="About">
            <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop"
                alt="Professional headshot of the designer"
                loading="lazy"
                className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-xl shadow-lg border border-white/10"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-neutral-300 leading-relaxed max-w-2xl"
              >
                I’m a front-end engineer and designer focused on crafting fast, accessible interfaces with playful 3D details. I love systems thinking, motion design, and clean, resilient code. When not designing pixels, I sketch, read sci-fi, and experiment with shaders.
              </motion.p>
            </div>
          </SectionContainer>

          {/* Projects */}
          <SectionContainer id="projects" refEl={projectsRef} title="Projects">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={() => openProject(p)} />)
              )}
            </div>
          </SectionContainer>

          {/* Contact */}
          <SectionContainer id="contact" refEl={contactRef} title="Contact">
            <ContactForm />
            <div className="mt-8 flex items-center gap-4 text-neutral-300">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-2"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://yourdomain.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-2"
              >
                <Globe size={18} /> Website
              </a>
              <a
                href="mailto:you@example.com"
                className="inline-flex items-center gap-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-2"
              >
                <Mail size={18} /> Email
              </a>
            </div>
          </SectionContainer>
        </div>
      </div>

      <ModalComponent open={modalOpen} onClose={closeProject} project={activeProject} />
    </section>
  );
}

function SectionContainer({ id, refEl, title, children }) {
  return (
    <section
      id={id}
      ref={refEl}
      tabIndex={-1}
      className="snap-start shrink-0 w-[100vw] px-6 sm:px-8 py-14"
      aria-label={title}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] focus-within:ring-2 focus-within:ring-[#7952B3]"
    >
      <button
        onClick={onOpen}
        className="absolute inset-0 z-10"
        aria-label={`Open details for ${project.title}`}
      />
      <img
        src={project.image}
        alt={project.alt}
        loading="lazy"
        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold">{project.title}</h3>
        <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs text-neutral-300 px-2 py-1 rounded bg-white/5 border border-white/10">{t}</span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 right-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-[#7952B3] text-white text-sm shadow-md">
          View Project
        </span>
      </div>
    </motion.article>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = 'Please enter your name.';
    if (!values.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Please enter a valid email.';
    if (!values.message.trim()) e.message = 'Please enter a message.';
    return e;
  }, [values]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  };

  if (sent) {
    return (
      <div role="status" className="p-6 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300">
        Thank you! Your message has been sent successfully.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
            className="w-full rounded-md bg-[#0f0f0f] border border-white/10 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#7952B3]"
            placeholder="Your name"
            required
          />
          {touched.name && errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
            className="w-full rounded-md bg-[#0f0f0f] border border-white/10 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#7952B3]"
            placeholder="you@example.com"
            required
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="block text-sm mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
          className="w-full rounded-md bg-[#0f0f0f] border border-white/10 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#7952B3]"
          placeholder="How can I help?"
          required
        />
        {touched.message && errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#7952B3] text-white font-medium shadow-lg shadow-[#7952B3]/20 hover:bg-[#6b45a5] disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7952B3] focus-visible:ring-offset-[#121212]"
        >
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
