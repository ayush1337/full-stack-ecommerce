import { auth } from '@/auth';
import dbConnect from '@/lib/dbConnect';
import CartModel from '@/lib/models/CartModel';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    await dbConnect();
    const session = await auth();

    if (!session?.user)
      return NextResponse.json(
        {
          error: 'Unauthorized request!',
        },
        { status: 401 }
      );

    let cart = await CartModel.findOne({ userId: session?.user?.id });
    if (!cart)
      return NextResponse.json(
        {
          error: 'Cart Not Found!',
        },
        { status: 401 }
      );

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
};
