'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import zara_logo from '@/assets/zara_logo.svg';
import menu from '@/assets/menu.svg';
import close_btn from '@/assets/close_btn.svg';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  return (
    <header className="w-screen p-8 font-light">
      <nav className="w-full flex justify-between">
        <div>
          {toggleMenu ? (
            <button onClick={() => setToggleMenu((p) => !p)}>
              <Image src={menu} width={25} height={25}></Image>
            </button>
          ) : (
            <button onClick={() => setToggleMenu((p) => !p)}>
              <Image src={close_btn} width={25} height={25}></Image>
            </button>
          )}
        </div>
        <div>
          <Link href="/">
            <Image src={zara_logo} width={350} height={350}></Image>
          </Link>
        </div>
        <Link href="/">
          <div className="bg-white border border-black h-6 min-w-[300px] flex items-center p-4">
            <div className="flex-grow"></div>
            <div className="ml-auto uppercase">Search</div>
          </div>
        </Link>
        <ul className="flex uppercase gap-5">
          <li>Log in</li>
          <li>Help</li>
          <li>Shopping Bag(0)</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
