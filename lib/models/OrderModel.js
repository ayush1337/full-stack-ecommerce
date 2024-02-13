import { Schema, model, models } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stripeCustomerId: { type: String, required: true },
    paymentIntent: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    shippingDetails: {
      address: {
        city: { type: String, required: true },
        country: { type: String, required: true },
        line1: { type: String, required: true },
        line2: { type: String, default: null },
        postal_code: { type: String, required: true },
        state: { type: String, required: true },
      },
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    paymentStatus: { type: String, required: true },
    deliveryStatus: {
      type: String,
      enum: ['delivered', 'ordered', 'shipped'],
      default: 'ordered',
    },
    orderItems: [Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

const OrderModel = models?.Order || model('Order', orderSchema);
export default OrderModel;
