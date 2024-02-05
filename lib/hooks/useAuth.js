'use client';
import { useSession } from 'next-auth/react';

export default function useAuth() {
  const session = useSession();
  const user = session.data?.user;
  return {
    loading: session.status === 'loading',
    loggedIn: session.status === 'authenticated',
    isAdmin: user?.role === 'admin',
    profile: user,
  };
}
