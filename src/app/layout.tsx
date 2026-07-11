import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Audiowide } from "next/font/google";
import Link from "next/link";
import ConsentBanner from "@/components/ConsentBanner";
import GlobalFooter from "@/components/GlobalFooter";
import "./globals.css";

const orbitronFont = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const audiowideFont = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome Parrot OS",
  description: "Autopilot Lead Generation. Never miss a call again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitronFont.variable} ${audiowideFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#111111] text-[#f0f0f0]">
        {children}
        <ConsentBanner />
        
        {/* Global Footer */}
        <GlobalFooter />
      </body>
    </html>
  );
}
