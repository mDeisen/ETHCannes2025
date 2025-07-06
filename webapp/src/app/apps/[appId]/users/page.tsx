"use client"
import GroupsList from "./groupsList";
import { useParams } from "next/navigation";

export default function AppUsers() {
  const { appId } = useParams();

  if ( typeof appId != "string" ) {
    return "Error";
  }

  const users: User[] = [
    {
      name: "steffan",
      address: "0x1234567890",
    },
    {
      name: "mattis",
      address: "0x1234567890",
    },
    {
      name: "max",
      address: "0x1234567890",
    },
  ]

  return (
    <>
      <div className="container is-max-desktop">
        <section className="section">
          <h4 className="is-size-4">Users</h4>
          <div>
            {users.map((user) => (
              <div key={user.name}>{user.name} with address {user.address}</div>
            ))}
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
