import React, { useState } from 'react';
import Header from './Header';
import CheckoutScreen from './CheckoutScreen';
import GarageProfileModal from './GarageProfileModal';
import { FileText, Wrench, Clock, Star, MapPin, Plus } from 'lucide-react';
import { Quote, DiagnosisReport } from '../types';

interface ServicesScreenProps {
  onBack: () => void;
  initialAction?: string;
}

export default function ServicesScreen({ onBack, initialAction }: ServicesScreenProps) {
  const [activeSection, setActiveSection] = useState<'options' | 'form' | 'quotes' | 'ongoing'>(
    initialAction === 'ongoing' ? 'ongoing' : 
    initialAction === 'emergency' ? 'emergency' : 
    initialAction === 'known-issue' ? 'form' : 'options'
  );
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showGarageProfile, setShowGarageProfile] = useState(false);
  const [selectedGarageId, setSelectedGarageId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service: '',
    brand: '',
    details: ''
  });

  const quotes: Quote[] = [
    {
      id: '1',
      garageName: 'Al Futtaim Motors',
      rating: 4.8,
      price: 450,
      estimatedTime: '2-3 hours',
      description: initialAction === 'emergency' ? 'Roadside Assistance - Dubai Marina' : 'Spark plug replacement + Air filter change',
      distance: '2.3 km'
    },
    {
      id: '2',
      garageName: 'Emirates Auto Care',
      rating: 4.6,
      price: 520,
      estimatedTime: '1.5-2 hours',
      description: initialAction === 'emergency' ? 'Emergency Roadside Service - Business Bay' : 'Premium spark plugs + Air filter + Engine diagnostic',
      distance: '3.1 km'
    },
    {
      id: '3',
      garageName: 'Quick Fix Garage',
      rating: 4.4,
      price: 380,
      estimatedTime: '2-4 hours',
      description: initialAction === 'emergency' ? '24/7 Emergency Assistance - Jumeirah' : 'Standard spark plug service + Filter replacement',
      distance: '4.2 km'
    }
  ];

  const ongoingWork = [
    {
      id: '1',
      garageName: 'Al Futtaim Motors',
      service: 'Brake Pad Replacement',
      status: 'In Progress',
      estimatedCompletion: '2:30 PM',
      progress: 60
    },
    {
      id: '2',
      garageName: 'Dubai Auto Center',
      service: 'Engine Oil Change',
      status: 'Completed',
      completedAt: '1:15 PM',
      progress: 100
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
      details: 'Engine misfiring detected in cylinder 2. Spark plug replacement recommended along with air filter change.'
    },
    {
      id: '2',
      vehicleId: '1',
      date: '2024-01-10',
      type: 'video',
      status: 'completed',
      summary: 'AC System Check',
      details: 'AC refrigerant levels low, compressor working fine. Refrigerant top-up recommended.'
    },
    {
      id: '3',
      vehicleId: '1',
      date: '2024-01-05',
      type: 'location',
      status: 'completed',
      summary: 'Brake System Inspection',
      details: 'Front brake pads worn to 20%. Replacement recommended within 1000km.'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSection('quotes');
  };

  const handleServiceSelect = (type: 'known' | 'saved') => {
    if (type === 'known') {
      setActiveSection('form');
    } else {
      setActiveSection('saved-reports');
    }
  };

  const handleReportSelect = (reportId: string) => {
    setActiveSection('quotes');
  };

  const handleBookNow = (quote: Quote) => {
    setSelectedQuote(quote);
    setActiveSection('checkout');
  };

  if (activeSection === 'checkout') {
    return (
      <CheckoutScreen 
        onBack={() => setActiveSection('quotes')}
        selectedQuote={selectedQuote || undefined}
        serviceDetails={{
          type: initialAction === 'emergency' ? 'Emergency Service' : 'Brake Service',
          vehicleInfo: {
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            plate: 'A-12345'
          },
          scheduledDate: '2024-02-15',
          scheduledTime: '10:00'
        }}
      />
    );
  }
  // Determine if this is from a saved report
  const isFromSavedReport = initialAction?.startsWith('saved-report-');
  
  // Select appropriate quotes based on context
  const displayQuotes = initialAction === 'emergency' ? quotes : 
                       isFromSavedReport ? quotes.map(quote => ({
                         ...quote,
                         description: 'Engine Performance Repair - Spark plug replacement + Air filter change'
                       })) : quotes;

  if (activeSection === 'ongoing') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header title="Ongoing Work" showBack onBack={onBack} />
        
        <div className="p-4 space-y-4">
          {ongoingWork.map((work) => (
            <div key={work.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{work.service}</h3>
                  <p className="text-sm text-gray-500">{work.garageName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  work.status === 'Completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {work.status}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{work.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${work.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {work.status === 'Completed' 
                    ? `Completed at ${work.completedAt}`
                    : `Est. completion: ${work.estimatedCompletion}`
                  }
                </span>
                <button className="text-primary font-medium">
                  View Garage
                </button>
              </div>
            </div>
          ))}
          
          {ongoingWork.length === 0 && (
            <div className="bg-white p-8 rounded-xl text-center">
              <Clock size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No ongoing work</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'saved-reports') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header title="Saved Reports" showBack onBack={() => setActiveSection('options')} />
        
        <div className="p-4 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Select a Report</h2>
            <p className="text-gray-600">Choose a diagnosis report to get quotes from garages</p>
          </div>
          
          {savedReports.map((report) => (
            <button
              key={report.id}
              onClick={() => handleReportSelect(report.id)}
              className="w-full bg-white p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">{report.summary}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{report.details}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{report.date}</span>
                    <span className="capitalize">{report.type} diagnosis</span>
                    <span className={`px-2 py-1 rounded-full ${
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
          
          {savedReports.length === 0 && (
            <div className="bg-white p-8 rounded-xl text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No saved reports yet</p>
              <p className="text-sm text-gray-400">Book a diagnosis to get started</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeSection === 'options') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header title="Services" showBack onBack={onBack} />
        
        <div className="p-4 space-y-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How can we help?</h2>
            <p className="text-gray-600">Choose your service option to get accurate quotes</p>
          </div>
          
          <button
            onClick={() => handleServiceSelect('known')}
            className="w-full bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench size={32} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-1">I Already Know the Issue</h3>
                <p className="text-gray-600">Fill details for accurate quotes from garages</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => handleServiceSelect('saved')}
            className="w-full bg-white p-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <FileText size={32} className="text-green-500" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Use Saved Report</h3>
                <p className="text-gray-600">Get quotes based on previous diagnosis</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (activeSection === 'form') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header title="Service Details" showBack onBack={() => setActiveSection('options')} />
        
        <form onSubmit={handleFormSubmit} className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Required
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
              required
            >
              <option value="">Select service</option>
              <option value="oil-change">Oil Change</option>
              <option value="brake-service">Brake Service</option>
              <option value="tire-service">Tire Service</option>
              <option value="battery">Battery Service</option>
              <option value="ac-service">AC Service</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Brand (Optional)
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="e.g., Castrol, Mobil 1"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details
            </label>
            <textarea
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Any specific requirements or additional information..."
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Get Quotes from Garages
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        title={initialAction === 'emergency' ? 'Emergency Services' : 'Available Quotes'}
        showBack 
        onBack={() => setActiveSection('options')} 
      />
      
      <div className="p-4 space-y-4">
        {!isFromSavedReport && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-800 text-sm text-center">
              📍 Quotes will update within 10 minutes as garages respond
            </p>
          </div>
        )}
        
        {isFromSavedReport && (
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-green-800 text-sm text-center">
              🔧 Quotes based on your diagnostic report: Engine Performance Issue
            </p>
          </div>
        )}
        
        {displayQuotes.map((quote) => (
          <div key={quote.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{quote.garageName}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{quote.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    {quote.distance}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">AED {quote.price}</p>
                <p className="text-sm text-gray-500">{quote.estimatedTime}</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{quote.description}</p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => handleViewGarage(quote.id)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm"
              >
                View Garage
              </button>
              <button 
                onClick={() => handleBookNow(quote)}
                className="flex-1 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
        
        <button className="w-full bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500 py-8 rounded-xl flex flex-col items-center space-y-2">
          <Plus size={24} />
          <span>More quotes loading...</span>
        </button>
      </div>

      {/* Garage Profile Modal */}
      {showGarageProfile && selectedGarageId && (
        <GarageProfileModal
          garageId={selectedGarageId}
          onClose={() => setShowGarageProfile(false)}
          onBookNow={(quote) => {
            setShowGarageProfile(false);
            handleBookNow(quote);
          }}
        />
      )}
    </div>
  );
}