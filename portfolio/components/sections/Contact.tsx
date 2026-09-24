import Image from "next/image";
import { contactBackgroundImage, siteConfig } from "@/data/portfolio";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { sectionShellClass, sectionStackClass } from "@/lib/layout";

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
    <section
      id="contact"
      className={`contact-stage ${sectionShellClass} relative overflow-hidden py-20 sm:py-24 md:py-28`}
      aria-labelledby="contact-heading"
    >
      <div className="contact-photo-bg absolute inset-0" aria-hidden="true">
        <Image
          src={contactBackgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="contact-photo-bg__image"
        />
        <div className="contact-map-overlay contact-map-overlay--tint" />
        <div className="contact-map-overlay contact-map-overlay--depth" />
        <div className="contact-map-overlay contact-map-overlay--readability" />
        <div className="contact-map-overlay contact-map-overlay--vignette" />
      </div>

      <SectionContainer className="relative z-10">
        <div className={sectionStackClass}>
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
              <div className="contact-panel">
                <h3 className="mb-4 font-display text-xl font-bold text-heading sm:text-2xl">
                  Open to opportunities
                </h3>
                <p className="mb-8 max-w-md text-[0.9rem] leading-relaxed text-muted">
                  Whether you&apos;re looking for a technical lead for your next
                  platform, an architect for a complex integration challenge, or
                  simply want to discuss engineering — I&apos;d love to hear from
                  you.
                </p>

                <div className="space-y-3">
                  {contactLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="contact-link-row flex min-h-[44px] items-center gap-3 rounded-md border px-4 py-3 text-sm transition-all sm:hover:translate-x-1"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-sm"
                        aria-hidden="true"
                      >
                        {link.icon}
                      </span>
                      <span className="break-all sm:break-normal">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div className="contact-panel p-5 sm:p-8">
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
        </div>
      </SectionContainer>
    </section>
  );
}
