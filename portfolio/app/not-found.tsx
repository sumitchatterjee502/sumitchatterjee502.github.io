import Link from "next/link";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <SiteContainer className="text-center">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-accent">
          404 — Not Found
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-heading md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm font-light text-muted">
          The page you are looking for does not exist or may have been moved.
          Return to the portfolio homepage to explore projects and services.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Back to Home →</Button>
        </div>
        <p className="mt-6 font-mono text-[0.68rem] text-muted">
          Or jump to{" "}
          <Link href="/#contact" className="text-accent hover:underline">
            Contact
          </Link>
        </p>
      </SiteContainer>
    </section>
  );
}
