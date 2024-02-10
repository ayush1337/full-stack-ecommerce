'use server';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';
import { isValidObjectId } from 'mongoose';

export const getSingleProduct = async (productID) => {
  await dbConnect();
  if (!isValidObjectId(productID)) return new Error('Cant find the product');
  const product = await ProductModel.findById(productID);
  return JSON.stringify(product);
};

export const getProducts = async (pageNo, perPage) => {
  const skipCount = (pageNo - 1) * perPage;
  await dbConnect();
  if (!pageNo && !perPage) {
    return JSON.stringify(await ProductModel.find().sort('-createdAt'));
  }
  const products = await ProductModel.find()
    .sort('-createdAt')
    .skip(skipCount)
    .limit(perPage);
  return JSON.stringify(products);
};

export const getProductsByQuery = async (inputValue) => {
  await dbConnect();
  const products = await ProductModel.find({
    productName: { $regex: inputValue, $options: 'i' },
  }).sort('-createdAt');

  return JSON.stringify(products);
};
