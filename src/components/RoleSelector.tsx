import React from 'react';
import { Car, Wrench, Shield, User } from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const roles = [
    {
      role: 'customer' as const,
      title: 'Customer',
      subtitle: 'Book services for your vehicle',
      icon: Car,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
      description: 'Find garages, book services, track repairs'
    },
    {
      role: 'garage' as const,
      title: 'Garage Owner',
      subtitle: 'Manage your auto repair business',
      icon: Wrench,
      color: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700',
      description: 'Receive requests, manage services, grow business'
    },
    {
      role: 'admin' as const,
      title: 'Administrator',
      subtitle: 'Platform management and oversight',
      icon: Shield,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
      description: 'Manage users, garages, and platform operations'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Repyr</h1>
          <p className="text-gray-600 text-lg">Choose your role to continue</p>
        </div>

        <div className="space-y-4 max-w-md mx-auto w-full">
          {roles.map((roleOption) => (
            <button
              key={roleOption.role}
              onClick={() => onRoleSelect(roleOption.role)}
              className={`w-full ${roleOption.color} text-white p-6 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <roleOption.icon size={32} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold mb-1">{roleOption.title}</h3>
                  <p className="text-sm opacity-90 mb-2">{roleOption.subtitle}</p>
                  <p className="text-xs opacity-75">{roleOption.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Don't have an account? Sign up after selecting your role
          </p>
        </div>
      </div>
    </div>
  );
}