interface SubsectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "split";
}

export function SubsectionHeader({
  eyebrow,
  title,
  description,
  align = "split",
}: SubsectionHeaderProps) {
  if (align === "left") {
    return (
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          {eyebrow}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-heading md:text-2xl">
          {title}
        </h3>
        {description && (
          <p className="mt-2 max-w-2xl text-sm font-light text-muted">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          {eyebrow}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-heading md:text-2xl">
          {title}
        </h3>
      </div>
      {description && (
        <p className="max-w-md text-sm font-light text-muted lg:text-right">
          {description}
        </p>
      )}
    </div>
  );
}
