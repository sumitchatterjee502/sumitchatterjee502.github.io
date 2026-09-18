import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Syne } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/data/portfolio";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Engineering Leader & Full-Stack Architect`,
  description:
    "Senior Software Engineering Lead with 9+ years building scalable systems, leading teams, and delivering measurable business impact across fintech, insurance, and IoT domains.",
  openGraph: {
    title: `${siteConfig.name} — Engineering Leader`,
    description:
      "Team Lead & Full-Stack Architect | PHP · React · Node.js · Microservices",
    type: "website",
    url: siteConfig.website,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Engineering Leader`,
    description:
      "Team Lead & Full-Stack Architect | PHP · React · Node.js · Microservices",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analyticsId}');
          `}
        </Script>
      </body>
    </html>
  );
}
