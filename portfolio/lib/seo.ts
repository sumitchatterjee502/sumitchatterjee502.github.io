import { siteConfig } from "@/data/portfolio";

export const seoConfig = {
  title: `${siteConfig.name} — Engineering Leader & Full-Stack Architect`,
  description:
    "Senior Software Engineering Lead with 9+ years building scalable systems, leading teams, and delivering measurable business impact across fintech, insurance, and IoT domains.",
  keywords: [
    "Sumit Chatterjee",
    "Full-Stack Developer",
    "Software Engineering Lead",
    "Freelance Developer",
    "React",
    "Next.js",
    "Node.js",
    "PHP",
    "Microservices",
    "Kolkata",
  ],
  canonical: siteConfig.website,
  ogImage: `${siteConfig.website}og-cover.svg`,
} as const;

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.website,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressCountry: "IN",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: [
      "Full-Stack Development",
      "Microservices Architecture",
      "React",
      "Next.js",
      "Node.js",
      "PHP",
      "Cloud Computing",
    ],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.website,
    description: seoConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

export function getProfessionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Freelance Software Engineering`,
    url: siteConfig.website,
    email: siteConfig.email,
    areaServed: "Worldwide",
    serviceType: [
      "Custom Software Development",
      "Full-Stack Web Development",
      "API Development",
      "Technical Consulting",
    ],
  };
}
