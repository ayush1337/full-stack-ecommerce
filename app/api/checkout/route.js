import { auth } from '@/auth';
import CartModel from '@/lib/models/CartModel';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const POST = async (req) => {
  try {
    const session = await auth();
    if (!session?.user)
      return NextResponse.json(
        {
          error: 'Unauthorized request!',
        },
        { status: 401 }
      );
    const data = await req.json();
    const cartID = data.cartID;
    if (!isValidObjectId(cartID))
      return NextResponse.json(
        {
          error: 'Invalid cart ID!',
        },
        { status: 401 }
      );
    let cart = JSON.stringify(await CartModel.findById(cartID));
    cart = JSON.parse(cart);
    if (!cart)
      return NextResponse.json(
        {
          error: 'Cart Not Found!',
        },
        { status: 401 }
      );
    const cartItems = cart.products.map((singleProduct) => {
      const { product, size, quantity } = singleProduct;
      return {
        ...product,
        size,
        quantity,
      };
    });
    const line_items = cartItems.map((product) => {
      return {
        price_data: {
          currency: 'INR',
          unit_amount: Number(product.price) * 100,
          product_data: {
            name: product.productName,
            images: [product.image],
          },
        },
        quantity: product.quantity,
      };
    });

    const customer = await stripe.customers.create({
      metadata: {
        userId: session.user.id,
        cartId: cartID,
        type: 'checkout',
      },
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: process.env.PAYMENT_SUCCESS_URL,
      cancel_url: process.env.PAYMENT_CANCEL_URL,
      shipping_address_collection: { allowed_countries: ['IN'] },
      customer: customer.id,
    });

    return NextResponse.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
};
