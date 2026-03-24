import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go Vertical Experience | Outdoor Adventures in the Anti-Atlas",
  description:
    "Experience the authentic beauty of Morocco's hidden gem — guided outdoor adventures in the heart of the Anti-Atlas mountains.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
