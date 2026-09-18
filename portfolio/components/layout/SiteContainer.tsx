import { sectionContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

interface SiteContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "nav" | "footer";
}

export function SiteContainer({
  children,
  className,
  as: Tag = "div",
}: SiteContainerProps) {
  return (
    <Tag className={cn(sectionContainerClass, className)}>{children}</Tag>
  );
}
