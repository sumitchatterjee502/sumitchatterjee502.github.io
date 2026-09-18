import { services } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Services() {
  return (
    <section id="services" className="bg-background px-6 py-28 md:px-16">
      <SectionHeading
        tag="// 05 — Services"
        title="Freelance Services"
        subtitle="Technical expertise available for contract and consulting engagements — derived from verified project and leadership experience."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, i) => (
          <RevealOnScroll key={service.title} delay={i * 60}>
            <div className="h-full rounded-lg border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-accent/30">
              <h3 className="mb-3 font-display text-base font-semibold text-heading">
                {service.title}
              </h3>
              <p className="text-[0.88rem] font-light leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
