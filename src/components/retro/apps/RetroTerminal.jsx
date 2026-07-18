import TerminalSkills from '../../TerminalSkills';

/**
 * Wraps the existing TerminalSkills component (same boot sequence + commands)
 * inside the retro window body. Logic is not duplicated — this is a shell.
 */
export default function RetroTerminal() {
  return (
    <div className="flex-1 bg-black p-1.5">
      <TerminalSkills />
    </div>
  );
}
