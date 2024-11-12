import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../../globals.css";
import Page from "@/components/template/home/Page";
import LottieAnimation from "@/components/LottieAnimation";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "500", "700"],
  preload: true,
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
        <Page>
          {children}
          <script async src="//www.instagram.com/embed.js"></script>
        </Page>
      </body>
    </html>
  );
}
