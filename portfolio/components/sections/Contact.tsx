import { siteConfig } from "@/data/portfolio";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { panelClass } from "@/lib/layout";

const contactLinks = [
  {
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: "✉",
  },
  {
    label: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/-/g, "")}`,
    icon: "📱",
  },
  {
    label: "linkedin.com/in/sumit-chatterjee",
    href: siteConfig.linkedin,
    icon: "💼",
    external: true,
  },
  {
    label: "github.com/sumitchatterjee502",
    href: siteConfig.github,
    icon: "🔗",
    external: true,
  },
];

export function Contact() {
  return (
    <SectionShell id="contact">
      <SectionHeading
        headingId="contact-heading"
        tag="// 06 — Contact"
        title={
          <>
            Let&apos;s Build
            <br />
            Something Together
          </>
        }
        subtitle="Open to freelance engagements, technical leadership roles, and architecture consulting — let's discuss your next platform or integration challenge."
      />

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <RevealOnScroll>
          <h3 className="mb-4 font-display text-xl font-bold text-heading sm:text-2xl">
            Open to opportunities
          </h3>
          <p className="mb-8 max-w-md text-[0.9rem] leading-relaxed text-muted">
            Whether you&apos;re looking for a technical lead for your next
            platform, an architect for a complex integration challenge, or
            simply want to discuss engineering — I&apos;d love to hear from you.
          </p>

          <div className="space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex min-h-[44px] items-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm text-text transition-all hover:border-accent hover:text-accent sm:hover:translate-x-1"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-surface-elevated text-sm"
                  aria-hidden="true"
                >
                  {link.icon}
                </span>
                <span className="break-all sm:break-normal">{link.label}</span>
              </a>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className={`${panelClass} p-5 sm:p-8`}>
            <h3 className="mb-3 font-display text-lg font-semibold text-heading">
              Start a conversation
            </h3>
            <p className="mb-6 text-sm font-light leading-relaxed text-muted">
              Fill in your details and project query in the popup form. Your
              message will be sent directly to my inbox — I typically respond
              within 1–2 business days.
            </p>
            <Button
              contactIntent={{
                subject: "Freelance Inquiry",
                source: "Contact Section",
              }}
            >
              Send Freelance Inquiry →
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
