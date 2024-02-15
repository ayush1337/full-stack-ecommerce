import { auth } from '@/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import { isValidObjectId } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (user?.role !== 'admin')
      return NextResponse.json(
        {
          error: 'Unauthorized request',
        },
        { status: 401 }
      );
    const { orderId, deliveryStatus } = await req.json();
    if (!isValidObjectId(orderId))
      return NextResponse.json(
        {
          error: 'Invalid Data',
        },
        { status: 401 }
      );
    await dbConnect();
    await OrderModel.findByIdAndUpdate(orderId, {
      deliveryStatus,
    });
    revalidatePath('/admin');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
