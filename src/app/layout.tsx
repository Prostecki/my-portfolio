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
  title: "Mark Taratynov | Fullstack Cloud Engineer",
  description:
    "Fullstack Cloud Engineer based in Stockholm, Sweden. Specializing in GCP, Agentic AI, TypeScript, and Terraform. Open to new opportunities — view my projects and get in touch.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mark Taratynov | Fullstack Cloud Engineer",
    description:
      "Fullstack Cloud Engineer based in Stockholm, Sweden. Specializing in GCP, Agentic AI, TypeScript, and Terraform. Open to new opportunities.",
    url: "/",
    siteName: "Mark Taratynov",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mark Taratynov — Fullstack Cloud Engineer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Taratynov | Fullstack Cloud Engineer",
    description:
      "Fullstack Cloud Engineer based in Stockholm, Sweden. Specializing in GCP, Agentic AI, TypeScript, and Terraform.",
    images: ["/og-image.png"],
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
