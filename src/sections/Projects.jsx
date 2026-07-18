import { ExternalLink } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';

// Cycle through the three accents so the grid stays visually balanced.
// Replace title/description/link with your real projects.
const PROJECTS = [
  {
    title: 'Project One',
    description:
      'Placeholder description of what this project does and the problem it solves.',
    link: '#',
    glow: 'blue',
  },
  {
    title: 'Project Two',
    description:
      'Placeholder description of what this project does and the problem it solves.',
    link: '#',
    glow: 'red',
  },
  {
    title: 'Project Three',
    description:
      'Placeholder description of what this project does and the problem it solves.',
    link: '#',
    glow: 'purple',
  },
  {
    title: 'Project Four',
    description:
      'Placeholder description of what this project does and the problem it solves.',
    link: '#',
    glow: 'blue',
  },
];

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading text="Projects" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map(({ title, description, link, glow }) => (
          <GlassCard
            key={title}
            glow={glow}
            hoverScale
            className="flex flex-col gap-4 p-6"
          >
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="flex-1 text-sm text-white/70">{description}</p>
            <a
              href={link}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
            >
              View project <ExternalLink size={14} />
            </a>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
