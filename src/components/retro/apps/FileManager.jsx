import { useState } from 'react';
import { FolderIcon, TextFileIcon } from '../icons';
import { PROJECT_READMES } from '../projectReadmes';

const BIO =
  "Hey, I'm Adithya — I build ML models and agentic AI systems, and ship the full-stack web products that put them in front of people. I mentor at CIE, where I've helped 200+ students turn ideas into real, shipped projects. Tech gets me genuinely excited — I pick up new stacks fast, and once I do, I move efficiently. Currently: building, teaching, leveling up.";

const README_DOC = { title: 'readme.txt - Notepad', body: BIO };

// Left folder tree, mirroring the classic File Manager layout. `projects`
// navigates the right pane; the rest is decorative.
const TREE = [
  { label: 'c:\\ - FAT', depth: 0, open: true },
  { label: 'temp', depth: 1 },
  { label: 'users', depth: 1, open: true },
  { label: 'default', depth: 2 },
  { label: 'projects', depth: 1, folder: 'projects' },
  { label: 'winnt', depth: 1 },
];

/**
 * @param {(doc: {title,body}) => void} onOpenReadme - open Notepad with a doc
 */
export default function FileManager({ onOpenReadme }) {
  const [folder, setFolder] = useState('root'); // 'root' | 'projects'
  const [selected, setSelected] = useState(null);

  const path =
    folder === 'projects'
      ? 'c:\\users\\default\\projects'
      : 'c:\\users\\default';

  // Right-pane entries for the current folder.
  const entries =
    folder === 'projects'
      ? [
          { kind: 'up', name: '..' },
          ...PROJECT_READMES.map((r) => ({
            kind: 'file',
            name: r.name,
            doc: r,
          })),
        ]
      : [
          { kind: 'folder', name: 'projects', target: 'projects' },
          { kind: 'file', name: 'readme.txt', doc: README_DOC },
        ];

  const openEntry = (entry) => {
    if (entry.kind === 'up') return setFolder('root');
    if (entry.kind === 'folder') {
      setSelected(null);
      return setFolder(entry.target);
    }
    if (entry.kind === 'file') onOpenReadme(entry.doc);
  };

  const fileCount = entries.filter((e) => e.kind === 'file').length;

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

      <div className="flex items-center gap-2 px-2 py-1">
        <div className="retro-sunken px-2 py-0.5 text-[12px]">C:</div>
        <span className="text-[12px] text-black/60">{path}</span>
      </div>

      <div className="m-0.5 flex min-h-[180px] flex-1">
        {/* Left: folder tree */}
        <div className="w-[45%] overflow-auto retro-sunken p-1">
          {TREE.map((node, i) => {
            const isActive = node.folder === folder;
            return (
              <button
                key={i}
                type="button"
                onClick={() => node.folder && setFolder(node.folder)}
                onDoubleClick={() => node.folder && setFolder(node.folder)}
                className={`flex w-full items-center gap-1 py-[1px] text-left text-[12px] ${
                  isActive ? 'bg-[#000080] px-1 text-white' : 'text-black'
                } ${node.folder ? 'cursor-pointer' : 'cursor-default'}`}
                style={{ paddingLeft: `${node.depth * 14 + 4}px` }}
              >
                <FolderIcon size={16} open={node.open || isActive} />
                <span className="truncate">{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: current folder contents */}
        <div className="ml-0.5 flex-1 overflow-auto retro-sunken p-2">
          <div className="mb-2 text-[11px] text-black/50">{`${path}\\*.*`}</div>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {entries.map((entry) => (
              <button
                key={entry.name}
                type="button"
                onClick={() => setSelected(entry.name)}
                onDoubleClick={() => openEntry(entry)}
                className={`flex w-[92px] cursor-default flex-col items-center gap-1 p-1 text-center ${
                  selected === entry.name
                    ? 'bg-[#000080] text-white'
                    : 'text-black'
                }`}
                title="Double-click to open"
              >
                {entry.kind === 'file' ? (
                  <TextFileIcon size={28} />
                ) : (
                  <FolderIcon size={28} open={entry.kind === 'up'} />
                )}
                <span className="text-[12px] leading-tight break-all">
                  {entry.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-0.5 flex text-[12px]">
        <div className="retro-sunken px-2 py-0.5">
          C: 1.78GB free, 1.99GB total
        </div>
        <div className="ml-0.5 flex-1 retro-sunken px-2 py-0.5">
          Total {fileCount} file(s)
        </div>
      </div>
    </div>
  );
}
