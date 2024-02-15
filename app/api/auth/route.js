import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const body = await req.json();
  await dbConnect();

  const user = await UserModel.create({
    ...body,
  });

  return NextResponse.json({
    ok: true,
    message: 'Please check your email & verify your account.',
  });
};
