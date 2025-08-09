import React from 'react';
import Header from '../Header';
import { MapPin, Phone, Mail, Clock, Star, Settings, Users, TrendingUp, LogOut } from 'lucide-react';

export default function GarageProfileScreen() {
  const garageInfo = {
    name: 'Al Futtaim Motors',
    address: 'Sheikh Zayed Road, Dubai, UAE',
    phone: '+971 4 123 4567',
    email: 'info@alfuttaimmotors.ae',
    rating: 4.8,
    totalReviews: 156,
    workingHours: {
      weekdays: '8:00 AM - 6:00 PM',
      weekends: '9:00 AM - 4:00 PM'
    },
    services: [
      'Oil Change',
      'Brake Service',
      'AC Repair',
      'Engine Diagnostics',
      'Tire Service',
      'Battery Replacement'
    ],
    stats: {
      totalServices: 1247,
      monthlyRevenue: 45600,
      activeCustomers: 156,
      responseTime: '12 min'
    }
  };

  const menuItems = [
    { icon: Settings, label: 'Garage Settings', action: () => {} },
    { icon: Users, label: 'Staff Management', action: () => {} },
    { icon: TrendingUp, label: 'Analytics & Reports', action: () => {} },
    { icon: Star, label: 'Reviews & Ratings', action: () => {} },
    { icon: LogOut, label: 'Logout', action: () => {} },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Garage Profile" />
      
      <div className="p-4 space-y-6">
        {/* Garage Info */}
        <div className="bg-white rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">AF</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{garageInfo.name}</h2>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Star size={20} className="text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{garageInfo.rating}</span>
              <span className="text-gray-500">({garageInfo.totalReviews} reviews)</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-gray-400" />
              <span className="text-gray-700">{garageInfo.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-gray-400" />
              <span className="text-gray-700">{garageInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-gray-400" />
              <span className="text-gray-700">{garageInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-gray-400" />
              <div>
                <p className="text-gray-700">Mon-Fri: {garageInfo.workingHours.weekdays}</p>
                <p className="text-gray-700">Sat-Sun: {garageInfo.workingHours.weekends}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{garageInfo.stats.totalServices}</p>
              <p className="text-sm text-gray-500">Total Services</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">AED {garageInfo.stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Monthly Revenue</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{garageInfo.stats.activeCustomers}</p>
              <p className="text-sm text-gray-500">Active Customers</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{garageInfo.stats.responseTime}</p>
              <p className="text-sm text-gray-500">Avg Response</p>
            </div>
          </div>
        </div>

        {/* Services Offered */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
          <div className="grid grid-cols-2 gap-2">
            {garageInfo.services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                <span className="text-sm font-medium text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} className={item.label === 'Logout' ? 'text-red-500' : 'text-gray-600'} />
                <span className={`font-medium ${item.label === 'Logout' ? 'text-red-500' : 'text-gray-900'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm">
          <p>Repyr Garage Portal v1.0.0</p>
          <p>© 2024 Repyr Technologies</p>
        </div>
      </div>
    </div>
  );
}