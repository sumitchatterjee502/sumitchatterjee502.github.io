import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,212,170,0.3)]",
  outline:
    "border border-border text-text hover:border-accent hover:text-accent hover:-translate-y-0.5",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded px-6 py-3 font-mono text-xs font-medium tracking-wider transition-all sm:w-auto sm:px-8 sm:py-3.5",
    variants[variant],
    className,
  );

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
