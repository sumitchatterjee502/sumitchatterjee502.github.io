import Image from "next/image";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { heroBackgroundImage, heroStats, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { mobileButtonRowClass, sectionShellClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const mobileTags = [
  "Experienced IT Lead",
  "Node · React · PHP",
  "Microservices",
  "Cloud & DevOps",
];

export function Hero() {
  return (
    <section
      id="hero"
      className={`${sectionShellClass} relative flex min-h-[100svh] items-center pb-12 pt-28 sm:pb-16 sm:pt-32 md:pt-36`}
      aria-labelledby="hero-heading"
    >
      <div className="hero-photo-bg absolute inset-0" aria-hidden="true">
        <Image
          src={heroBackgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-photo-bg__image"
        />
        <div className="hero-map-overlay hero-map-overlay--tint" />
        <div className="hero-map-overlay hero-map-overlay--depth" />
        <div className="hero-map-overlay hero-map-overlay--readability" />
        <div className="hero-map-overlay hero-map-overlay--vignette" />
      </div>
      <div className="hero-grid-bg absolute inset-0 z-[1]" aria-hidden="true" />
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[min(600px,80vw)] w-[min(600px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      />

      <SiteContainer className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="min-w-0 flex-1">
          <p
            className="mb-4 animate-fade-up font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent opacity-0 sm:mb-6 sm:text-xs"
            style={{ animationDelay: "0.2s" }}
          >
            // {siteConfig.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mb-2 animate-fade-up text-[clamp(2.5rem,11vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-heading opacity-0"
            style={{ animationDelay: "0.35s" }}
          >
            Sumit{" "}
            <span className="gradient-text">Chatterjee</span>
          </h1>

          <p
            className="mb-6 animate-fade-up font-display text-[clamp(0.95rem,3.5vw,1.4rem)] leading-snug text-muted opacity-0 sm:mb-8"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="block sm:inline">{siteConfig.title}</span>
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="mt-1 block text-[0.9em] sm:mt-0 sm:inline">
              {siteConfig.location}
            </span>
          </p>

          <p
            className="mb-8 max-w-xl animate-fade-up text-[0.95rem] font-light leading-relaxed text-text opacity-0 sm:mb-12 sm:text-[1.05rem]"
            style={{ animationDelay: "0.65s" }}
          >
            {siteConfig.tagline}
          </p>

          <div
            className="mb-8 grid animate-fade-up grid-cols-2 gap-4 opacity-0 sm:mb-12 sm:gap-6 md:flex md:flex-wrap md:gap-12"
            style={{ animationDelay: "0.8s" }}
          >
            {heroStats.map(({ value, label }) => (
              <div key={label} className="border-l-2 border-accent pl-3 sm:pl-4">
                <div className="font-display text-2xl font-extrabold leading-none text-heading sm:text-3xl">
                  {value}
                </div>
                <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-wider text-muted sm:text-[0.7rem]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "animate-fade-up opacity-0",
              mobileButtonRowClass,
            )}
            style={{ animationDelay: "0.95s" }}
          >
            <Button href="#projects">View My Projects →</Button>
            <Button
              contactIntent={{
                subject: "Contact Me — Portfolio Inquiry",
                source: "Hero",
              }}
              variant="outline"
            >
              Contact Me
            </Button>
            <Button href={siteConfig.github} variant="outline" external>
              GitHub
            </Button>
            <Button href={siteConfig.linkedin} variant="outline" external>
              LinkedIn
            </Button>
          </div>
        </div>

        <div
          className="animate-fade-up opacity-0 lg:hidden"
          style={{ animationDelay: "1.05s" }}
        >
          <div className="filter-scroll">
            {mobileTags.map((tag) => (
              <span
                key={tag}
                className="hero-skill-chip hero-skill-chip--pill shrink-0 px-3 py-2 font-mono text-[0.65rem] tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside
          className="hero-aside hidden animate-fade-up flex-col items-center gap-5 opacity-0 lg:flex"
          style={{ animationDelay: "1.1s" }}
          aria-label="Experience highlights"
        >
          <div className="hero-orb relative flex h-[200px] w-[200px] items-center justify-center rounded-full">
            <div className="hero-orb__glass" aria-hidden="true" />
            <div className="relative z-[1] text-center">
              <div className="gradient-text font-display text-5xl font-extrabold leading-none">
                9+
              </div>
              <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-wider text-muted">
                Years of
              </div>
              <div className="font-mono text-[0.62rem] uppercase tracking-wider text-accent">
                Experience
              </div>
            </div>
          </div>
          <div className="hero-aside__tags flex w-full max-w-[220px] flex-col gap-2.5">
            {mobileTags.map((tag) => (
              <span
                key={tag}
                className="hero-skill-chip px-3 py-2.5 text-center font-mono text-[0.7rem] tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </SiteContainer>
    </section>
  );
}
