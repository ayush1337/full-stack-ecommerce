'use server';

import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/lib/models/CategoryModel';

export const getCategories = async () => {
  try {
    await dbConnect();
    const categories = await CategoryModel.find();
    return JSON.stringify(categories);
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong, cannot create category!');
  }
};
