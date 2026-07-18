import { motion } from 'framer-motion';

// Static class map so Tailwind's scanner can see every possible glow class
// (dynamically built class names like `hover:border-accent-${glow}` get
// purged because Tailwind never sees the literal string).
const GLOW_CLASSES = {
  blue: 'hover:border-accent-blue/60 hover:shadow-[0_0_45px_-10px_rgba(46,107,255,0.65)]',
  red: 'hover:border-accent-red/60 hover:shadow-[0_0_45px_-10px_rgba(230,57,70,0.65)]',
  purple:
    'hover:border-accent-purple/60 hover:shadow-[0_0_45px_-10px_rgba(168,85,247,0.65)]',
};

/**
 * Base glassmorphism surface used everywhere in the site.
 *
 * @param {'blue'|'red'|'purple'|null} glow - tints border/shadow on hover
 * @param {boolean} hoverScale - lift + scale up slightly on hover (used by Projects)
 * @param {keyof JSX.IntrinsicElements} as - element/motion tag to render
 */
export default function GlassCard({
  children,
  className = '',
  glow = null,
  hoverScale = false,
  as = 'div',
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  const glowClasses = glow ? GLOW_CLASSES[glow] : '';

  return (
    <MotionTag
      whileHover={
        hoverScale
          ? {
              scale: 1.03,
              y: -4,
              transition: { type: 'spring', stiffness: 300, damping: 22 },
            }
          : undefined
      }
      className={`rounded-[20px] border border-white/15 bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-[border-color,box-shadow] duration-300 ${glowClasses} ${className}`}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
