import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Audiowide } from "next/font/google";
import Link from "next/link";
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
        
        {/* Global Footer */}
        <footer className="w-full border-t border-white/20 py-8 px-6 lg:px-12 bg-[#111111] flex flex-col z-[100] relative mt-auto">
          <div className="w-full max-w-4xl mx-auto text-center mb-6">
            <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest leading-relaxed">
              Support: (502) 401-1305 • By calling/texting you agree to receive messages. Reply STOP to opt out. Msg rates apply.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">© 2026 Welcome Parrot. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="font-mono text-[10px] text-white/50 uppercase tracking-widest hover:text-[#00bfff] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="font-mono text-[10px] text-white/50 uppercase tracking-widest hover:text-[#00bfff] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
