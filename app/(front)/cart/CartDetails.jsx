'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CartDetails = () => {
  const cart = useSelector((state) => state.cart);
  const { cartID } = cart;
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let totalPrice = 0;
    cart.products.forEach((product) => {
      totalPrice = totalPrice + product.price * product.quantity;
    });
    setPrice(() => totalPrice);
  }, [cart]);
  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ cartID }),
      });
      const { error, url } = await res.json();
      if (!res.ok) {
        toast.error(error);
      } else {
        window.location.href = url;
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      {price > 0 && (
        <div className="w-full bg-white flex  items-center  fixed bottom-0 z-20 right-0 border-y border-black">
          <div className="ml-auto  p-2 flex flex-col tracking-wider">
            <div className="font-bold text-xs flex gap-2">
              TOTAL
              <span>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(price)}
              </span>
            </div>
            <span className="opacity-75 text-[0.6rem] md:text-xs">
              INCLUDING GST
            </span>
            <span className="opacity-75 text-[0.6rem] md:text-xs">
              * EXCL SHIPPING COST
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="p-8 bg-black text-white uppercase text-opacity-75"
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default CartDetails;
