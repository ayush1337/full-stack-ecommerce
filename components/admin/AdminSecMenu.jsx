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
      label: 'sales',
      icon: <AiOutlineThunderbolt />,
    },
    {
      label: 'orders',
      icon: <MdAttachMoney />,
    },
  ];
  return (
    <div className="fixed w-full px-8 flex justify-center items-center left-1/2 -translate-x-1/2 gap-10 bottom-0  lg:w-fit lg:bottom-8  bg-white py-4 lg:rounded-full shadow-md lg:drop-shadow-2xl z-10">
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
            <span className="hidden lg:inline-block">{item.label}</span>
            {currentTab === item.label && <span>•</span>}
          </button>
        );
      })}
    </div>
  );
};

export default AdminSecMenu;
