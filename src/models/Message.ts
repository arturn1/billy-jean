import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export const createMessage = (chatId: string, senderId: string, content: string): Message => ({
  id: uuidv4(),
  chatId,
  senderId,
  content,
  timestamp: new Date(),
  isRead: false,
});
