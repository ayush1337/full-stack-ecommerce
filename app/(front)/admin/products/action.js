'use server';

import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/lib/models/CategoryModel';
import ProductModel from '@/lib/models/ProductModel';
import { revalidatePath } from 'next/cache';
import { isValidObjectId } from 'mongoose';
export const createCategory = async (category) => {
  try {
    await dbConnect();
    await CategoryModel.create({
      ...category,
    });
    revalidatePath('/admin');
  } catch (error) {
    throw new Error('Something went wrong, can not create category!');
  }
};

export const getAllCategory = async (inputValue) => {
  try {
    await dbConnect();
    const categories = await CategoryModel.find({
      categoryName: { $regex: inputValue, $options: 'i' },
    });
    return JSON.stringify(categories);
  } catch (error) {
    throw new Error('Something went wrong, cannot create category!');
  }
};

export const createProduct = async (product) => {
  try {
    await dbConnect();
    await ProductModel.create({
      ...product,
    });
    revalidatePath('/admin');
    return {
      message: 'Product Created Successfully',
    };
  } catch (error) {
    throw new Error('Something went wrong, cannot create product!');
  }
};

export const updateProduct = async (product) => {
  try {
    await dbConnect();
    await ProductModel.findByIdAndUpdate(
      product._id,
      {
        ...product,
      },
      { new: true }
    );
    revalidatePath('/admin');
    return {
      message: 'Product Updated Successfully',
    };
  } catch (error) {
    throw new Error('Something went wrong, cannot update product!');
  }
};

export const getProducts = async (pageNo, perPage) => {
  const skipCount = (pageNo - 1) * perPage;
  await dbConnect();
  const products = await ProductModel.find()
    .sort('-createdAt')
    .skip(skipCount)
    .limit(perPage);
  return JSON.stringify(products);
};

export const getSingleProduct = async (productID) => {
  await dbConnect();
  if (!isValidObjectId(productID)) return new Error('Cant find the product');
  const product = await ProductModel.findById(productID);
  return JSON.stringify(product);
};

export const getProductsByQuery = async (inputValue) => {
  await dbConnect();
  const products = await ProductModel.find({
    productName: { $regex: inputValue, $options: 'i' },
  }).sort('-createdAt');

  return JSON.stringify(products);
};
