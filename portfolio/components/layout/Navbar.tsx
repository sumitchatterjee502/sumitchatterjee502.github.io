"use client";

import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop - 100;
        const height = el.offsetHeight;
        const id = el.getAttribute("id");

        if (id && scrollY >= top && scrollY < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-[rgba(2,11,24,0.88)] px-6 py-5 backdrop-blur-xl transition-all md:px-16",
        scrolled && "py-3",
      )}
      aria-label="Main navigation"
    >
      <a
        href="#hero"
        className="font-display text-lg font-extrabold tracking-tight text-heading"
      >
        S<span className="text-accent">.</span>CHATTERJEE
        <span className="text-accent">.</span>
      </a>

      <ul
        className={cn(
          "items-center gap-10",
          menuOpen
            ? "absolute left-0 right-0 top-[60px] z-40 flex flex-col gap-6 border-b border-border bg-surface p-8"
            : "hidden md:flex",
        )}
        id="nav-links"
      >
        {navLinks.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = activeSection === id;
          return (
            <li key={href}>
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "group relative font-mono text-[0.78rem] tracking-wider transition-colors",
                  isActive ? "text-accent" : "text-muted hover:text-accent",
                )}
              >
                {label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-accent transition-all",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4">
        <a
          href={`mailto:${siteConfig.email}`}
          className="hidden rounded border border-accent px-5 py-2 font-mono text-[0.75rem] tracking-wider text-accent transition-colors hover:bg-accent hover:text-background sm:inline-block"
        >
          Hire Me
        </a>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              "block h-0.5 w-[22px] bg-text transition-transform",
              menuOpen && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-[22px] bg-text transition-opacity",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-[22px] bg-text transition-transform",
              menuOpen && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>
    </nav>
  );
}
