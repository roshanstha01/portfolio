import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Roshan Shrestha",
  description:
    "Projects in machine learning, retrieval and blockchain by Roshan Shrestha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={schibsted.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
