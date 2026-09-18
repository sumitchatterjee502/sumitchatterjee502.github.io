"use client";

import { useMemo, useState } from "react";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

export function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="projects" className="bg-background px-6 py-28 md:px-16">
      <SectionHeading tag="// 03 — Projects" title="Featured Work" />

      <div className="mb-10 flex flex-wrap gap-2">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded border px-4 py-2 font-mono text-[0.72rem] tracking-wide transition-colors",
              activeCategory === category
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:border-accent/40 hover:text-text",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <RevealOnScroll key={project.id} delay={i * 50}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
