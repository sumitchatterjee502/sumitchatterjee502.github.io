import { SiteContainer } from "@/components/layout/SiteContainer";
import { navLinks, siteConfig } from "@/data/portfolio";

export function Footer() {
  const footerLinks = navLinks.filter((link) =>
    ["About", "Experience", "Projects"].includes(link.label),
  );

  return (
    <footer className="border-t border-border bg-[rgba(4,14,30,0.9)] py-8 sm:py-10">
      <SiteContainer className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <p className="font-mono text-[0.72rem] leading-relaxed text-muted">
          © {new Date().getFullYear()} {siteConfig.name} · Engineering Leader ·
          Built with precision.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-8">
          {footerLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="inline-flex min-h-[44px] items-center font-mono text-[0.72rem] text-muted transition-colors hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-mono text-[0.72rem] text-muted transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-mono text-[0.72rem] text-muted transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </SiteContainer>
    </footer>
  );
}
