/*
 * Cream/beige CRT monitor mockup that wraps arbitrary screen content
 * (here: the RetroDesktop). Purely visual — chunky plastic bezel, recessed
 * "glass" screen, power light, tapered neck, and a rounded desk base.
 */
export default function CrtMonitorFrame({ children }) {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col items-center">
      {/* Monitor casing */}
      <div
        className="relative w-full rounded-[26px] p-3 pb-6 sm:p-4 sm:pb-8"
        style={{
          background:
            'linear-gradient(150deg, #f1ecdf 0%, #ded8c6 55%, #cec7b2 100%)',
          boxShadow:
            '0 18px 40px rgba(0,0,0,0.45), inset 0 3px 5px rgba(255,255,255,0.7), inset 0 -6px 10px rgba(0,0,0,0.18)',
        }}
      >
        {/* Recessed screen ("glass") */}
        <div
          className="relative overflow-hidden rounded-[12px] bg-black"
          style={{
            boxShadow: 'inset 0 0 0 3px #b7b09c, 0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {children}

          {/* Glass depth + subtle glare, non-interactive so clicks pass through */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[10px]"
            style={{
              boxShadow:
                'inset 0 0 22px 8px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.35)',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 32%)',
            }}
          />
        </div>

        {/* Power light — bottom-right of the bezel */}
        <span
          className="absolute bottom-2.5 right-5 h-2 w-2 rounded-full sm:bottom-3"
          style={{
            background: '#4ade80',
            boxShadow: '0 0 6px 1px rgba(74,222,128,0.85)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Tapered neck */}
      <div
        className="h-6 w-[22%] sm:h-7"
        style={{
          background: 'linear-gradient(#d7d1bf, #c1baa4)',
          clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
        }}
      />

      {/* Rounded desk base */}
      <div
        className="h-4 w-[52%] rounded-[50%] sm:h-5"
        style={{
          background: 'linear-gradient(#e7e1d1, #c7c0aa)',
          boxShadow: '0 10px 18px rgba(0,0,0,0.4)',
        }}
      />
    </div>
  );
}
