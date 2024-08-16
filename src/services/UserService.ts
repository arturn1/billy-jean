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

  async getAllUsers() {
    return await UserRepository.getAll();
  },

  async getAllUsersExternal(): Promise<User[]> {
    try {
      const externalUsers = await fetch('https://api.exemplo.com/users');
      const data: User[] = await externalUsers.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Could not retrieve users');
    }
  }

};
