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

const toneStyles: Record<
  SectionTone,
  { section: string; wash: string }
> = {
  default: {
    section: "bg-background",
    wash:
      "radial-gradient(circle at 20% 20%, rgba(0,212,170,0.07), transparent 32%), radial-gradient(circle at 85% 75%, rgba(77,166,255,0.06), transparent 28%)",
  },
  elevated: {
    section: "bg-[rgba(6,18,38,0.75)]",
    wash:
      "radial-gradient(circle at 10% 15%, rgba(0,212,170,0.08), transparent 30%), radial-gradient(circle at 90% 80%, rgba(77,166,255,0.06), transparent 28%)",
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
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
        style={{ backgroundImage: styles.wash }}
      />
      <SectionContainer>
        <div className={cn(sectionStackClass, stackClassName)}>{children}</div>
      </SectionContainer>
    </section>
  );
}
