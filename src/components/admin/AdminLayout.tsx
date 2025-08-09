import React from 'react';
import { BarChart3, Users, Building2, FileText } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'users' | 'garages' | 'reports';
  onTabChange: (tab: 'dashboard' | 'users' | 'garages' | 'reports') => void;
}

export default function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'garages' as const, label: 'Garages', icon: Building2 },
    { id: 'reports' as const, label: 'Reports', icon: FileText },
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