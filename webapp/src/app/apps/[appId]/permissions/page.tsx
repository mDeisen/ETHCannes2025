"use client"
import { useParams } from "next/navigation";
import PermissionsList from "./permissionsList";

export default function AppPermissions() {
  const { appId } = useParams();

  if ( typeof appId != "string" ) {
    return "Error";
  }

  return (
    <>
      <div className="container is-max-desktop">
        <section className="section">
          <h4 className="is-size-4">Permissions</h4>
          <PermissionsList domain={appId}/>
        </section>
        <section className="section">
          <h4 className="is-size-4">Roles</h4>
          <div>Compose roles to assign multiple permissions at once. Coming soon!</div>
        </section>
      </div>
    </>
  );
}
