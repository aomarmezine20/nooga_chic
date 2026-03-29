import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNav from "@/components/BottomNav";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Nooga Chic | Élégance au quotidien",
  description: "Boutique en ligne de talons et sacs pour femmes au Maroc.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180" },
    ],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "theme-color": "#ffffff",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className={geist.variable}>
      <body style={{ paddingBottom: 'var(--bottom-nav-height)' }}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
