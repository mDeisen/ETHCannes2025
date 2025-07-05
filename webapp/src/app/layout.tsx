import type { Metadata } from "next";
import "@/styles/index.scss"
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "I'm Graph",
  description: "Graph-based app for dapp IAM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-theme="theme-light">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
