import {
  getPersonJsonLd,
  getProfessionalServiceJsonLd,
  getWebsiteJsonLd,
} from "@/lib/seo";

export function JsonLd() {
  const schemas = [
    getPersonJsonLd(),
    getWebsiteJsonLd(),
    getProfessionalServiceJsonLd(),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
