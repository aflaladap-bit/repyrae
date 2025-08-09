import React from 'react';
import Header from '../Header';
import { TrendingUp, Clock, CheckCircle, DollarSign, Users, Star, Calendar, AlertTriangle } from 'lucide-react';

export default function GarageDashboard() {
  const stats = [
    { label: 'Today\'s Revenue', value: 'AED 2,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Requests', value: '8', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Completed Today', value: '12', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Customers', value: '156', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  const recentRequests = [
    {
      id: '1',
      customerName: 'Ahmed Al-Rashid',
      service: 'Oil Change',
      vehicle: 'Toyota Camry 2020',
      time: '10:30 AM',
      status: 'pending',
      urgency: 'medium'
    },
    {
      id: '2',
      customerName: 'Sara Mohammed',
      service: 'Brake Service',
      vehicle: 'Honda Accord 2019',
      time: '11:15 AM',
      status: 'in-progress',
      urgency: 'high'
    },
    {
      id: '3',
      customerName: 'Omar Hassan',
      service: 'AC Repair',
      vehicle: 'Nissan Altima 2021',
      time: '2:00 PM',
      status: 'quoted',
      urgency: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'quoted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Garage Dashboard" />
      
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-2">Welcome back, Al Futtaim Motors!</h2>
          <p className="opacity-90">You have 8 new service requests waiting for your attention</p>
          <div className="flex items-center mt-4">
            <Star size={20} className="text-yellow-300 mr-2" />
            <span className="font-semibold">4.8 Rating</span>
            <span className="mx-2">•</span>
            <span>156 Reviews</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar size={24} className="text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Schedule Service</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp size={24} className="text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">View Analytics</span>
            </button>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
            <button className="text-primary font-medium text-sm">View All</button>
          </div>
          
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{request.customerName}</h4>
                    <p className="text-sm text-gray-600">{request.vehicle}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={16} className={getUrgencyColor(request.urgency)} />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{request.service}</p>
                    <p className="text-xs text-gray-500">Scheduled: {request.time}</p>
                  </div>
                  <button className="text-primary text-sm font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Revenue Target</span>
                <span className="font-medium">AED 12,450 / AED 15,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-medium">4.8 / 5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">12 min avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}