'use server';
import dbConnect from '@/lib/dbConnect';
import CartModel from '@/lib/models/CartModel';
import { isValidObjectId } from 'mongoose';

export const createCart = async ({
  userId,
  productId,
  size,
  isPositive,
  deleteItem,
}) => {
  try {
    await dbConnect();

    let cart = await CartModel.findOne({ userId });
    if (!cart) cart = await CartModel.create({ userId, products: [] });
    const existingProductIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId && product.size === size
    );
    if (existingProductIndex !== -1 && deleteItem) {
      cart.products.splice(existingProductIndex, 1);
      await cart.save();
      return JSON.stringify('Product Removed Sucessfully');
    }
    if (existingProductIndex !== -1) {
      // If the product already exists, increment its quantity
      if (isPositive) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products[existingProductIndex].quantity -= 1;
        if (cart.products[existingProductIndex].quantity === 0) {
          cart.products.splice(existingProductIndex, 1);
        }
      }
    } else {
      // If the product doesn't exist, add it to the cart
      cart.products.push({ productId, quantity: 1, size });
    }
    await cart.save();
    return JSON.stringify('Cart created Sucessfully');
  } catch (error) {
    console.log(error);
    return new Error('Something went wrong');
  }
};

export const getCart = async ({ userId }) => {
  try {
    await dbConnect();
    const cart = await CartModel.findOne({ userId }).populate(
      'products.productId'
    );
    return JSON.stringify(cart);
  } catch (error) {
    console.log(error);
    return new Error('Something went wrong');
  }
};
