/*
 * Original blocky icon artwork evoking the classic-desktop look.
 * Deliberately generic (e.g. a plain globe for the browser) — no real
 * product logos are reproduced.
 */

export function ComputerIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <rect x="4" y="5" width="24" height="17" fill="#c0c0c0" stroke="#000" />
      <rect x="6" y="7" width="20" height="13" fill="#0a8080" />
      <rect x="6" y="7" width="20" height="6" fill="#20a0a0" />
      <rect x="10" y="22" width="12" height="3" fill="#808080" stroke="#000" />
      <rect x="7" y="25" width="18" height="4" fill="#c0c0c0" stroke="#000" />
      <rect x="9" y="26" width="3" height="2" fill="#00a000" />
    </svg>
  );
}

export function TerminalIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <rect x="3" y="5" width="26" height="22" fill="#c0c0c0" stroke="#000" />
      <rect x="5" y="7" width="22" height="18" fill="#000" />
      <text x="7" y="16" fill="#39ff14" fontSize="8" fontFamily="monospace">
        &gt;_
      </text>
    </svg>
  );
}

export function GlobeIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="#1e90ff"
        stroke="#003a8c"
        strokeWidth="1.5"
      />
      <path
        d="M16 4 C10 10 10 22 16 28 M16 4 C22 10 22 22 16 28 M4 16 H28 M6 10 H26 M6 22 H26"
        fill="none"
        stroke="#cfe8ff"
        strokeWidth="1"
      />
    </svg>
  );
}

export function FolderIcon({ size = 32, open = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <path d="M3 8 h9 l3 3 h14 v3 H3 Z" fill="#e0b000" stroke="#000" />
      {open ? (
        <path d="M3 13 h26 l-3 12 H3 Z" fill="#ffd94a" stroke="#000" />
      ) : (
        <rect
          x="3"
          y="12"
          width="26"
          height="14"
          fill="#ffd94a"
          stroke="#000"
        />
      )}
    </svg>
  );
}

export function FloppyIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <rect x="5" y="5" width="22" height="22" fill="#1a1a1a" stroke="#000" />
      <rect x="9" y="5" width="14" height="8" fill="#3a3a3a" />
      <rect x="17" y="6" width="4" height="6" fill="#c0c0c0" />
      <rect
        x="9"
        y="16"
        width="14"
        height="9"
        fill="#d0d0d0"
        stroke="#808080"
      />
      <rect x="11" y="18" width="8" height="2" fill="#808080" />
      <rect x="11" y="21" width="8" height="2" fill="#808080" />
    </svg>
  );
}

export function DriveIcon({ size = 32, label = 'C' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <rect x="4" y="9" width="24" height="14" fill="#c8c8c8" stroke="#000" />
      <rect x="4" y="9" width="24" height="5" fill="#e0e0e0" />
      <rect x="7" y="17" width="10" height="3" fill="#909090" />
      <circle cx="24" cy="18" r="1.5" fill="#00a000" />
      <text x="6" y="13" fill="#333" fontSize="4" fontFamily="monospace">
        {label}:
      </text>
    </svg>
  );
}

export function CdIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <rect x="4" y="10" width="24" height="12" fill="#c8c8c8" stroke="#000" />
      <circle cx="12" cy="16" r="6" fill="#b0b0ff" stroke="#4040a0" />
      <circle cx="12" cy="16" r="1.5" fill="#fff" stroke="#4040a0" />
      <rect x="20" y="14" width="6" height="2" fill="#808080" />
      <rect x="20" y="18" width="6" height="2" fill="#808080" />
    </svg>
  );
}

export function ControlPanelIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <rect x="5" y="6" width="22" height="16" fill="#c0c0c0" stroke="#000" />
      <rect x="8" y="9" width="7" height="10" fill="#909090" stroke="#000" />
      <rect x="10" y="10" width="3" height="4" fill="#e63946" />
      <circle cx="21" cy="12" r="4" fill="#ffd94a" stroke="#000" />
      <path d="M21 8 v-2 M21 16 v2 M17 12 h-2 M25 12 h2" stroke="#000" />
      <rect x="9" y="24" width="14" height="3" fill="#808080" stroke="#000" />
    </svg>
  );
}

export function PrinterIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <rect x="8" y="5" width="16" height="8" fill="#e0e0e0" stroke="#000" />
      <rect x="5" y="12" width="22" height="10" fill="#c0c0c0" stroke="#000" />
      <rect x="9" y="20" width="14" height="7" fill="#fff" stroke="#000" />
      <circle cx="23" cy="16" r="1.2" fill="#00a000" />
    </svg>
  );
}

export function TextFileIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      <path d="M8 4 h12 l5 5 v19 H8 Z" fill="#fff" stroke="#000" />
      <path d="M20 4 v5 h5" fill="#c0c0c0" stroke="#000" />
      <rect x="11" y="13" width="11" height="1.5" fill="#808080" />
      <rect x="11" y="17" width="11" height="1.5" fill="#808080" />
      <rect x="11" y="21" width="7" height="1.5" fill="#808080" />
    </svg>
  );
}
