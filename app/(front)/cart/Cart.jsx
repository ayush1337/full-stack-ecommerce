'use client';
import CartProducts from './CartProducts';
import CartDetails from './CartDetails';
import InitializeCartState from '@/components/InitializeCartState';
const CartPage = () => {
  return (
    <div className="w-screen min-h-screen grid grid-cols-4 gap-2 lg:px-36 px-8 pb-24 overflow-x-hidden ">
      <InitializeCartState />
      <CartProducts />
      <CartDetails />
    </div>
  );
};

export default CartPage;
