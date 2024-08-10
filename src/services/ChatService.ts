import { ChatRepository } from '@/repositories/ChatRepository';
import { MessageService } from './MessageService';

export const ChatService = {
  createChat: (participants: string[]) => {
    return ChatRepository.create(participants);
  },

  getChat: (id: string) => {
    return ChatRepository.getById(id);
  },

  getAllChats: () => {
    return ChatRepository.getAll();
  },

  sendMessageToChat: (chatId: string, senderId: string, content: string) => {
    return MessageService.sendMessage(chatId, senderId, content);
  },

  deleteChat: (id: string) => {
    return ChatRepository.delete(id);
  },
};
