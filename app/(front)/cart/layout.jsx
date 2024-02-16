import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function CartLayout({ children }) {
  const session = await auth();
  if (!session) redirect('/logon');
  return <>{children}</>;
}
