import { NextApiRequest, NextApiResponse } from 'next';
import { MessageService } from '../app/services/MessageService';

export const MessageController = {
  async sendMessage(req: NextApiRequest, res: NextApiResponse) {
    const { chatId, senderId, content } = req.body;
    const message = MessageService.sendMessage(chatId, senderId, content);
    res.status(201).json(message);
  },

  async getMessagesByChat(req: NextApiRequest, res: NextApiResponse) {
    const { chatId } = req.query;
    const messages = MessageService.getMessagesByChat(chatId as string);
    res.status(200).json(messages);
  },

  async deleteMessage(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const success = MessageService.deleteMessage(id as string);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  },
};
