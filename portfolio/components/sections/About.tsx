import { aboutContent } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function About() {
  return (
    <section
      id="about"
      className="bg-[rgba(6,18,38,0.75)] px-6 py-28 md:px-16"
    >
      <SectionHeading
        tag="// 01 — About"
        title={
          <>
            The Engineer
            <br />
            Behind the Code
          </>
        }
      />

      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <RevealOnScroll className="space-y-6">
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base font-light text-text">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 rounded-lg border border-border bg-surface-elevated p-6">
            <h3 className="mb-1 font-display text-base font-semibold text-heading">
              {aboutContent.education.degree}
            </h3>
            <p className="text-sm text-accent-blue">
              {aboutContent.education.institution}
            </p>
            <p className="mt-1 font-mono text-[0.68rem] text-muted">
              {aboutContent.education.period}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {aboutContent.strengths.map((strength, i) => (
            <RevealOnScroll key={strength.title} delay={i * 80}>
              <div className="h-full rounded-md border border-border bg-surface-elevated p-5 transition-all hover:-translate-y-1 hover:border-accent">
                <h3 className="mb-1 font-display text-sm font-semibold text-heading">
                  {strength.title}
                </h3>
                <p className="text-[0.78rem] leading-snug text-muted">
                  {strength.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <RevealOnScroll className="mt-16">
        <h3 className="mb-6 font-display text-xl font-bold text-heading">
          Certifications
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.certifications.map((cert) => (
            <div
              key={cert.name}
              className="rounded-md border border-border bg-surface-elevated p-5 transition-colors hover:border-accent-blue/40"
            >
              <p className="text-sm font-medium text-heading">{cert.name}</p>
              <p className="mt-1 font-mono text-[0.68rem] text-accent-blue">
                {cert.issuer}
              </p>
              <p className="mt-1 font-mono text-[0.62rem] text-muted">
                {cert.id}
              </p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
