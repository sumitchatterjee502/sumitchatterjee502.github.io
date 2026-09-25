import type { Project, ProjectCategory } from "@/data/portfolio";

type ProjectDomain = Exclude<ProjectCategory, "All">;

export interface CategoryStyle {
  gradient: string;
  glow: string;
  label: string;
}

const categoryStyles: Record<ProjectDomain, CategoryStyle> = {
  Fintech: {
    gradient: "from-accent/25 via-accent/10 to-transparent",
    glow: "rgba(var(--accent-rgb), 0.15)",
    label: "text-accent",
  },
  Enterprise: {
    gradient: "from-accent-blue/25 via-accent-blue/10 to-transparent",
    glow: "rgba(77,166,255,0.15)",
    label: "text-accent-blue",
  },
  Insurance: {
    gradient: "from-sky-400/20 via-accent-blue/10 to-transparent",
    glow: "rgba(77,166,255,0.12)",
    label: "text-sky-300",
  },
  Banking: {
    gradient: "from-emerald-400/15 via-accent/10 to-transparent",
    glow: "rgba(var(--accent-rgb), 0.12)",
    label: "text-emerald-300",
  },
  IoT: {
    gradient: "from-violet-400/15 via-accent-blue/10 to-transparent",
    glow: "rgba(139,92,246,0.12)",
    label: "text-violet-300",
  },
  Recruitment: {
    gradient: "from-cyan-400/15 via-accent-blue/10 to-transparent",
    glow: "rgba(34,211,238,0.12)",
    label: "text-cyan-300",
  },
  Manufacturing: {
    gradient: "from-amber-400/15 via-accent/10 to-transparent",
    glow: "rgba(251,191,36,0.12)",
    label: "text-amber-300",
  },
  Events: {
    gradient: "from-rose-400/15 via-accent-blue/10 to-transparent",
    glow: "rgba(244,63,94,0.12)",
    label: "text-rose-300",
  },
  "Custom Software Development": {
    gradient: "from-indigo-400/20 via-accent-blue/10 to-transparent",
    glow: "rgba(99,102,241,0.14)",
    label: "text-indigo-300",
  },
};

export function getCategoryStyle(category: ProjectDomain): CategoryStyle {
  return categoryStyles[category];
}

export function getProjectInitials(title: string): string {
  const words = title
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function isPlaceholder(value?: string): boolean {
  return !value || value.startsWith("[PLACEHOLDER]");
}

export function getVisibleTech(technologies: string[], limit = 5): {
  visible: string[];
  overflow: number;
} {
  if (technologies.length <= limit) {
    return { visible: technologies, overflow: 0 };
  }

  return {
    visible: technologies.slice(0, limit),
    overflow: technologies.length - limit,
  };
}

export function countProjectsByCategory(
  projectList: Project[],
): Record<ProjectDomain, number> {
  return projectList.reduce(
    (counts, project) => {
      counts[project.category] = (counts[project.category] ?? 0) + 1;
      return counts;
    },
    {} as Record<ProjectDomain, number>,
  );
}
