import { sectionContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  children,
  className,
}: SectionContainerProps) {
  return (
    <div className={cn(sectionContainerClass, className)}>{children}</div>
  );
}
