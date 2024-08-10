import { Message, createMessage } from '../models/Message';

const messages: Message[] = [];

export const MessageRepository = {
  getAllByChatId: (chatId: string): Message[] => messages.filter(msg => msg.chatId === chatId),

  getById: (id: string): Message | undefined => messages.find(msg => msg.id === id),

  create: (chatId: string, senderId: string, content: string): Message => {
    const message = createMessage(chatId, senderId, content);
    messages.push(message);
    return message;
  },

  update: (id: string, updatedMessage: Partial<Message>): Message | undefined => {
    const message = messages.find(msg => msg.id === id);
    if (message) {
      Object.assign(message, updatedMessage);
    }
    return message;
  },

  delete: (id: string): boolean => {
    const index = messages.findIndex(msg => msg.id === id);
    if (index !== -1) {
      messages.splice(index, 1);
      return true;
    }
    return false;
  },
};
