import AppsList from "@/components/appsList";
import { useHypergraphApp } from "@graphprotocol/hypergraph-react";
import Link from "next/link";

export default function Dashboard() {
  const { redirectToConnect } = useHypergraphApp();

  return (
    <>
      <section className="hero is-small is-primary">
        <div className="hero-body">
          <div className="title">
            I&#39;m Graph
          </div>
          <div className="subtitle">
            A graph-based tool for managing users and permissions for your dapp
          </div>
        </div>
        <div className="hero-footer">
          <button
            onClick={() => {
              redirectToConnect({
                storage: localStorage,
                connectUrl: "https://hypergraph-connect.vercel.app/",
                successUrl: `${window.location.origin}/authenticate-success`,
                appId: "93bb8907-085a-4a0xe-83dd-62b0dc98e793",
                redirectFn: (url: URL) => {
                  window.location.href = url.toString();
                },
              });
            }}
          >
            Login with GeoConnect
          </button>
        </div>
      </section>
      <div className="container is-max-desktop">
        <section className="section">
          <AppsList/>
          <div>
            <Link href={"/apps/example/users"}>Go to example app</Link>
          </div>
          <div>
            <Link href={"/apps"}>Explore apps</Link>
          </div>
        </section>
        <section className="section">
          <Link href={"/create-app"}>Create your first app</Link>
        </section>
      </div>
    </>
  );
}
