'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu } from '@/lib/features/menuSlice';
import zara_logo from '@/assets/zara_logo.svg';
import menu from '@/assets/menu.svg';
import close_btn from '@/assets/close_btn.svg';
import cartIco from '@/assets/cart_ico.svg';
import useAuth from '@/lib/hooks/useAuth';
import Spinner from '../Spinner';
import OutsideClickHandler from '../OutsideClickHandler';

const Header = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { menuOpen } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const { loading, loggedIn, isAdmin, profile } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch('/api/category');
        res = await res.json();
        setCategories(() => res);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    let total = 0;
    cart.products.forEach((product) => {
      total += product.quantity;
    });
    setTotalProducts(() => total);
  }, [cart]);

  return (
    <>
      <header
        className={` md:p-8 p-4 font-light fixed  top-0 z-10 tracking-wide bg-white bg-opacity-85 w-full`}
      >
        <nav className="w-full flex gap-2 justify-between">
          <div>
            <button
              onClick={() => {
                dispatch(toggleMenu(true));
              }}
              className={`${!menuOpen ? 'inline-block' : 'hidden'}`}
            >
              <Image
                alt="open button"
                src={menu}
                width={25}
                height={25}
              ></Image>
            </button>
            <button
              onClick={() => {
                dispatch(toggleMenu(false));
              }}
              className={`${menuOpen ? 'inline-block' : 'hidden'}`}
            >
              <Image
                alt="close button"
                src={close_btn}
                width={25}
                height={25}
              ></Image>
            </button>
          </div>
          <div className="lg:relative flex flex-col items-center lg:w-[500px] p-4">
            <>
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
            </>
            <OutsideClickHandler
              outsideClickHandler={() => {
                dispatch(toggleMenu(false));
              }}
            >
              <div
                className={`${
                  !menuOpen && 'hidden'
                } absolute top-0 left-0 -z-10 h-screen lg:h-fit pt-64  w-full pb-64 bg-white border border-black flex flex-col items-center gap-6 `}
              >
                <Link
                  href="/search"
                  onClick={() => {
                    if (menuOpen) {
                      dispatch(toggleMenu(false));
                    }
                  }}
                >
                  <div className="bg-white border border-black h-6 min-w-[250px] flex lg:hidden items-center p-4 ">
                    <div className="flex-grow"></div>
                    <div className="ml-auto uppercase">Search</div>
                  </div>
                </Link>

                <h1 className="uppercase font-extralight text-xl">
                  Categories
                </h1>
                <div className="flex flex-wrap gap-4 overflow-y-scroll py-32 px-6">
                  {categories.map((category) => {
                    return (
                      <Link
                        href={`/category/${category.categoryName}/${category._id}`}
                        key={category._id}
                        className="uppercase border border-black px-2"
                        onClick={() => {
                          if (menuOpen) {
                            dispatch(toggleMenu(false));
                          }
                        }}
                      >
                        {category.categoryName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </OutsideClickHandler>
          </div>
          <Link href="/search">
            <div className="bg-white border border-black h-6 min-w-[300px] lg:flex items-center p-4 hidden">
              <div className="flex-grow"></div>
              <div className="ml-auto uppercase">Search</div>
            </div>
          </Link>
          <ul className="flex uppercase gap-6 md:text-sm text-xs items-start relative">
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
                <Link href="/user/order">{profile.name}</Link>
              </li>
            )}
            {isAdmin && (
              <li className="">
                <Link href="/admin/dashboard">Dashboard</Link>
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
                  className="hidden md:inline-block"
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
