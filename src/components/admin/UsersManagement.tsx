import React, { useState } from 'react';
import Header from '../Header';
import { Search, Filter, MoreVertical, User, Phone, Mail } from 'lucide-react';
import { AuthUser } from '../../types';

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'customer' | 'garage'>('all');

  const users: AuthUser[] = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      phone: '+971 50 123 4567',
      email: 'ahmed@email.com',
      role: 'customer'
    },
    {
      id: '2',
      name: 'Al Futtaim Motors',
      phone: '+971 4 123 4567',
      email: 'info@alfuttaim.ae',
      role: 'garage',
      garageId: 'garage1'
    },
    {
      id: '3',
      name: 'Sara Mohammed',
      phone: '+971 55 987 6543',
      email: 'sara@email.com',
      role: 'customer'
    },
    {
      id: '4',
      name: 'Dubai Auto Care',
      phone: '+971 4 567 8901',
      email: 'info@dubaicare.ae',
      role: 'garage',
      garageId: 'garage2'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'customer': return 'bg-blue-100 text-blue-800';
      case 'garage': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Users Management" />
      
      <div className="p-4 space-y-6">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex space-x-3 mb-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Users' },
              { id: 'customer', label: 'Customers' },
              { id: 'garage', label: 'Garages' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterRole(filter.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterRole === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{user.phone}</span>
                    </div>
                    {user.email && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Mail size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{user.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                  View Profile
                </button>
                <button className="flex-1 py-2 bg-primary text-white rounded-lg text-sm">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white p-8 rounded-xl text-center">
            <User size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'customer').length}
              </p>
              <p className="text-sm text-gray-500">Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'garage').length}
              </p>
              <p className="text-sm text-gray-500">Garages</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}