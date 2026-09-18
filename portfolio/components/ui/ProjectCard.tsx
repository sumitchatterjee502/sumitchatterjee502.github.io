import type { Project } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import {
  getCategoryStyle,
  getProjectInitials,
  getVisibleTech,
  isPlaceholder,
} from "@/lib/project-utils";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "default" | "spotlight";
}

function ProjectVisual({
  project,
  variant = "default",
}: {
  project: Project;
  variant?: "default" | "spotlight";
}) {
  const style = getCategoryStyle(project.category);
  const initials = getProjectInitials(project.title);

  return (
    <div
      className={cn(
        "project-visual relative overflow-hidden border-b border-border",
        variant === "spotlight" ? "min-h-[220px] lg:min-h-full lg:border-b-0 lg:border-r" : "min-h-[168px]",
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 80% 20%, ${style.glow}, transparent 45%)`,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          style.gradient,
        )}
      />
      <div className="hero-grid-bg absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "rounded border border-white/10 bg-background/30 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] backdrop-blur-sm",
              style.label,
            )}
          >
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-wider text-accent">
              Featured
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="max-w-[70%] font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            {project.role}
          </p>
          <span className="font-display text-4xl font-extrabold tracking-tight text-heading/15 md:text-5xl">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const hasLive = !isPlaceholder(project.liveUrl);
  const hasRepo = !isPlaceholder(project.repoUrl);

  return (
    <div className="flex flex-wrap items-center gap-4 font-mono text-[0.68rem]">
      {hasLive && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent-blue transition-colors hover:text-accent"
        >
          Live Demo
          <span aria-hidden="true">↗</span>
        </a>
      )}
      {hasRepo && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-80"
        >
          Repository
          <span aria-hidden="true">↗</span>
        </a>
      )}
      {!hasLive && !hasRepo && (
        <span className="text-muted">Available on request</span>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
  variant = "default",
}: ProjectCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const { visible, overflow } = getVisibleTech(project.technologies, 5);

  if (variant === "spotlight") {
    return (
      <article className="project-card group overflow-hidden rounded-2xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-accent/25 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <ProjectVisual project={project} variant="spotlight" />

          <div className="relative p-6 md:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-2 font-display text-6xl font-extrabold text-heading/[0.03]"
            >
              {paddedIndex}
            </span>

            <h3 className="relative max-w-xl font-display text-2xl font-bold leading-tight text-heading md:text-[1.7rem]">
              {project.title}
            </h3>

            <p className="relative mt-4 max-w-2xl text-[0.92rem] font-light leading-relaxed text-text">
              {project.description}
            </p>

            <div className="relative mt-5 rounded-lg border border-accent/15 bg-accent/[0.04] px-4 py-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
                Outcome
              </p>
              <p className="mt-2 text-[0.84rem] font-light leading-relaxed text-text">
                {project.result}
              </p>
            </div>

            <div className="relative mt-5 flex flex-wrap gap-2">
              {visible.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
              {overflow > 0 && (
                <Badge className="text-muted">+{overflow} more</Badge>
              )}
            </div>

            <div className="relative mt-6 border-t border-border pt-5">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-card group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <ProjectVisual project={project} />

      <div className="relative flex flex-1 flex-col p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-0 font-display text-5xl font-extrabold text-heading/[0.03]"
        >
          {paddedIndex}
        </span>

        <h3 className="pr-8 font-display text-lg font-bold leading-snug text-heading">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 text-[0.85rem] font-light leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-4 rounded-lg border border-border bg-surface-elevated/60 px-3.5 py-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
            Key Result
          </p>
          <p className="mt-1.5 line-clamp-3 text-[0.8rem] font-light leading-relaxed text-text">
            {project.result}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {visible.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {overflow > 0 && (
            <Badge className="text-muted">+{overflow}</Badge>
          )}
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
