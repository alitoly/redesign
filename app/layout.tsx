import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

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
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
