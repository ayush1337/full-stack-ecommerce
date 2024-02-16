'use server';
import dbConnect from '@/lib/dbConnect';
import CartModel from '@/lib/models/CartModel';

export const createCart = async ({
  userId,
  product,
  size,
  isPositive,
  deleteItem,
}) => {
  try {
    await dbConnect();
    //find the cart
    let cart = await CartModel.findOne({ userId });

    //if cart is null then create a cart
    if (!cart) cart = await CartModel.create({ userId, products: [] });

    //check product exists
    const existingProductIndex = cart.products.findIndex(
      (cartProduct) =>
        cartProduct.product._id.toString() === product._id &&
        cartProduct.size === size
    );

    //if you want to delete
    if (existingProductIndex !== -1 && deleteItem) {
      cart.products.splice(existingProductIndex, 1);
      await cart.save();
      return JSON.stringify('Product Removed Sucessfully');
    }

    if (existingProductIndex !== -1) {
      // If the product already exists, increment its quantity
      if (isPositive) {
        const currentQuantity = cart.products[existingProductIndex].quantity;
        if (currentQuantity < product.stock[size])
          cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products[existingProductIndex].quantity -= 1;
        if (cart.products[existingProductIndex].quantity === 0) {
          cart.products.splice(existingProductIndex, 1);
        }
      }
    } else {
      // If the product doesn't exist, add it to the cart
      cart.products.push({ product, quantity: 1, size });
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
    const cart = await CartModel.findOne({ userId });
    return JSON.stringify(cart);
  } catch (error) {
    console.log(error);
    return new Error('Something went wrong');
  }
};
