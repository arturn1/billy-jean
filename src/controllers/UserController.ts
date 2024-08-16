import { UserService } from '@/services/UserService';
import { NextApiRequest, NextApiResponse } from 'next';

export const UserController = {
  async create(req: NextApiRequest, res: NextApiResponse) {
    const { username, email } = req.body;
    const user = UserService.createUser(username, email);
    res.status(201).json(user);
  },

  async get(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const user = UserService.getUser(id as string);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },

  async getAllUsers() {
    return await UserService.getAllUsers();
  },

  async update(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const data = req.body;
    const user = UserService.updateUser(id as string, data);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },

  async delete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const success = UserService.deleteUser(id as string);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },
};
