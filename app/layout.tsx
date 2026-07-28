import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import RevealObserver from "./components/RevealObserver";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "منصة قيادات",
  alternateName: "المنصة الوطنية للقيادات النسائية العمانية",
  description: "منصة وطنية تفاعلية وقاعدة بيانات للقيادات النسائية العمانية في القطاعين العام والخاص ومؤسسات المجتمع المدني.",
  email: "albadi.abdul@outlook.com",
  areaServed: { "@type": "Country", name: "سلطنة عمان" },
};

const display = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

const body = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#071B3B",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: { default: "منصة قيادات | القيادات النسائية العمانية", template: "%s | منصة قيادات" },
    description: "منصة قيادات هي المنصة الوطنية للقيادات النسائية العمانية، وقاعدة بيانات تفاعلية تسهّل الوصول إلى الكفاءات الوطنية في مختلف القطاعات.",
    keywords: ["منصة قيادات", "قيادات", "القيادات النسائية العمانية", "المرأة العمانية", "رؤية عمان 2040", "سلطنة عمان"],
    authors: [{ name: "منصة قيادات" }],
    creator: "منصة قيادات",
    publisher: "منصة قيادات",
    alternates: { canonical: "/" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      type: "website",
      locale: "ar_OM",
      siteName: "منصة قيادات",
      title: "منصة قيادات | القيادات النسائية العمانية",
      description: "قاعدة بيانات وطنية تفاعلية للقيادات النسائية العمانية في مختلف القطاعات.",
      url: "/",
      images: [{ url: "/og.png", width: 1536, height: 910, alt: "منصة قيادات - المنصة الوطنية للقيادات النسائية العمانية" }],
    },
    twitter: { card: "summary_large_image", title: "منصة قيادات", description: "المنصة الوطنية للقيادات النسائية العمانية", images: ["/og.png"] },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
