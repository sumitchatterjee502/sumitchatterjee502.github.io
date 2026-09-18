import { siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

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
  const mailtoSubject = encodeURIComponent("Freelance Inquiry");
  const mailtoBody = encodeURIComponent(
    "Hi Sumit,\n\nI'm reaching out regarding a project opportunity.\n\n",
  );

  return (
    <section id="contact" className="bg-background px-6 py-28 md:px-16">
      <SectionHeading
        tag="// 06 — Contact"
        title={
          <>
            Let&apos;s Build
            <br />
            Something Together
          </>
        }
      />

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <RevealOnScroll>
          <h3 className="mb-4 font-display text-2xl font-bold text-heading">
            Open to opportunities
          </h3>
          <p className="mb-8 max-w-md text-[0.9rem] text-muted">
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
                className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm text-text transition-all hover:translate-x-1 hover:border-accent hover:text-accent"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded bg-surface-elevated text-sm"
                  aria-hidden="true"
                >
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="rounded-lg border border-border bg-surface p-8">
            <h3 className="mb-3 font-display text-lg font-semibold text-heading">
              Start a conversation
            </h3>
            <p className="mb-6 text-sm font-light text-muted">
              No backend form required — send a direct email with your project
              details. I typically respond within 1–2 business days.
            </p>
            <Button
              href={`mailto:${siteConfig.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="w-full sm:w-auto"
            >
              Send Freelance Inquiry →
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
