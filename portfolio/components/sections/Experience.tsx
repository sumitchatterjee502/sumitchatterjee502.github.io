"use client";

import { useMemo, useState } from "react";
import { experience } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineDossier } from "@/components/ui/TimelineDossier";
import {
  parseExperienceEntry,
  type ParsedExperience,
} from "@/lib/experience-utils";
import { cn } from "@/lib/utils";

const CAREER_START = new Date(2018, 0, 1);

function getCareerProgress(parsed: ParsedExperience[]): {
  segments: Array<ParsedExperience & { left: number; width: number }>;
  totalMonths: number;
} {
  const now = new Date();
  const totalMonths = Math.max(
    1,
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
      (now.getMonth() - CAREER_START.getMonth()),
  );

  const segments = parsed.map((item) => {
    const startOffset =
      (item.span.start.getFullYear() - CAREER_START.getFullYear()) * 12 +
      (item.span.start.getMonth() - CAREER_START.getMonth());
    const endOffset =
      (item.span.end.getFullYear() - CAREER_START.getFullYear()) * 12 +
      (item.span.end.getMonth() - CAREER_START.getMonth());

    return {
      ...item,
      left: (startOffset / totalMonths) * 100,
      width: Math.max(((endOffset - startOffset) / totalMonths) * 100, 4),
    };
  });

  return { segments, totalMonths };
}

export function Experience() {
  const parsedEntries = useMemo(
    () =>
      experience.map((entry) =>
        parseExperienceEntry(entry.company, entry.period),
      ),
    [],
  );

  const { segments } = useMemo(
    () => getCareerProgress(parsedEntries),
    [parsedEntries],
  );

  const [activeId, setActiveId] = useState(parsedEntries[0]?.id ?? "");

  const scrollToRole = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[rgba(6,18,38,0.75)] px-6 py-28 md:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,212,170,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(77,166,255,0.08), transparent 30%)",
        }}
      />

      <div className="relative">
        <SectionHeading
          tag="// 04 — Experience"
          title="Career Timeline"
          subtitle="Nine years of progressive leadership across insurance, fintech, banking, and IoT — mapped as a continuous engineering journey."
        />

        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Years Engineering", value: "9+" },
            { label: "Organizations", value: String(experience.length) },
            { label: "Current Chapter", value: "Team Lead" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface/70 px-5 py-4 backdrop-blur-sm"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-heading">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="career-continuum mb-16 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm md:p-7">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                Career Continuum
              </p>
              <p className="mt-1 text-sm text-muted">
                2018 → Present · leadership trajectory
              </p>
            </div>
            <p className="hidden font-mono text-[0.65rem] text-muted sm:block">
              Select a chapter
            </p>
          </div>

          <div className="relative mt-8 h-2 rounded-full bg-surface-elevated">
            <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-accent/20 via-accent-blue/20 to-accent/10" />
            {segments.map((segment, index) => (
              <button
                key={segment.id}
                type="button"
                onClick={() => scrollToRole(segment.id)}
                aria-label={`Jump to ${experience[index].company}`}
                className={cn(
                  "career-segment absolute top-1/2 h-3 -translate-y-1/2 rounded-full transition-all duration-300",
                  activeId === segment.id
                    ? "z-10 bg-accent shadow-[0_0_18px_rgba(0,212,170,0.55)]"
                    : "bg-accent-blue/70 hover:bg-accent/80",
                )}
                style={{
                  left: `${segment.left}%`,
                  width: `${segment.width}%`,
                }}
              />
            ))}
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {experience.map((entry, index) => {
              const meta = parsedEntries[index];
              const isActive = activeId === meta.id;

              return (
                <button
                  key={meta.id}
                  type="button"
                  onClick={() => scrollToRole(meta.id)}
                  className={cn(
                    "rounded-lg border px-3 py-3 text-left transition-all duration-300",
                    isActive
                      ? "border-accent/40 bg-accent/10"
                      : "border-border bg-surface-elevated/40 hover:border-accent/20",
                  )}
                >
                  <p className="truncate font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                    {meta.span.startLabel.split(" ")[1]} —{" "}
                    {meta.span.endLabel === "Present"
                      ? "Now"
                      : meta.span.endLabel.split(" ")[1]}
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-heading">
                    {entry.company}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-10 xl:grid-cols-[240px_1fr] xl:gap-14">
          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-2">
              <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                Chapters
              </p>
              {experience.map((entry, index) => {
                const meta = parsedEntries[index];
                const isActive = activeId === meta.id;

                return (
                  <button
                    key={meta.id}
                    type="button"
                    onClick={() => scrollToRole(meta.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-all duration-300",
                      isActive
                        ? "border-accent/40 bg-accent/10"
                        : "border-transparent hover:border-border hover:bg-surface/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-display text-[0.7rem] font-bold",
                        isActive
                          ? "border-accent/40 bg-accent/15 text-accent"
                          : "border-border bg-surface-elevated text-muted",
                      )}
                    >
                      {meta.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-heading">
                        {entry.company}
                      </span>
                      <span className="block truncate font-mono text-[0.62rem] text-muted">
                        {entry.role}
                      </span>
                    </span>
                  </button>
                );
              })}

              <div className="mt-8 rounded-xl border border-border bg-surface/50 p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
                  Domains
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Insurance", "Fintech", "Banking", "IoT"].map((domain) => (
                    <span
                      key={domain}
                      className="rounded border border-border px-2 py-1 font-mono text-[0.62rem] text-muted"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="relative space-y-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 left-3 top-4 hidden w-px bg-gradient-to-b from-accent via-accent-blue/60 to-transparent xl:block"
            />

            {experience.map((entry, index) => (
              <TimelineDossier
                key={entry.company}
                entry={entry}
                index={index}
                isActive={activeId === parsedEntries[index].id}
                onActivate={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
