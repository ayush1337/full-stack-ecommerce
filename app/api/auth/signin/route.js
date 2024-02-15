import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  await dbConnect();
  const { email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({
      error: 'Invalid request, email or password is missing!',
    });

  const user = await UserModel.findOne({ email });
  if (!user)
    return NextResponse.json({
      error: 'Email or Password mismatch',
    });
  const checkPassword = await user.comparePassword(password);
  if (!checkPassword)
    return NextResponse.json({
      error: 'Email or Password mismatch',
    });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      verified: user.verified,
    },
  });
};
