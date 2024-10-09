import type { Metadata } from "next";
import Header from "@/components/Header";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Footer from "@/components/Footer";
import { Nunito } from "next/font/google";
import "@radix-ui/themes/styles.css";
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
      <body className={nunito.className}>
        <Theme>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
