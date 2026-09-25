import { skillGroups } from "@/data/portfolio";

export interface SkillGroupMeta {
  code: string;
  description: string;
  gradient: string;
  accent: string;
  span?: "wide" | "default";
}

export const skillGroupMeta: Record<
  (typeof skillGroups)[number]["title"],
  SkillGroupMeta
> = {
  Backend: {
    code: "BE",
    description: "APIs, services, and server-side application architecture.",
    gradient: "from-accent/20 via-accent/5 to-transparent",
    accent: "text-accent",
    span: "wide",
  },
  Frontend: {
    code: "FE",
    description: "Interfaces, component systems, and user-facing experiences.",
    gradient: "from-accent-blue/20 via-accent-blue/5 to-transparent",
    accent: "text-accent-blue",
    span: "wide",
  },
  Databases: {
    code: "DB",
    description: "Persistence, caching, schema design, and data access layers.",
    gradient: "from-sky-400/15 via-accent-blue/5 to-transparent",
    accent: "text-sky-300",
  },
  "Cloud & DevOps": {
    code: "CD",
    description: "Deployment automation, containers, and cloud infrastructure.",
    gradient: "from-emerald-400/15 via-accent/5 to-transparent",
    accent: "text-emerald-300",
  },
  "Protocols & IoT": {
    code: "IoT",
    description: "Real-time communication, auth protocols, and device integration.",
    gradient: "from-violet-400/15 via-accent-blue/5 to-transparent",
    accent: "text-violet-300",
  },
  "Payments & Services": {
    code: "INT",
    description: "Payment gateways, OCR, maps, and third-party integrations.",
    gradient: "from-amber-400/15 via-accent/5 to-transparent",
    accent: "text-amber-300",
  },
  Leadership: {
    code: "LD",
    description: "Delivery leadership, mentoring, and engineering standards.",
    gradient: "from-rose-400/15 via-accent-blue/5 to-transparent",
    accent: "text-rose-300",
  },
  "System Design": {
    code: "SD",
    description: "Scalable, reliable system architecture for high-traffic production platforms.",
    gradient: "from-cyan-400/15 via-accent/5 to-transparent",
    accent: "text-cyan-300",
    span: "wide",
  },
};

export const coreStack = [
  "React.js",
  "Next.js",
  "Node.js",
  "PHP",
  "Laravel",
  "Nest.js",
  "C#",
  ".NET Core",
  "MySQL",
  "Redis",
  "Docker",
  "Azure",
  "AWS",
  "TypeScript",
] as const;

export function getSkillStats() {
  const allSkills = skillGroups.flatMap((group) => group.skills);

  return {
    categoryCount: skillGroups.length,
    technologyCount: allSkills.length,
    coreStackCount: coreStack.length,
  };
}
