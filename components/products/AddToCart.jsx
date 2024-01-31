'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, deleteItem } from '@/lib/features/cartSlice';
import addIco from '@/assets/add.svg';
import sub from '@/assets/sub.svg';

const AddToCart = ({ product }) => {
  const [mount, setMount] = useState(false);
  const [selectSize, setSelectSize] = useState('');
  const [noSize, setNoSize] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setMount(() => true);
  }, []);

  useEffect(() => {
    localStorage.setItem('zara-cart', JSON.stringify(cart));
  }, [cart]);

  if (!mount) return <></>;
  return (
    <>
      <div className="border-b border-black p-6 flex flex-col gap-4">
        <span className="text-xs">{`BLACK | (2110 / 775)`}</span>

        {/* WRANING TEXT START */}

        {noSize && (
          <span className="text-xs flex gap-2">
            <span className="text-amber-400 font-normal">*WARNING</span>YOU MUST
            SELECT A SIZE & THEN ADD TO CART
          </span>
        )}

        {/* WRANING TEXT END */}

        <div className="grid grid-cols-2 gap-4">
          {product?.sizes?.map((size) => {
            return (
              <button
                key={size}
                className={`uppercase border border-black font-extralight p-2 hover:bg-gray-200 ${
                  selectSize === size
                    ? 'bg-black text-white font-normal hover:bg-black hover:text-white'
                    : 'bg-white'
                }`}
                onClick={() => {
                  setNoSize(() => false);
                  setShowAddToCart(() => true);
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
      </div>

      {/* ADD TO CART BUTTON */}
      {showAddToCart && (
        <button
          onClick={() => {
            if (selectSize === '') {
              setNoSize(() => true);
            }
            if (selectSize !== '') {
              setShowAddToCart(() => false);
            }
          }}
          className={`py-4 uppercase flex items-center justify-center font-normal hover:text-gray-400  ${
            selectSize !== ''
              ? 'bg-black text-white font-normal hover:text-white'
              : 'bg-white'
          }`}
        >
          Add to cart
        </button>
      )}

      {/* ADD REMOVE CART BUTTONS */}

      {!showAddToCart && (
        <div className="w-full flex p-2 items-center justify-evenly gap-2">
          <button className=" border border-black rounded-full p-[6px]">
            <Image src={sub} alt="remove cart" width={15} height={15}></Image>
          </button>
          <span>0</span>
          <button className="border border-black rounded-full p-[6px]">
            <Image src={addIco} alt="add cart" width={15} height={15}></Image>
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
