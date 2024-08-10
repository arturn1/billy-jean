import { NextApiRequest, NextApiResponse } from 'next';
import { ChatService } from '../app/services/ChatService';

export const ChatController = {
  async createChat(req: NextApiRequest, res: NextApiResponse) {
    const { participants } = req.body;
    const chat = ChatService.createChat(participants);
    res.status(201).json(chat);
  },

  async getChat(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const chat = ChatService.getChat(id as string);
    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ message: 'Chat not found' });
    }
  },

  async sendMessageToChat(req: NextApiRequest, res: NextApiResponse) {
    const { chatId, senderId, content } = req.body;
    const message = ChatService.sendMessageToChat(chatId, senderId, content);
    res.status(201).json(message);
  },

  async getAllChats(req: NextApiRequest, res: NextApiResponse) {
    const chats = ChatService.getAllChats();
    res.status(200).json(chats);
  },

  async deleteChat(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const success = ChatService.deleteChat(id as string);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Chat not found' });
    }
  },
};
