import { v4 as uuidv4 } from 'uuid';
import { Message } from './Message';

export interface Chat {
  id: string;
  participants: string[];
  messages: {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
  }[];
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
