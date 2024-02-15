import EmailVerificationToken from '@/lib/models/emailVerificationToken';
import UserModel from '@/lib/models/UserModel';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dbConnect from '@/lib/dbConnect';

export const POST = async (req) => {
  try {
    const { token, userId } = await req.json();

    if (!isValidObjectId(userId) || !token) {
      return NextResponse.json(
        { error: 'User ID or Token is invalid' },
        { status: 401 }
      );
    }

    const verifyToken = await EmailVerificationToken.findOne({ user: userId });
    if (!verifyToken) {
      return NextResponse.json({ error: 'Invalid token!' }, { status: 401 });
    }

    const isMatched = await verifyToken.compareToken(token);
    if (!isMatched) {
      return NextResponse.json(
        { error: "Invalid token, token doesn't match!" },
        { status: 401 }
      );
    }

    await UserModel.findByIdAndUpdate(userId, { verified: true });
    await EmailVerificationToken.findByIdAndDelete(verifyToken._id);

    return NextResponse.json({ message: 'Your email is verified.' });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'could not verify email, something went wrong!',
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const userId = req.url.split('?userId=')[1];
    if (!isValidObjectId(userId))
      return NextResponse.json(
        { error: 'Invalid request, user id missing!' },
        { status: 401 }
      );

    await dbConnect();

    const user = await UserModel.findById(userId);

    if (!user)
      return NextResponse.json(
        { error: 'Invalid request, user not found!' },
        { status: 401 }
      );

    if (user.verified)
      return NextResponse.json(
        { error: 'Invalid request, user already verified!' },
        { status: 401 }
      );
    const token = crypto.randomBytes(36).toString('hex');

    await EmailVerificationToken.findOneAndDelete({ user: userId });
    await EmailVerificationToken.create({
      user: userId,
      token,
    });

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '282804922bc239',
        pass: '252b5c13fdbd17',
      },
    });

    await transport.sendMail({
      from: 'verification@zaraecom.com',
      to: user.email,
      html: `<h1>Please verify your email by clicking on <a href="http://localhost:3000/verify?token=${token}&userId=${user._id}">this link</a></h1>
    `,
    });

    return NextResponse.json({ message: 'Please check your email.' });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'could not verify email, something went wrong!',
      },
      { status: 500 }
    );
  }
};
