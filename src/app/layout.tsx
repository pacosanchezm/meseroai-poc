import type { Metadata } from "next";
import "./globals.css";
import "./lib/envSetup";

export const metadata: Metadata = {
  title: "mesero.ai - Sushi Factory",
  description: "Demo de mesero virtual para Sushi Factory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icono.png" />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
