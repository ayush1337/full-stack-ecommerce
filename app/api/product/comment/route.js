import { auth } from '@/auth';
import dbConnect from '@/lib/dbConnect';
import ReviewModel from '@/lib/models/ReviewModel';
import { isValidObjectId } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const productId = searchParams.get('productId');
    if (!isValidObjectId(productId))
      return NextResponse.json(
        {
          error: 'Invalid Data',
        },
        { status: 401 }
      );
    await dbConnect();
    const reviews = await ReviewModel.find({ productId }).sort('-createdAt');
    return NextResponse.json(reviews);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

export const POST = async (req) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.role)
      return NextResponse.json(
        {
          error: 'Unauthorized request',
        },
        { status: 401 }
      );
    const { productId, userId, comment, userName } = await req.json();
    if (!isValidObjectId(productId) || !isValidObjectId(userId))
      return NextResponse.json(
        {
          error: 'Invalid Data',
        },
        { status: 401 }
      );
    await dbConnect();
    await ReviewModel.create({
      productId,
      userId,
      comment,
      userName,
    });
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

export const DELETE = async (req) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.role)
      return NextResponse.json(
        {
          error: 'Unauthorized request',
        },
        { status: 401 }
      );
    const { commentId, userId } = await req.json();
    if (
      !isValidObjectId(commentId) ||
      !isValidObjectId(userId) ||
      userId !== session?.user?.id.toString()
    ) {
      return NextResponse.json(
        {
          error: 'Invalid Data',
        },
        { status: 401 }
      );
    }
    console.log('hi');
    await dbConnect();
    await ReviewModel.findByIdAndDelete(commentId);
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
