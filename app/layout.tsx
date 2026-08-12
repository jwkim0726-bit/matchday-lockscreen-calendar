import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matchday — 경기 일정 배경화면",
  description: "API 키 없이 로컬에서 만드는 월별 스포츠 경기 일정 잠금화면",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
