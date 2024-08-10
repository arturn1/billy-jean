import React from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface ChatHeaderProps {
  contactName: string;
  status: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contactName, status }) => (
  <div className="p-4 flex justify-between items-center bg-gray-300 border-b border-gray-400">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
        {contactName[0]}
      </div>
      <div>
        <h4 className="font-semibold">{contactName}</h4>
        <p className="text-sm text-gray-600">{status}</p>
      </div>
    </div>
    <div className="flex space-x-4">
      <button className="p-2 rounded-full hover:bg-gray-400">
        <EllipsisVerticalIcon className="w-6 h-6" />
      </button>
    </div>
  </div>
);
