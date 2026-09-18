import { aboutContent, siteConfig } from "@/data/portfolio";
import { StrengthCard } from "@/components/ui/StrengthCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { aboutStats, approachPoints } from "@/lib/about-utils";

export function About() {
  const leadParagraph = aboutContent.paragraphs[0];
  const supportingParagraphs = aboutContent.paragraphs.slice(1);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[rgba(6,18,38,0.75)] px-6 py-28 md:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 15%, rgba(0,212,170,0.08), transparent 30%), radial-gradient(circle at 90% 80%, rgba(77,166,255,0.06), transparent 28%)",
        }}
      />

      <div className="relative">
        <SectionHeading
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

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {aboutStats.map((stat) => (
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
          <div className="about-profile mb-14 overflow-hidden rounded-2xl border border-accent/20 bg-surface/70 backdrop-blur-sm">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border-b border-border p-7 md:p-10 lg:border-b-0 lg:border-r">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  Professional Narrative
                </p>

                <blockquote className="mt-4 border-l-2 border-accent pl-5">
                  <p className="text-lg font-light leading-relaxed text-heading md:text-xl">
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

              <div className="flex flex-col justify-between bg-[linear-gradient(180deg,rgba(0,212,170,0.05)_0%,rgba(7,21,37,0.2)_100%)] p-7 md:p-10">
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                    Profile
                  </p>

                  <div className="mt-5 rounded-xl border border-border bg-background/30 p-5 backdrop-blur-sm">
                    <p className="font-display text-2xl font-bold text-heading">
                      {siteConfig.name}
                    </p>
                    <p className="mt-2 text-sm text-accent-blue">
                      {siteConfig.title}
                    </p>
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
                    {["Insurance", "Fintech", "Banking", "IoT"].map(
                      (domain) => (
                        <span
                          key={domain}
                          className="rounded border border-border px-2.5 py-1 font-mono text-[0.62rem] text-muted"
                        >
                          {domain}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Core Strengths
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-heading">
              Engineering pillars
            </h3>
          </div>
          <p className="max-w-md text-sm font-light text-muted">
            The disciplines I apply across architecture, delivery, and team
            leadership.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aboutContent.strengths.map((strength, index) => (
            <RevealOnScroll key={strength.title} delay={index * 50}>
              <StrengthCard strength={strength} index={index} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-14">
          <div className="rounded-2xl border border-border bg-surface/60 p-7 backdrop-blur-sm md:p-8">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  Credentials
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-heading">
                  Education & certifications
                </h3>
              </div>
              <p className="max-w-md text-sm font-light text-muted">
                Foundational education and verified credentials supporting
                long-term software engineering practice.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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
      </div>
    </section>
  );
}
