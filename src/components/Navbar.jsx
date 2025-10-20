import React, { useState } from 'react';
import { Menu, X, User, FolderKanban, Mail } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleNav = (id) => {
    onNavigate?.(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/70 backdrop-blur supports-[backdrop-filter]:bg-[#121212]/50 border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between" aria-label="Primary">
        <a href="#home" className="text-neutral-100 font-semibold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-1">Portfolio</a>
        <button
          className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3]"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <ul className="hidden sm:flex items-center gap-6 text-sm">
          <li>
            <button onClick={() => handleNav('about')} className="inline-flex items-center gap-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-2 py-1">
              <User size={16} /> About
            </button>
          </li>
          <li>
            <button onClick={() => handleNav('projects')} className="inline-flex items-center gap-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-2 py-1">
              <FolderKanban size={16} /> Projects
            </button>
          </li>
          <li>
            <button onClick={() => handleNav('contact')} className="inline-flex items-center gap-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] rounded px-2 py-1">
              <Mail size={16} /> Contact
            </button>
          </li>
        </ul>
      </nav>
      {open && (
        <div className="sm:hidden border-t border-white/5">
          <ul className="px-4 py-3 space-y-2">
            <li>
              <button onClick={() => handleNav('about')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] flex items-center gap-2">
                <User size={16} /> About
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('projects')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] flex items-center gap-2">
                <FolderKanban size={16} /> Projects
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('contact')} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7952B3] flex items-center gap-2">
                <Mail size={16} /> Contact
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
