import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../../globals.css";
import Page from "@/components/template/manager/Page";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "500", "700", "900"],
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
        <Page>{children}</Page>
      </body>
    </html>
  );
}
