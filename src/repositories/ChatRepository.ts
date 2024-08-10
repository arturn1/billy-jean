import { Chat, createChat } from '../models/Chat';

const chats: Chat[] = [];

export const ChatRepository = {
  getAll: (): Chat[] => chats,

  getById: (id: string): Chat | undefined => chats.find(chat => chat.id === id),

  create: (participants: string[]): Chat => {
    const chat = createChat(participants);
    chats.push(chat);
    return chat;
  },

  update: (id: string, updatedChat: Partial<Chat>): Chat | undefined => {
    const chat = chats.find(chat => chat.id === id);
    if (chat) {
      Object.assign(chat, updatedChat);
    }
    return chat;
  },

  delete: (id: string): boolean => {
    const index = chats.findIndex(chat => chat.id === id);
    if (index !== -1) {
      chats.splice(index, 1);
      return true;
    }
    return false;
  },
};
