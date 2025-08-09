import React, { useState } from 'react';
import Header from '../Header';
import { Search, MapPin, Star, Phone, Mail, CheckCircle, Clock, X } from 'lucide-react';
import { Garage } from '../../types';

export default function GaragesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending'>('all');

  const garages: Garage[] = [
    {
      id: '1',
      name: 'Al Futtaim Motors',
      address: 'Sheikh Zayed Road, Dubai',
      phone: '+971 4 123 4567',
      email: 'info@alfuttaim.ae',
      rating: 4.8,
      services: ['Oil Change', 'Brake Service', 'AC Repair'],
      workingHours: {
        open: '08:00',
        close: '18:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      location: { lat: 25.2048, lng: 55.2708 },
      verified: true,
      ownerId: 'user2'
    },
    {
      id: '2',
      name: 'Dubai Auto Care',
      address: 'Business Bay, Dubai',
      phone: '+971 4 567 8901',
      email: 'info@dubaicare.ae',
      rating: 4.6,
      services: ['Engine Diagnostics', 'Tire Service', 'Battery'],
      workingHours: {
        open: '09:00',
        close: '17:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      },
      location: { lat: 25.1972, lng: 55.2744 },
      verified: false,
      ownerId: 'user4'
    },
    {
      id: '3',
      name: 'Quick Fix Garage',
      address: 'Jumeirah, Dubai',
      phone: '+971 4 234 5678',
      email: 'info@quickfix.ae',
      rating: 4.4,
      services: ['Oil Change', 'Brake Service'],
      workingHours: {
        open: '08:30',
        close: '19:00',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      location: { lat: 25.2285, lng: 55.2593 },
      verified: true,
      ownerId: 'user5'
    }
  ];

  const filteredGarages = garages.filter(garage => {
    const matchesSearch = garage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         garage.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'verified' && garage.verified) ||
                         (filterStatus === 'pending' && !garage.verified);
    return matchesSearch && matchesStatus;
  });

  const handleApproveGarage = (garageId: string) => {
    console.log('Approving garage:', garageId);
    // In a real app, this would update the garage's verified status
  };

  const handleRejectGarage = (garageId: string) => {
    console.log('Rejecting garage:', garageId);
    // In a real app, this would handle rejection
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Garages Management" />
      
      <div className="p-4 space-y-6">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4">
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search garages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Garages' },
              { id: 'verified', label: 'Verified' },
              { id: 'pending', label: 'Pending' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterStatus(filter.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Garages List */}
        <div className="space-y-4">
          {filteredGarages.map((garage) => (
            <div key={garage.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{garage.name}</h4>
                    {garage.verified ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <Clock size={16} className="text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                    <MapPin size={14} />
                    <span>{garage.address}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Phone size={14} />
                      <span>{garage.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail size={14} />
                      <span>{garage.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{garage.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    garage.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {garage.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Services:</p>
                <div className="flex flex-wrap gap-2">
                  {garage.services.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                  View Details
                </button>
                {!garage.verified ? (
                  <>
                    <button
                      onClick={() => handleApproveGarage(garage.id)}
                      className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm flex items-center justify-center space-x-1"
                    >
                      <CheckCircle size={16} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleRejectGarage(garage.id)}
                      className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm flex items-center justify-center space-x-1"
                    >
                      <X size={16} />
                      <span>Reject</span>
                    </button>
                  </>
                ) : (
                  <button className="flex-1 py-2 bg-primary text-white rounded-lg text-sm">
                    Manage
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredGarages.length === 0 && (
          <div className="bg-white p-8 rounded-xl text-center">
            <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No garages found</p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Garage Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {garages.filter(g => g.verified).length}
              </p>
              <p className="text-sm text-gray-500">Verified</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {garages.filter(g => !g.verified).length}
              </p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{garages.length}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}