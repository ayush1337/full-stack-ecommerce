'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import zara_logo from '@/assets/zara_logo.svg';
import menu from '@/assets/menu.svg';
import close_btn from '@/assets/close_btn.svg';
import cartIco from '@/assets/cart_ico.svg';
import useAuth from '@/lib/hooks/useAuth';
import Spinner from '../Spinner';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const cart = useSelector((state) => state.cart);
  const { loading, loggedIn, isAdmin, profile } = useAuth();

  useEffect(() => {
    let total = 0;
    cart.products.forEach((product) => {
      total += product.quantity;
    });
    setTotalProducts(() => total);
  }, [cart]);

  return (
    <>
      {/* {!isAdmin ? (
      <></>
      ) : (
        <></>
      )} */}

      <header className="w-screen md:p-8 p-4 font-light sticky top-0 z-10 tracking-wide">
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
            <Link href="/" className="hidden md:block">
              <Image
                src={zara_logo}
                width={350}
                height={350}
                priority={true}
                alt="zara logo"
              ></Image>
            </Link>
            <Link href="/" className="md:hidden">
              <Image
                src={zara_logo}
                width={100}
                height={100}
                priority={true}
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
          <ul className="flex uppercase gap-5 text-sm items-start relative">
            {loading ? (
              <li>
                <Spinner />
              </li>
            ) : !loggedIn ? (
              <li>
                <Link href="/logon">Log in</Link>
              </li>
            ) : (
              <li className="uppercase">
                <Link href="/user/order">Ayush Kumar</Link>
              </li>
            )}

            <li className="hidden lg:block">Help</li>
            <li>
              <Link href="/cart">
                <Image
                  src={cartIco}
                  width={40}
                  height={25}
                  alt="shopping cart"
                ></Image>
                <div className="bg-[#ffe800] rounded-full top-0 right-0 absolute h-5 w-5 flex justify-center items-center font-normal text-xs">
                  {totalProducts}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
