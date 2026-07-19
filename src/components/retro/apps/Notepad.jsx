const DEFAULT_BODY = 'This file is empty.';

/**
 * Notepad-style viewer. Renders whatever document it's opened with (bio from
 * readme.txt, or a project README from the projects folder).
 *
 * @param {{ body: string }} [doc]
 */
export default function Notepad({ doc }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="retro-menubar">
        <span>
          <u>F</u>ile
        </span>
        <span>
          <u>E</u>dit
        </span>
        <span>
          <u>S</u>earch
        </span>
        <span>
          <u>H</u>elp
        </span>
      </div>

      <div className="m-0.5 max-h-[280px] flex-1 overflow-auto bg-white retro-sunken p-3">
        <pre className="font-jetbrains text-[13px] leading-[1.6] whitespace-pre-wrap text-black">
          {doc?.body ?? DEFAULT_BODY}
        </pre>
      </div>
    </div>
  );
}
