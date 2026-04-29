import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "윤도",
  description: "수제 한국 도자기 — 그릇, 컵, 화병, 접시",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
