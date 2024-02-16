import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '#000',
    },
    brand: {
      type: String,
      default: 'Zara',
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    stock: {
      type: Object,
      required: true,
    },
    origin: {
      type: Object,
      required: true,
    },
  },
  { validateBeforeSave: true, timestamps: true }
);

const ProductModel =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;
