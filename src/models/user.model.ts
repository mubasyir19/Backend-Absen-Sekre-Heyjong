import { model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
