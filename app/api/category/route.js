import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/lib/models/CategoryModel';
import { NextResponse } from 'next/server';
export const GET = async (req) => {
  try {
    await dbConnect();

    const category = await CategoryModel.find({});
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(category);
  }
};
