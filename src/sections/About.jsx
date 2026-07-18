import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';

const PROMPT = '$ cat about.txt';
const TYPE_SPEED = 45; // ms per character
const PILL_STAGGER = 100; // ms between each pill's reveal

const BIO =
  "Hey, I'm Adithya — I build ML models and agentic AI systems, and ship the full-stack web products that put them in front of people. I mentor at CIE, where I've helped 200+ students turn ideas into real, shipped projects. Tech gets me genuinely excited — I pick up new stacks fast, and once I do, I move efficiently. Currently: building, teaching, leveling up.";

const STATS = [
  { label: '200+ students mentored', accent: 'green' },
  { label: 'ML + Agentic AI', accent: 'blue' },
  { label: 'Full-stack web', accent: 'red' },
  { label: 'Mentor @ CIE', accent: 'purple' },
];

// Static class map so Tailwind's scanner sees every literal class
// (a dynamically built `border-accent-${accent}` string gets purged).
const PILL_ACCENT_CLASSES = {
  green: 'border-accent-green/50 bg-accent-green/10 text-accent-green',
  blue: 'border-accent-blue/50 bg-accent-blue/10 text-accent-blue',
  red: 'border-accent-red/50 bg-accent-red/10 text-accent-red',
  purple: 'border-accent-purple/50 bg-accent-purple/10 text-accent-purple',
};

const hiddenPose = { opacity: 0, y: 16 };
const visiblePose = { opacity: 1, y: 0 };
const revealTransition = { duration: 0.5, ease: 'easeOut' };

export default function About() {
  const promptRef = useRef(null);
  const promptInView = useInView(promptRef, { once: true, amount: 0.5 });
  const [typedPrompt, setTypedPrompt] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  // 0 = nothing revealed yet, 1 = bio visible, 2+ = that many pills visible
  const [revealStep, setRevealStep] = useState(0);

  // Types the terminal prompt out character-by-character once it scrolls
  // into view, then reveals the bio/pills below it.
  useEffect(() => {
    if (!promptInView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTypedPrompt(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        clearInterval(id);
        setTypingDone(true);
      }
    }, TYPE_SPEED);
    return () => clearInterval(id);
  }, [promptInView]);

  // Reveals the bio, then each pill in turn. Driven by plain timers (rather
  // than framer-motion's stagger/delay transitions, which — for reasons
  // still unclear — never fire on this project's framer-motion version and
  // leave elements stuck at their `initial` pose) so it's a stack of plain
  // duration-only animations gated by state instead.
  useEffect(() => {
    if (!typingDone) return;
    const timers = [setTimeout(() => setRevealStep(1), 0)];
    STATS.forEach((_, i) => {
      timers.push(
        setTimeout(() => setRevealStep(i + 2), PILL_STAGGER * (i + 1)),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [typingDone]);

  return (
    <SectionWrapper id="about">
      <h2 className="font-vt mb-8 text-4xl tracking-wide text-accent-green md:text-5xl">
        About Me
      </h2>
      <GlassCard className="mx-auto max-w-xl p-8">
        <p
          ref={promptRef}
          className="font-share-tech text-sm text-accent-green md:text-base"
        >
          {typedPrompt}
          <span className="terminal-cursor" aria-hidden="true">
            _
          </span>
        </p>

        <motion.p
          initial={hiddenPose}
          animate={revealStep >= 1 ? visiblePose : hiddenPose}
          transition={revealTransition}
          className="font-jetbrains mt-4 text-sm leading-[1.7] text-white/60"
        >
          {BIO}
        </motion.p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {STATS.map(({ label, accent }, i) => (
            <motion.span
              key={label}
              initial={hiddenPose}
              animate={revealStep >= i + 2 ? visiblePose : hiddenPose}
              transition={revealTransition}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${PILL_ACCENT_CLASSES[accent]}`}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
