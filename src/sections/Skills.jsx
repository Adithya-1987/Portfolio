import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import TerminalSkills from '../components/TerminalSkills';

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading text="Skills" />
      <TerminalSkills />
    </SectionWrapper>
  );
}
