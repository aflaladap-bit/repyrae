import React from 'react';
import Header from './Header';
import { Brain, Calendar, AlertTriangle, Wrench, TrendingUp, Battery, Wind, Gauge } from 'lucide-react';
import { MaintenanceItem } from '../types';

interface PredictiveMaintenanceScreenProps {
  onBack: () => void;
}

export default function PredictiveMaintenanceScreen({ onBack }: PredictiveMaintenanceScreenProps) {
  const upcomingMaintenance: MaintenanceItem[] = [
    {
      id: '1',
      vehicleId: '1',
      type: 'Oil Change',
      description: 'Engine oil and filter replacement due',
      dueDate: '2024-02-15',
      dueMileage: 85000,
      priority: 'high',
      estimatedCost: 180,
      aiConfidence: 95
    },
    {
      id: '2',
      vehicleId: '1',
      type: 'Brake Pads',
      description: 'Front brake pads showing wear indicators',
      dueDate: '2024-03-01',
      dueMileage: 87000,
      priority: 'medium',
      estimatedCost: 450,
      aiConfidence: 88
    },
    {
      id: '3',
      vehicleId: '1',
      type: 'Air Filter',
      description: 'Air filter replacement recommended',
      dueDate: '2024-02-20',
      dueMileage: 86000,
      priority: 'low',
      estimatedCost: 80,
      aiConfidence: 92
    },
    {
      id: '4',
      vehicleId: '1',
      type: 'Battery Check',
      description: 'Battery performance declining, inspection needed',
      dueDate: '2024-02-10',
      dueMileage: 84500,
      priority: 'medium',
      estimatedCost: 120,
      aiConfidence: 85
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'oil change': return <Wrench className="text-blue-500" size={20} />;
      case 'brake pads': return <Gauge className="text-red-500" size={20} />;
      case 'air filter': return <Wind className="text-green-500" size={20} />;
      case 'battery check': return <Battery className="text-yellow-500" size={20} />;
      default: return <Wrench className="text-gray-500" size={20} />;
    }
  };

  const totalEstimatedCost = upcomingMaintenance.reduce((sum, item) => sum + item.estimatedCost, 0);
  const highPriorityItems = upcomingMaintenance.filter(item => item.priority === 'high').length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Predictive Maintenance" showBack onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* AI Insights Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
              <p className="text-sm opacity-90">Based on your driving patterns & vehicle data</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{upcomingMaintenance.length}</p>
              <p className="text-sm opacity-90">Items Due</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{highPriorityItems}</p>
              <p className="text-sm opacity-90">High Priority</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">AED {totalEstimatedCost}</p>
              <p className="text-sm opacity-90">Est. Cost</p>
            </div>
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Maintenance</h3>
          <div className="space-y-4">
            {upcomingMaintenance.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getServiceIcon(item.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.type}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                    {item.priority} priority
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} />
                    <span>At: {item.dueMileage.toLocaleString()} km</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">AI Confidence:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${item.aiConfidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.aiConfidence}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">AED {item.estimatedCost}</p>
                    <button className="text-primary text-sm font-medium hover:underline">
                      Get Quotes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Tips */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Schedule Oil Change Soon</p>
                <p className="text-sm text-gray-600">Your driving pattern suggests oil change is due in 2 weeks</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Monitor Brake Performance</p>
                <p className="text-sm text-gray-600">Increased city driving may require earlier brake maintenance</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Optimal Service Timing</p>
                <p className="text-sm text-gray-600">Bundle air filter with oil change to save AED 50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}