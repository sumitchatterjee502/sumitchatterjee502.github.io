"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  getDurationLabel,
  parseExperienceEntry,
} from "@/lib/experience-utils";
import { cn } from "@/lib/utils";

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  impact: string[];
  achievements: string[];
  technologies: string[];
}

interface TimelineDossierProps {
  entry: ExperienceEntry;
  index: number;
  isActive: boolean;
  onActivate: (id: string) => void;
}

export function TimelineDossier({
  entry,
  index,
  isActive,
  onActivate,
}: TimelineDossierProps) {
  const ref = useRef<HTMLElement>(null);
  const meta = parseExperienceEntry(entry.company, entry.period);
  const paddedIndex = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([observed]) => {
        if (observed.isIntersecting) {
          onActivate(meta.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [meta.id, onActivate]);

  return (
    <article
      ref={ref}
      id={meta.id}
      className={cn(
        "career-dossier group relative scroll-mt-24 rounded-xl border bg-surface/80 p-4 backdrop-blur-sm transition-all duration-500 sm:scroll-mt-32 sm:p-6 md:p-8",
        isActive
          ? "border-accent/40 shadow-[0_24px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(0,212,170,0.15)]"
          : "border-border hover:border-accent/20",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-2 font-display text-7xl font-extrabold leading-none text-heading/[0.03] md:text-8xl"
      >
        {paddedIndex}
      </span>

      <div className="relative flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex items-start gap-3 sm:gap-4 lg:w-56 lg:shrink-0 lg:flex-col lg:gap-5">
          <div
            className={cn(
              "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border font-display text-sm font-bold tracking-wide transition-colors duration-500",
              isActive
                ? "border-accent/50 bg-accent/10 text-accent shadow-[0_0_30px_rgba(0,212,170,0.15)]"
                : "border-border bg-surface-elevated text-heading group-hover:border-accent/30",
            )}
          >
            {meta.initials}
            <span
              className={cn(
                "absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-surface bg-accent transition-transform duration-500",
                isActive ? "scale-100" : "scale-75 opacity-60",
              )}
            />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
              {entry.role}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug text-heading md:text-xl">
              {entry.company}
            </h3>
            <p className="mt-2 font-mono text-[0.72rem] tracking-wide text-muted">
              {entry.period}
            </p>
            <p className="mt-1 font-mono text-[0.65rem] text-accent-blue/80">
              {getDurationLabel(meta.durationMonths)}
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {entry.impact.length > 0 && (
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {entry.impact.map((metric) => (
                <div
                  key={metric}
                  className="rounded-lg border border-accent/15 bg-accent/[0.04] px-4 py-3"
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                    Impact
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-heading">
                    {metric}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mb-5">
            <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Key Deliverables
            </p>
            <ul className="space-y-3">
              {entry.achievements.map((achievement) => (
                <li
                  key={achievement.slice(0, 60)}
                  className="flex gap-3 text-[0.88rem] font-light leading-relaxed text-text"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-accent"
                  />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border pt-5">
            {entry.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
