'use client';

import { useState, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { MessageInput } from "@/components/MessageInput";
import { MessageList } from "@/components/MessageList";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { getFakeMessages, addFakeMessage } from "@/data/fakeDatabase";
import { Chat } from "@/models/Chat";
import { Message as MessageModel } from "@/models/Message";
import { User } from "@/models/User";

export default function Home({ initialUsers, initialChats }: any) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>(initialChats || []);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;
    setCurrentUser(storedUser);
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    }
  }, [selectedChatId]);

  const fetchMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const data = await getFakeMessages(chatId) as MessageModel[];
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedChatId || !currentUser) return;

    const newMessage: MessageModel = {
      id: `${Date.now()}`,
      chatId: selectedChatId,
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      isRead: false,
    };

    try {
      const addedMessage = await addFakeMessage(selectedChatId, newMessage);
      setMessages((prevMessages) => [...prevMessages, addedMessage]);
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const contactId = chats && selectedChatId ? 
    chats.find(chat => chat.id === selectedChatId)?.participants.find(id => id !== currentUser?.id) : null;

  const contactName = initialUsers && contactId ? 
    initialUsers.find((user: { id: string | undefined; }) => user.id === contactId)?.username : null;

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
          onSelectChat={(chatId) => {
            setSelectedChatId(chatId);
          }}
          currentChatId={selectedChatId || ''}
        />
        <div className="flex-1 flex flex-col bg-gray-200">
          {loading && (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
          {error && <div className="text-center p-4 text-red-500">{error}</div>}
          {!loading && !error && (
            <>
              {contactName && <ChatHeader contactName={contactName} status="Online" />}
              <div className="flex-1 overflow-y-auto">
                <MessageList messages={messages} users={initialUsers || []} currentUserId={currentUser?.id || ''} />
              </div>
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
