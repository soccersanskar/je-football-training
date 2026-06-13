import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { brand } from "@/lib/content";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jefootballtraining.com"
  ),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description:
    "Elite, individualized football training with professional footballer Jesus Enriquez. Technical ability, tactical awareness, physical conditioning and mental strength — built around you. Bay Area, California.",
  keywords: [
    "football training",
    "soccer training",
    "Bay Area soccer coach",
    "Jesus Enriquez",
    "private soccer training",
    "elite player development",
  ],
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "An individualized path to elite football. Train with professional footballer Jesus Enriquez.",
    type: "website",
    images: [
      {
        url: "/brand/je-logo.png",
        width: 514,
        height: 486,
        alt: "JE Football Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    images: ["/brand/je-logo.png"],
  },
  icons: { icon: "/brand/je-logo.png", apple: "/brand/je-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#02080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
