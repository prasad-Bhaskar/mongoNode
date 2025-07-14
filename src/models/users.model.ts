import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email'],
    },
    image: { type: String, default: '' },
    password: { type: String, required: true, minlength: 6 },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model('user', userSchema);
