
'use client'

import { useState, useEffect } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";


interface User {
  id: string;
  username: string;
  email: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
}


export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);               // Set all users
        setCurrentUser(data[0]);      // Set the first user as the current user (simulating login)
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  

  useEffect(() => {
    if (currentUser) {
      // Fetch chats for the current user
      fetch(`/api/chats?userId=${currentUser.id}`)
        .then(res => res.json())
        .then((data: Chat[]) => setChats(data));
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedChatId) {
      // Fetch messages for the selected chat
      fetch(`/api/messages?chatId=${selectedChatId}`)
        .then(res => res.json())
        .then((data: Message[]) => setMessages(data));
    }
  }, [selectedChatId]);

  const handleSendMessage = (content: string) => {
    if (selectedChatId && currentUser) {
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: selectedChatId,
          senderId: currentUser.id,
          content,
        }),
      })
        .then(res => res.json())
        .then(newMessage => setMessages(prevMessages => [...prevMessages, newMessage]));
    }
  };

  const contact = chats
    .find(chat => chat.id === selectedChatId)
    ?.participants.find(id => id !== currentUser?.id);

    const contactName = users.find(user => user.id === contact)?.username;

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          currentUserId={currentUser?.id || ''}
          chats={chats}
          onSelectChat={setSelectedChatId}
          currentChatId={selectedChatId || ''}
        />
        <div className="flex-1 flex flex-col bg-gray-200">
          {contact && <ChatHeader contactName={contactName!} status="Online" />}
          <div className="flex-1 overflow-y-auto">
            <MessageList messages={messages} users={users} currentUserId={currentUser?.id || ''} />
          </div>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}