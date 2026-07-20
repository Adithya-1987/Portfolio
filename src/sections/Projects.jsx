import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import ProjectExplorer from '../components/ProjectExplorer';

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading text="Projects" />
      <ProjectExplorer />
    </SectionWrapper>
  );
}
