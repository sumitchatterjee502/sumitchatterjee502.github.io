"use client";

import { useMemo, useState } from "react";
import {
  projectCategories,
  projectPortfolioStats,
  projects,
  type ProjectCategory,
} from "@/data/portfolio";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubsectionHeader } from "@/components/ui/SubsectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { countProjectsByCategory } from "@/lib/project-utils";
import {
  filterScrollClass,
  panelClass,
  statCardClass,
  statGridClass,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

export function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("All");

  const categoryCounts = useMemo(() => countProjectsByCategory(projects), []);
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [],
  );

  const filtered = useMemo(() => {
    const list =
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    if (activeCategory === "All") {
      return list.filter((project) => !project.featured);
    }

    return list;
  }, [activeCategory]);

  return (
    <SectionShell id="projects">
      <SectionHeading
        headingId="projects-heading"
        tag="// 03 — Projects"
        title="Featured Work"
        subtitle="Production platforms delivered across fintech, insurance, enterprise, banking, and IoT — from architecture and development to deployment at scale."
      />

      <div className={statGridClass}>
        {[
          {
            label: "Delivered Projects",
            value: String(projectPortfolioStats.totalProjects),
          },
          {
            label: "Industry Domains",
            value: String(projectPortfolioStats.domainCount),
          },
          {
            label: "Featured Case Studies",
            value: String(projectPortfolioStats.featuredCount),
          },
        ].map((stat) => (
          <div key={stat.label} className={statCardClass}>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-heading sm:text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className={filterScrollClass}>
          {projectCategories.map((category) => {
            const count =
              category === "All"
                ? projects.length
                : categoryCounts[category] ?? 0;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded border px-3 py-2.5 font-mono text-[0.72rem] tracking-wide transition-colors sm:px-4",
                  activeCategory === category
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:border-accent/40 hover:text-text",
                )}
              >
                {category}
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[0.62rem]",
                    activeCategory === category
                      ? "bg-accent/15 text-accent"
                      : "bg-surface-elevated text-muted",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
          {filtered.length +
            (activeCategory === "All" ? featuredProjects.length : 0)}{" "}
          projects shown
        </p>
      </div>

      {activeCategory === "All" && featuredProjects.length > 0 && (
        <div className="space-y-6">
          <SubsectionHeader
            eyebrow="Spotlight"
            title="Flagship case studies"
            align="left"
          />
          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <RevealOnScroll key={project.id} delay={index * 80}>
                <ProjectCard
                  project={project}
                  index={index}
                  variant="spotlight"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="space-y-6">
          {activeCategory === "All" && (
            <SubsectionHeader
              eyebrow="Portfolio Archive"
              title="Additional delivered work"
              align="left"
            />
          )}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, index) => (
              <RevealOnScroll key={project.id} delay={index * 40}>
                <ProjectCard
                  project={project}
                  index={
                    activeCategory === "All"
                      ? index + featuredProjects.length
                      : index
                  }
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && activeCategory !== "All" && (
        <div className={`${panelClass} px-6 py-12 text-center`}>
          <p className="font-display text-lg font-semibold text-heading">
            No projects in this category yet.
          </p>
          <p className="mt-2 text-sm text-muted">
            Select another domain to explore more work.
          </p>
        </div>
      )}

      <RevealOnScroll>
        <div
          className={`${panelClass} flex flex-col items-stretch justify-between gap-4 p-5 sm:p-7 md:flex-row md:items-center md:p-8`}
        >
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
              Next Step
            </p>
            <p className="mt-2 max-w-2xl text-sm font-light text-text">
              Need a platform built with similar scale, security, and delivery
              standards? Share your requirements and we can scope the right
              approach.
            </p>
          </div>
          <Button
            contactIntent={{
              subject: "Similar Project Inquiry",
              source: "Projects",
            }}
          >
            Discuss a Similar Project →
          </Button>
        </div>
      </RevealOnScroll>
    </SectionShell>
  );
}
