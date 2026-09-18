import { navLinks, siteConfig } from "@/data/portfolio";

export function Footer() {
  const footerLinks = navLinks.filter((link) =>
    ["About", "Experience", "Projects"].includes(link.label),
  );

  return (
    <footer className="flex flex-col items-start justify-between gap-4 border-t border-border bg-[rgba(4,14,30,0.9)] px-6 py-10 md:flex-row md:items-center md:px-16">
      <p className="font-mono text-[0.72rem] text-muted">
        © {new Date().getFullYear()} {siteConfig.name} · Engineering Leader ·
        Built with precision.
      </p>
      <ul className="flex flex-wrap gap-8">
        {footerLinks.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="font-mono text-[0.72rem] text-muted transition-colors hover:text-accent"
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
            className="font-mono text-[0.72rem] text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.72rem] text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}
