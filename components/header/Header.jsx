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
    <header className="w-screen md:p-8 p-4 font-light sticky top-0 z-10 tracking-wide ">
      <nav className="w-full flex gap-2 justify-between">
        <div>
          {toggleMenu ? (
            <button onClick={() => setToggleMenu((p) => !p)}>
              <Image
                alt="open button"
                src={menu}
                width={25}
                height={25}
              ></Image>
            </button>
          ) : (
            <button onClick={() => setToggleMenu((p) => !p)}>
              <Image
                alt="close button"
                src={close_btn}
                width={25}
                height={25}
              ></Image>
            </button>
          )}
        </div>
        <div>
          <Link href="/">
            <Image
              src={zara_logo}
              width={350}
              height={350}
              className="hidden md:block "
              alt="zara logo"
            ></Image>
            <Image
              src={zara_logo}
              width={100}
              height={100}
              className="md:hidden "
              alt="zara logo"
            ></Image>
          </Link>
        </div>
        <Link href="/">
          <div className="bg-white border border-black h-6 min-w-[300px] md:flex items-center p-4 hidden">
            <div className="flex-grow"></div>
            <div className="ml-auto uppercase">Search</div>
          </div>
        </Link>
        <ul className="flex uppercase gap-5 text-xs">
          <li>Log in</li>
          <li className="hidden lg:block">Help</li>
          <li>Shopping Bag(0)</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
