'use client';
import { SessionProvider } from 'next-auth/react';

const AuthSession = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSession;
