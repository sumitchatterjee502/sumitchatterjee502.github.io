import { Project } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
  project: Project;
}

function isPlaceholder(value?: string): boolean {
  return !value || value.startsWith("[PLACEHOLDER]");
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-accent/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-blue transition-transform duration-400 group-hover:scale-x-100" />

      <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
        {project.category}
      </p>

      <h3 className="mb-1 font-display text-lg font-bold text-heading">
        {project.title}
      </h3>

      <p className="mb-4 font-mono text-[0.78rem] text-accent">
        {project.role}
      </p>

      <p className="mb-5 text-[0.85rem] font-light leading-relaxed text-text">
        {project.description}
      </p>

      <div className="mb-5 border-l-2 border-accent bg-accent/5 py-2 pl-3 text-[0.78rem] text-text">
        {project.result}
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 font-mono text-[0.68rem]">
        {!isPlaceholder(project.liveUrl) && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            Live Demo →
          </a>
        )}
        {!isPlaceholder(project.repoUrl) && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Repository →
          </a>
        )}
        {isPlaceholder(project.liveUrl) && isPlaceholder(project.repoUrl) && (
          <span className="text-muted italic">
            Links available on request
          </span>
        )}
      </div>
    </article>
  );
}
