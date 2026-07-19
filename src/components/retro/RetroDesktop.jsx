import { useCallback, useEffect, useState } from 'react';
import './retro.css';
import RetroWindow from './RetroWindow';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import MyComputer from './apps/MyComputer';
import RetroTerminal from './apps/RetroTerminal';
import InternetExplorer from './apps/InternetExplorer';
import FileManager from './apps/FileManager';
import Notepad from './apps/Notepad';
import {
  ComputerIcon,
  TerminalIcon,
  GlobeIcon,
  FolderIcon,
  TextFileIcon,
} from './icons';
import wallpaper from '../../assets/wallpaper.svg';

// Static app registry. `onDesktop` apps get a desktop icon + Start-menu entry;
// notepad is launched only from File Manager's readme.txt.
const APP_META = {
  'my-computer': {
    title: 'My Computer',
    icon: <ComputerIcon size={16} />,
    width: 390,
    pos: { x: 46, y: 22 },
    onDesktop: true,
  },
  terminal: {
    title: 'Terminal',
    icon: <TerminalIcon size={16} />,
    width: 560,
    pos: { x: 116, y: 54 },
    onDesktop: true,
  },
  browser: {
    title: 'Internet Explorer',
    icon: <GlobeIcon size={16} />,
    width: 620,
    pos: { x: 78, y: 34 },
    onDesktop: true,
  },
  'file-manager': {
    title: 'File Manager',
    icon: <FolderIcon size={16} />,
    width: 560,
    pos: { x: 60, y: 44 },
    onDesktop: true,
  },
  notepad: {
    title: 'readme.txt - Notepad',
    icon: <TextFileIcon size={16} />,
    width: 440,
    pos: { x: 150, y: 88 },
    onDesktop: false,
  },
};

const DESKTOP_ICONS = [
  { id: 'my-computer', icon: <ComputerIcon size={36} />, label: 'My Computer' },
  { id: 'terminal', icon: <TerminalIcon size={36} />, label: 'Terminal' },
  {
    id: 'browser',
    icon: <GlobeIcon size={36} />,
    label: 'Internet Explorer',
  },
  { id: 'file-manager', icon: <FolderIcon size={36} />, label: 'File Manager' },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 640px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = (e) => setMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return mobile;
}

export default function RetroDesktop({
  showHint = true,
  transparentScreen = false,
}) {
  const mobile = useIsMobile();
  const [openApps, setOpenApps] = useState([]); // open order (taskbar)
  const [zStack, setZStack] = useState([]); // z order (last = top)
  const [minimized, setMinimized] = useState({});
  // Document currently shown in the (single) Notepad window.
  const [notepadDoc, setNotepadDoc] = useState(null);

  const focusApp = useCallback((id) => {
    setZStack((s) => [...s.filter((x) => x !== id), id]);
    setMinimized((m) => ({ ...m, [id]: false }));
  }, []);

  const openApp = useCallback(
    (id) => {
      setOpenApps((o) => (o.includes(id) ? o : [...o, id]));
      focusApp(id);
    },
    [focusApp],
  );

  const closeApp = useCallback((id) => {
    setOpenApps((o) => o.filter((x) => x !== id));
    setZStack((s) => s.filter((x) => x !== id));
    setMinimized((m) => {
      const next = { ...m };
      delete next[id];
      return next;
    });
  }, []);

  const minimizeApp = useCallback((id) => {
    setMinimized((m) => ({ ...m, [id]: true }));
  }, []);

  // Topmost non-minimized window.
  const activeId = [...zStack].reverse().find((id) => !minimized[id]) ?? null;

  const handleTaskClick = (id) => {
    if (minimized[id]) return focusApp(id);
    if (id === activeId) return minimizeApp(id);
    focusApp(id);
  };

  const navigateToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openNotepad = useCallback(
    (doc) => {
      setNotepadDoc(doc);
      openApp('notepad');
    },
    [openApp],
  );

  const renderApp = (id) => {
    switch (id) {
      case 'my-computer':
        return <MyComputer />;
      case 'terminal':
        return <RetroTerminal />;
      case 'browser':
        return <InternetExplorer onNavigate={navigateToSection} />;
      case 'file-manager':
        return <FileManager onOpenReadme={openNotepad} />;
      case 'notepad':
        return <Notepad doc={notepadDoc} />;
      default:
        return null;
    }
  };

  // Notepad's title reflects the open document.
  const windowTitle = (id) =>
    id === 'notepad'
      ? (notepadDoc?.title ?? APP_META.notepad.title)
      : APP_META[id].title;

  const startApps = Object.entries(APP_META)
    .filter(([, meta]) => meta.onDesktop)
    .map(([id, meta]) => ({ id, title: meta.title, taskIcon: meta.icon }));

  const tasks = openApps.map((id) => ({
    id,
    title: windowTitle(id),
    icon: APP_META[id].icon,
  }));

  return (
    <div className="retro">
      <div
        className="retro-screen h-[300px] w-full sm:h-[330px] md:h-[360px]"
        style={
          transparentScreen
            ? // In the 3D monitor the wallpaper lives on a lit mesh behind the
              // Html overlay, so the screen itself is transparent (icons/
              // windows only).
              { backgroundColor: 'transparent', boxShadow: 'none' }
            : {
                backgroundColor: 'var(--retro-teal)',
                // Quote the URL — Vite inlines the SVG as a data URI whose
                // commas/parens would otherwise break an unquoted url().
                backgroundImage: `url("${wallpaper}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
        }
      >
        {/* Desktop icons — top-left 2×2 grid (fits the smaller screen) */}
        <div className="absolute left-2 top-2 grid grid-cols-2 gap-x-1 gap-y-1">
          {DESKTOP_ICONS.map((d) => (
            <DesktopIcon
              key={d.id}
              icon={d.icon}
              label={d.label}
              mobile={mobile}
              onOpen={() => openApp(d.id)}
            />
          ))}
        </div>

        {/* Windows */}
        {openApps.map((id) => {
          const meta = APP_META[id];
          const z = 20 + zStack.indexOf(id);
          return (
            <RetroWindow
              key={id}
              title={windowTitle(id)}
              icon={meta.icon}
              width={meta.width}
              initialPos={meta.pos}
              active={id === activeId}
              zIndex={z}
              hidden={!!minimized[id]}
              mobile={mobile}
              onClose={() => closeApp(id)}
              onMinimize={() => minimizeApp(id)}
              onFocus={() => focusApp(id)}
            >
              {renderApp(id)}
            </RetroWindow>
          );
        })}

        <Taskbar
          tasks={tasks}
          activeId={activeId}
          minimized={minimized}
          onTaskClick={handleTaskClick}
          apps={startApps}
          onLaunch={openApp}
        />
      </div>

      {showHint && (
        <p className="mt-3 text-center text-xs text-white/50">
          Double-click an icon to open an app. Try the Terminal or search in
          Internet Explorer.
        </p>
      )}
    </div>
  );
}
