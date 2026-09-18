import { aboutContent, siteConfig } from "@/data/portfolio";
import { SectionShell } from "@/components/layout/SectionShell";
import { StrengthCard } from "@/components/ui/StrengthCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubsectionHeader } from "@/components/ui/SubsectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { aboutStats, approachPoints } from "@/lib/about-utils";
import { panelClass, statCardClass, statGridClass } from "@/lib/layout";

export function About() {
  const leadParagraph = aboutContent.paragraphs[0];
  const supportingParagraphs = aboutContent.paragraphs.slice(1);

  return (
    <SectionShell id="about" tone="elevated">
      <SectionHeading
        headingId="about-heading"
        tag="// 01 — About"
        title={
          <>
            The Engineer
            <br />
            Behind the Code
          </>
        }
        subtitle="Team lead, full-stack architect, and engineering mentor — focused on building reliable systems and strong delivery cultures."
      />

      <div className={statGridClass}>
        {aboutStats.map((stat) => (
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
        <div className={`about-profile ${panelClass} border-accent/20`}>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-border p-5 sm:p-7 md:p-10 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                Professional Narrative
              </p>
              <blockquote className="mt-4 border-l-2 border-accent pl-4 sm:pl-5">
                <p className="text-base font-light leading-relaxed text-heading sm:text-lg md:text-xl">
                  {leadParagraph}
                </p>
              </blockquote>
              <div className="mt-8 space-y-5">
                {supportingParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-[0.92rem] font-light leading-relaxed text-text"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="panel-accent-wash flex flex-col justify-between p-5 sm:p-7 md:p-10">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  Profile
                </p>
                <div className="mt-5 rounded-xl border border-border bg-background/30 p-5 backdrop-blur-sm">
                  <p className="font-display text-xl font-bold text-heading sm:text-2xl">
                    {siteConfig.name}
                  </p>
                  <p className="mt-2 text-sm text-accent-blue">{siteConfig.title}</p>
                  <p className="mt-1 font-mono text-[0.68rem] text-muted">
                    {siteConfig.location}
                  </p>
                  <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    {siteConfig.eyebrow}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    Engineering Approach
                  </p>
                  <ul className="space-y-3">
                    {approachPoints.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[0.84rem] font-light leading-snug text-text"
                      >
                        <span className="font-mono text-accent">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-border bg-surface-elevated/70 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                  Domains
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Insurance", "Fintech", "Banking", "IoT"].map((domain) => (
                    <span
                      key={domain}
                      className="rounded border border-border px-2.5 py-1 font-mono text-[0.62rem] text-muted"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="space-y-6">
        <SubsectionHeader
          eyebrow="Core Strengths"
          title="Engineering pillars"
          description="The disciplines I apply across architecture, delivery, and team leadership."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aboutContent.strengths.map((strength, index) => (
            <RevealOnScroll key={strength.title} delay={index * 50}>
              <StrengthCard strength={strength} index={index} />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <RevealOnScroll>
        <div className={`${panelClass} p-5 sm:p-7 md:p-8`}>
          <SubsectionHeader
            eyebrow="Credentials"
            title="Education & certifications"
            description="Foundational education and verified credentials supporting long-term software engineering practice."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-xl border border-accent/20 bg-accent/[0.04] p-6 md:p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
                Education
              </p>
              <h4 className="mt-3 font-display text-xl font-bold text-heading">
                {aboutContent.education.degree}
              </h4>
              <p className="mt-2 text-sm text-accent-blue">
                {aboutContent.education.institution}
              </p>
              <p className="mt-2 font-mono text-[0.68rem] text-muted">
                {aboutContent.education.period}
              </p>
            </article>
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutContent.certifications.map((cert, index) => (
                <article
                  key={cert.name}
                  className="about-credential rounded-xl border border-border bg-surface-elevated/60 p-5 transition-all hover:border-accent-blue/30"
                >
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
                    Cert {String(index + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-2 text-sm font-semibold leading-snug text-heading">
                    {cert.name}
                  </h4>
                  <p className="mt-2 font-mono text-[0.68rem] text-accent-blue">
                    {cert.issuer}
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] text-muted">
                    {cert.id}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </SectionShell>
  );
}
