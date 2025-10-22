import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pendle DeFi 数据面板",
  description: "实时追踪 Pendle 协议市场数据、APY、TVL 和交易量",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
