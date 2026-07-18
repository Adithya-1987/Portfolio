import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import GlassCard from './GlassCard';

const PROMPT = 'adithya@portfolio:~$';
const BOOT_SPEED = 30; // ms per character
const BOOT_LINES = [
  'adithya@portfolio:~$ initializing skills module...',
  "type 'help' to see available commands",
];

const HELP_TEXT = `available commands:
  ls              list skill files
  cat <file>      view a skill file
  whoami          who is running this terminal
  clear           clear the terminal`;

const LS_TEXT = 'ml.sh  agentic-ai.py  fullstack.js  mentoring.md';

const WHOAMI_TEXT =
  'adithya - ai/ml engineer, agentic ai builder, full-stack dev, mentor @ CIE';

const FILES = {
  'ml.sh': `# ml.sh
python, pytorch, model training, evaluation, deployment
building models end to end - not just notebooks, shipped systems`,
  'agentic-ai.py': `# agentic-ai.py
langchain, tool-calling, multi-step agents, orchestration
agents that plan, decide, and act - not just chat`,
  'fullstack.js': `// fullstack.js
react, node.js, tailwind, apis, databases
the interface layer that puts models in front of real people`,
  'mentoring.md': `# mentoring.md
mentor @ CIE
200+ students guided from idea -> shipped project
teaching is just debugging, but for people`,
};

const QUICK_COMMANDS = [
  'help',
  'ls',
  'cat ml.sh',
  'cat agentic-ai.py',
  'cat fullstack.js',
  'cat mentoring.md',
  'whoami',
];

function notFound(raw) {
  return `command not found: ${raw}\ntype 'help' to see available commands`;
}

function runCommand(raw) {
  const trimmed = raw.trim();
  const cmd = trimmed.toLowerCase();

  if (cmd === 'help') return HELP_TEXT;
  if (cmd === 'ls') return LS_TEXT;
  if (cmd === 'whoami') return WHOAMI_TEXT;
  if (cmd.startsWith('cat ')) {
    const filename = trimmed.slice(4).trim().toLowerCase();
    const fileKey = Object.keys(FILES).find(
      (f) => f.toLowerCase() === filename,
    );
    return fileKey ? FILES[fileKey] : notFound(trimmed);
  }
  return notFound(trimmed);
}

export default function TerminalSkills() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const [bootLines, setBootLines] = useState(['', '']);
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Types the boot lines out character-by-character once the section scrolls
  // into view, then seeds history with them and hands off to the live prompt.
  useEffect(() => {
    if (!inView) return;
    let lineIndex = 0;
    let charIndex = 0;
    const typed = ['', ''];

    const id = setInterval(() => {
      charIndex += 1;
      typed[lineIndex] = BOOT_LINES[lineIndex].slice(0, charIndex);
      setBootLines([...typed]);

      if (charIndex >= BOOT_LINES[lineIndex].length) {
        lineIndex += 1;
        charIndex = 0;
        if (lineIndex >= BOOT_LINES.length) {
          clearInterval(id);
          setHistory(BOOT_LINES.map((text) => ({ type: 'output', text })));
          setBooted(true);
        }
      }
    }, BOOT_SPEED);

    return () => clearInterval(id);
  }, [inView]);

  // Auto-focus once the terminal becomes interactive.
  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  // Auto-scroll to the bottom on new output (and during boot typing).
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, bootLines]);

  const submit = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: trimmed },
      { type: 'output', text: runCommand(trimmed) },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    submit(inputValue);
    setInputValue('');
  };

  const handleChipClick = (cmd) => {
    submit(cmd);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef}>
      <GlassCard
        onClick={() => inputRef.current?.focus()}
        className="mx-auto max-w-2xl bg-[#05070d]/80 p-6 md:p-8"
      >
        <div
          ref={outputRef}
          className="font-jetbrains max-h-[180px] overflow-y-auto text-xs leading-relaxed md:max-h-[220px] md:text-[13px]"
        >
          {!booted ? (
            <>
              {bootLines[0] && (
                <pre className="whitespace-pre-wrap text-accent-green">
                  {bootLines[0]}
                </pre>
              )}
              {bootLines[1] && (
                <pre className="whitespace-pre-wrap text-accent-green">
                  {bootLines[1]}
                </pre>
              )}
            </>
          ) : (
            history.map((entry, i) =>
              entry.type === 'input' ? (
                <div key={i} className="text-white/40">
                  {PROMPT} {entry.text}
                </div>
              ) : (
                <pre key={i} className="whitespace-pre-wrap text-accent-green">
                  {entry.text}
                </pre>
              ),
            )
          )}
        </div>

        <div className="font-jetbrains mt-3 flex items-center gap-2 text-xs md:text-[13px]">
          <label
            htmlFor="skills-terminal-input"
            className="shrink-0 text-accent-green"
          >
            {PROMPT}
          </label>
          <input
            id="skills-terminal-input"
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!booted}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
            style={{ caretColor: '#39ff14' }}
            className="flex-1 border-none bg-transparent text-accent-green outline-none disabled:opacity-50"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              disabled={!booted}
              onClick={() => handleChipClick(cmd)}
              className="font-jetbrains rounded-full border border-accent-green/30 px-2.5 py-1 text-[11px] text-accent-green/80 transition-colors duration-200 hover:border-accent-green/60 hover:bg-accent-green/10 hover:text-accent-green disabled:pointer-events-none disabled:opacity-40"
            >
              {cmd}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
