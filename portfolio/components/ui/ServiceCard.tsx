import type { Service } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  index: number;
  compact?: boolean;
}

export function ServiceCard({ service, index, compact = false }: ServiceCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "service-card group relative h-full overflow-hidden rounded-xl border border-border bg-surface/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 md:p-7",
        compact && "md:p-6",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1 font-display text-5xl font-extrabold text-heading/[0.03]"
      >
        {paddedIndex}
      </span>

      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-accent">
            {service.category}
          </span>
        </div>

        <h3 className="mb-3 font-display text-lg font-bold leading-snug text-heading">
          {service.title}
        </h3>

        <p className="mb-5 text-[0.88rem] font-light leading-relaxed text-muted">
          {service.description}
        </p>

        <div className="mb-5 space-y-2">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
            Capabilities
          </p>
          <ul className="space-y-2">
            {service.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex gap-2.5 text-[0.82rem] font-light leading-snug text-text"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          {service.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
