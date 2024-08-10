import React, { useState } from 'react';
import { PaperClipIcon, FaceSmileIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-300 border-t border-gray-400 sticky bottom-0">
      <div className="flex space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-400">
          <FaceSmileIcon className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-400">
          <PaperClipIcon className="w-6 h-6 text-gray-600" />
        </button>
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-white text-gray-900"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="p-2 rounded-full hover:bg-gray-400"
          onClick={handleSend}
        >
          {message ? (
            <PaperClipIcon className="w-6 h-6 text-gray-600" />
          ) : (
            <MicrophoneIcon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};
