import React, { useEffect, useState, useMemo, useCallback } from 'react';

interface Chat {
  id: string;
  participants: string[];
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface SidebarProps {
  isOpen: boolean;
  currentUserId: string;
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  currentChatId: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentUserId, chats, onSelectChat, currentChatId }) => {
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserDetails = async (userId: string) => {
      if (!users[userId]) {
        const response = await fetch(`/api/users?userid=${userId}`);
        const userData = await response.json();
        setUsers(prevUsers => ({ ...prevUsers, [userId]: userData }));
      }
    };

    const participantsToFetch = chats
      .flatMap(chat => chat.participants)
      .filter(participantId => participantId !== currentUserId && !users[participantId]);

    participantsToFetch.forEach(participantId => {
      fetchUserDetails(participantId);
    });
  }, [chats, currentUserId, users]);

  // useMemo para memorizar os chats filtrados com base no termo de busca
  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      const otherParticipantId = chat.participants.find(id => id !== currentUserId);
      const otherParticipant = users[otherParticipantId || ''];
      return otherParticipant?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [chats, currentUserId, searchTerm, users]);

  // useCallback para memorizar a função de logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }, []);

  return (
    <div className={`w-1/4 bg-gray-900 text-white md:block ${isOpen ? 'block' : 'hidden'} md:w-1/3 lg:w-1/4 h-full`}>
      <div className="p-4 flex justify-between items-center bg-gray-800 border-b border-gray-700">
        <span>Freed Free</span>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full p-2 rounded-lg bg-gray-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Atualiza o termo de busca
        />
      </div>
      <div className="">
        {filteredChats.map(chat => {
          const otherParticipantId = chat.participants.find(id => id !== currentUserId);
          const otherParticipant = users[otherParticipantId || ''];

          return otherParticipant ? (
            <div
              key={chat.id}
              className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 ${
                currentChatId === chat.id ? 'bg-gray-700' : ''
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                  {otherParticipant?.username[0]}
                </div>
                <div>
                  <h4 className="font-semibold">{otherParticipant?.username || 'Unknown'}</h4>
                  <p className="text-gray-400">{otherParticipant?.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div key={chat.id} className="p-4 border-b border-gray-700 cursor-not-allowed text-gray-500">
              Loading...
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
