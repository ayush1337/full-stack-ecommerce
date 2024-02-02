import { compare, genSalt, hash } from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dt2newa4h/image/upload/f_auto,q_auto/xhw8uifd9sxhewwrzuvr',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { validateBeforeSave: true, timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (err) {
    throw new Error(err);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;
