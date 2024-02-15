'use client';
import SignOutButton from '@/components/auth/SignOutButton';
import UserMenu from '@/components/user/UserMenu';
import useAuth from '@/lib/hooks/useAuth';

const UserProfile = () => {
  const { profile } = useAuth();
  return (
    <div className="flex flex-col gap-8 items-start">
      <UserMenu active="profile" />
      <span className="capitalize">Name: {profile?.name}</span>
      <SignOutButton>
        <div className="underline tracking-tight opacity-65 hover:opacity-100 text-sm">
          Sign Out
        </div>
      </SignOutButton>
    </div>
  );
};

export default UserProfile;
