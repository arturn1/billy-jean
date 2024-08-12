import { Chat } from "@/models/Chat";
import { Message } from "@/models/Message";
import { User } from "@/models/User";

// Simulando uma base de dados simples
export const fakeUsers: User[] = [
    {
      id: '1',
      username: 'Alice',
      email: 'alice@example.com',
      contacts: ['2', '3'],
      chats: ['1', '2'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      username: 'Bob',
      email: 'bob@example.com',
      contacts: ['1'],
      chats: ['1'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      username: 'Charlie',
      email: 'charlie@example.com',
      contacts: ['1'],
      chats: ['2'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  
  export const fakeChats: Chat[] = [
    {
      id: '1',
      participants: ['1', '2'],
      messages: [
        { id: 'm1', senderId: '1', content: 'Hi Bob!', timestamp: new Date() },
        { id: 'm2', senderId: '2', content: 'Hello Alice!', timestamp: new Date() },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      participants: ['1', '3'],
      messages: [
        { id: 'm3', senderId: '1', content: 'Hey Charlie!', timestamp: new Date() },
        { id: 'm4', senderId: '3', content: 'Hey Alice!', timestamp: new Date() },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  
  // Funções para simular as requisições
  
  export const getFakeUsers = async (): Promise<User[]>  => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), 200); // Simula um pequeno atraso
    });
  };
  
  export const getFakeChats = async (userId: string) : Promise<Chat[]>=> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chats = fakeChats.filter(chat => chat.participants.includes(userId));
        resolve(chats);
      }, 200); // Simula um pequeno atraso
    });
  };
  
  export const getFakeMessages = async (chatId: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const chat = fakeChats.find(chat => chat.id === chatId);
        if (chat) {
          resolve(chat.messages);
        } else {
          reject('Chat not found');
        }
      }, 200); // Simula um pequeno atraso
    });
  };
  
  export const addFakeMessage = async (chatId: string, message: Message): Promise<Message> => {
    return new Promise((resolve, reject) => {
      const chat = fakeChats.find(chat => chat.id === chatId);
      if (chat) {
        chat.messages.push(message);
        resolve(message); // Retorna o objeto `Message`
      } else {
        reject(new Error('Chat not found'));
      }
    });
  };
  
  