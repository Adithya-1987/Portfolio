import { useState } from 'react';
import { FolderIcon, TextFileIcon } from '../icons';

// Decorative folder tree, mirroring the classic File Manager layout.
const TREE = [
  { label: 'c:\\ - FAT', depth: 0, open: true },
  { label: 'temp', depth: 1 },
  { label: 'users', depth: 1, open: true },
  { label: 'default', depth: 2, selected: true },
  { label: 'win32app', depth: 1 },
  { label: 'winnt', depth: 1 },
  { label: 'winnt31', depth: 1 },
  { label: 'winnt35', depth: 1 },
];

/**
 * @param {() => void} onOpenReadme - open the Notepad window with the bio
 */
export default function FileManager({ onOpenReadme }) {
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <div className="retro-menubar">
        <span>
          <u>F</u>ile
        </span>
        <span>
          <u>D</u>isk
        </span>
        <span>
          <u>T</u>ree
        </span>
        <span>
          <u>V</u>iew
        </span>
        <span>
          <u>O</u>ptions
        </span>
        <span>
          <u>W</u>indow
        </span>
        <span>
          <u>H</u>elp
        </span>
      </div>

      {/* Drive strip */}
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="retro-sunken px-2 py-0.5 text-[12px]">C:</div>
        <span className="text-[12px] text-black/60">c:\users\default</span>
      </div>

      <div className="m-0.5 flex min-h-[180px] flex-1">
        {/* Left: folder tree */}
        <div className="w-[45%] overflow-auto retro-sunken p-1">
          {TREE.map((node, i) => (
            <div
              key={i}
              className={`flex items-center gap-1 py-[1px] text-[12px] ${
                node.selected ? 'bg-[#000080] px-1 text-white' : 'text-black'
              }`}
              style={{ paddingLeft: `${node.depth * 14 + 4}px` }}
            >
              <FolderIcon size={16} open={node.open} />
              <span className="truncate">{node.label}</span>
            </div>
          ))}
        </div>

        {/* Right: files in current folder */}
        <div className="ml-0.5 flex-1 overflow-auto retro-sunken p-2">
          <div className="mb-2 text-[11px] text-black/50">
            c:\users\default\*.*
          </div>
          <button
            type="button"
            onClick={() => setSelected(true)}
            onDoubleClick={onOpenReadme}
            className={`flex w-[80px] cursor-default flex-col items-center gap-1 p-1 text-center ${
              selected ? 'bg-[#000080] text-white' : 'text-black'
            }`}
            title="Double-click to open"
          >
            <TextFileIcon size={28} />
            <span className="text-[12px] leading-tight">readme.txt</span>
          </button>
        </div>
      </div>

      <div className="mt-0.5 flex text-[12px]">
        <div className="retro-sunken px-2 py-0.5">
          C: 1.78GB free, 1.99GB total
        </div>
        <div className="ml-0.5 flex-1 retro-sunken px-2 py-0.5">
          Total 1 file(s) (0 bytes)
        </div>
      </div>
    </div>
  );
}
