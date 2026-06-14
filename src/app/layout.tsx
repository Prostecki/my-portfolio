import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marktaratynov.dev"),
  title: "Mark Taratynov | Fullstack Software Engineer",
  description:
    "Fullstack Software Engineer in Stockholm. React, TypeScript, Python, and GCP. GCP ACE certified — view projects and get in touch.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mark Taratynov | Fullstack Software Engineer",
    description:
      "Fullstack Software Engineer in Stockholm. React, TypeScript, Python, and GCP. GCP ACE certified.",
    url: "/",
    siteName: "Mark Taratynov",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Taratynov | Fullstack Software Engineer",
    description:
      "Fullstack Software Engineer in Stockholm. React, TypeScript, Python, and GCP. GCP ACE certified.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
