import React from 'react';
import Header from '../Header';
import { Users, Building2, TrendingUp, DollarSign, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', change: '+12%' },
    { label: 'Active Garages', value: '156', icon: Building2, color: 'text-green-600', bg: 'bg-green-100', change: '+8%' },
    { label: 'Monthly Revenue', value: 'AED 125K', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-100', change: '+15%' },
    { label: 'Platform Growth', value: '23%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100', change: '+5%' }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'garage_registration',
      message: 'New garage "Dubai Auto Care" registered',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'user_signup',
      message: '15 new users signed up today',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'service_completed',
      message: '247 services completed this week',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'issue_reported',
      message: 'Payment issue reported by Al Futtaim Motors',
      time: '2 days ago',
      status: 'pending'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'garage_registration': return Building2;
      case 'user_signup': return Users;
      case 'service_completed': return CheckCircle;
      case 'issue_reported': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Admin Dashboard" />
      
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-2">Welcome back, Admin!</h2>
          <p className="opacity-90">Platform overview and key metrics</p>
          <div className="flex items-center mt-4">
            <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
            <span className="text-sm">All systems operational</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users size={24} className="text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Manage Users</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Building2 size={24} className="text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Approve Garages</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText size={24} className="text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Upload Reports</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Server Performance</span>
                <span className="font-medium text-green-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Database Health</span>
                <span className="font-medium text-green-600">Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">API Response Time</span>
                <span className="font-medium text-yellow-600">Average</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}