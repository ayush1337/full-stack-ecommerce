import React from 'react';
import CartDetails from './CartDetails';

const CartPage = () => {
  return (
    <div className="w-screen grid grid-cols-4 lg:px-36 px-8 overflow-x-hidden">
      <CartDetails />
      <div></div>
    </div>
  );
};

export default CartPage;
