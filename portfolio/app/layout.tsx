import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Syne } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/data/portfolio";
import { Navbar } from "@/components/layout/Navbar";
import { ContactFormProvider } from "@/components/contact/ContactFormProvider";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { seoConfig } from "@/lib/seo";
import { defaultTheme } from "@/lib/theme";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050d1a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.website),
  title: {
    default: seoConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: seoConfig.description,
  keywords: [...seoConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.website }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: seoConfig.canonical,
  },
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    type: "website",
    url: siteConfig.website,
    siteName: siteConfig.name,
    locale: "en_IN",
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Engineering Leader & Full-Stack Architect`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
    images: [seoConfig.ogImage],
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={defaultTheme}
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <ContactFormProvider>
          <JsonLd />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ContactFormProvider>
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
