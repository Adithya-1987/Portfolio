import {
  Code2,
  Palette,
  Server,
  Database,
  GitBranch,
  Cloud,
  Terminal,
  Layers,
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';

// Swap icons/labels for your real stack — order doesn't matter, grid wraps automatically.
const SKILLS = [
  { icon: Code2, label: 'Skill One' },
  { icon: Palette, label: 'Skill Two' },
  { icon: Server, label: 'Skill Three' },
  { icon: Database, label: 'Skill Four' },
  { icon: GitBranch, label: 'Skill Five' },
  { icon: Cloud, label: 'Skill Six' },
  { icon: Terminal, label: 'Skill Seven' },
  { icon: Layers, label: 'Skill Eight' },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">Skills</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {SKILLS.map(({ icon: Icon, label }) => (
          <GlassCard
            key={label}
            hoverScale
            className="flex flex-col items-center gap-3 p-6 text-center"
          >
            <Icon className="text-white/80" size={28} />
            <span className="text-sm text-white/70">{label}</span>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
