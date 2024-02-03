import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';
import EmailVerificationToken from '@/lib/models/emailVerificationToken';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
export const POST = async (req) => {
  const body = await req.json();
  await dbConnect();

  const user = await UserModel.create({
    ...body,
  });

  const token = crypto.randomBytes(36).toString('hex');
  await EmailVerificationToken.create({
    user: user._id,
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

  return NextResponse.json({
    ok: true,
    message: 'Please check your email & verify your account.',
  });
};
