import React from 'react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface MessageItemProps {
  align: 'left' | 'right';
  text: string;
  sender: string;
}

interface MessageListProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({ align, text, sender }) => {
  const alignment = align === 'right' ? 'justify-end' : 'justify-start';
  const bgColor = align === 'right' ? 'bg-green-100' : 'bg-white';
  const textColor = align === 'right' ? 'text-gray-900' : 'text-black';

  return (
    <div className={`mb-4 flex ${alignment}`}>
      <div className={`max-w-xs p-2 rounded-lg shadow-md ${bgColor} ${textColor}`}>
        <div className="font-bold mb-1">{sender}</div>
        <div>{text}</div>
      </div>
    </div>
  );
};

export const MessageList: React.FC<MessageListProps> = ({ messages, users, currentUserId }) => (
  <div className="p-4">
    {messages.map((message) => {
      const sender = users.find(user => user.id === message.senderId);
      const align = message.senderId === currentUserId ? 'right' : 'left';
      return (
        <MessageItem
          key={message.id}
          align={align}
          text={message.content}
          sender={sender?.username || 'Unknown'}
        />
      );
    })}
  </div>
);
