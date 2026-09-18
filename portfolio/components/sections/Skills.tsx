import { skillGroups } from "@/data/portfolio";
import { SectionShell } from "@/components/layout/SectionShell";
import { SkillGroupCard } from "@/components/ui/SkillGroupCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubsectionHeader } from "@/components/ui/SubsectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { coreStack, getSkillStats } from "@/lib/skill-utils";
import { panelClass, statCardClass, statGridClass } from "@/lib/layout";

export function Skills() {
  const stats = getSkillStats();

  return (
    <SectionShell id="skills">
      <SectionHeading
        headingId="skills-heading"
        tag="// 02 — Skills"
        title="Technical Arsenal"
        subtitle="A full-stack engineering toolkit refined across production systems — from frontend interfaces and backend services to cloud delivery and team leadership."
      />

      <div className={statGridClass}>
        {[
          { label: "Skill Domains", value: String(stats.categoryCount) },
          { label: "Technologies", value: String(stats.technologyCount) },
          { label: "Core Stack Items", value: String(stats.coreStackCount) },
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

      <RevealOnScroll>
        <div className={`skill-feature ${panelClass} border-accent/20`}>
          <div className="border-b border-border px-5 py-5 sm:px-7 md:px-8 md:py-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
              Core Engineering Stack
            </p>
            <h3 className="mt-1 font-display text-lg font-bold text-heading sm:text-xl md:text-2xl">
              Primary technologies used across production delivery
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 sm:gap-3 sm:p-6 md:grid-cols-4 md:p-8 lg:grid-cols-6">
            {coreStack.map((tech, index) => (
              <div
                key={tech}
                className="group/core flex flex-col items-center justify-center rounded-xl border border-border bg-surface-elevated/60 px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent/[0.04]"
              >
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 font-display text-sm font-semibold text-heading transition-colors group-hover/core:text-accent">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <div className="space-y-6">
        <SubsectionHeader
          eyebrow="Capability Map"
          title="Organized by engineering discipline"
          description="Structured by the layers I work across daily — from implementation and infrastructure to integrations and leadership."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <RevealOnScroll key={group.title} delay={index * 50}>
              <SkillGroupCard group={group} index={index} />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <RevealOnScroll>
        <div className={`${panelClass} p-5 sm:p-7 md:p-8`}>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                Delivery Coverage
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-heading md:text-2xl">
                Built for real-world systems
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "High-availability APIs & microservices",
                "Insurance, fintech, banking & IoT platforms",
                "Payment, OCR, and third-party integrations",
                "CI/CD, cloud deployment & team leadership",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-border bg-surface-elevated/50 px-4 py-3"
                >
                  <span className="font-mono text-accent">→</span>
                  <span className="text-[0.84rem] font-light leading-snug text-text">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </SectionShell>
  );
}
