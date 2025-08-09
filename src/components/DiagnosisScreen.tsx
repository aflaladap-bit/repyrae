import React, { useState } from 'react';
import Header from './Header';
import { Home, Video, MapPin, Brain, FileText, Calendar, CheckCircle, Clock } from 'lucide-react';
import { DiagnosisReport } from '../types';

interface DiagnosisScreenProps {
  onBack: () => void;
  onNavigate?: (tab: 'profile', action: string) => void;
}

export default function DiagnosisScreen({ onBack, onNavigate }: DiagnosisScreenProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<'technician' | 'video' | 'location' | null>(null);
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState<string>('all');

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

  const diagnosisOptions = [
    {
      type: 'technician' as const,
      title: 'Book Technician Visit',
      subtitle: 'Expert comes to your location',
      icon: Home,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
      price: 'AED 150'
    },
    {
      type: 'video' as const,
      title: 'Video Call Diagnosis',
      subtitle: 'Remote diagnosis via video',
      icon: Video,
      color: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700',
      price: 'AED 50'
    },
    {
      type: 'location' as const,
      title: 'Visit Our Location',
      subtitle: 'Drop by our service center',
      icon: MapPin,
      color: 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-600',
      price: 'AED 100'
    }
  ];

  const savedReports: DiagnosisReport[] = [
    {
      id: '1',
      vehicleId: '1',
      date: '2024-01-15',
      type: 'technician',
      status: 'completed',
      summary: 'Engine Performance Issue',
      details: 'Detailed diagnostic report available'
    },
    {
      id: '2',
      vehicleId: '1',
      date: '2024-01-10',
      type: 'video',
      status: 'completed',
      summary: 'AC System Check',
      details: 'AC refrigerant levels low, compressor working fine'
    }
  ];

  const handleBookDiagnosis = (type: 'technician' | 'video' | 'location') => {
    setBookingType(type);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = () => {
    setShowBookingModal(false);
    setBookingType(null);
    // Here you would typically save the booking
    alert('Diagnosis booked successfully!');
  };

  const handleGetQuotes = (reportId: string) => {
    // Navigate to services with the selected report
    if (onNavigate) {
      onNavigate('services', `saved-report-${reportId}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Diagnosis" showBack onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Diagnosis Options */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Diagnosis</h2>
          <div className="space-y-3">
            {diagnosisOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => handleBookDiagnosis(option.type)}
                className={`w-full ${option.color} text-white p-4 rounded-xl flex items-center space-x-4 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <option.icon size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm opacity-90">{option.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{option.price}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* AI Symptom Check */}
        <section>
          <button 
            disabled={true}
            className="w-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 text-white p-4 rounded-xl flex items-center space-x-4 opacity-60 cursor-not-allowed transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Brain size={24} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium">AI Symptom Check</h3>
              <p className="text-sm opacity-90">Smart AI-powered diagnosis</p>
            </div>
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full">Coming Soon</span>
          </button>
        </section>

        {/* Saved Reports */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Reports</h2>
          {savedReports.length > 0 ? (
            <div className="space-y-3">
              {savedReports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setShowReportModal(true)}
                  className="w-full bg-white p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">{report.summary}</h3>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {report.status === 'completed' ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <Clock size={20} className="text-yellow-500" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No saved reports yet</p>
            </div>
          )}
        </section>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-2xl w-full p-6 space-y-4">
            <h3 className="text-lg font-semibold">
              Book {bookingType === 'technician' ? 'Technician Visit' : 
                   bookingType === 'video' ? 'Video Call' : 'Location Visit'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the Issue
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the problem..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              {bookingType === 'technician' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingSubmit}
                className="flex-1 py-3 bg-primary text-white rounded-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Engine Performance Issue</h3>
              <p className="text-sm text-gray-500">Diagnosed on Jan 15, 2024</p>
            </div>
            
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                <p className="text-gray-600">Engine misfiring detected in cylinder 2. Spark plug replacement recommended along with air filter change.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Replace spark plugs (all 4 cylinders)</li>
                  <li>• Change air filter</li>
                  <li>• Check ignition coil</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Estimated Cost</h4>
                <p className="text-gray-600">AED 450 - 650</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => handleGetQuotes('1')}
                className="flex-1 py-3 bg-primary text-white rounded-lg"
              >
                Get Quotes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}