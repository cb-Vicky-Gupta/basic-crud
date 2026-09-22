import type { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service.js';

export const userController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await userService.list());
    } catch (err) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await userService.get(req.params.id as string));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await userService.update(req.params.id as string, req.body));
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await userService.remove(req.params.id as string);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
