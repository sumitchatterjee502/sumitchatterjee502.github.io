"use client";

import { useEffect, useState } from "react";
import {
  defaultTheme,
  themeOptions,
  THEME_STORAGE_KEY,
  type PortfolioTheme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const themeMetaColors: Record<PortfolioTheme, string> = {
  executive: "#050d1a",
  startup: "#0a0b14",
};

function applyTheme(theme: PortfolioTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeMetaColors[theme]);
}

function readStoredTheme(): PortfolioTheme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "executive" || stored === "startup") {
      return stored;
    }
  } catch {
    /* localStorage unavailable */
  }
  return defaultTheme;
}

export function ThemeSwitcher() {
  const [active, setActive] = useState<PortfolioTheme | null>(null);

  useEffect(() => {
    setActive(readStoredTheme());
  }, []);

  function selectTheme(theme: PortfolioTheme) {
    setActive(theme);
    applyTheme(theme);
  }

  return (
    <div
      className="flex flex-col gap-2 sm:items-end"
      role="group"
      aria-label="Color theme"
      suppressHydrationWarning
    >
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
        Palette
      </p>
      <div className="inline-flex rounded-lg border border-border bg-surface/80 p-1">
        {themeOptions.map(({ id, label, description }) => (
          <button
            key={id}
            type="button"
            title={description}
            aria-pressed={active === null ? undefined : active === id}
            onClick={() => selectTheme(id)}
            className={cn(
              "min-h-[36px] rounded-md px-3 py-1.5 font-mono text-[0.68rem] tracking-wide transition-colors",
              active === id
                ? "bg-accent/15 text-accent"
                : "text-muted hover:text-text",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
