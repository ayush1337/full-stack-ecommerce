'use client';
import { useState } from 'react';
import Image from 'next/image';

import add_to_cart_btn from '@/assets/add_to_cart_btn.svg';
import close_btn from '@/assets/close_btn.svg';
import add from '@/assets/add.svg';
import sub from '@/assets/sub.svg';

const AddToCartBtn = ({ product }) => {
  const [active, setActive] = useState(true);
  const [selectSize, setSelectSize] = useState('');
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
          <div className="grid grid-cols-2 gap-4">
            {product?.sizes?.map((size) => {
              return (
                <button
                  key={size}
                  className={`uppercase border border-black font-extralight p-2 hover:bg-gray-200 ${
                    selectSize === size ? 'bg-gray-200' : 'bg-white'
                  }`}
                  onClick={() => {
                    setSelectSize((p) => {
                      return p === size ? '' : size;
                    });
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {selectSize && (
            <div className="w-full flex p-2 items-center justify-evenly gap-2">
              <button className=" border border-black rounded-full p-[6px]">
                <Image
                  src={sub}
                  alt="remove cart"
                  width={15}
                  height={15}
                ></Image>
              </button>
              <span>0</span>
              <button className="border border-black rounded-full p-[6px]">
                <Image src={add} alt="add cart" width={15} height={15}></Image>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddToCartBtn;
