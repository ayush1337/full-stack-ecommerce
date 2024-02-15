import { Schema, model, models } from 'mongoose';
const ReviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const ReviewModel = models?.Review || model('Review', ReviewSchema);
export default ReviewModel;
