'use client';
import { useRouter } from 'next/navigation';

const UserMenu = ({ active }) => {
  const router = useRouter();
  return (
    <ul className="flex gap-10 uppercase ">
      <li
        className={`border border-black px-4 py-1 ${
          active === 'order' && 'font-semibold'
        }`}
      >
        <button onClick={() => router.push('/user/order')}>Purchases</button>
      </li>
      <li
        className={`border border-black px-4 py-1 ${
          active === 'profile' && 'font-semibold'
        }`}
      >
        <button onClick={() => router.push('/user/profile')}>Profile</button>
      </li>
    </ul>
  );
};

export default UserMenu;
