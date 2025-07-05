"use client"
import Link from "next/link";
import AppsListComponent from "@/components/appsList";
import MyAppsList from "@/components/myAppsList";
import { useHypergraphAuth } from "@graphprotocol/hypergraph-react";
import { useEffect } from "react";

export default function AppsList() {
  const { authenticated, identity } = useHypergraphAuth();

  useEffect(() => {
    console.log(`Authenticated? ${authenticated}`);
    if (identity) {
      console.table(identity);
    }
  })

  return (
    <>
      <div className="container is-max-desktop">
        <section className="section">
            List of your owned apps
            <MyAppsList/>
          <div>
            <Link href={"/apps/example/users"}>Go to example app</Link>
          </div>
        </section>
        <section className="section">
          <AppsListComponent/>
        </section>
      </div>
    </>
  );
}
