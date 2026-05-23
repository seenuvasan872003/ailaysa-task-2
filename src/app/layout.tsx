// I am Ironman
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ailaysa — Bilingual Content Editor",
  description:
    "A minimal, beautiful bilingual content editor with side-by-side source and translation panels, live word count, dark/light mode, and AI-powered translation.",
  keywords: ["bilingual editor", "translation", "content editor", "ailaysa"],
  openGraph: {
    title: "Ailaysa — Bilingual Content Editor",
    description: "Design and translate content in any language with an elegant glassmorphism UI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('ailaysa-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}

