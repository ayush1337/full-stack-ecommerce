'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { add, remove } from '@/lib/features/cartSlice';

import addIco from '@/assets/add.svg';
import subIco from '@/assets/sub.svg';

const AddToCart = ({ product, sizeBorder = false }) => {
  const [mount, setMount] = useState(false);
  const [selectSize, setSelectSize] = useState('');
  const [noSize, setNoSize] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setMount(() => true);
  }, []);

  useEffect(() => {
    let notFound = true;
    cart.products.forEach((cartProduct) => {
      if (cartProduct.id === product.id && cartProduct.size === selectSize) {
        setQuantity(() => cartProduct.quantity);
        notFound = false;
      }
    });
    if (notFound) setQuantity(() => 0);
  }, [selectSize, cart]);

  const handleProductIncrease = () => {
    dispatch(add({ ...product, size: selectSize }));
  };

  const handleProductDecrease = () => {
    dispatch(remove({ id: product.id, size: selectSize }));
  };

  if (!mount) return <></>;
  return (
    <>
      <div
        className={`${
          sizeBorder ? 'border border-black border-b-0' : ''
        } p-6 flex flex-col gap-4`}
      >
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
                className={`uppercase border border-black font-extralight p-2 hover:bg-gray-200 hover:text-black ${
                  selectSize === size
                    ? 'bg-black text-white font-normal hover:bg-black hover:text-white'
                    : 'bg-white'
                }`}
                onClick={() => {
                  setNoSize(() => false);
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
      {quantity === 0 && (
        <button
          onClick={() => {
            if (selectSize === '') {
              setNoSize(() => true);
            }
            if (selectSize !== '') {
              dispatch(
                add({
                  ...product,
                  quantity: 1,
                  size: selectSize,
                })
              );
            }
          }}
          className={`py-4 border border-black uppercase flex items-center justify-center font-normal hover:text-gray-400  ${
            selectSize !== ''
              ? 'bg-black text-white font-normal hover:text-white'
              : 'bg-white'
          }`}
        >
          Add to cart
        </button>
      )}

      {/* ADD REMOVE CART BUTTONS */}

      {quantity > 0 && (
        <div
          className={`${
            sizeBorder ? 'border border-black p-4' : ''
          } w-full flex  items-center justify-evenly gap-2`}
        >
          <button
            onClick={handleProductDecrease}
            className=" border border-black rounded-full p-[6px]"
          >
            <Image
              src={subIco}
              alt="remove cart"
              width={15}
              height={15}
            ></Image>
          </button>
          <span>{quantity}</span>
          <button
            onClick={handleProductIncrease}
            className="border border-black rounded-full p-[6px]"
          >
            <Image src={addIco} alt="add cart" width={15} height={15}></Image>
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCart;
