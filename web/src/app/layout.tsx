import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Streamline | Watch, explore, and learn",
    template: "%s | Streamline",
  },
  description:
    "Streamline is a modern video experience inspired by YouTube, featuring curated content across technology, music, gaming, and more.",
  metadataBase: new URL("https://agentic-d8d9485e.vercel.app"),
  openGraph: {
    title: "Streamline | Watch, explore, and learn",
    description:
      "A modern, YouTube-inspired video platform with rich browsing, immersive watch pages, and curated categories.",
    url: "https://agentic-d8d9485e.vercel.app",
    siteName: "Streamline",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Streamline | Watch, explore, and learn",
    description:
      "A modern, YouTube-inspired video platform with rich browsing, immersive watch pages, and curated categories.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-50 dark:bg-zinc-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
