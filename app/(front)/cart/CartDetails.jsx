'use client';

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
    <>
      <h1>Shopping Cart</h1>
      {cart.products.length === 0 ? (
        <div>
          Cart is Empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
