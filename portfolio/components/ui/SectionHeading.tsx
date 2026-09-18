interface SectionHeadingProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  headingId?: string;
}

export function SectionHeading({
  tag,
  title,
  subtitle,
  headingId,
}: SectionHeadingProps) {
  return (
    <header className="max-w-3xl">
      <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent sm:text-[0.72rem]">
        {tag}
      </p>
      <h2
        id={headingId}
        className="font-display text-[clamp(1.75rem,6vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-heading"
      >
        {title}
      </h2>
      <div className="section-divider my-4" />
      {subtitle && (
        <p className="max-w-[540px] text-[0.88rem] leading-relaxed text-muted sm:text-[0.95rem]">
          {subtitle}
        </p>
      )}
    </header>
  );
}
