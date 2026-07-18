import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import BlueRedPurpleReveal from '../components/BlueRedPurpleReveal';
import DecryptedText from '../components/DecryptedText';
import PixelTransition from '../components/PixelTransition';
import heroPortrait from '../assets/hero-portrait.webp';

const HELLO_JAVA = `public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello!!");
  }
}`;

const NAME_LINES = ['GUGULOTH', 'ADITHYA', 'JADHAV'];
const DECRYPT_SPEED = 35; // ms per revealed character
const REPLAY_GAP = 3500; // ms pause after a full reveal before scrambling again

export default function Hero() {
  const [blueActive, setBlueActive] = useState(false);
  const [redActive, setRedActive] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const handleToggle = (color) => {
    if (color === 'blue') setBlueActive((v) => !v);
    if (color === 'red') setRedActive((v) => !v);
  };

  // Remounting DecryptedText (via key) re-triggers its animateOn="view"
  // decrypt animation, giving a continuous scramble-then-reveal loop.
  useEffect(() => {
    const longestLine = Math.max(...NAME_LINES.map((line) => line.length));
    const cycle = longestLine * DECRYPT_SPEED + REPLAY_GAP;
    const id = setInterval(() => setReplayKey((k) => k + 1), cycle);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-10">
        <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className="font-vt leading-[0.95] tracking-widest text-[#39ff14]">
            {NAME_LINES.map((line) => (
              <div key={line}>
                <DecryptedText
                  key={`${replayKey}-${line}`}
                  text={line}
                  animateOn="view"
                  sequential
                  revealDirection="center"
                  speed={DECRYPT_SPEED}
                  parentClassName="text-6xl sm:text-7xl md:text-8xl"
                  className="drop-shadow-[0_0_14px_rgba(57,255,20,0.85)]"
                  encryptedClassName="text-[#39ff14]/40"
                />
              </div>
            ))}
          </div>

          <p className="max-w-md text-base text-white/70 md:text-lg">
            Placeholder tagline — swap this for a one-line description of what
            you build and who for.
          </p>

          <BlueRedPurpleReveal
            blueActive={blueActive}
            redActive={redActive}
            onToggle={handleToggle}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-lg shrink-0 lg:max-w-xl"
        >
          <PixelTransition
            firstContent={
              <img
                src={heroPortrait}
                alt="Portrait of Guguloth Adithya Jadhav"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            }
            secondContent={
              <div className="flex h-full w-full items-center justify-center bg-[#0a0e1a] p-6">
                <pre className="font-vt text-lg leading-snug text-[#39ff14] sm:text-xl md:text-2xl">
                  {HELLO_JAVA}
                </pre>
              </div>
            }
            gridSize={12}
            pixelColor="#39ff14"
            animationStepDuration={0.4}
            aspectRatio="56.2%"
            className="w-full rounded-[20px] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 text-white/40"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
