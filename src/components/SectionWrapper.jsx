import { motion } from 'framer-motion';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Wraps a <section> and fades/slides its content in once it scrolls into view.
 * Used by every section below Hero so new sections just plug into this.
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
  ...rest
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-6 py-24 md:px-12 ${className}`}
      {...rest}
    >
      <motion.div
        variants={fadeSlideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
