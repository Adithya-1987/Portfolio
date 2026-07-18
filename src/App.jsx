import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Desktop from './sections/Desktop';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

// Code-split: GridScan pulls in three.js/postprocessing/face-api.js, which is
// otherwise the single biggest chunk in the whole app. Loading it lazily lets
// the page content paint immediately while the WebGL layer streams in.
const GridScan = lazy(() => import('./components/GridScan'));

function App() {
  return (
    <>
      {/* Fixed full-viewport background shared by every section — stays put
          while the page scrolls over it. */}
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={null}>
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#232A42"
            gridScale={0.14}
            scanColor="#A855F7"
            scanOpacity={0.4}
            enablePost
            bloomIntensity={0.5}
            chromaticAberration={0.0015}
            noiseIntensity={0.01}
          />
        </Suspense>
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Desktop />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
