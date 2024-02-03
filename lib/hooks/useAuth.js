import { useSession } from 'next-auth/react';

export default function useAuth() {
  const session = useSession();
  return {
    loading: session.status === 'loading',
    loggedIn: session.status === 'authenticated',
    isAdmin: false,
  };
}
