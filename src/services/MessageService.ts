import { MessageRepository } from '../../repositories/MessageRepository';

export const MessageService = {
  sendMessage: (chatId: string, senderId: string, content: string) => {
    return MessageRepository.create(chatId, senderId, content);
  },

  getMessagesByChat: (chatId: string) => {
    return MessageRepository.getAllByChatId(chatId);
  },

  deleteMessage: (id: string) => {
    return MessageRepository.delete(id);
  },
};
