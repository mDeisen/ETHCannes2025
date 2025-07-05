"use client"
import "@/styles/index.scss"
import Navbar from "@/components/Navbar";
import { HypergraphAppProvider, HypergraphSpaceProvider } from "@graphprotocol/hypergraph-react";
import { mapping } from "@/connectors/mapping";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-theme="theme-light">
        <HypergraphAppProvider mapping={mapping}>
          <HypergraphSpaceProvider space="37a2994a-ed71-47d4-b88d-691cff5883b4">
            <Navbar/>
            {children}
          </HypergraphSpaceProvider>
        </HypergraphAppProvider>
      </body>
    </html>
  );
}
