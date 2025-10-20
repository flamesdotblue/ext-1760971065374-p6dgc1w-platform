import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function Modal({ open, onClose, project }) {
  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-[#1a1a1a] text-neutral-200 rounded-lg shadow-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 id="dialog-title" className="text-lg font-semibold">{project.title}</h3>
            <button aria-label="Close" onClick={onClose} className="p-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3]">
              <X size={18} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-0">
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="p-5 space-y-3">
              <p className="text-neutral-300">{project.description}</p>
              <ul className="flex flex-wrap gap-2 text-xs text-neutral-400">
                {project.tags?.map((t) => (
                  <li key={t} className="px-2 py-1 rounded bg-white/5 border border-white/10">{t}</li>
                ))}
              </ul>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#7952B3] text-white hover:bg-[#6b45a5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3]"
                >
                  Visit project <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
