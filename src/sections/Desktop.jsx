import { lazy, Suspense } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import ErrorBoundary from '../components/ErrorBoundary';

// Code-split: the 3D monitor pulls in @react-three/fiber + drei. Lazy-load it
// and wrap in an ErrorBoundary so a WebGL failure degrades gracefully.
const Crt3DMonitor = lazy(() => import('../components/retro/Crt3DMonitor'));

export default function Desktop() {
  return (
    <SectionWrapper id="desktop">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* Left: heading, vertically centered on desktop */}
        <div className="flex justify-center lg:w-1/3 lg:justify-start">
          <SectionHeading text="Desktop" />
        </div>

        {/* Right: 3D CRT monitor housing the live retro desktop */}
        <div className="w-full lg:w-2/3">
          <ErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <Crt3DMonitor />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </SectionWrapper>
  );
}
