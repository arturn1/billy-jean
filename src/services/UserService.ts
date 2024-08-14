import { User } from "@/models/User";
import { UserRepository } from "@/repositories/UserRepository";


export const UserService = {
  createUser: (username: string, email: string) => {
    return UserRepository.create(username, email);
  },

  getUser: (id: string) => {
    return UserRepository.getById(id);
  },

  updateUser: (id: string, data: Partial<User>) => {
    return UserRepository.update(id, data);
  },

  deleteUser: (id: string) => {
    return UserRepository.delete(id);
  },

  getAll: () => {
    return UserRepository.getAll();
  },
};
