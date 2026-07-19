/* eslint-disable react/no-unknown-property -- react-three-fiber JSX intrinsics
   (mesh, planeGeometry, meshStandardMaterial, lights…) use three.js prop names
   that eslint-plugin-react doesn't recognize. */
import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  RoundedBox,
  Html,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';
import RetroDesktop from './RetroDesktop';
import wallpaperUrl from '../../assets/wallpaper.png';

// Screen opening in world units (matches RetroDesktop's 448 x 360 px aspect).
const SCREEN_W = 4.48;
const SCREEN_H = 3.6;
const SCREEN_Z = 0.71; // glass plane depth (recessed behind the bezel fronts)
const HTML_SCALE = 0.4; // drei transform scale so 448px content == SCREEN_W
const CASING = '#e7e2d3';
const CASING_DARK = '#d8d2c0';
const SCREEN_CY = 0.25; // screen vertical center (thicker "chin" below)

// Fixed camera — straight-on with a slight elevation, framed with margin so the
// whole monitor (casing + neck + base) fits at every breakpoint.
function CameraRig() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(0, -0.3, 0);
  }, [camera]);
  return <PerspectiveCamera makeDefault fov={30} position={[0.4, 0.9, 16]} />;
}

// CRT glass: the wallpaper as a lit texture with a subtle self-glow, so it
// reads as a screen displaying light rather than a flat pasted image.
function Glass() {
  // Set SRGB in the loader callback (mutating the hook's return value in the
  // render body isn't allowed).
  const tex = useTexture(wallpaperUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });
  return (
    <mesh position={[0, SCREEN_CY, SCREEN_Z]}>
      <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      <meshStandardMaterial
        map={tex}
        emissiveMap={tex}
        emissive="#ffffff"
        emissiveIntensity={0.32}
        roughness={0.35}
        metalness={0.0}
      />
    </mesh>
  );
}

function BezelBar({ args, position }) {
  return (
    <RoundedBox args={args} radius={0.05} smoothness={4} position={position}>
      <meshStandardMaterial color={CASING} roughness={0.4} metalness={0.05} />
    </RoundedBox>
  );
}

function Monitor() {
  const t = 0.34; // bezel bar thickness
  const cy = SCREEN_CY;
  const halfW = SCREEN_W / 2;
  const halfH = SCREEN_H / 2;

  return (
    <group>
      {/* Casing body */}
      <RoundedBox
        args={[6, 5.2, 1.4]}
        radius={0.32}
        smoothness={6}
        position={[0, cy, 0]}
      >
        <meshStandardMaterial color={CASING} roughness={0.4} metalness={0.05} />
      </RoundedBox>

      {/* Lit wallpaper glass */}
      <Glass />

      {/* Thin inner rim — a faint dark frame that catches the glass glow so the
          screen edge reads as recessed CRT glass, not a sticker. */}
      <mesh position={[0, cy, SCREEN_Z - 0.01]}>
        <planeGeometry args={[SCREEN_W + 0.12, SCREEN_H + 0.12]} />
        <meshStandardMaterial
          color="#0b0b0b"
          emissive="#101418"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>

      {/* Live desktop overlay — interactive UI only (transparent screen); the
          wallpaper is the lit mesh above. Same plane/size as the glass. */}
      <Html
        transform
        occlude
        position={[0, cy, SCREEN_Z + 0.02]}
        scale={HTML_SCALE}
      >
        <div style={{ width: '448px', height: '360px' }}>
          <RetroDesktop showHint={false} transparentScreen />
        </div>
      </Html>

      {/* Raised bezel frame (4 bars) around the screen opening */}
      <BezelBar
        args={[SCREEN_W + 2 * t, t, 0.28]}
        position={[0, cy + halfH + t / 2, 0.66]}
      />
      <BezelBar
        args={[SCREEN_W + 2 * t, t, 0.28]}
        position={[0, cy - halfH - t / 2, 0.66]}
      />
      <BezelBar
        args={[t, SCREEN_H, 0.28]}
        position={[-halfW - t / 2, cy, 0.66]}
      />
      <BezelBar
        args={[t, SCREEN_H, 0.28]}
        position={[halfW + t / 2, cy, 0.66]}
      />

      {/* Power light — bottom-right of the bezel */}
      <mesh position={[halfW - 0.15, cy - halfH - t / 2, 0.8]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#39ff14"
          emissive="#39ff14"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>

      {/* Tapered neck */}
      <mesh position={[0, -2.75, -0.15]}>
        <cylinderGeometry args={[0.55, 0.95, 0.9, 24]} />
        <meshStandardMaterial
          color={CASING_DARK}
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Flattened rounded base */}
      <mesh position={[0, -3.25, 0]} scale={[1.5, 1, 1.15]}>
        <cylinderGeometry args={[1.3, 1.5, 0.32, 48]} />
        <meshStandardMaterial color={CASING} roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  );
}

export default function Crt3DMonitor() {
  // R3F can measure its container as 0 at mount (lazy-loaded, section animates
  // in, and this machine's rAF-debounced ResizeObserver gets starved) —
  // leaving the WebGL buffer at its 300x150 default. Nudge a resize a few
  // times so one lands after R3F has initialized.
  useEffect(() => {
    const timers = [0, 200, 600, 1200, 2000].map((ms) =>
      setTimeout(() => window.dispatchEvent(new Event('resize')), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px] lg:h-[560px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <CameraRig />

        {/* Lighting: soft fill + one key light. */}
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[5, 7, 6]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Suspense fallback={null}>
          <Monitor />
          <Environment preset="apartment" />
        </Suspense>

        <ContactShadows
          position={[0, -3.42, 0]}
          opacity={0.45}
          scale={14}
          blur={2.6}
          far={5}
        />
      </Canvas>
    </div>
  );
}
