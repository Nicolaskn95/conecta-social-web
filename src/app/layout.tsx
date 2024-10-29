import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "600", "800"],
});

export const metadata: Metadata = {
  title: "Conecta Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.className}`}>
        {children}
        <script async src="//www.instagram.com/embed.js"></script>
      </body>
    </html>
  );
}
