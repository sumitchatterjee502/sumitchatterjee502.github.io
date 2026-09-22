"use client";

import { useEffect, useState } from "react";
import { useContactForm } from "@/components/contact/ContactFormProvider";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { navLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { openContactForm } = useContactForm();
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

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", menuOpen);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border bg-[var(--nav-bg)] py-4 backdrop-blur-xl transition-all",
          scrolled && "py-3",
        )}
        aria-label="Main navigation"
      >
        <SiteContainer className="flex items-center justify-between">
        <a
          href="#hero"
          onClick={closeMenu}
          className="font-display text-base font-extrabold tracking-tight text-heading sm:text-lg"
        >
          <span className="sm:hidden">
            SC<span className="text-accent">.</span>
          </span>
          <span className="hidden sm:inline">
            S<span className="text-accent">.</span>CHATTERJEE
            <span className="text-accent">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <a
                  href={href}
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              openContactForm({
                subject: "Hire Me — Portfolio Inquiry",
                source: "Navbar",
              })
            }
            className="hidden min-h-[44px] items-center rounded border border-accent px-4 py-2 font-mono text-[0.75rem] tracking-wider text-accent transition-colors hover:bg-accent hover:text-background sm:inline-flex lg:px-5"
          >
            Hire Me
          </button>

          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={cn(
                "block h-0.5 w-[22px] bg-text transition-transform duration-300",
                menuOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-[22px] bg-text transition-opacity duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-[22px] bg-text transition-transform duration-300",
                menuOpen && "-translate-y-[7px] -rotate-45",
              )}
            />
          </button>
        </div>
        </SiteContainer>
      </nav>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-background/75 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}

      <div
        id="mobile-nav-panel"
        className={cn(
          "fixed inset-x-0 top-[60px] z-50 max-h-[calc(100dvh-60px)] overflow-y-auto border-b border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-1 p-4">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className={cn(
                    "flex min-h-[44px] items-center rounded-lg px-4 font-mono text-sm tracking-wider transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-muted hover:bg-surface-elevated hover:text-text",
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
          <li className="mt-2 border-t border-border pt-3">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                openContactForm({
                  subject: "Hire Me — Portfolio Inquiry",
                  source: "Mobile Navbar",
                });
              }}
              className="flex min-h-[44px] w-full items-center justify-center rounded-lg border border-accent bg-accent/10 px-4 font-mono text-sm tracking-wider text-accent transition-colors hover:bg-accent hover:text-background"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
