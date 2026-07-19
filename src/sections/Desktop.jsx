import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import RetroDesktop from '../components/retro/RetroDesktop';
import CrtMonitorFrame from '../components/retro/CrtMonitorFrame';

export default function Desktop() {
  return (
    <SectionWrapper id="desktop">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Left: heading, vertically centered on desktop */}
        <div className="flex justify-center lg:w-1/3 lg:justify-start">
          <SectionHeading text="Desktop" />
        </div>

        {/* Right: CRT monitor housing the retro desktop */}
        <div className="w-full lg:w-2/3">
          <CrtMonitorFrame>
            <RetroDesktop showHint={false} />
          </CrtMonitorFrame>
        </div>
      </div>
    </SectionWrapper>
  );
}
