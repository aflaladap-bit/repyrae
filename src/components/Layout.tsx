import React from 'react';
import { Home, Search, Wrench, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'diagnosis' | 'services' | 'profile';
  onTabChange: (tab: 'home' | 'diagnosis' | 'services' | 'profile') => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'diagnosis' as const, label: 'Diagnosis', icon: Search },
    { id: 'services' as const, label: 'Services', icon: Wrench },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area">
        <div className="flex items-center justify-around py-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === id
                  ? 'text-primary bg-primary-light'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}