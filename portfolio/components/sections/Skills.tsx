import { skillGroups } from "@/data/portfolio";
import { SkillGroupCard } from "@/components/ui/SkillGroupCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { coreStack, getSkillStats, skillGroupMeta } from "@/lib/skill-utils";
import { cn } from "@/lib/utils";

export function Skills() {
  const stats = getSkillStats();

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-background px-6 py-28 md:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,212,170,0.07), transparent 32%), radial-gradient(circle at 85% 75%, rgba(77,166,255,0.06), transparent 28%)",
        }}
      />

      <div className="relative">
        <SectionHeading
          tag="// 02 — Skills"
          title="Technical Arsenal"
          subtitle="A full-stack engineering toolkit refined across production systems — from frontend interfaces and backend services to cloud delivery and team leadership."
        />

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Skill Domains", value: String(stats.categoryCount) },
            { label: "Technologies", value: String(stats.technologyCount) },
            { label: "Core Stack Items", value: String(stats.coreStackCount) },
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

        <RevealOnScroll>
          <div className="skill-feature mb-12 overflow-hidden rounded-2xl border border-accent/20 bg-surface/70 backdrop-blur-sm">
            <div className="border-b border-border px-6 py-5 md:px-8 md:py-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                Core Engineering Stack
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-heading md:text-2xl">
                Primary technologies used across production delivery
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:p-8">
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

        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Capability Map
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-heading">
              Organized by engineering discipline
            </h3>
          </div>
          <p className="max-w-md text-sm font-light text-muted">
            Structured by the layers I work across daily — from implementation
            and infrastructure to integrations and leadership.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <RevealOnScroll
              key={group.title}
              delay={index * 50}
              className={cn(
                skillGroupMeta[group.title].span === "wide" &&
                  "xl:col-span-1",
              )}
            >
              <SkillGroupCard group={group} index={index} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-14">
          <div className="rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-sm md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  Delivery Coverage
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-heading">
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
      </div>
    </section>
  );
}
