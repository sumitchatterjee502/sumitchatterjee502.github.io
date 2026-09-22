"use client";

import Link from "next/link";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import type { ContactIntent } from "@/lib/contact-form";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  contactIntent?: never;
}

interface ContactButtonProps extends ButtonBaseProps {
  contactIntent: ContactIntent;
  href?: never;
  external?: never;
}

type ButtonProps = LinkButtonProps | ContactButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary:
    "primary-shadow-hover bg-accent text-background hover:-translate-y-0.5",
  outline:
    "border border-border text-text hover:border-accent hover:text-accent hover:-translate-y-0.5",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className } = props;
  const { openContactForm } = useContactForm();

  const classes = cn(
    "inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded px-6 py-3 font-mono text-xs font-medium tracking-wider transition-all sm:w-auto sm:px-8 sm:py-3.5",
    variants[variant],
    className,
  );

  if ("contactIntent" in props && props.contactIntent) {
    return (
      <button
        type="button"
        className={classes}
        onClick={() => openContactForm(props.contactIntent)}
      >
        {children}
      </button>
    );
  }

  const { href, external } = props;

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
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
