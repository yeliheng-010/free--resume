import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Resume Builder",
  description: "A free online resume builder with real-time preview, templates, and PDF export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
