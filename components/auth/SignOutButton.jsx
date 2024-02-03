import { signOut } from 'next-auth/react';

const SignOutButton = ({ children }) => {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
    >
      {children}
    </button>
  );
};

export default SignOutButton;
