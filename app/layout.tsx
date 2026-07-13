import type { Metadata, Viewport } from "next";
import { Fraunces, Dancing_Script } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-display",
  display: "swap",
});

// Script accent — echoes the calligraphy in Jamie's logo.
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ff-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crocheting is my Therapy — Handmade with Love",
  description:
    "Cozy, handmade crochet goods — amigurumi, blankets, beanies, and made-to-order pieces, stitched with love in small batches. Est. 2026.",
  openGraph: {
    type: "website",
    title: "Crocheting is my Therapy — Handmade with Love",
    description:
      "Cozy handmade crochet goods, made to order with love. Est. 2026.",
  },
};

export const viewport: Viewport = {
  themeColor: "#7a3f95",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dancingScript.variable} ${GeistSans.variable}`}
    >
      <body>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              borderRadius: "12px",
              background: "var(--color-ink)",
              color: "var(--color-accent-ink)",
            },
            success: { iconTheme: { primary: "#7a3f95", secondary: "#fff" } },
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-1ZPL3FCM3F" />
    </html>
  );
}
