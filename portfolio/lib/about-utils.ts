import { aboutContent } from "@/data/portfolio";

export interface StrengthMeta {
  code: string;
  gradient: string;
  accent: string;
}

export const strengthMeta: Record<
  (typeof aboutContent.strengths)[number]["title"],
  StrengthMeta
> = {
  "System Architecture": {
    code: "SA",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "text-accent",
  },
  "Team Leadership": {
    code: "TL",
    gradient: "from-accent-blue/20 via-accent-blue/5 to-transparent",
    accent: "text-accent-blue",
  },
  "Performance Engineering": {
    code: "PE",
    gradient: "from-sky-400/15 via-accent-blue/5 to-transparent",
    accent: "text-sky-300",
  },
  Integrations: {
    code: "INT",
    gradient: "from-amber-400/15 via-accent/5 to-transparent",
    accent: "text-amber-300",
  },
  "DevOps & CI/CD": {
    code: "DO",
    gradient: "from-emerald-400/15 via-accent/5 to-transparent",
    accent: "text-emerald-300",
  },
  "Security & Compliance": {
    code: "SC",
    gradient: "from-violet-400/15 via-accent-blue/5 to-transparent",
    accent: "text-violet-300",
  },
};

export const aboutStats = [
  { label: "Years Experience", value: "9+" },
  { label: "Industry Domains", value: "4" },
  { label: "Engineering Pillars", value: String(aboutContent.strengths.length) },
] as const;

export const approachPoints = [
  "Lead with architecture clarity before implementation",
  "Balance delivery speed with long-term maintainability",
  "Invest in team standards, reviews, and mentorship",
  "Design for scale, reliability, and measurable outcomes",
] as const;
