'use client';

import { usePathname } from 'next/navigation';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const AdminSecMenu = () => {
  const pathName = usePathname();
  const router = useRouter();

  const currentTab = pathName.split('/')[2];
  const menuItems = [
    {
      label: 'dashboard',
      icon: <RxDashboard />,
    },
    {
      label: 'products',
      icon: <BsCart2 />,
    },
    ,
    {
      label: 'featured',
    },
    {
      label: 'sales',
      icon: <AiOutlineThunderbolt />,
    },
    {
      label: 'orders',
      icon: <MdAttachMoney />,
    },
  ];
  return (
    <div className="fixed flex gap-10 bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-full shadow-md">
      {menuItems.map((item) => {
        return (
          <button
            key={item.label}
            className={`flex gap-2 items-center capitalize ${
              currentTab === item.label &&
              ' bg-gray-100 bg-opacity-75 px-4 py-2 rounded-full'
            }`}
            onClick={() => {
              router.push(`/admin/${item.label}`);
            }}
          >
            <span>{item?.icon}</span>
            <span>{item.label}</span>
            {currentTab === item.label && <span>•</span>}
          </button>
        );
      })}
    </div>
  );
};

export default AdminSecMenu;
