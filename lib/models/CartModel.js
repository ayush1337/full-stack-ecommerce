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
        product: {
          type: Schema.Types.Mixed,
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
