interface SectionHeadingProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
}

export function SectionHeading({ tag, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <p className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-accent">
        {tag}
      </p>
      <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-tight text-heading">
        {title}
      </h2>
      <div className="section-divider my-4" />
      {subtitle && (
        <p className="max-w-[540px] text-[0.95rem] text-muted">{subtitle}</p>
      )}
    </div>
  );
}
