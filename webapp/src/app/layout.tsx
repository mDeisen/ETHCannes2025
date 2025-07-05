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
          <HypergraphSpaceProvider space="c3f16554-a44a-4ed6-8147-4d3aab7270a0">
            <Navbar/>
            {children}
          </HypergraphSpaceProvider>
        </HypergraphAppProvider>
      </body>
    </html>
  );
}
