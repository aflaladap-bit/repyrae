import React, { useState } from 'react';
import Header from './Header';
import { Home, MapPin, Calendar, Clock, User, Phone, Car, FileText, CheckCircle } from 'lucide-react';

interface VehicleInspectionScreenProps {
  screen: 'options' | 'booking';
  inspectionType: 'visit-me' | 'visit-location' | null;
  onBack: () => void;
  onSelectType: (type: 'visit-me' | 'visit-location') => void;
}

export default function VehicleInspectionScreen({ 
  screen, 
  inspectionType, 
  onBack, 
  onSelectType 
}: VehicleInspectionScreenProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    address: '',
    vehicleDetails: '',
    inspectionType: 'comprehensive',
    specialRequests: ''
  });

  const inspectionOptions = [
    {
      type: 'visit-me' as const,
      title: 'Inspector Visits You',
      subtitle: 'We come to your location',
      icon: Home,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
      price: 'AED 200',
      duration: '45-60 minutes',
      features: ['Comprehensive inspection', 'Digital report', 'Photos included', 'Same-day results']
    },
    {
      type: 'visit-location' as const,
      title: 'Visit Our Center',
      subtitle: 'Bring your car to us',
      icon: MapPin,
      color: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700',
      price: 'AED 150',
      duration: '30-45 minutes',
      features: ['Professional equipment', 'Detailed analysis', 'Immediate results', 'Expert consultation']
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the booking
    alert('Vehicle inspection booked successfully!');
  };

  if (screen === 'options') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header title="Vehicle Inspection" showBack onBack={onBack} />
        
        <div className="p-4 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Inspection Type</h2>
            <p className="text-gray-600">Professional vehicle inspection for peace of mind</p>
          </div>
          
          {inspectionOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => onSelectType(option.type)}
              className={`w-full ${option.color} text-white p-6 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <option.icon size={32} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-left">{option.title}</h3>
                    <div className="text-right">
                      <p className="text-xl font-bold">{option.price}</p>
                      <p className="text-sm opacity-90">{option.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mb-4 text-left">{option.subtitle}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-left">
                        <CheckCircle size={16} className="text-white/80" />
                        <span className="text-sm opacity-90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
          
          {/* What's Included */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Engine & Transmission</p>
                  <p className="text-sm text-gray-600">Complete mechanical inspection</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Safety Systems</p>
                  <p className="text-sm text-gray-600">Brakes, lights, steering, suspension</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Body & Interior</p>
                  <p className="text-sm text-gray-600">Damage assessment, wear evaluation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Digital Report</p>
                  <p className="text-sm text-gray-600">Detailed findings with photos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedOption = inspectionOptions.find(opt => opt.type === inspectionType);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        title={`Book ${selectedOption?.title}`} 
        showBack 
        onBack={onBack} 
      />
      
      <div className="p-4 space-y-6">
        {/* Selected Service Summary */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {selectedOption && <selectedOption.icon size={24} className="text-primary" />}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedOption?.title}</h3>
              <p className="text-sm text-gray-500">{selectedOption?.subtitle}</p>
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-600">Total Cost:</span>
            <span className="text-xl font-bold text-gray-900">{selectedOption?.price}</span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+971 50 123 4567"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            
            {inspectionType === 'visit-me' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your complete address"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Vehicle Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inspection Type
              </label>
              <select
                value={formData.inspectionType}
                onChange={(e) => setFormData({ ...formData, inspectionType: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="comprehensive">Comprehensive Inspection</option>
                <option value="pre-purchase">Pre-Purchase Inspection</option>
                <option value="insurance">Insurance Inspection</option>
                <option value="warranty">Warranty Inspection</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Details
              </label>
              <textarea
                rows={3}
                value={formData.vehicleDetails}
                onChange={(e) => setFormData({ ...formData, vehicleDetails: e.target.value })}
                placeholder="Any specific concerns or areas to focus on..."
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                rows={2}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Any additional requirements..."
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-lg font-medium text-lg hover:bg-primary-dark transition-colors"
          >
            Book Inspection - {selectedOption?.price}
          </button>
        </form>
      </div>
    </div>
  );
}