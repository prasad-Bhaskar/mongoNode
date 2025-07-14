import { IUser } from '../interfaces/user.interface';
import { User } from '../models/users.model';

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: id });
  return user;
};
