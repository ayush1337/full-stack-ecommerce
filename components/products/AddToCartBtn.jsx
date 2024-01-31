'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import add_to_cart_btn from '@/assets/add_to_cart_btn.svg';
import close_btn from '@/assets/close_btn.svg';

import AddToCart from './AddToCart';

const AddToCartBtn = ({ product }) => {
  const [mount, setMount] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setMount(() => true);
  }, []);

  if (!mount) return <></>;
  return (
    <>
      {active ? (
        <button
          onClick={() => {
            setActive((p) => !p);
          }}
          className="bg-gray-200 absolute left-1/2 bottom-0 opacity-65 -translate-y-1/2 -translate-x-1/2 rounded-full flex items-center justify-center p-1"
        >
          <Image
            src={add_to_cart_btn}
            width={12}
            height={12}
            alt="zara add to cart"
          ></Image>
        </button>
      ) : (
        <div className="bg-white absolute b-0 w-full p-6 bottom-0 border border-black flex flex-col gap-4">
          <button onClick={() => setActive(() => true)}>
            <Image
              src={close_btn}
              width={15}
              height={15}
              alt="close button"
              className="ml-auto border border-black rounded-full p-[2px]"
            ></Image>
          </button>

          <AddToCart product={product} />
        </div>
      )}
    </>
  );
};

export default AddToCartBtn;
