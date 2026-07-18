import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import RetroDesktop from '../components/retro/RetroDesktop';

export default function Desktop() {
  return (
    <SectionWrapper id="desktop">
      <SectionHeading text="Desktop" />
      <RetroDesktop />
    </SectionWrapper>
  );
}
