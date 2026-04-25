import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yundo Ceramics",
  description: "Handcrafted Korean ceramics — bowls, cups, vases, and plates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
