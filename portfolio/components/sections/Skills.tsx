import { skillGroups } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Skills() {
  return (
    <section id="skills" className="bg-background px-6 py-28 md:px-16">
      <SectionHeading tag="// 02 — Skills" title="Technical Arsenal" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, i) => (
          <RevealOnScroll key={group.title} delay={i * 60}>
            <div className="h-full rounded-lg border border-border bg-surface p-7 transition-colors hover:border-accent/30">
              <h3 className="mb-5 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
                {group.title}
                <span className="h-px flex-1 bg-border" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
