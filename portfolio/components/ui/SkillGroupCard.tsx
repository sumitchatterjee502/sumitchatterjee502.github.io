import type { skillGroups } from "@/data/portfolio";
import { skillGroupMeta } from "@/lib/skill-utils";
import { cn } from "@/lib/utils";

type SkillGroup = (typeof skillGroups)[number];

interface SkillGroupCardProps {
  group: SkillGroup;
  index: number;
}

export function SkillGroupCard({ group, index }: SkillGroupCardProps) {
  const meta = skillGroupMeta[group.title];
  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "skill-card group relative h-full overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.32)]",
        meta.span === "wide" && "xl:col-span-1",
      )}
    >
      <div
        className={cn(
          "relative border-b border-border px-6 py-5 md:px-7",
        )}
        style={{
          backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
        }}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90",
            meta.gradient,
          )}
        />
        <div className="hero-grid-bg absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-background/30 font-display text-xs font-bold tracking-wide backdrop-blur-sm",
                meta.accent,
              )}
            >
              {meta.code}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-heading">
                {group.title}
              </h3>
              <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                {group.skills.length} technologies
              </p>
            </div>
          </div>

          <span
            aria-hidden="true"
            className="font-display text-3xl font-extrabold text-heading/[0.05]"
          >
            {paddedIndex}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <p className="mb-5 text-[0.84rem] font-light leading-relaxed text-muted">
          {meta.description}
        </p>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {group.skills.map((skill) => (
            <li
              key={skill}
              className="flex items-center gap-2.5 rounded-md border border-border/70 bg-surface-elevated/50 px-3 py-2.5 transition-colors group-hover:border-border"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
              />
              <span className="font-mono text-[0.72rem] tracking-wide text-text">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
