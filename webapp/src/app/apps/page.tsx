import Link from "next/link";

export default function AppsList() {
  return (
    <>
      <div className="container is-max-desktop">
        <section className="section">
          List of your owned apps
          <div>
            <Link href={"/apps/example/users"}>Go to example app</Link>
          </div>
        </section>
        <section className="section">
          List of all apps
        </section>
      </div>
    </>
  );
}
