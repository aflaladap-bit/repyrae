import React, { useState } from 'react';
import Header from './Header';
import { Truck, Users, Plus, MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Fleet, Vehicle, FleetDriver } from '../types';

interface FleetManagementScreenProps {
  onBack: () => void;
}

export default function FleetManagementScreen({ onBack }: FleetManagementScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'drivers' | 'maintenance'>('overview');

  const fleetData: Fleet = {
    id: '1',
    companyName: 'Dubai Logistics Co.',
    adminId: 'admin1',
    vehicles: [
      {
        id: '1',
        make: 'Mercedes',
        model: 'Sprinter',
        year: 2022,
        plate: 'D-12345'
      },
      {
        id: '2',
        make: 'Toyota',
        model: 'Hiace',
        year: 2021,
        plate: 'D-67890'
      },
      {
        id: '3',
        make: 'Isuzu',
        model: 'NPR',
        year: 2020,
        plate: 'D-11111'
      }
    ],
    drivers: [
      {
        id: '1',
        name: 'Ahmed Hassan',
        phone: '+971 50 123 4567',
        assignedVehicles: ['1', '2']
      },
      {
        id: '2',
        name: 'Mohammed Ali',
        phone: '+971 55 987 6543',
        assignedVehicles: ['3']
      }
    ]
  };

  const maintenanceAlerts = [
    {
      vehicleId: '1',
      vehicleName: 'Mercedes Sprinter (D-12345)',
      type: 'Oil Change Due',
      priority: 'high',
      dueDate: '2024-02-15',
      driver: 'Ahmed Hassan'
    },
    {
      vehicleId: '2',
      vehicleName: 'Toyota Hiace (D-67890)',
      type: 'Tire Inspection',
      priority: 'medium',
      dueDate: '2024-02-20',
      driver: 'Ahmed Hassan'
    },
    {
      vehicleId: '3',
      vehicleName: 'Isuzu NPR (D-11111)',
      type: 'Brake Service',
      priority: 'high',
      dueDate: '2024-02-10',
      driver: 'Mohammed Ali'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'vehicles' as const, label: 'Vehicles' },
    { id: 'drivers' as const, label: 'Drivers' },
    { id: 'maintenance' as const, label: 'Maintenance' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Fleet Management" showBack onBack={onBack} />
      
      {/* Company Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Truck size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{fleetData.companyName}</h2>
            <p className="text-sm text-gray-500">{fleetData.vehicles.length} vehicles • {fleetData.drivers.length} drivers</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Fleet Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{fleetData.vehicles.length}</p>
                    <p className="text-sm text-gray-500">Total Vehicles</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{fleetData.drivers.length}</p>
                    <p className="text-sm text-gray-500">Active Drivers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Alerts */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Alerts</h3>
              <div className="space-y-3">
                {maintenanceAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle size={20} className="text-orange-500" />
                      <div>
                        <p className="font-medium text-gray-900">{alert.type}</p>
                        <p className="text-sm text-gray-600">{alert.vehicleName}</p>
                        <p className="text-xs text-gray-500">Driver: {alert.driver}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Due: {alert.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'vehicles' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Fleet Vehicles</h3>
              <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus size={16} />
                <span>Add Vehicle</span>
              </button>
            </div>
            
            {fleetData.vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Truck size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{vehicle.make} {vehicle.model}</h4>
                      <p className="text-sm text-gray-500">Year: {vehicle.year} • Plate: {vehicle.plate}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-xs text-green-600">Active</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-primary font-medium">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Fleet Drivers</h3>
              <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus size={16} />
                <span>Add Driver</span>
              </button>
            </div>
            
            {fleetData.drivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{driver.name}</h4>
                      <p className="text-sm text-gray-500">{driver.phone}</p>
                      <p className="text-xs text-gray-500">
                        Assigned to {driver.assignedVehicles.length} vehicle(s)
                      </p>
                    </div>
                  </div>
                  <button className="text-primary font-medium">Manage</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Maintenance Schedule</h3>
            
            {maintenanceAlerts.map((alert, index) => (
              <div key={index} className="bg-white rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{alert.type}</h4>
                    <p className="text-sm text-gray-600">{alert.vehicleName}</p>
                    <p className="text-sm text-gray-500">Assigned to: {alert.driver}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                    {alert.priority} priority
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Due: {alert.dueDate}</span>
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                    Schedule Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}