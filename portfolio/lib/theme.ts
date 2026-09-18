export type PortfolioTheme = "executive" | "startup";

export const THEME_STORAGE_KEY = "portfolio-theme";

export const defaultTheme: PortfolioTheme = "executive";

export const themeOptions: {
  id: PortfolioTheme;
  label: string;
  description: string;
}[] = [
  {
    id: "executive",
    label: "Executive",
    description: "Refined teal — enterprise & consulting clients",
  },
  {
    id: "startup",
    label: "Startup",
    description: "Indigo + sky on deep slate — product teams & founders",
  },
];
