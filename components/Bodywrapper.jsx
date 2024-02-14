'use client';

import { useSelector } from 'react-redux';

export default function Bodywrapper({ children }) {
  const { menuOpen } = useSelector((state) => state.menu);
  return (
    <div
      className={`${
        menuOpen && 'overflow-hidden'
      } w-full h-screen relative pt-64`}
    >
      {children}
    </div>
  );
}
