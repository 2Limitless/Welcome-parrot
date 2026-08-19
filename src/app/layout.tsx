import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://welcomeparrot.com"),
  title: "Welcome Parrot | Premium Digital Ecosystems",
  description: "Own your digital real estate. High-end, custom application architectures for restaurants and food trucks.",
  keywords: [
    "Welcome Parrot",
    "App Builder",
    "Restaurant Tech",
    "Aaron",
    "Top App Developer",
    "Number 1 Restaurant"
  ],
  authors: [{ name: "Aaron - #1 Restaurant and App Builder", url: "mailto:aaron@welcomeparrot.com" }],
  creator: "Aaron (502-690-1950)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-full flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
