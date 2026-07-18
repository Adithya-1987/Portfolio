import { useEffect, useRef, useState } from 'react';

function useClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * Bottom taskbar: Start button + menu, running-app buttons, live clock.
 *
 * @param {Array<{id,title,icon}>} tasks - open windows in open order
 */
export default function Taskbar({
  tasks,
  activeId,
  minimized,
  onTaskClick,
  apps,
  onLaunch,
}) {
  const time = useClock();
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef(null);

  useEffect(() => {
    if (!startOpen) return;
    const onDocClick = (e) => {
      if (!startRef.current?.contains(e.target)) setStartOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [startOpen]);

  return (
    <div className="retro-raised absolute inset-x-0 bottom-0 z-[9999] flex items-center gap-1 px-1 py-0.5">
      <div className="relative" ref={startRef}>
        <button
          type="button"
          className={`retro-raised flex items-center gap-1 px-2 py-0.5 text-[13px] font-bold ${
            startOpen ? 'retro-pressed' : ''
          }`}
          onClick={() => setStartOpen((o) => !o)}
        >
          <span className="inline-block h-3.5 w-3.5 bg-gradient-to-br from-red-500 via-green-500 to-blue-500" />
          Start
        </button>

        {startOpen && (
          <div className="retro-raised absolute bottom-full left-0 mb-0.5 w-52 py-1">
            <div className="mb-1 flex">
              <div className="flex w-6 items-end justify-center self-stretch bg-gradient-to-b from-[#000080] to-[#1084d0] pb-2 text-[10px] font-bold text-white [writing-mode:vertical-rl] rotate-180">
                Adithya 98
              </div>
              <ul className="flex-1">
                {apps.map((app) => (
                  <li key={app.id}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-2 py-1 text-left text-[13px] hover:bg-[#000080] hover:text-white"
                      onClick={() => {
                        onLaunch(app.id);
                        setStartOpen(false);
                      }}
                    >
                      <span className="flex h-4 w-4 items-center justify-center">
                        {app.taskIcon}
                      </span>
                      {app.title}
                    </button>
                  </li>
                ))}
                <li className="my-1 border-t border-[#808080]" />
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-2 py-1 text-left text-[13px] hover:bg-[#000080] hover:text-white"
                    onClick={() => setStartOpen(false)}
                  >
                    Sh<u>u</u>t Down...
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mx-1 h-6 w-px bg-[#808080]" />

      <div className="flex flex-1 items-center gap-1 overflow-hidden">
        {tasks.map((t) => {
          const pressed = t.id === activeId && !minimized[t.id];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTaskClick(t.id)}
              className={`retro-raised flex min-w-0 max-w-[160px] flex-1 items-center gap-1.5 px-2 py-0.5 text-left text-[12px] ${
                pressed ? 'retro-pressed font-bold' : ''
              }`}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                {t.icon}
              </span>
              <span className="truncate">{t.title}</span>
            </button>
          );
        })}
      </div>

      <div className="retro-sunken shrink-0 px-2 py-0.5 text-[12px] tabular-nums">
        {time}
      </div>
    </div>
  );
}
