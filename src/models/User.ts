import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  username: string;
  email: string;
  contacts: string[];  // IDs de contatos
  chats: string[];     // IDs de chats
  createdAt: Date;
  updatedAt: Date;
}


export const createUser = (username: string, email: string): User => ({
  id: uuidv4(),
  username,
  email,
  contacts: [],
  chats: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});
