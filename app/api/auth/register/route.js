import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';
export const POST = async (req) => {
  try {
    await dbConnect();

    const body = await req.json();

    const user = await UserModel.create({
      ...body,
    });

    return NextResponse.json({
      ok: true,
      message: 'Account Created',
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed Account Creation',
    });
  }
};
