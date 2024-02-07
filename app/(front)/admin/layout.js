import { auth } from '@/auth';
import AdminSecMenu from '@/components/admin/AdminSecMenu';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const session = await auth();
  if (!session || session?.user?.role === 'user') redirect('/logon');
  return (
    <section className="lg:px-10 p-4 min-h-screen w-full relative">
      <AdminSecMenu />
      <div>{children}</div>
    </section>
  );
}
