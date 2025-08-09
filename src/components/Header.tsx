import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotifications?: boolean;
}

export default function Header({ title, showBack, onBack, showNotifications = true }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {showBack && (
            <button
              onClick={onBack}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        
        {showNotifications && (
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-600" />
          </button>
        )}
      </div>
    </header>
  );
}