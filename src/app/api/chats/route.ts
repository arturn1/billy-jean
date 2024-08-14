import { NextResponse, NextRequest } from 'next/server';
import { fakeChats } from '../../../data/fakeDatabase';
import { logger } from '@/utils/logger';

// Handler para o método GET (listar chats ou obter um chat específico)
export async function GET(req: NextRequest) {
  logger(req);  // Log da requisição

  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatId');
  const userId = searchParams.get('userId');

  if (chatId) {
    // Retorna um chat específico
    const chat = fakeChats.find(c => c.id === chatId);
    if (chat) {
      return NextResponse.json(chat);
    } else {  
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }
  } else if (userId) {
    // Retorna todos os chats de um usuário específico
    const userChats = fakeChats.filter(chat => chat.participants.includes(userId));
    return NextResponse.json(userChats);
  } else {
    // Retorna todos os chats se nenhum parâmetro for passado
    return NextResponse.json(fakeChats);
  }
}

// Handler para o método POST (criar um novo chat)
export async function POST(req: NextRequest) {
  logger(req);  // Log da requisição

  const { participants } = await req.json();

  if (participants && participants.length > 1) {
    const newChat = {
      id: `${Date.now()}`,
      participants,
      messages: [],
    };
    // fakeChats.push(newChat);
    return NextResponse.json(newChat, { status: 201 });
  } else {
    return NextResponse.json({ error: 'Invalid participants' }, { status: 400 });
  }
}

// Handler para o método PUT (atualizar um chat existente)
export async function PUT(req: NextRequest) {
  logger(req);  // Log da requisição

  const { chatId, participants } = await req.json();
  const chat = fakeChats.find(c => c.id === chatId);

  if (chat) {
    chat.participants = participants || chat.participants;
    return NextResponse.json(chat);
  } else {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  }
}

// Handler para o método DELETE (remover um chat)
export async function DELETE(req: NextRequest) {
  logger(req);  // Log da requisição

  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatId');

  if (chatId) {
    const chatIndex = fakeChats.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      fakeChats.splice(chatIndex, 1);
      return NextResponse.json({ message: 'Chat deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
  }
}
