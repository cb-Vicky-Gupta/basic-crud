import { isValidObjectId } from 'mongoose';
import { userRepository } from '../repository/user.repository.js';
import type { User, UserDoc } from '../model/user.model.js';
import { AppError } from '../utils/app-error.js';

function assertValidId(id: string): void {
  if (!isValidObjectId(id)) throw new AppError(400, 'Invalid id');
}

async function getOrFail(id: string): Promise<UserDoc> {
  assertValidId(id);
  const user = await userRepository.findById(id);
  if (!user) throw new AppError(404, 'User not found');
  return user;
}

export const userService = {
  create(data: Partial<User>): Promise<UserDoc> {
    if (!data.name || !data.email) throw new AppError(400, 'name and email are required');
    return userRepository.create(data);
  },

  list(): Promise<UserDoc[]> {
    return userRepository.findAll();
  },

  get(id: string): Promise<UserDoc> {
    return getOrFail(id);
  },

  async update(id: string, data: Partial<User>): Promise<UserDoc> {
    await getOrFail(id);
    const updated = await userRepository.update(id, data);
    if (!updated) throw new AppError(404, 'User not found');
    return updated;
  },

  async remove(id: string): Promise<void> {
    await getOrFail(id);
    await userRepository.remove(id);
  },
};
