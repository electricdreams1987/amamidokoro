import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "東京甘味処マップ | 特徴から探せるスイーツガイド",
  description: "東京にある甘味処を一覧化し、店舗の雰囲気がわかる画像、特徴、営業時間、定休日をまとめて閲覧できるWebページ。Google Maps APIを使用しない軽量な実装。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
