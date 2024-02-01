import React from 'react';
import CartProducts from './CartProducts';
import CartDetails from './CartDetails';

const CartPage = () => {
  return (
    <div className="w-screen min-h-screen grid grid-cols-4 gap-2 lg:px-36 px-8 overflow-x-hidden">
      <CartProducts />
      <CartDetails />
    </div>
  );
};

export default CartPage;
