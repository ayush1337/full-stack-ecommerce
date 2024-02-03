'use client';
import SignOutButton from '@/components/auth/SignOutButton';
import UserMenu from '@/components/user/UserMenu';

const UserProfile = () => {
  return (
    <div className="flex flex-col gap-8 items-start">
      <UserMenu active="profile" />
      <SignOutButton>
        <div className="underline tracking-tight opacity-65 hover:opacity-100 text-sm">
          Sign Out
        </div>
      </SignOutButton>
    </div>
  );
};

export default UserProfile;
