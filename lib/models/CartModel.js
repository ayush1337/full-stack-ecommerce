import { Schema, model, models } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: { type: Number, default: 1 },
        size: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = models.Cart || model('Cart', cartSchema);
export default CartModel;
