import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Leaked Key Playbooks", template: "%s | Leaked Key Playbooks" },
  description: "Provider-specific incident response playbooks for leaked credentials. Find exactly what to do when an API key, token, or secret is exposed.",
  keywords: ["leaked credentials", "API key security", "incident response", "credential rotation", "security playbooks"],
  openGraph: {
    type: "website",
    siteName: "Leaked Key Playbooks",
    title: "Leaked Key Playbooks — You leaked a credential. Know exactly what to do next.",
    description: "Provider-specific incident response playbooks for leaked credentials.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-[#111111] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
