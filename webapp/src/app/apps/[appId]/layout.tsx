
export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <div className="container is-max-desktop">
        <section className="section">
          Navlinks to Users and Permissions
        </section>
      </div>
      <div>
        {children}
      </div>
    </>
  );
}
