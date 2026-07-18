const BIO =
  "Hey, I'm Adithya — I build ML models and agentic AI systems, and ship the full-stack web products that put them in front of people. I mentor at CIE, where I've helped 200+ students turn ideas into real, shipped projects. Tech gets me genuinely excited — I pick up new stacks fast, and once I do, I move efficiently. Currently: building, teaching, leveling up.";

/** Notepad-style viewer opened from File Manager's readme.txt. */
export default function Notepad() {
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

      <div className="m-0.5 flex-1 overflow-auto bg-white retro-sunken p-3">
        <p className="font-jetbrains text-[13px] leading-[1.6] whitespace-pre-wrap text-black">
          {BIO}
        </p>
      </div>
    </div>
  );
}
