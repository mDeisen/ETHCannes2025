import Link from "next/link";

export default function CreateApp() {
  return (
    <>
      <div className="container is-max-desktop">
        <section className="section">
          Create a new app
          <div>
            <Link href={"/apps"}>Go back to apps list</Link>
          </div>
        </section>
      </div>
    </>
  );
}
