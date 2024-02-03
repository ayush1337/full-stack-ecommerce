export default function UserLayout({ children }) {
  return (
    <section className="lg:px-24 p-4 min-h-screen">
      <div>{children}</div>
    </section>
  );
}
