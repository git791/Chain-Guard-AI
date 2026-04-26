import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "ChainGuard AI — Supply Chain Intelligence",
  description: "Real-time supply chain intelligence module",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-bg text-text selection:bg-accent/30">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
