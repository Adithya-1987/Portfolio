import { FloppyIcon, DriveIcon, CdIcon, ControlPanelIcon } from '../icons';

const ITEMS = [
  { icon: <FloppyIcon />, label: '3½ Floppy (A:)' },
  { icon: <DriveIcon label="C" />, label: '(C:)' },
  { icon: <CdIcon />, label: '(D:)' },
  { icon: <ControlPanelIcon />, label: 'Control Panel' },
];

/** Decorative "My Computer" window — drive icons, menu bar, status bar. */
export default function MyComputer() {
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
          <u>V</u>iew
        </span>
        <span>
          <u>H</u>elp
        </span>
      </div>

      <div className="m-0.5 flex-1 retro-sunken">
        <div className="flex flex-wrap gap-x-4 gap-y-3 p-3">
          {ITEMS.map(({ icon, label }) => (
            <div
              key={label}
              className="flex w-[74px] cursor-default flex-col items-center gap-1 text-center"
            >
              {icon}
              <span className="text-[12px] leading-tight text-black">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-0.5 flex">
        <div className="retro-sunken px-2 py-0.5 text-[12px]">4 object(s)</div>
        <div className="ml-0.5 flex-1 retro-sunken" />
      </div>
    </div>
  );
}
