import Link from "next/link";
import AppsListComponent from "@/components/appsList";
import MyAppsList from "@/components/myAppsList";

export default function AppsList() {
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
