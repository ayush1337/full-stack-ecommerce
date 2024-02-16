'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { add, remove } from '@/lib/features/cartSlice';

import addIco from '@/assets/add.svg';
import subIco from '@/assets/sub.svg';
import { toast } from 'react-toastify';
import useAuth from '@/lib/hooks/useAuth';
import { createCart } from './actions';
import { useRouter } from 'next/navigation';

const AddToCart = ({ product, sizeBorder = false }) => {
  const [mount, setMount] = useState(false);
  const [selectSize, setSelectSize] = useState('');
  const [noSize, setNoSize] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [outOfStock, setOutOfStock] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { profile, loggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    setMount(() => true);
    let flag = true;
    Object.entries(product.stock).forEach(([key, value]) => {
      if (value > 0) {
        flag = false;
      }
    });

    if (!flag) setOutOfStock(() => false);
  }, []);

  useEffect(() => {
    let notFound = true;
    cart.products.forEach((cartProduct) => {
      if (cartProduct._id === product._id && cartProduct.size === selectSize) {
        setQuantity(() => cartProduct.quantity);
        notFound = false;
      }
    });
    if (notFound) setQuantity(() => 0);
  }, [selectSize, cart, product._id]);

  const handleProductIncrease = async () => {
    try {
      await createCart({
        userId: profile.id,
        product,
        size: selectSize,
        isPositive: true,
        product,
      });
      dispatch(add({ ...product, size: selectSize }));
    } catch (error) {
      toast.error('Failed to Add to cart');
    }
  };

  const handleProductDecrease = async () => {
    try {
      await createCart({
        userId: profile.id,
        product,
        size: selectSize,
        isPositive: false,
      });
      dispatch(remove({ _id: product._id, size: selectSize }));
    } catch (error) {
      toast.error('Failed to Add to cart');
    }
  };

  if (!mount) return <></>;
  return (
    <>
      <div
        className={`${
          sizeBorder ? 'border border-black border-b-0' : ''
        } p-6 flex flex-col gap-4`}
      >
        <div className="flex gap-4">
          <span
            className="w-[40px] h-[20px] border border-black"
            style={{
              background: `${product.color}`,
            }}
          ></span>
          <span className="text-xs">{` | (2110 / 775)`}</span>
        </div>

        {/* WRANING TEXT START */}

        {noSize && (
          <span className="text-xs flex gap-2">
            <span className="text-amber-400 font-normal">*WARNING</span>YOU MUST
            SELECT A SIZE & THEN ADD TO CART
          </span>
        )}

        {/* WRANING TEXT END */}

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(product.stock).map(([key, value]) => {
            if (value > 0) {
              return (
                <button
                  key={key}
                  className={`uppercase border border-black font-extralight p-2 hover:bg-gray-200 hover:text-black ${
                    selectSize === key
                      ? 'bg-black text-white font-normal hover:bg-black hover:text-white'
                      : 'bg-white'
                  }`}
                  onClick={() => {
                    setNoSize(() => false);
                    setSelectSize((p) => {
                      return p === key ? '' : key;
                    });
                  }}
                >
                  {key}
                </button>
              );
            }
          })}
          {outOfStock && (
            <div className="xl:text-base text-xs text-red-500">
              Product out of stock
            </div>
          )}
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      {quantity === 0 && (
        <button
          onClick={async () => {
            try {
              if (!loggedIn) router.push('/logon');
              if (selectSize === '') {
                setNoSize(() => true);
              }
              if (selectSize !== '') {
                await createCart({
                  userId: profile.id,
                  product,
                  size: selectSize,
                });
                dispatch(
                  add({
                    ...product,
                    quantity: 1,
                    size: selectSize,
                  })
                );
              }
            } catch (error) {
              toast.error('Failed to Add to cart');
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
