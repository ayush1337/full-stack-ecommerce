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

export const getProductsByQuery = async ({
  searchQuery,
  gender,
  categoryArray,
  sizeArray,
  sortObject,
}) => {
  await dbConnect();

  let query = {};

  if (searchQuery) {
    query.productName = { $regex: searchQuery, $options: 'i' };
  }

  if (categoryArray.length > 0) {
    query['category.label'] = { $in: categoryArray };
  }

  if (sizeArray.length > 0) {
    query.sizes = { $in: sizeArray };
  }

  if (gender === 'man') {
    query.gender = 'Male';
  }

  if (gender === 'woman') {
    query.gender = 'Female';
  }

  const products = await ProductModel.find(query).sort(sortObject);

  return JSON.stringify(products);
};

export const getProductsFilter = async ({
  pageNo,
  perPage,
  gender,
  categoryArray,
  sizeArray,
  sortObject,
}) => {
  const skipCount = (pageNo - 1) * perPage;
  await dbConnect();

  let query = {};

  if (categoryArray.length > 0) {
    query['category.label'] = { $in: categoryArray };
  }
  if (sizeArray.length > 0) {
    query.sizes = { $in: sizeArray };
  }
  if (gender === 'man') {
    query.gender = 'Male';
  }
  if (gender === 'woman') {
    query.gender = 'Female';
  }

  const products = await ProductModel.find(query)
    .sort(sortObject)
    .skip(skipCount)
    .limit(perPage);

  return JSON.stringify(products);
};
