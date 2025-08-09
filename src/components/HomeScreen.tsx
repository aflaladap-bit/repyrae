import React from 'react';
import { useState } from 'react';
import Header from './Header';
import { Search, MapPin, AlertTriangle, ChevronDown, Wrench, Battery, Wind, Gauge, Truck, Clock, MessageCircle, CreditCard, ArrowRight, CheckCircle, Shield, Settings } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (tab: 'diagnosis' | 'services', action?: string) => void;
  onProfileNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate, onProfileNavigate }: HomeScreenProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('1');
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);

  const vehicles = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      plate: 'A-12345'
    },
    {
      id: '2',
      make: 'BMW',
      model: 'X5',
      year: 2015,
      plate: 'B-67890'
    }
  ];

  const currentVehicle = vehicles.find(v => v.id === selectedVehicle) || vehicles[0];

  const quickActions = [
    {
      title: 'Book Diagnosis',
      subtitle: 'Get expert assessment',
      icon: Search,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
      action: () => onNavigate('diagnosis')
    },
    {
      title: 'Find a Garage',
      subtitle: 'Browse services',
      icon: MapPin,
      color: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700',
      action: () => onNavigate('services')
    },
    {
      title: 'Emergency',
      subtitle: '24/7 roadside help',
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-red-500 via-red-600 to-rose-700',
      action: () => onNavigate('services', 'emergency')
    }
  ];

  const services = [
    { name: 'AC Service', icon: Wind, color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { name: 'Battery', icon: Battery, color: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { name: 'Tire Service', icon: Gauge, color: 'bg-gradient-to-br from-gray-500 to-gray-700' },
    { name: 'Recovery', icon: Truck, color: 'bg-gradient-to-br from-orange-400 to-red-500' },
    { name: 'Ongoing Work', icon: Clock, color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
    { name: 'Oil Change', icon: Wrench, color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { name: 'Vehicle Inspection', icon: Search, color: 'bg-gradient-to-br from-indigo-400 to-purple-600' },
    { name: 'Engine Repair', icon: Settings, color: 'bg-gradient-to-br from-red-400 to-pink-600' }
  ];

  const financingOffers = [
    {
      title: "0% Interest Financing",
      subtitle: "Split your service cost into 4 payments",
      provider: "Tabby",
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      title: "Pay Later Options",
      subtitle: "Flexible payment plans available",
      provider: "Tamara",
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Good morning!" />
      
      <div className="p-4 space-y-6">
        {/* Live Chat Banner */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Need Expert Help?</h3>
                <p className="text-sm opacity-90">Chat with certified mechanics now</p>
              </div>
            </div>
            <button 
              onClick={() => onProfileNavigate('live-chat')}
              className="bg-white/20 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-white/30 transition-colors"
            >
              <span className="text-sm font-medium">Chat Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex items-center mt-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm opacity-90">5 experts online</span>
          </div>
        </div>

        {/* Financing Promotional Slider */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Flexible Payment Options</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {financingOffers.map((offer, index) => (
              <button
                key={index}
                onClick={() => onProfileNavigate('financing')}
                className={`${offer.color} text-white p-4 rounded-xl min-w-[280px] flex-shrink-0 hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{offer.title}</h3>
                    <p className="text-sm opacity-90">{offer.subtitle}</p>
                    <p className="text-xs opacity-75 mt-1">Powered by {offer.provider}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`w-full ${action.color} text-white p-4 rounded-xl flex items-center space-x-4 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <action.icon size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Blockchain Verification */}
        <section>
          <button 
            onClick={() => onProfileNavigate('timeline')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-xl flex items-center justify-between hover:opacity-90 transition-opacity shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Verify Service Records</h3>
                <p className="text-sm opacity-90">Generate buyer-ready vehicle report</p>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <div className="flex items-center space-x-1 text-xs opacity-90 mb-1">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span>Verified</span>
              </div>
              <div className="flex items-center space-x-1 text-xs opacity-75">
                <span>Share with buyers</span>
              </div>
            </div>
          </button>
        </section>

        {/* Vehicle Selection */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Vehicle</h2>
          <div className="relative">
            <button 
              onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
              className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 rounded-xl border border-blue-200 flex items-center justify-between hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wrench size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{currentVehicle.make} {currentVehicle.model} {currentVehicle.year}</h3>
                  <p className="text-sm text-gray-500">Plate: {currentVehicle.plate}</p>
                </div>
              </div>
              <ChevronDown size={20} className={`text-gray-400 transition-transform ${showVehicleDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showVehicleDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => {
                      setSelectedVehicle(vehicle.id);
                      setShowVehicleDropdown(false);
                    }}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      vehicle.id === selectedVehicle ? 'bg-primary/5 border-l-4 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        vehicle.id === selectedVehicle ? 'bg-primary/10' : 'bg-gray-100'
                      }`}>
                        <Wrench size={16} className={vehicle.id === selectedVehicle ? 'text-primary' : 'text-gray-600'} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{vehicle.make} {vehicle.model} {vehicle.year}</h4>
                        <p className="text-sm text-gray-500">Plate: {vehicle.plate}</p>
                      </div>
                    </div>
                    {vehicle.id === selectedVehicle && (
                      <div className="flex items-center mt-2 ml-11">
                        <CheckCircle size={16} className="text-primary mr-2" />
                        <span className="text-sm text-primary font-medium">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Services Grid */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => 
                  service.name === 'Ongoing Work' 
                    ? onNavigate('services', 'ongoing') 
                    : service.name === 'Vehicle Inspection'
                    ? onNavigate('home', 'vehicle-inspection')
                    : onNavigate('services', 'known-issue')
                }
                className="bg-gradient-to-br from-white via-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:from-gray-50 hover:via-gray-100 hover:to-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mb-3 mx-auto`}>
                  <service.icon size={24} className="text-white" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{service.name}</h3>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}