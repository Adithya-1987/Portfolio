import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  // Track which section is currently in view to highlight the matching nav link
  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-full border border-white/15 bg-white/[0.08] px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg">
        <span className="text-sm font-semibold tracking-wide text-white">
          Your Name
        </span>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                  active === id
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-white md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 flex w-[calc(100%-2rem)] max-w-3xl flex-col gap-1 rounded-3xl border border-white/15 bg-white/[0.08] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg md:hidden"
          >
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`w-full rounded-2xl px-4 py-2 text-left text-sm transition-colors duration-300 ${
                    active === id
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
