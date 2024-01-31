'use client';

import CartItem from '@/components/products/CartItem';
import ProductItem from '@/components/products/ProductItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CartDetails() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  return (
    <div className="flex flex-wrap items-center justify-center flex-col gap-8 col-span-4 lg:col-span-3">
      <h1 className="uppercase font-semibold">
        Shopping Bag ({cart.products.length})
      </h1>
      {cart.products.length === 0 ? (
        <div>
          Cart is Empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-start gap-6 w-full">
          {cart.products.map((product) => {
            return <CartItem key={product.slug} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}
