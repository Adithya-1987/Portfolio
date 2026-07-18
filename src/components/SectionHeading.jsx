import DecryptedText from './DecryptedText';

/**
 * Section title used by every section below Hero — same decrypt-on-view
 * effect and font treatment as the Hero name, just single-line.
 */
export default function SectionHeading({ text, className = '' }) {
  return (
    <h2
      className={`font-vt mb-8 text-5xl tracking-wide md:text-6xl ${className}`}
    >
      <DecryptedText
        text={text}
        animateOn="view"
        sequential
        revealDirection="center"
        speed={35}
        className="text-accent-green drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]"
        encryptedClassName="text-accent-green/40"
      />
    </h2>
  );
}
