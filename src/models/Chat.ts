import { v4 as uuidv4 } from 'uuid';
import { Message } from './Message';

export interface Chat {
  id: string;
  participants: string[]; // Array de IDs de usuários
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export const createChat = (participants: string[]): Chat => ({
  id: uuidv4(),
  participants,
  messages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});
