"use client"
import Navlink from "@/components/Navlink";
import { useParams } from "next/navigation";

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { appId } = useParams();

  return (
    <>
     <div className="container is-max-desktop">
        <section className="section">
          <Navlink href={`/apps/${appId}/permissions`}>Permissions</Navlink> | <Navlink href={`/apps/${appId}/users`}>Users</Navlink> 
        </section>
      </div>
      <div>
        {children}
      </div>
    </>
  );
}
