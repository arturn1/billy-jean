import { User, createUser } from '../models/User';

const users: User[] = [];

export const UserRepository = {
  getAll: (): User[] => users,

  getById: (id: string): User | undefined => users.find(user => user.id === id),

  create: (username: string, email: string): User => {
    const user = createUser(username, email);
    users.push(user);
    return user;
  },

  update: (id: string, updatedUser: Partial<User>): User | undefined => {
    const user = users.find(user => user.id === id);
    if (user) {
      Object.assign(user, updatedUser, { updatedAt: new Date() });
    }
    return user;
  },

  delete: (id: string): boolean => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  },
};
