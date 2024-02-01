'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { add, remove, deleteItem, empty } from '@/lib/features/cartSlice';

import addIco from '@/assets/add.svg';
import subIco from '@/assets/sub.svg';
import trashIco from '@/assets/dustbin.svg';

const CartItem = ({ product }) => {
  const [mount, setMount] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setMount(() => true);
  }, []);

  useEffect(() => {
    cart.products.forEach((cartProduct) => {
      if (cartProduct.id === product.id && cartProduct.size === product.size) {
        setQuantity(() => cartProduct.quantity);
      }
    });
  }, [cart]);

  const handleProductIncrease = () => {
    dispatch(add({ ...product, size: product.size }));
  };

  const handleProductDecrease = () => {
    dispatch(remove({ id: product.id, size: product.size }));
  };

  const handleProductDelete = () => {
    dispatch(deleteItem({ id: product.id, size: product.size }));
  };

  if (!mount) return <></>;
  return (
    <div className="flex flex-col relative">
      <button
        className="bg-white bg-opacity-50 opacity-80 p-2 rounded-full  absolute right-2 top-2"
        onClick={handleProductDelete}
      >
        <Image
          src={trashIco}
          width={15}
          height={15}
          alt="delete product"
        ></Image>
      </button>
      <figure className="border border-black">
        <Link href={`/product/${product.slug}/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={100}
            priority={true}
            className="object-cover object-center w-full"
          ></Image>
        </Link>
        {/* <AddToCartBtn product={product} /> */}
      </figure>
      <div className="font-extralight text-xs flex flex-col gap-1 border border-black border-t-0 p-2">
        <div className="flex justify-between  items-center">
          <Link href={`/product/${product.slug}/${product.id}`}>
            <h2 className="hover:underline font-normal max-w-[100px] truncate">
              {product.name}
            </h2>
          </Link>
          <span>BLACK | (2110 / 775)</span>
        </div>
        <div className="flex justify-between  items-center">
          <span className="text-xs">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(product.price)}
          </span>
          <span className="uppercase">Size: {product.size}</span>
        </div>
      </div>
      <div className="w-full border border-black border-t-0 p-2 flex justify-center items-center">
        <div className="border border-black flex  justify-center">
          <button
            onClick={handleProductDecrease}
            className=" border border-black border-y-0 border-l-0 p-[6px]"
          >
            <Image
              src={subIco}
              alt="remove cart"
              width={12}
              height={12}
            ></Image>
          </button>
          <span className="p-[6px] text-xs">{quantity}</span>
          <button
            onClick={handleProductIncrease}
            className="border border-black border-y-0 border-r-0 p-[6px]"
          >
            <Image src={addIco} alt="add cart" width={12} height={12}></Image>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;