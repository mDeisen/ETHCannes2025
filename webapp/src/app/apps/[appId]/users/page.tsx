"use client"
import GroupsList from "./groupsList";
import { useParams } from "next/navigation";

export default function AppUsers() {
  const { appId } = useParams();

  if ( typeof appId != "string" ) {
    return "Error";
  }

  return (
    <>
      <div className="container is-max-desktop">
        <section className="section">
          <h4 className="is-size-4">Users</h4>
          <div>
            This app has 12 user.
          </div>
        </section>
        <section className="section">
          <h4 className="is-size-4">Groups</h4>
          <GroupsList appId={appId}/>
        </section>
      </div>
    </>
  );
}
