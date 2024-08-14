import { NextResponse, NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { fakeUsers } from '../../../data/fakeDatabase';
import { logger } from '@/utils/logger';
import { User } from '@/models/User';

// Handler para o método GET (listar usuários ou obter um usuário específico)
export async function GET(req: NextRequest) {
  logger(req);  // Log da requisição

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (userId) {
    // Retorna um usuário específico
    const user = fakeUsers.find(u => u.id === userId);
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } else {
    // Retorna todos os usuários se nenhum parâmetro for passado
    return NextResponse.json(fakeUsers);
  }
}

// Handler para o método POST (criar um novo usuário)
export async function POST(req: NextRequest) {
  logger(req);  // Log da requisição

  const { username, email } = await req.json();

  if (username && email) {
    const newUser : User = {
      id: uuidv4(),
      username,
      email,
      contacts: [],
      chats: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    fakeUsers.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } else {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

// Handler para o método PUT (atualizar um usuário existente)
export async function PUT(req: NextRequest) {
  logger(req);  // Log da requisição

  const { userId, username, email } = await req.json();
  const user = fakeUsers.find(u => u.id === userId);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

// Handler para o método DELETE (remover um usuário)
export async function DELETE(req: NextRequest) {
  logger(req);  // Log da requisição

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (userId) {
    const userIndex = fakeUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      fakeUsers.splice(userIndex, 1);
      return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
}
