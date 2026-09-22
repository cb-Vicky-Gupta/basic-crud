import { UserModel } from '../model/user.model.js';
import type { User, UserDoc } from '../model/user.model.js';

export const userRepository = {
  create(data: Partial<User>): Promise<UserDoc> {
    return UserModel.create(data);
  },

  findAll(): Promise<UserDoc[]> {
    return UserModel.find().sort({ createdAt: -1 }).exec();
  },

  findById(id: string): Promise<UserDoc | null> {
    return UserModel.findById(id).exec();
  },

  update(id: string, data: Partial<User>): Promise<UserDoc | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  },

  remove(id: string): Promise<UserDoc | null> {
    return UserModel.findByIdAndDelete(id).exec();
  },
};
