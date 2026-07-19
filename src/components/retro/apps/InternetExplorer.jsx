import { useState } from 'react';

const FORCED_QUERY = 'want to know more about adithya';

// Original playful wordmark — letters bounce through the site accent palette.
const WORDMARK = 'Ask Adithya';
const LETTER_COLORS = ['#2e6bff', '#e63946', '#a855f7', '#39ff14'];

// Fake results. `section` is the real portfolio section to scroll to on click.
const RESULTS = [
  {
    title: 'Machine Learning & AI Models',
    url: 'adithya.dev › skills › ml',
    desc: 'Building and deploying ML models end-to-end - not just notebooks, shipped systems.',
    section: 'skills',
  },
  {
    title: 'Agentic AI Systems',
    url: 'adithya.dev › skills › agentic-ai',
    desc: 'Designing autonomous agents that plan, decide, and take action.',
    section: 'skills',
  },
  {
    title: 'Full-Stack Web Development',
    url: 'adithya.dev › skills › fullstack',
    desc: 'React and Node-powered products that put models in front of real people.',
    section: 'skills',
  },
  {
    title: 'Mentor @ CIE - 200+ Students',
    url: 'adithya.dev › mentoring',
    desc: 'Guiding students from idea to shipped project.',
    section: 'about',
  },
];

function Wordmark({ scale = 1 }) {
  return (
    <div
      className="retro font-bold"
      style={{ fontSize: `${44 * scale}px`, letterSpacing: '-1px' }}
      aria-label={WORDMARK}
    >
      {WORDMARK.split('').map((ch, i) =>
        ch === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className="retro-wordmark-letter"
            style={{
              color: LETTER_COLORS[i % LETTER_COLORS.length],
              animationDelay: `${i * 0.09}s`,
              textShadow: '1px 1px 0 rgba(0,0,0,0.25)',
            }}
          >
            {ch}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * @param {(sectionId: string) => void} onNavigate - scroll the real page to a section
 */
export default function InternetExplorer({ onNavigate }) {
  const [view, setView] = useState('home');
  // Home input is forced: any keystroke snaps the value to FORCED_QUERY.
  const [value, setValue] = useState('');

  const search = () => {
    setValue(FORCED_QUERY);
    setView('results');
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Address bar */}
      <div className="flex items-center gap-2 bg-[#c0c0c0] px-2 py-1 text-[12px]">
        <span className="text-black/60">Address</span>
        <div className="flex-1 retro-sunken truncate px-1.5 py-0.5">
          http://ask.adithya.dev/{view === 'results' ? 'search' : ''}
        </div>
      </div>

      {view === 'home' ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
          <Wordmark />
          <input
            type="text"
            className="retro-input w-full max-w-[420px]"
            value={value}
            placeholder=""
            aria-label="Search"
            onChange={() => setValue(FORCED_QUERY)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') search();
            }}
          />
          <div className="flex gap-2">
            <button type="button" className="retro-btn" onClick={search}>
              Search
            </button>
            <button type="button" className="retro-btn" onClick={search}>
              I&apos;m Feeling Curious
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-y-auto bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="scale-[0.55] origin-left">
              <Wordmark scale={0.6} />
            </div>
            <input
              type="text"
              readOnly
              value={FORCED_QUERY}
              aria-label="Search query"
              className="retro-input ml-auto w-[240px] max-w-[55%]"
            />
            <button type="button" className="retro-btn" onClick={search}>
              Search
            </button>
          </div>

          <div className="mb-3 border-b border-black/20 pb-1 text-[12px] text-black/70">
            Results <b>1 - 4</b> for <b>{FORCED_QUERY}</b>
          </div>

          <div className="flex flex-col gap-4">
            {RESULTS.map((r) => (
              <div key={r.title}>
                <button
                  type="button"
                  onClick={() => onNavigate?.(r.section)}
                  className="cursor-pointer text-left text-[15px] font-bold text-[#1a0dab] underline hover:text-[#0645ad]"
                >
                  {r.title}
                </button>
                <div className="text-[12px] text-[#1a7a2e]">{r.url}</div>
                <div className="max-w-[520px] text-[12px] leading-snug text-[#333]">
                  {r.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
