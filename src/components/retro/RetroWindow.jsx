import { useRef, useState } from 'react';

/**
 * Beveled retro window chrome: gradient title bar, min/max/close controls,
 * and drag-to-move by the title bar (desktop only). Bring-to-front focus is
 * delegated to the parent via onFocus.
 *
 * @param {boolean} active   - topmost window (drives title-bar styling)
 * @param {boolean} mobile   - stack near-fullscreen and disable drag
 */
export default function RetroWindow({
  title,
  icon,
  active,
  zIndex,
  mobile,
  initialPos = { x: 40, y: 40 },
  width = 420,
  onClose,
  onMinimize,
  onFocus,
  hidden = false,
  children,
  bodyClassName = '',
}) {
  const [pos, setPos] = useState(initialPos);
  const dragState = useRef(null);

  const startDrag = (e) => {
    onFocus?.();
    if (mobile) return;
    // Ignore drags that begin on the title-bar control buttons.
    if (e.target.closest('button')) return;

    const bounds = e.currentTarget
      .closest('.retro-screen')
      ?.getBoundingClientRect();
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      bounds,
    };

    const onMove = (ev) => {
      const d = dragState.current;
      if (!d) return;
      let nx = d.originX + (ev.clientX - d.startX);
      let ny = d.originY + (ev.clientY - d.startY);
      if (d.bounds) {
        // Keep the title bar reachable inside the screen.
        nx = Math.min(Math.max(nx, -width + 90), d.bounds.width - 60);
        ny = Math.min(Math.max(ny, 0), d.bounds.height - 40);
      }
      setPos({ x: nx, y: ny });
    };
    const onUp = () => {
      dragState.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const style = mobile
    ? { inset: '8px 8px 44px 8px', zIndex }
    : {
        left: pos.x,
        top: pos.y,
        width,
        maxWidth: 'calc(100% - 16px)',
        zIndex,
      };

  if (hidden) style.display = 'none';

  return (
    <div
      className="retro-window absolute flex flex-col"
      style={style}
      onMouseDown={() => onFocus?.()}
    >
      <div
        className={`flex items-center gap-1 px-1 py-0.5 ${
          active ? 'retro-titlebar' : 'retro-titlebar retro-titlebar--inactive'
        } ${mobile ? '' : 'cursor-move'}`}
        onMouseDown={startDrag}
        onDoubleClick={(e) => e.preventDefault()}
      >
        {icon && <span className="flex shrink-0 items-center">{icon}</span>}
        <span className="flex-1 truncate px-1 text-[12px] font-bold">
          {title}
        </span>
        {onMinimize && (
          <button
            type="button"
            className="retro-titlebtn"
            aria-label="Minimize"
            onClick={onMinimize}
          >
            <span className="mt-1 block h-[2px] w-[7px] bg-black" />
          </button>
        )}
        <button
          type="button"
          className="retro-titlebtn"
          aria-label="Maximize"
          disabled
          style={{ cursor: 'default' }}
        >
          <span className="block h-[7px] w-[7px] border border-black border-t-2" />
        </button>
        <button
          type="button"
          className="retro-titlebtn"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className={`flex min-h-0 flex-1 flex-col ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
