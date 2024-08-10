import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface NavbarProps {
  toggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => (
  <div className="w-full md:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
    <Bars3Icon onClick={toggleSidebar} className="rounded-full w-6 h-6 cursor-pointer"/>
    <span>Freed Free</span>
    <div className="flex space-x-4">
      <button className="p-2 rounded-full hover:bg-gray-700">
      </button>
    </div>
  </div>
);
