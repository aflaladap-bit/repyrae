import React from 'react';
import { useState } from 'react';
import Header from './Header';
import { User, Car, Settings, HelpCircle, Shield, LogOut, ChevronRight, Star, MessageCircle, Clock, Brain, Gift, Truck, FileText, CreditCard, Download, CheckCircle } from 'lucide-react';

interface ProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function ProfileScreen({ onBack, onNavigate }: ProfileScreenProps) {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [vehicles, setVehicles] = useState([
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      plate: 'A-12345',
      isPrimary: true
    },
    {
      id: '2',
      make: 'BMW',
      model: 'X5',
      year: 2015,
      plate: 'B-67890',
      isPrimary: false
    }
  ]);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: '',
    plate: ''
  });

  const menuItems = [
    { icon: Car, label: 'My Vehicles', action: () => {} },
    { icon: CheckCircle, label: 'Completed Jobs', action: () => onNavigate('completed-jobs') },
    { icon: Brain, label: 'AI Diagnostics', action: () => onNavigate('ai-diagnostics') },
    { icon: MessageCircle, label: 'Live Chat with Experts', action: () => onNavigate('live-chat') },
    { icon: Clock, label: 'Service Timeline', action: () => onNavigate('timeline') },
    { icon: Brain, label: 'Predictive Maintenance', action: () => onNavigate('predictive') },
    { icon: Download, label: 'Export Service History', action: () => onNavigate('export') },
    { icon: Gift, label: 'Loyalty Program', action: () => onNavigate('loyalty') },
    { icon: Truck, label: 'Fleet Management', action: () => onNavigate('fleet') },
    { icon: FileText, label: 'Warranty Tracking', action: () => onNavigate('warranty') },
    { icon: CreditCard, label: 'Service Financing', action: () => onNavigate('financing') },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: Shield, label: 'Privacy Policy', action: () => {} },
    { icon: Star, label: 'Rate App', action: () => {} },
    { icon: LogOut, label: 'Logout', action: () => {} },
  ];

  const handleAddVehicle = () => {
    setShowAddVehicle(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVehicle.make && newVehicle.model && newVehicle.year && newVehicle.plate) {
      const vehicle = {
        id: Date.now().toString(),
        make: newVehicle.make,
        model: newVehicle.model,
        year: parseInt(newVehicle.year),
        plate: newVehicle.plate,
        isPrimary: false
      };
      setVehicles([...vehicles, vehicle]);
      setNewVehicle({ make: '', model: '', year: '', plate: '' });
      setShowAddVehicle(false);
    }
  };

  const handleSetPrimary = (vehicleId: string) => {
    setVehicles(vehicles.map(v => ({
      ...v,
      isPrimary: v.id === vehicleId
    })));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Profile" showBack onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User size={32} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ahmed Al-Rashid</h2>
              <p className="text-gray-500">+971 50 123 4567</p>
              <p className="text-gray-500">ahmed@email.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Services</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">AED 2.1k</p>
              <p className="text-sm text-gray-500">Saved</p>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">My Vehicles</h3>
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 ${vehicle.isPrimary ? 'bg-primary/10' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                  <Car size={20} className={vehicle.isPrimary ? 'text-primary' : 'text-gray-600'} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{vehicle.make} {vehicle.model} {vehicle.year}</h4>
                  <p className="text-sm text-gray-500">Plate: {vehicle.plate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {vehicle.isPrimary ? (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Primary</span>
                  ) : (
                    <button
                      onClick={() => handleSetPrimary(vehicle.id)}
                      className="text-xs text-gray-500 hover:text-primary"
                    >
                      Set Primary
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            <button
              onClick={handleAddVehicle}
              className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg flex items-center justify-center space-x-2 hover:border-primary hover:text-primary transition-colors"
            >
              <Car size={20} />
              <span>Add Vehicle</span>
            </button>
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
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm">
          <p>Repyr v1.0.0</p>
          <p>© 2024 Repyr Technologies</p>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Vehicle</h3>
            
            <form onSubmit={handleSaveVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                <input
                  type="text"
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                  placeholder="e.g., Toyota, BMW, Mercedes"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  placeholder="e.g., Camry, X5, C-Class"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                  placeholder="e.g., 2020"
                  min="1990"
                  max="2025"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                <input
                  type="text"
                  value={newVehicle.plate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value.toUpperCase() })}
                  placeholder="e.g., A-12345"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddVehicle(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}