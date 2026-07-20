import SectionWrapper from '../components/SectionWrapper';
import SectionLayout from '../components/SectionLayout';
import RetroDesktop from '../components/retro/RetroDesktop';
import CrtMonitorFrame from '../components/retro/CrtMonitorFrame';

export default function Desktop() {
  return (
    <SectionWrapper id="desktop">
      <SectionLayout heading="Desktop">
        <CrtMonitorFrame>
          <RetroDesktop showHint={false} />
        </CrtMonitorFrame>
      </SectionLayout>
    </SectionWrapper>
  );
}
