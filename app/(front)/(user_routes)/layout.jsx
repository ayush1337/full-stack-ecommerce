import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function UserLayout({ children }) {
  const session = await auth();
  if (!session) redirect('/logon');
  return (
    <section className="lg:px-24 p-4 min-h-screen">
      <div>{children}</div>
    </section>
  );
}
