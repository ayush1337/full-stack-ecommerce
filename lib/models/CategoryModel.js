import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { validateBeforeSave: true, timestamps: true }
);

const CategoryModel =
  mongoose.models?.User || mongoose.model('Category', CategorySchema);

export default CategoryModel;
