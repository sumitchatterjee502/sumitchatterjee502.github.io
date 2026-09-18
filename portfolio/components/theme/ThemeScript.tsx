import { defaultTheme, THEME_STORAGE_KEY, type PortfolioTheme } from "@/lib/theme";

const validThemes: PortfolioTheme[] = ["executive", "startup"];

const themeMetaColors: Record<PortfolioTheme, string> = {
  executive: "#050d1a",
  startup: "#0a0b14",
};

export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var theme=${JSON.stringify(validThemes)}.indexOf(t)!==-1?t:"${defaultTheme}";document.documentElement.setAttribute("data-theme",theme);var m=document.querySelector('meta[name="theme-color"]');if(m){m.setAttribute("content",${JSON.stringify(themeMetaColors)}[theme])}}catch(e){document.documentElement.setAttribute("data-theme","${defaultTheme}")}})();`;

  return (
    <script
      id="portfolio-theme-init"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
