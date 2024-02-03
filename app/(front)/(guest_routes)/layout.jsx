import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function GuestLayout({ children }) {
  const session = await auth();
  if (session) redirect('/');
  return <div>{children}</div>;
}
