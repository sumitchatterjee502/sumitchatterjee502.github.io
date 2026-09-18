import { SectionContainer } from "@/components/layout/SectionContainer";
import { sectionShellClass, sectionStackClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "elevated";

interface SectionShellProps {
  id: string;
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  stackClassName?: string;
}

const toneStyles: Record<SectionTone, { section: string; wash: string }> = {
  default: {
    section: "bg-[var(--section-default-bg)] backdrop-blur-[2px]",
    wash: "section-wash-default",
  },
  elevated: {
    section: "bg-[var(--section-elevated-bg)] backdrop-blur-[2px]",
    wash: "section-wash-elevated",
  },
};

export function SectionShell({
  id,
  tone = "default",
  children,
  className,
  stackClassName,
}: SectionShellProps) {
  const styles = toneStyles[tone];

  return (
    <section
      id={id}
      className={cn(sectionShellClass, styles.section, className)}
      aria-labelledby={`${id}-heading`}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-35",
          styles.wash,
        )}
        aria-hidden="true"
      />
      <SectionContainer>
        <div className={cn(sectionStackClass, stackClassName)}>{children}</div>
      </SectionContainer>
    </section>
  );
}
