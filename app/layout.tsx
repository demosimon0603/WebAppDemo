import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dust & Ember Steakhouse",
  description: "A bilingual Western cowboy restaurant website with reservations."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
