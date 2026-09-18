import { heroStats, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 md:px-16 md:pt-36"
    >
      <div className="hero-grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,212,170,0.12)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p
            className="mb-6 animate-fade-up font-mono text-xs uppercase tracking-[0.15em] text-accent opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            // {siteConfig.eyebrow}
          </p>

          <h1
            className="mb-2 animate-fade-up text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-heading opacity-0"
            style={{ animationDelay: "0.35s" }}
          >
            Sumit{" "}
            <span className="gradient-text">Chatterjee</span>
          </h1>

          <p
            className="mb-8 animate-fade-up font-display text-[clamp(1rem,2.5vw,1.4rem)] text-muted opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            {siteConfig.title} · {siteConfig.location}
          </p>

          <p
            className="mb-12 max-w-xl animate-fade-up text-[1.05rem] font-light text-text opacity-0"
            style={{ animationDelay: "0.65s" }}
          >
            {siteConfig.tagline}
          </p>

          <div
            className="mb-12 flex animate-fade-up flex-wrap gap-6 opacity-0 md:gap-12"
            style={{ animationDelay: "0.8s" }}
          >
            {heroStats.map(({ value, label }) => (
              <div
                key={label}
                className="border-l-2 border-accent pl-4"
              >
                <div className="font-display text-3xl font-extrabold leading-none text-heading">
                  {value}
                </div>
                <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex animate-fade-up flex-wrap gap-4 opacity-0"
            style={{ animationDelay: "0.95s" }}
          >
            <Button href="#projects">View My Projects →</Button>
            <Button href="#contact" variant="outline">
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
          className="hidden animate-fade-up flex-col items-center gap-5 opacity-0 lg:flex"
          style={{ animationDelay: "1.1s" }}
          aria-hidden="true"
        >
          <div className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full border border-accent/20 bg-[radial-gradient(circle,rgba(0,144,255,0.12)_0%,rgba(0,212,170,0.06)_60%,transparent_100%)]">
            <div className="text-center">
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
          <div className="flex w-full max-w-[200px] flex-col gap-2">
            {["Experienced IT Lead", "Node · React · PHP", "Microservices", "Cloud & DevOps"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded border border-accent-blue/20 bg-accent-blue/10 px-3 py-2 text-center font-mono text-[0.7rem] tracking-wide text-text"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
