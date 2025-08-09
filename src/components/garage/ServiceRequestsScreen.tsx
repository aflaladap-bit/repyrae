import React, { useState } from 'react';
import Header from '../Header';
import { Clock, CheckCircle, AlertTriangle, Phone, MapPin, Car, Filter, DollarSign, Send, Plus, Minus, Upload, FileText, Calendar } from 'lucide-react';
import { ServiceRequest } from '../../types';

export default function ServiceRequestsScreen() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'quoted' | 'in-progress' | 'completed'>('all');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showQuickQuote, setShowQuickQuote] = useState<string | null>(null);
  const [showJobCompletion, setShowJobCompletion] = useState<string | null>(null);
  const [quickQuoteData, setQuickQuoteData] = useState({
    basePrice: '',
    laborHours: '2',
    partsNeeded: false,
    partsPrice: '',
    urgentService: false,
    warranty: '6 months',
    notes: ''
  });
  const [jobCompletionData, setJobCompletionData] = useState({
    workPerformed: '',
    partsUsed: '',
    laborHours: '',
    totalCost: '',
    warrantyType: 'parts-labor',
    warrantyPeriod: '6',
    warrantyDetails: '',
    customerNotes: '',
    photos: [] as File[],
    warrantyDocument: null as File | null
  });

  const serviceRequests: ServiceRequest[] = [
    {
      id: '4',
      customerId: 'cust4',
      customerName: 'Ahmed Al-Rashid',
      customerPhone: '+971 50 123 4567',
      vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        plate: 'A-12345'
      },
      serviceType: 'Engine Performance Issue',
      description: 'Engine misfiring detected in cylinder 2. Spark plug replacement recommended along with air filter change.',
      urgency: 'high',
      preferredDate: '2024-02-16',
      preferredTime: '09:00',
      location: 'Dubai Marina, Dubai',
      status: 'pending',
      quotes: [],
      createdAt: '2024-02-15T10:30:00Z',
      updatedAt: '2024-02-15T10:30:00Z'
    },
    {
      id: '1',
      customerId: 'cust1',
      customerName: 'Ahmed Al-Rashid',
      customerPhone: '+971 50 123 4567',
      vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        plate: 'A-12345'
      },
      serviceType: 'Oil Change',
      description: 'Regular oil change service needed. Vehicle has 45,000 km.',
      urgency: 'medium',
      preferredDate: '2024-02-15',
      preferredTime: '10:30',
      location: 'Dubai Marina, Dubai',
      status: 'pending',
      quotes: [],
      createdAt: '2024-02-10T08:30:00Z',
      updatedAt: '2024-02-10T08:30:00Z'
    },
    {
      id: '2',
      customerId: 'cust2',
      customerName: 'Sara Mohammed',
      customerPhone: '+971 55 987 6543',
      vehicleInfo: {
        make: 'Honda',
        model: 'Accord',
        year: 2019,
        plate: 'B-67890'
      },
      serviceType: 'Brake Service',
      description: 'Brake pads making squealing noise. Urgent repair needed.',
      urgency: 'high',
      preferredDate: '2024-02-12',
      preferredTime: '09:00',
      location: 'Business Bay, Dubai',
      status: 'in-progress',
      quotes: [
        {
          id: 'q1',
          garageId: 'garage1',
          garageName: 'Al Futtaim Motors',
          price: 450,
          estimatedTime: '2-3 hours',
          description: 'Front brake pads replacement with premium pads',
          validUntil: '2024-02-15T23:59:59Z',
          status: 'accepted',
          createdAt: '2024-02-10T10:00:00Z'
        }
      ],
      createdAt: '2024-02-09T14:20:00Z',
      updatedAt: '2024-02-10T10:00:00Z'
    },
    {
      id: '3',
      customerId: 'cust3',
      customerName: 'Omar Hassan',
      customerPhone: '+971 52 456 7890',
      vehicleInfo: {
        make: 'Nissan',
        model: 'Altima',
        year: 2021,
        plate: 'C-11111'
      },
      serviceType: 'AC Repair',
      description: 'Air conditioning not cooling properly. Refrigerant might be low.',
      urgency: 'low',
      preferredDate: '2024-02-18',
      preferredTime: '14:00',
      status: 'quoted',
      quotes: [
        {
          id: 'q2',
          garageId: 'garage1',
          garageName: 'Al Futtaim Motors',
          price: 320,
          estimatedTime: '1-2 hours',
          description: 'AC system diagnosis and refrigerant refill',
          validUntil: '2024-02-16T23:59:59Z',
          status: 'pending',
          createdAt: '2024-02-10T16:30:00Z'
        }
      ],
      createdAt: '2024-02-08T11:15:00Z',
      updatedAt: '2024-02-10T16:30:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'quoted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const filteredRequests = filter === 'all' 
    ? serviceRequests 
    : serviceRequests.filter(req => req.status === filter);

  // Mock diagnostic data that would come from the customer's AI diagnosis
  const getMockDiagnosticData = (serviceType: string) => {
    const diagnosticData = {
      'Oil Change': {
        confidence: 76,
        primaryIssue: 'General Maintenance Required',
        severity: 'medium' as const,
        description: 'Your vehicle shows signs of general wear and maintenance needs. Regular service recommended.',
        possibleCauses: [
          'Normal wear and tear',
          'Overdue maintenance',
          'Environmental factors',
          'Driving conditions',
          'Age-related component wear'
        ],
        recommendations: [
          'Schedule comprehensive inspection',
          'Perform routine maintenance',
          'Check fluid levels',
          'Inspect belts and hoses',
          'Update service records'
        ],
        partsRequired: [
          'Engine Oil (5L)',
          'Oil Filter',
          'Air Filter'
        ],
        urgency: 'Schedule within 1-2 weeks'
      },
      'Brake Service': {
        confidence: 94,
        primaryIssue: 'Brake System Warning',
        severity: 'high' as const,
        description: 'Critical brake system issues detected. Immediate inspection required for safety.',
        possibleCauses: [
          'Worn brake pads',
          'Warped brake rotors',
          'Low brake fluid',
          'Brake caliper malfunction',
          'ABS system fault'
        ],
        recommendations: [
          'Stop driving immediately if brakes feel unsafe',
          'Inspect brake pads and rotors',
          'Check brake fluid level and quality',
          'Test brake system pressure',
          'Replace worn components'
        ],
        partsRequired: [
          'Brake Pads (Front Set)',
          'Brake Rotors (Pair)',
          'Brake Fluid (1L)'
        ],
        urgency: 'URGENT - Address immediately for safety'
      },
      'AC Repair': {
        confidence: 85,
        primaryIssue: 'AC System Malfunction',
        severity: 'high' as const,
        description: 'Air conditioning system not cooling properly. Refrigerant levels low and compressor showing signs of wear.',
        possibleCauses: [
          'Low refrigerant levels',
          'Compressor malfunction',
          'Clogged AC condenser',
          'Faulty expansion valve',
          'AC evaporator leak'
        ],
        recommendations: [
          'Recharge AC refrigerant',
          'Replace AC compressor',
          'Clean AC condenser',
          'Replace expansion valve',
          'Repair evaporator leak'
        ],
        partsRequired: [
          'AC Refrigerant (R134a)',
          'AC Compressor',
          'AC Condenser'
        ],
        urgency: 'Address within 1 week for comfort'
      },
      'Engine Performance Issue': {
        confidence: 89,
        primaryIssue: 'Engine Performance Issue',
        severity: 'high' as const,
        description: 'Engine misfiring detected in cylinder 2. Spark plug replacement recommended along with air filter change.',
        possibleCauses: [
          'Faulty spark plugs or ignition coils',
          'Clogged fuel injectors',
          'Air filter restriction',
          'Fuel pump malfunction',
          'Oxygen sensor failure'
        ],
        recommendations: [
          'Replace spark plugs and ignition coils',
          'Clean fuel injectors',
          'Replace air filter',
          'Test fuel pressure system',
          'Replace oxygen sensor'
        ],
        partsRequired: [
          'Spark Plugs (Set of 4)',
          'Ignition Coils (Set of 4)',
          'Air Filter'
        ],
        urgency: 'Address within 1-2 days to prevent further damage'
      }
    };
    
    return diagnosticData[serviceType as keyof typeof diagnosticData] || diagnosticData['Oil Change'];
  };

  const handleCreateQuote = (requestId: string) => {
    setShowQuickQuote(requestId);
  };

  const handleQuickQuoteSubmit = () => {
    const totalPrice = calculateTotalPrice();
    // Here you would submit the quote
    console.log('Submitting quote:', { ...quickQuoteData, totalPrice });
    setShowQuickQuote(null);
    setQuickQuoteData({
      basePrice: '',
      laborHours: '2',
      partsNeeded: false,
      partsPrice: '',
      urgentService: false,
      warranty: '6 months',
      notes: ''
    });
    alert('Quote sent successfully!');
  };

  const handleJobCompletion = (requestId: string) => {
    setShowJobCompletion(requestId);
  };

  const handleJobCompletionSubmit = () => {
    // Here you would submit the job completion data and warranty info
    console.log('Submitting job completion:', jobCompletionData);
    setShowJobCompletion(null);
    setJobCompletionData({
      workPerformed: '',
      partsUsed: '',
      laborHours: '',
      totalCost: '',
      warrantyType: 'parts-labor',
      warrantyPeriod: '6',
      warrantyDetails: '',
      customerNotes: '',
      photos: [],
      warrantyDocument: null
    });
    alert('Job completed and warranty information uploaded successfully!');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setJobCompletionData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const handleWarrantyDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJobCompletionData(prev => ({
        ...prev,
        warrantyDocument: e.target.files![0]
      }));
    }
  };

  const calculateTotalPrice = () => {
    const base = parseFloat(quickQuoteData.basePrice) || 0;
    const parts = quickQuoteData.partsNeeded ? (parseFloat(quickQuoteData.partsPrice) || 0) : 0;
    const urgentFee = quickQuoteData.urgentService ? base * 0.2 : 0;
    return base + parts + urgentFee;
  };

  const adjustPrice = (amount: number) => {
    const currentPrice = parseFloat(quickQuoteData.basePrice) || 0;
    const newPrice = Math.max(0, currentPrice + amount);
    setQuickQuoteData({ ...quickQuoteData, basePrice: newPrice.toString() });
  };

  if (selectedRequest) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header 
          title="Service Request Details" 
          showBack 
          onBack={() => setSelectedRequest(null)} 
        />
        
        <div className="p-4 space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {selectedRequest.customerName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedRequest.customerName}</p>
                  <p className="text-sm text-gray-600">{selectedRequest.customerPhone}</p>
                </div>
              </div>
              
              {selectedRequest.location && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{selectedRequest.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Car size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {selectedRequest.vehicleInfo.make} {selectedRequest.vehicleInfo.model} {selectedRequest.vehicleInfo.year}
                </p>
                <p className="text-sm text-gray-600">Plate: {selectedRequest.vehicleInfo.plate}</p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Request</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Service Type</p>
                <p className="text-gray-900">{selectedRequest.serviceType}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Description</p>
                <p className="text-gray-900">{selectedRequest.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Preferred Date</p>
                  <p className="text-gray-900">{new Date(selectedRequest.preferredDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Preferred Time</p>
                  <p className="text-gray-900">{selectedRequest.preferredTime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <AlertTriangle size={16} className={getUrgencyColor(selectedRequest.urgency)} />
                <span className="text-sm font-medium capitalize">{selectedRequest.urgency} Priority</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button 
              onClick={() => handleCreateQuote(selectedRequest.id)}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium"
            >
              Create Quote
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center space-x-2">
                <Phone size={16} />
                <span>Call Customer</span>
              </button>
              <button className="py-3 border border-gray-300 text-gray-700 rounded-lg">
                Schedule Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Service Requests" />
      
      <div className="p-4 space-y-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-1">
          <div className="flex overflow-x-auto space-x-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'pending', label: 'Pending' },
              { id: 'quoted', label: 'Quoted' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{request.customerName}</h4>
                  <p className="text-sm text-gray-600">
                    {request.vehicleInfo.make} {request.vehicleInfo.model} {request.vehicleInfo.year}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={16} className={getUrgencyColor(request.urgency)} />
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="font-medium text-gray-900">{request.serviceType}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>Preferred: {new Date(request.preferredDate).toLocaleDateString()} at {request.preferredTime}</span>
                <span>{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm"
                >
                  View Details
                </button>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleCreateQuote(request.id)}
                    className="flex-1 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    Create Quote
                  </button>
                )}
                {request.status === 'in-progress' && (
                  <button
                    onClick={() => handleJobCompletion(request.id)}
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm"
                  >
                    Complete Job
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="bg-white p-8 rounded-xl text-center">
            <Clock size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No {filter === 'all' ? '' : filter} requests found</p>
          </div>
        )}
      </div>

      {/* Quick Quote Modal */}
      {showQuickQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create Quote</h3>
                <button
                  onClick={() => setShowQuickQuote(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {(() => {
                const request = serviceRequests.find(r => r.id === showQuickQuote);
                const diagnosticData = request ? getMockDiagnosticData(request.serviceType) : null;
                
                return (
                  <>
              {/* Issue Description */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Issue Description</h4>
                <p className="text-gray-700">
                  {serviceRequests.find(r => r.id === showQuickQuote)?.description}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Service Type:</span> {serviceRequests.find(r => r.id === showQuickQuote)?.serviceType}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Customer:</span> {serviceRequests.find(r => r.id === showQuickQuote)?.customerName}
                </div>
              </div>

              {/* Customer's Comprehensive Diagnostic Report */}
              {diagnosticData && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Customer's Comprehensive Diagnostic Report</h4>
                <div className="space-y-3">
                  <div>
                    <h6 className="font-medium text-gray-700 mb-1">Required Repairs:</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {diagnosticData.recommendations.map((rec, index) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              )}

              {/* Parts Required Summary */}
              {diagnosticData && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Parts Required</h4>
                <div className="space-y-2">
                  <ul className="space-y-2 text-gray-700">
                    {diagnosticData.partsRequired.map((part, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span>{part}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              )}

              {/* Submit Your Quote Form */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Submit Your Quote</h4>
                
                <div className="space-y-4">
                  {/* Labor Cost */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Labor Cost (AED)
                      </label>
                      <input
                        type="number"
                        value={quickQuoteData.basePrice}
                        onChange={(e) => setQuickQuoteData({ ...quickQuoteData, basePrice: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Completion Time
                      </label>
                      <select
                        value={quickQuoteData.laborHours}
                        onChange={(e) => setQuickQuoteData({ ...quickQuoteData, laborHours: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                        <option value="6">6 hours</option>
                        <option value="8">Full day</option>
                      </select>
                    </div>
                  </div>

                  {/* Parts Cost Breakdown */}
                  {diagnosticData && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parts Cost Breakdown
                    </label>
                    <div className="space-y-2">
                      <div className="space-y-3">
                        {diagnosticData.partsRequired.map((part, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                            <span className="text-gray-700">{part}</span>
                            <input
                              type="number"
                              placeholder="Price"
                              className="w-20 p-2 border border-gray-300 rounded text-sm text-right"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Total Parts Cost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Parts Cost (AED)
                    </label>
                    <input
                      type="number"
                      value={quickQuoteData.partsPrice}
                      onChange={(e) => setQuickQuoteData({ ...quickQuoteData, partsPrice: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="250"
                    />
                  </div>

                  {/* Quote Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">Quote Summary</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Labor Cost:</span>
                        <span className="font-medium">AED {quickQuoteData.basePrice || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Parts Cost:</span>
                        <span className="font-medium">AED {quickQuoteData.partsPrice || '0'}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total Quote:</span>
                        <span className="text-primary">AED {((parseFloat(quickQuoteData.basePrice) || 0) + (parseFloat(quickQuoteData.partsPrice) || 0)).toFixed(0)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Estimated completion: {quickQuoteData.laborHours} hour(s)
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      rows={3}
                      value={quickQuoteData.notes}
                      onChange={(e) => setQuickQuoteData({ ...quickQuoteData, notes: e.target.value })}
                      placeholder="Any special instructions, warranty details, or additional information..."
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
                  </>
                );
              })()}
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowQuickQuote(null)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleQuickQuoteSubmit}
                  disabled={!quickQuoteData.basePrice}
                  className="flex-1 py-3 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send size={16} />
                  <span>Send Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Completion Modal */}
      {showJobCompletion && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Complete Job & Add Warranty</h3>
                <button
                  onClick={() => setShowJobCompletion(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Job Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Job Summary</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Performed
                    </label>
                    <textarea
                      rows={3}
                      value={jobCompletionData.workPerformed}
                      onChange={(e) => setJobCompletionData({ ...jobCompletionData, workPerformed: e.target.value })}
                      placeholder="Describe the work completed..."
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parts Used
                    </label>
                    <textarea
                      rows={2}
                      value={jobCompletionData.partsUsed}
                      onChange={(e) => setJobCompletionData({ ...jobCompletionData, partsUsed: e.target.value })}
                      placeholder="List all parts used..."
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Labor Hours
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={jobCompletionData.laborHours}
                        onChange={(e) => setJobCompletionData({ ...jobCompletionData, laborHours: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="2.5"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Cost (AED)
                      </label>
                      <input
                        type="number"
                        value={jobCompletionData.totalCost}
                        onChange={(e) => setJobCompletionData({ ...jobCompletionData, totalCost: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="450"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Warranty Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Warranty Information</h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Warranty Type
                      </label>
                      <select
                        value={jobCompletionData.warrantyType}
                        onChange={(e) => setJobCompletionData({ ...jobCompletionData, warrantyType: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        <option value="parts-labor">Parts & Labor</option>
                        <option value="parts-only">Parts Only</option>
                        <option value="labor-only">Labor Only</option>
                        <option value="manufacturer">Manufacturer Warranty</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Warranty Period (Months)
                      </label>
                      <select
                        value={jobCompletionData.warrantyPeriod}
                        onChange={(e) => setJobCompletionData({ ...jobCompletionData, warrantyPeriod: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                        <option value="24">24 Months</option>
                        <option value="36">36 Months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Warranty Details
                    </label>
                    <textarea
                      rows={3}
                      value={jobCompletionData.warrantyDetails}
                      onChange={(e) => setJobCompletionData({ ...jobCompletionData, warrantyDetails: e.target.value })}
                      placeholder="Describe what is covered under warranty..."
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Warranty Document
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={handleWarrantyDocumentUpload}
                        className="hidden"
                        id="warranty-upload"
                      />
                      <label
                        htmlFor="warranty-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {jobCompletionData.warrantyDocument 
                            ? jobCompletionData.warrantyDocument.name
                            : 'Click to upload warranty document'
                          }
                        </span>
                        <span className="text-xs text-gray-500">PDF, DOC, or Image files</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Job Photos</h4>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photos-upload"
                  />
                  <label
                    htmlFor="photos-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {jobCompletionData.photos.length > 0 
                        ? `${jobCompletionData.photos.length} photo(s) selected`
                        : 'Click to upload job photos'
                      }
                    </span>
                    <span className="text-xs text-gray-500">Before/after photos of the work</span>
                  </label>
                </div>
              </div>

              {/* Customer Notes */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Customer Notes</h4>
                
                <textarea
                  rows={3}
                  value={jobCompletionData.customerNotes}
                  onChange={(e) => setJobCompletionData({ ...jobCompletionData, customerNotes: e.target.value })}
                  placeholder="Any additional notes or recommendations for the customer..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowJobCompletion(null)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJobCompletionSubmit}
                  disabled={!jobCompletionData.workPerformed || !jobCompletionData.totalCost}
                  className="flex-1 py-3 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Complete Job & Upload Warranty</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}