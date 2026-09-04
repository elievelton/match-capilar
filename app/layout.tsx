import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Match Capilar",
  description:
    "Encontre produtos para cabelo que combinam com as suas necessidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}