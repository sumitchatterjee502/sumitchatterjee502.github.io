"use client";

import { useMemo, useState } from "react";
import {
  engagementProcess,
  featuredService,
  serviceCategories,
  services,
  type ServiceCategory,
} from "@/data/portfolio";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SubsectionHeader } from "@/components/ui/SubsectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Badge } from "@/components/ui/Badge";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { filterScrollClass, panelClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function Services() {
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategory>("All");

  const filteredServices = useMemo(
    () =>
      services.filter(
        (service) =>
          !service.featured &&
          (activeCategory === "All" || service.category === activeCategory),
      ),
    [activeCategory],
  );

  return (
    <SectionShell id="services">
      <SectionHeading
        headingId="services-heading"
        tag="// 05 — Services"
        title="Freelance Services"
        subtitle="Purpose-built engineering for teams that need reliable custom software — from architecture and development to deployment and iteration."
      />

      <RevealOnScroll>
        <div className={`service-feature ${panelClass} border-accent/20`}>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-border p-5 sm:p-7 md:p-10 lg:border-b-0 lg:border-r">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
                  Flagship Service
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                  Custom Software Development
                </span>
              </div>

              <h3 className="max-w-2xl font-display text-[clamp(1.35rem,5vw,2.4rem)] font-bold leading-tight tracking-tight text-heading">
                Software shaped to your business — not the other way around.
              </h3>

              <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-text">
                {featuredService.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {featuredService.capabilities.map((capability) => (
                  <div
                    key={capability}
                    className="flex gap-3 rounded-lg border border-border bg-surface-elevated/70 px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-accent"
                    />
                    <span className="text-[0.84rem] font-light leading-snug text-text">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {featuredService.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            <div className="panel-accent-wash flex flex-col justify-between p-5 sm:p-7 md:p-10">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                  What you get
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Dedicated technical leadership from discovery to launch",
                    "Production-grade architecture for scale and maintainability",
                    "Clear milestones, demos, and transparent communication",
                    "Integrations with payments, OCR, maps, and third-party APIs",
                    "Cloud-ready delivery on Azure or AWS with CI/CD",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm font-light leading-relaxed text-text"
                    >
                      <span className="font-mono text-accent">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 rounded-xl border border-accent/20 bg-background/40 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                  Ideal for
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Startups",
                    "Enterprises",
                    "Fintech",
                    "Insurance",
                    "IoT Platforms",
                    "Internal Tools",
                  ].map((label) => (
                    <span
                      key={label}
                      className="rounded border border-border px-2.5 py-1 font-mono text-[0.62rem] text-muted"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    contactIntent={{
                      subject: "Custom Software Development Inquiry",
                      source: "Services — Flagship",
                    }}
                  >
                    Discuss Your Project →
                  </Button>
                  <Button href="#projects" variant="outline">
                    View Work
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className={filterScrollClass}>
        {serviceCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "shrink-0 rounded border px-3 py-2.5 font-mono text-[0.72rem] tracking-wide transition-colors sm:px-4",
              activeCategory === category
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:border-accent/40 hover:text-text",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service, index) => (
          <RevealOnScroll key={service.id} delay={index * 50}>
            <ServiceCard service={service} index={index} />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll>
        <div className={`${panelClass} p-5 sm:p-7 md:p-10`}>
          <SubsectionHeader
            eyebrow="Engagement Model"
            title="How we work together"
            description="A structured delivery flow designed to reduce risk, keep stakeholders aligned, and move from idea to production with clarity."
          />

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {engagementProcess.map((phase) => (
              <div
                key={phase.step}
                className="rounded-xl border border-border bg-surface-elevated/50 p-4"
              >
                <p className="font-display text-2xl font-extrabold text-accent/80">
                  {phase.step}
                </p>
                <p className="mt-2 font-display text-sm font-semibold text-heading">
                  {phase.title}
                </p>
                <p className="mt-2 text-[0.78rem] font-light leading-relaxed text-muted">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-stretch justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm font-light text-text">
              Ready to scope a custom build, integration challenge, or
              modernization initiative? Share your requirements and I&apos;ll
              respond with next steps.
            </p>
            <Button
              contactIntent={{
                subject: "Start a Project Conversation",
                source: "Services — Engagement",
              }}
            >
              Start a Project Conversation →
            </Button>
          </div>
        </div>
      </RevealOnScroll>
    </SectionShell>
  );
}
