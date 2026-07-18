import { useState } from 'react';

/** Desktop icon: glyph + label, double-click to open (single tap on mobile). */
export default function DesktopIcon({ icon, label, onOpen, mobile }) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      className={`retro-desktop-icon ${selected ? 'is-selected' : ''}`}
      onClick={() => {
        setSelected(true);
        if (mobile) onOpen();
      }}
      onDoubleClick={onOpen}
      onBlur={() => setSelected(false)}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
