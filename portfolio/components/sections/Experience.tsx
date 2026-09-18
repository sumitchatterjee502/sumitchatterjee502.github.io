import { experience } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Experience() {
  return (
    <section
      id="experience"
      className="bg-[rgba(6,18,38,0.75)] px-6 py-28 md:px-16"
    >
      <SectionHeading tag="// 04 — Experience" title="Career Timeline" />

      <div className="relative border-l border-gradient pl-8 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-px before:bg-gradient-to-b before:from-accent before:via-accent-blue before:to-transparent">
        {experience.map((item, i) => (
          <RevealOnScroll key={item.company} delay={i * 100}>
            <article className="relative mb-16 last:mb-0">
              <div className="absolute -left-[2.45rem] top-1 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_15px_rgba(0,212,170,0.5)]" />

              <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-heading">
                    {item.role}
                  </h3>
                  <p className="text-sm text-accent">{item.company}</p>
                </div>
                <span className="whitespace-nowrap rounded border border-border px-3 py-1 font-mono text-[0.72rem] tracking-wide text-muted">
                  {item.period}
                </span>
              </div>

              {item.impact.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.impact.map((badge) => (
                    <span
                      key={badge}
                      className="rounded border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[0.68rem] text-accent"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <ul className="space-y-2">
                {item.achievements.map((achievement) => (
                  <li
                    key={achievement.slice(0, 50)}
                    className="relative pl-5 text-[0.88rem] font-light text-text before:absolute before:left-0 before:text-accent before:content-['▸']"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <Badge key={tech} className="text-muted hover:text-accent">
                    {tech}
                  </Badge>
                ))}
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
