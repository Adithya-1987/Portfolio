import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';

export default function About() {
  return (
    <SectionWrapper id="about">
      <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
        About Me
      </h2>
      <GlassCard className="p-8 md:p-12">
        <p className="text-white/70 md:text-lg">
          Placeholder bio — a couple of sentences about who you are, what you
          do, and what you&apos;re looking for. Swap this paragraph out with
          your real story whenever you&apos;re ready.
        </p>
      </GlassCard>
    </SectionWrapper>
  );
}
