'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CartItem from '@/components/products/CartItem';
import Image from 'next/image';

import cartEmpty from '@/assets/empty_cart.svg';

export default function CartProducts() {
  const [mounted, setMounted] = useState(false);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  return (
    <div className="flex flex-col items-center  gap-8 col-span-4">
      <h1 className="uppercase font-semibold">
        Shopping Bag ({cart.products.length})
      </h1>
      {cart.products.length === 0 ? (
        <>
          <Image
            src={cartEmpty}
            width={500}
            height={500}
            alt="empty shopping cart"
            priority={true}
          ></Image>
          <div className="flex items-center gap-4 text-xs md:text-sm ">
            {'Cart is Empty :( '}
            <Link href="/" className="bg-black text-white px-4 py-2">
              Go shopping
            </Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 place-items-center gap-6 w-full">
          {cart.products.map((product) => {
            return (
              <CartItem key={product._id + product.size} product={product} />
            );
          })}
        </div>
      )}
    </div>
  );
}
