import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[0.72rem] text-text transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
