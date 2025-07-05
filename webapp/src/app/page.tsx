import Link from "next/link";

export default function Dashboard() {
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
      </section>
      <div className="container is-max-desktop">
        <section className="section">
          List of your apps and roles
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
