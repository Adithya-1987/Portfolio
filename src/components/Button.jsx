import { motion } from 'framer-motion';

const ACCENT_CLASSES = {
  blue: 'bg-accent-blue/20 border-accent-blue/50 text-white hover:bg-accent-blue/30',
  red: 'bg-accent-red/20 border-accent-red/50 text-white hover:bg-accent-red/30',
  purple:
    'bg-accent-purple/20 border-accent-purple/50 text-white hover:bg-accent-purple/30',
};

/**
 * Small glass-pill button/link. Pass `href` to render an anchor, otherwise a button.
 *
 * @param {'blue'|'red'|'purple'} accent
 */
export default function Button({
  children,
  accent = 'blue',
  href,
  className = '',
  icon: Icon,
  ...rest
}) {
  const classes = `inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-lg transition-colors duration-300 ${ACCENT_CLASSES[accent]} ${className}`;

  const content = (
    <>
      {children}
      {Icon && <Icon size={16} />}
    </>
  );

  const MotionTag = href ? motion.a : motion.button;

  return (
    <MotionTag
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...rest}
    >
      {content}
    </MotionTag>
  );
}
