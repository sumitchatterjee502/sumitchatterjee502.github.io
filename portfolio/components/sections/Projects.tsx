"use client";

import { useMemo, useState } from "react";
import {
  projectCategories,
  projectPortfolioStats,
  projects,
  siteConfig,
  type ProjectCategory,
} from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { countProjectsByCategory } from "@/lib/project-utils";
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

  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Project Inquiry")}&body=${encodeURIComponent("Hi Sumit,\n\nI'd like to discuss a project similar to your portfolio work.\n\n")}`;

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background px-6 py-28 md:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(0,212,170,0.07), transparent 30%), radial-gradient(circle at 90% 85%, rgba(77,166,255,0.06), transparent 28%)",
        }}
      />

      <div className="relative">
        <SectionHeading
          tag="// 03 — Projects"
          title="Featured Work"
          subtitle="Production platforms delivered across fintech, insurance, enterprise, banking, and IoT — from architecture and development to deployment at scale."
        />

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
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

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
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
                    "inline-flex items-center gap-2 rounded border px-4 py-2 font-mono text-[0.72rem] tracking-wide transition-colors",
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
            {filtered.length + (activeCategory === "All" ? featuredProjects.length : 0)} projects shown
          </p>
        </div>

        {activeCategory === "All" && featuredProjects.length > 0 && (
          <div className="mb-8 space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  Spotlight
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-heading">
                  Flagship case studies
                </h3>
              </div>
            </div>

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
          <div>
            {activeCategory === "All" && (
              <div className="mb-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  Portfolio Archive
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-heading">
                  Additional delivered work
                </h3>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="rounded-xl border border-border bg-surface/60 px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-heading">
              No projects in this category yet.
            </p>
            <p className="mt-2 text-sm text-muted">
              Select another domain to explore more work.
            </p>
          </div>
        )}

        <RevealOnScroll className="mt-14">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-sm md:flex-row md:items-center md:p-8">
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
            <Button href={mailtoHref}>Discuss a Similar Project →</Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
