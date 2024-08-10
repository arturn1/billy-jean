import { NextResponse } from 'next/server';
import { fakeChats } from '../../../data/fakeDatabase';
import { logger } from '@/utils/logger';

// Handler para o método GET
export async function GET(request: Request) {
  logger(request);  // Log a requisição

  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');

  if (chatId) {
    const chat = fakeChats.find(c => c.id === chatId);
    if (chat) {
      return NextResponse.json(chat.messages);
    } else {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
  }
}

// Handler para o método POST
export async function POST(request: Request) {
  logger(request);  // Log a requisição

  const { chatId, senderId, content } = await request.json();
  const chat = fakeChats.find(c => c.id === chatId);

  if (chat) {
    const newMessage = {
      id: `${Date.now()}`,
      senderId,
      content,
      timestamp: new Date(),
    };
    chat.messages.push(newMessage);
    return NextResponse.json(newMessage, { status: 201 });
  } else {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  }
}
