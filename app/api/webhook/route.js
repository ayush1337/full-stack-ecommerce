import CartModel from '@/lib/models/CartModel';
import OrderModel from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const POST = async (req) => {
  const data = await req.text();

  const signature = req.headers.get('stripe-signature');
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      data,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const stripeSession = event.data.object;
    const customer = await stripe.customers.retrieve(stripeSession.customer);
    const { cartId, userId, type } = customer.metadata;

    if (type === 'checkout') {
      let cart = JSON.stringify(await CartModel.findById(cartId));
      cart = JSON.parse(cart);
      let cartItems = cart.products.map((singleProduct) => {
        const { product, size, quantity } = singleProduct;

        return {
          ...product,
          size,
          quantity,
        };
      });

      await OrderModel.create({
        userId,
        stripeCustomerId: stripeSession.customer,
        paymentIntent: stripeSession.payment_intent,
        totalAmount: stripeSession.amount_subtotal / 100,
        shippingDetails: {
          name: stripeSession.customer_details.name,
          email: stripeSession.customer_details.email,
          address: stripeSession.customer_details.address,
        },
        paymentStatus: stripeSession.payment_status,
        deliveryStatus: 'ordered',
        orderItems: cartItems,
      });
      //update the stock
      const updateStock = cartItems.map(async (product) => {
        const updateObj = {};
        updateObj[`stock.${product.size}`] = -product.quantity;
        return await ProductModel.findByIdAndUpdate(product._id, {
          $inc: updateObj,
        });
      });

      await Promise.all(updateStock);
      await CartModel.findByIdAndDelete(cartId);
    }
  }
  return NextResponse.json({});
};
