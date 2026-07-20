import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CornerDownLeft } from 'lucide-react';

// Adithya's real projects, distilled into a terminal "dossier" each. Ordered
// newest-feeling first; `accent` cycles the neon palette so the list reads as
// a color-coded directory.
const PROJECTS = [
  {
    id: 'docgen',
    file: 'docgen.md',
    name: 'DocGen',
    type: 'VS Code Extension',
    accent: 'green',
    tagline:
      'Turns every coding session into a professional PDF report — analyzed, documented, and archived to Google Drive automatically.',
    metric: {
      label: 'stats verified by static analysis (never the model)',
      value: 100,
    },
    specs: [
      ['output', 'session PDF report'],
      ['engine', 'Copilot / gpt-4o + deterministic fallback'],
      ['analyzes', 'git diff · functions · deps · ML logs'],
      ['ships to', 'Google Drive (drive.file scope)'],
    ],
    stack: ['TypeScript', 'VS Code API', 'esbuild', 'Puppeteer', 'Python'],
    links: [],
  },
  {
    id: 'sales-agent',
    file: 'sales-agent.md',
    name: 'Sales Follow-up Agent',
    type: 'Agentic AI',
    accent: 'blue',
    tagline:
      'Reads call transcripts, remembers each customer across calls, finds the real current blocker, and drafts the follow-up — sharper every call.',
    metric: {
      label: 'reasoning steps run a real model call (no simulated path)',
      value: 100,
    },
    specs: [
      ['memory', 'per-customer, tag-matched (Hindsight)'],
      ['routing', 'qwen3-32b → gpt-oss-120b on quality gate'],
      ['orchestration', 'CrewAI'],
      ['inference', 'Groq'],
    ],
    stack: ['Python', 'CrewAI', 'Hindsight', 'cascadeflow', 'Streamlit'],
    links: [],
  },
  {
    id: 'neuroscan',
    file: 'neuroscan.md',
    name: 'NeuroScan AI',
    type: 'ML Web Platform',
    accent: 'purple',
    tagline:
      "Upload a brain MRI, get an instant four-stage Alzheimer's classification — confidence scores, per-class probabilities, and Grad-CAM heatmaps.",
    metric: {
      label: 'overall accuracy · 100% precision on Moderate',
      value: 75,
    },
    specs: [
      ['model', 'ResNet-50 + EfficientNet-B3 ensemble'],
      ['classes', '4 stages · Non → Moderate'],
      ['dataset', '~34,000 balanced MRI slices'],
      ['pipeline', 'CLAHE → resize → norm → ensemble'],
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Supabase', 'Vercel'],
    links: [
      { label: 'Live demo', href: 'https://clarity-scan-blond.vercel.app' },
    ],
    note: 'Research / education screening tool — not a medical device.',
  },
];

// Full literal class strings so Tailwind's scanner keeps every accent utility.
const ACCENT = {
  green: {
    text: 'text-accent-green',
    bar: 'bg-accent-green',
    dot: 'bg-accent-green',
    chip: 'border-accent-green/40 text-accent-green',
    sel: 'border-l-accent-green bg-accent-green/10',
    glow: 'rgba(57,255,20,0.55)',
  },
  blue: {
    text: 'text-accent-blue',
    bar: 'bg-accent-blue',
    dot: 'bg-accent-blue',
    chip: 'border-accent-blue/40 text-accent-blue',
    sel: 'border-l-accent-blue bg-accent-blue/10',
    glow: 'rgba(46,107,255,0.55)',
  },
  purple: {
    text: 'text-accent-purple',
    bar: 'bg-accent-purple',
    dot: 'bg-accent-purple',
    chip: 'border-accent-purple/40 text-accent-purple',
    sel: 'border-l-accent-purple bg-accent-purple/10',
    glow: 'rgba(168,85,247,0.55)',
  },
};

// Character-by-character typewriter. The Dossier remounts (via key) on every
// project change, so each hook starts fresh from '' — no in-effect reset needed
// (which would also trip the set-state-in-effect rule).
function useTypewriter(text, active, speed = 24) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return { out, done };
}

// Right pane. Remounted on project change (via key) so its boot sequence
// replays: type the `cat` command, then reveal the dossier with CSS-staggered
// fades and a growing metric bar.
function Dossier({ project }) {
  const a = ACCENT[project.accent];
  const cmd = useTypewriter(`$ cat ~/projects/${project.file}`, true, 22);
  const tag = useTypewriter(project.tagline, cmd.done, 12);
  const [revealed, setRevealed] = useState(false);

  // Kick the staggered reveal + bar fill one frame after the command finishes.
  useEffect(() => {
    if (!cmd.done) return undefined;
    const id = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(id);
  }, [cmd.done]);

  const step = (i) => ({
    transitionDelay: `${i * 70}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(8px)',
  });

  return (
    <div className="min-h-[360px] font-jetbrains">
      {/* Command line */}
      <p className="text-[13px] text-white/50">
        <span className={a.text}>{cmd.out}</span>
        {!cmd.done && (
          <span className="terminal-cursor" aria-hidden="true">
            _
          </span>
        )}
      </p>

      {/* Tagline (types after the command) */}
      <p className="mt-3 min-h-[3.5rem] text-[15px] leading-relaxed text-white/85">
        {tag.out}
        {cmd.done && !tag.done && (
          <span className="terminal-cursor" aria-hidden="true">
            _
          </span>
        )}
      </p>

      {/* Signature metric */}
      <div
        className="mt-5 transition-all duration-500 ease-out"
        style={step(0)}
      >
        <div className="mb-1 flex items-baseline justify-between text-[11px] uppercase tracking-wider text-white/40">
          <span>{project.metric.label}</span>
          <span className={`${a.text} font-semibold`}>
            {project.metric.value}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full ${a.bar} transition-[width] duration-[1100ms] ease-out`}
            style={{
              width: revealed ? `${project.metric.value}%` : '0%',
              boxShadow: `0 0 10px ${a.glow}`,
            }}
          />
        </div>
      </div>

      {/* Spec sheet */}
      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {project.specs.map(([k, v], i) => (
          <div
            key={k}
            className="flex gap-2 text-[13px] transition-all duration-500 ease-out"
            style={step(i + 1)}
          >
            <dt className="shrink-0 text-white/35">{k}</dt>
            <dd className="text-white/75">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Tech stack chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech, i) => (
          <span
            key={tech}
            className={`rounded-full border bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium transition-all duration-500 ease-out ${a.chip}`}
            style={step(i + 5)}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Note + link */}
      <div
        className="mt-6 flex flex-wrap items-center gap-4 transition-all duration-500 ease-out"
        style={step(10)}
      >
        {project.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors hover:bg-white/5 ${a.chip}`}
          >
            {l.label} <ArrowUpRight size={14} />
          </a>
        ))}
        {project.note && (
          <span className="text-[11px] italic text-white/35">
            {project.note}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjectExplorer() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // ↑/↓ cycle the directory; Enter/click select. Wraps at both ends.
  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (i + dir + PROJECTS.length) % PROJECTS.length);
    }
  }, []);

  const project = PROJECTS[active];

  return (
    <div
      className="crt-window mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/12 bg-[#0b0f1acc] shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      style={{ position: 'relative' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-accent-red/80" />
        <span className="h-3 w-3 rounded-full bg-[#f5c14e]/80" />
        <span className="h-3 w-3 rounded-full bg-accent-green/80" />
        <span className="ml-3 font-jetbrains text-[12px] text-white/45">
          adithya@portfolio: ~/projects
        </span>
      </div>

      {/* Scanline sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 3px)',
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Directory list */}
        <div
          ref={listRef}
          role="listbox"
          aria-label="Projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 outline-none focus:ring-1 focus:ring-accent-green/30 md:flex-col md:overflow-visible md:border-b-0 md:border-r"
        >
          <p className="hidden shrink-0 px-2 pb-1 font-jetbrains text-[11px] text-white/30 md:block">
            $ ls ~/projects
          </p>
          {PROJECTS.map((p, i) => {
            const a = ACCENT[p.accent];
            const selected = i === active;
            return (
              <button
                key={p.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => setActive(i)}
                className={`flex shrink-0 items-center gap-2.5 rounded-md border-l-2 px-3 py-2 text-left font-jetbrains transition-colors md:w-full ${
                  selected
                    ? a.sel
                    : 'border-l-transparent hover:bg-white/[0.04]'
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${a.dot}`}
                  style={
                    selected ? { boxShadow: `0 0 8px ${a.glow}` } : undefined
                  }
                />
                <span className="min-w-0">
                  <span
                    className={`block truncate text-[13px] ${
                      selected ? a.text : 'text-white/80'
                    }`}
                  >
                    {p.file}
                  </span>
                  <span className="block truncate text-[10px] uppercase tracking-wider text-white/35">
                    {p.type}
                  </span>
                </span>
              </button>
            );
          })}
          <p className="mt-auto hidden items-center gap-1.5 px-2 pt-2 font-jetbrains text-[10px] text-white/25 md:flex">
            <CornerDownLeft size={11} /> ↑ ↓ to browse
          </p>
        </div>

        {/* Dossier */}
        <div className="p-5 sm:p-7">
          <Dossier key={project.id} project={project} />
        </div>
      </div>
    </div>
  );
}
