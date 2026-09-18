import type { aboutContent } from "@/data/portfolio";
import { strengthMeta } from "@/lib/about-utils";
import { cn } from "@/lib/utils";

type Strength = (typeof aboutContent.strengths)[number];

interface StrengthCardProps {
  strength: Strength;
  index: number;
}

export function StrengthCard({ strength, index }: StrengthCardProps) {
  const meta = strengthMeta[strength.title];
  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <article className="about-strength group relative h-full overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.32)]">
      <div className="relative border-b border-border px-5 py-4">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90",
            meta.gradient,
          )}
        />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-background/30 font-display text-[0.7rem] font-bold backdrop-blur-sm",
                meta.accent,
              )}
            >
              {meta.code}
            </span>
            <h3 className="font-display text-sm font-semibold text-heading">
              {strength.title}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="font-display text-2xl font-extrabold text-heading/[0.05]"
          >
            {paddedIndex}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[0.82rem] font-light leading-relaxed text-muted">
          {strength.description}
        </p>
      </div>
    </article>
  );
}
