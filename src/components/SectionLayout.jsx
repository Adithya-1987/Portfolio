import SectionHeading from './SectionHeading';

/**
 * Two-column section body: heading pinned to the left, content on the right
 * (stacks vertically on mobile). Mirrors the Desktop section's layout — shared
 * by every section except Projects.
 */
export default function SectionLayout({ heading, children }) {
  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
      {/* Heading, vertically centered on desktop */}
      <div className="flex justify-center lg:w-1/3 lg:justify-start">
        <SectionHeading text={heading} />
      </div>

      {/* Content */}
      <div className="w-full lg:w-2/3">{children}</div>
    </div>
  );
}
