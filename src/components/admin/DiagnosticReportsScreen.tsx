import React, { useState } from 'react';
import Header from '../Header';
import { FileText, Upload, Search, Filter, Calendar, User, CheckCircle, Clock, AlertTriangle, Download, Eye } from 'lucide-react';

interface DiagnosticReport {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    plate: string;
  };
  technicianName: string;
  reportDate: string;
  reportType: 'comprehensive' | 'pre-purchase' | 'insurance' | 'warranty';
  status: 'draft' | 'completed' | 'sent';
  findings: {
    category: string;
    issue: string;
    severity: 'low' | 'medium' | 'high';
    recommendation: string;
  }[];
  photos: string[];
  estimatedCost?: number;
  reportFile?: string;
}

export default function DiagnosticReportsScreen() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'completed' | 'sent'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerLookup, setCustomerLookup] = useState({
    phone: '',
    isLoading: false,
    found: false
  });
  const [uploadData, setUploadData] = useState({
    customerName: '',
    customerPhone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePlate: '',
    technicianName: '',
    reportType: 'comprehensive',
    findings: [{ category: '', issue: '', severity: 'medium' as const, recommendation: '' }],
    photos: [] as File[],
    reportFile: null as File | null,
    estimatedCost: ''
  });

  // Mock customer database - in real app this would be an API call
  const mockCustomerDatabase = [
    {
      phone: '+971501234567',
      name: 'Ahmed Al-Rashid',
      vehicles: [
        { make: 'Toyota', model: 'Camry', year: '2020', plate: 'A-12345' },
        { make: 'BMW', model: 'X5', year: '2018', plate: 'B-67890' }
      ]
    },
    {
      phone: '+971559876543',
      name: 'Sara Mohammed',
      vehicles: [
        { make: 'Honda', model: 'Accord', year: '2019', plate: 'C-11111' }
      ]
    },
    {
      phone: '+971524567890',
      name: 'Omar Hassan',
      vehicles: [
        { make: 'Nissan', model: 'Altima', year: '2021', plate: 'D-22222' }
      ]
    }
  ];
  const diagnosticReports: DiagnosticReport[] = [
    {
      id: '1',
      customerName: 'Ahmed Al-Rashid',
      customerPhone: '+971 50 123 4567',
      vehicleInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        plate: 'A-12345'
      },
      technicianName: 'Mohammed Hassan',
      reportDate: '2024-01-20',
      reportType: 'comprehensive',
      status: 'completed',
      findings: [
        {
          category: 'Engine',
          issue: 'Spark plug wear detected',
          severity: 'medium',
          recommendation: 'Replace spark plugs within 1000km'
        },
        {
          category: 'Brakes',
          issue: 'Front brake pads at 30%',
          severity: 'low',
          recommendation: 'Monitor and replace within 5000km'
        }
      ],
      photos: ['engine1.jpg', 'brakes1.jpg'],
      estimatedCost: 450
    },
    {
      id: '2',
      customerName: 'Sara Mohammed',
      customerPhone: '+971 55 987 6543',
      vehicleInfo: {
        make: 'BMW',
        model: 'X5',
        year: 2018,
        plate: 'B-67890'
      },
      technicianName: 'Ali Ahmed',
      reportDate: '2024-01-19',
      reportType: 'pre-purchase',
      status: 'sent',
      findings: [
        {
          category: 'Transmission',
          issue: 'Minor fluid leak detected',
          severity: 'high',
          recommendation: 'Immediate repair required'
        }
      ],
      photos: ['transmission1.jpg'],
      estimatedCost: 1200
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleAddFinding = () => {
    setUploadData({
      ...uploadData,
      findings: [...uploadData.findings, { category: '', issue: '', severity: 'medium', recommendation: '' }]
    });
  };

  const handleRemoveFinding = (index: number) => {
    setUploadData({
      ...uploadData,
      findings: uploadData.findings.filter((_, i) => i !== index)
    });
  };

  const handlePhoneLookup = async (phone: string) => {
    if (phone.length < 10) return;
    
    setCustomerLookup({ phone: phone, isLoading: true, found: false });
    
    // Simulate API call delay
    setTimeout(() => {
      const customer = mockCustomerDatabase.find(c => c.phone === phone);
      
      if (customer) {
        // Auto-fill customer data
        setUploadData(prev => ({
          ...prev,
          customerName: customer.name,
          customerPhone: phone,
          // If customer has vehicles, pre-select the first one
          vehicleMake: customer.vehicles[0]?.make || '',
          vehicleModel: customer.vehicles[0]?.model || '',
          vehicleYear: customer.vehicles[0]?.year || '',
          vehiclePlate: customer.vehicles[0]?.plate || ''
        }));
        setCustomerLookup({ phone, isLoading: false, found: true });
      } else {
        // Clear data if not found
        setUploadData({
          ...uploadData,
          customerName: '',
          customerPhone: phone,
          vehicleMake: '',
          vehicleModel: '',
          vehicleYear: '',
          vehiclePlate: ''
        });
        setCustomerLookup({ phone, isLoading: false, found: false });
      }
    }, 1000);
  };
  const handleFindingChange = (index: number, field: string, value: string) => {
    const updatedFindings = uploadData.findings.map((finding, i) => 
      i === index ? { ...finding, [field]: value } : finding
    );
    setUploadData({ ...uploadData, findings: updatedFindings });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setUploadData({
        ...uploadData,
        photos: [...uploadData.photos, ...newPhotos]
      });
    }
  };

  const handleReportFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData({
        ...uploadData,
        reportFile: e.target.files[0]
      });
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the diagnostic report
    console.log('Submitting diagnostic report:', uploadData);
    setShowUploadModal(false);
    // Reset form
    setCustomerLookup({ phone: '', isLoading: false, found: false });
    setUploadData({
      customerName: '',
      customerPhone: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehiclePlate: '',
      technicianName: '',
      reportType: 'comprehensive',
      findings: [{ category: '', issue: '', severity: 'medium', recommendation: '' }],
      photos: [],
      reportFile: null,
      estimatedCost: ''
    });
    alert('Diagnostic report uploaded successfully!');
  };

  const filteredReports = diagnosticReports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = report.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.vehicleInfo.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.technicianName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Diagnostic Reports" />
      
      <div className="p-4 space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Technician Reports</h2>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-dark transition-colors"
          >
            <Upload size={16} />
            <span>Upload Report</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex space-x-3 mb-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, plate, or technician..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Reports' },
              { id: 'draft', label: 'Draft' },
              { id: 'completed', label: 'Completed' },
              { id: 'sent', label: 'Sent' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterStatus(filter.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{report.customerName}</h3>
                  <p className="text-sm text-gray-600">
                    {report.vehicleInfo.make} {report.vehicleInfo.model} {report.vehicleInfo.year} • {report.vehicleInfo.plate}
                  </p>
                  <p className="text-sm text-gray-500">Technician: {report.technicianName}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{new Date(report.reportDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Findings:</h4>
                <div className="space-y-2">
                  {report.findings.slice(0, 2).map((finding, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertTriangle size={16} className={`mt-0.5 ${getSeverityColor(finding.severity)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{finding.category}: {finding.issue}</p>
                        <p className="text-xs text-gray-600">{finding.recommendation}</p>
                      </div>
                    </div>
                  ))}
                  {report.findings.length > 2 && (
                    <p className="text-xs text-gray-500">+{report.findings.length - 2} more findings</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{report.photos.length} photos</span>
                  {report.estimatedCost && <span>Est. Cost: AED {report.estimatedCost}</span>}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="bg-white p-8 rounded-xl text-center">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No diagnostic reports found</p>
          </div>
        )}
      </div>

      {/* Upload Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Upload Diagnostic Report</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitReport} className="p-4 space-y-6">
              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Customer Information</h4>
                
                {/* Phone Number Lookup */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={customerLookup.phone}
                      onChange={(e) => {
                        const phone = e.target.value;
                        setCustomerLookup(prev => ({ ...prev, phone }));
                        if (phone.length >= 10) {
                          handlePhoneLookup(phone);
                        }
                      }}
                      placeholder="+971 50 123 4567"
                      className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                      required
                    />
                    {customerLookup.isLoading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Customer Status Indicator */}
                  {customerLookup.phone.length >= 10 && !customerLookup.isLoading && (
                    <div className="mt-2">
                      {customerLookup.found ? (
                        <div className="flex items-center space-x-2 text-green-600 text-sm">
                          <CheckCircle size={16} />
                          <span>Customer found! Details auto-filled below.</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-yellow-600 text-sm">
                          <AlertTriangle size={16} />
                          <span>New customer - please fill in details manually.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input
                      type="text"
                      value={uploadData.customerName}
                      onChange={(e) => setUploadData({ ...uploadData, customerName: e.target.value })}
                      placeholder={customerLookup.found ? "Auto-filled from database" : "Enter customer name"}
                      className={`w-full p-3 border border-gray-300 rounded-lg ${
                        customerLookup.found ? 'bg-green-50 border-green-200' : ''
                      }`}
                      readOnly={customerLookup.found}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Vehicle Information</h4>
                
                {/* Vehicle Selection for Existing Customers */}
                {customerLookup.found && (() => {
                  const customer = mockCustomerDatabase.find(c => c.phone === customerLookup.phone);
                  return customer && customer.vehicles.length > 1 ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Vehicle
                      </label>
                      <select
                        onChange={(e) => {
                          const vehicleIndex = parseInt(e.target.value);
                          const selectedVehicle = customer.vehicles[vehicleIndex];
                          if (selectedVehicle) {
                            setUploadData(prev => ({
                              ...prev,
                              vehicleMake: selectedVehicle.make,
                              vehicleModel: selectedVehicle.model,
                              vehicleYear: selectedVehicle.year,
                              vehiclePlate: selectedVehicle.plate
                            }));
                          }
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-blue-50 border-blue-200"
                      >
                        {customer.vehicles.map((vehicle, index) => (
                          <option key={index} value={index}>
                            {vehicle.make} {vehicle.model} {vehicle.year} - {vehicle.plate}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null;
                })()}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                    <input
                      type="text"
                      value={uploadData.vehicleMake}
                      onChange={(e) => setUploadData({ ...uploadData, vehicleMake: e.target.value })}
                      placeholder={customerLookup.found ? "Auto-filled from database" : "e.g., Toyota, BMW"}
                      className={`w-full p-3 border border-gray-300 rounded-lg ${
                        customerLookup.found ? 'bg-green-50 border-green-200' : ''
                      }`}
                      readOnly={customerLookup.found}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                    <input
                      type="text"
                      value={uploadData.vehicleModel}
                      onChange={(e) => setUploadData({ ...uploadData, vehicleModel: e.target.value })}
                      placeholder={customerLookup.found ? "Auto-filled from database" : "e.g., Camry, X5"}
                      className={`w-full p-3 border border-gray-300 rounded-lg ${
                        customerLookup.found ? 'bg-green-50 border-green-200' : ''
                      }`}
                      readOnly={customerLookup.found}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="number"
                      value={uploadData.vehicleYear}
                      onChange={(e) => setUploadData({ ...uploadData, vehicleYear: e.target.value })}
                      placeholder={customerLookup.found ? "Auto-filled from database" : "e.g., 2020"}
                      className={`w-full p-3 border border-gray-300 rounded-lg ${
                        customerLookup.found ? 'bg-green-50 border-green-200' : ''
                      }`}
                      readOnly={customerLookup.found}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                    <input
                      type="text"
                      value={uploadData.vehiclePlate}
                      onChange={(e) => setUploadData({ ...uploadData, vehiclePlate: e.target.value.toUpperCase() })}
                      placeholder={customerLookup.found ? "Auto-filled from database" : "e.g., A-12345"}
                      className={`w-full p-3 border border-gray-300 rounded-lg ${
                        customerLookup.found ? 'bg-green-50 border-green-200' : ''
                      }`}
                      readOnly={customerLookup.found}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Report Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Report Details</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technician Name</label>
                    <input
                      type="text"
                      value={uploadData.technicianName}
                      onChange={(e) => setUploadData({ ...uploadData, technicianName: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select
                      value={uploadData.reportType}
                      onChange={(e) => setUploadData({ ...uploadData, reportType: e.target.value as any })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="comprehensive">Comprehensive Inspection</option>
                      <option value="pre-purchase">Pre-Purchase Inspection</option>
                      <option value="insurance">Insurance Inspection</option>
                      <option value="warranty">Warranty Inspection</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Findings */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Inspection Findings</h4>
                  <button
                    type="button"
                    onClick={handleAddFinding}
                    className="text-primary font-medium text-sm hover:underline"
                  >
                    + Add Finding
                  </button>
                </div>
                
                <div className="space-y-4">
                  {uploadData.findings.map((finding, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                          <select
                            value={finding.category}
                            onChange={(e) => handleFindingChange(index, 'category', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            required
                          >
                            <option value="">Select category</option>
                            <option value="Engine">Engine</option>
                            <option value="Transmission">Transmission</option>
                            <option value="Brakes">Brakes</option>
                            <option value="Suspension">Suspension</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Body">Body</option>
                            <option value="Interior">Interior</option>
                            <option value="Tires">Tires</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Severity</label>
                          <select
                            value={finding.severity}
                            onChange={(e) => handleFindingChange(index, 'severity', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Issue Description</label>
                        <input
                          type="text"
                          value={finding.issue}
                          onChange={(e) => handleFindingChange(index, 'issue', e.target.value)}
                          placeholder="Describe the issue found"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Recommendation</label>
                        <textarea
                          rows={2}
                          value={finding.recommendation}
                          onChange={(e) => handleFindingChange(index, 'recommendation', e.target.value)}
                          placeholder="Recommended action"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          required
                        />
                      </div>
                      {uploadData.findings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFinding(index)}
                          className="text-red-600 text-xs hover:underline"
                        >
                          Remove Finding
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos Upload */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Inspection Photos</h4>
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
                      {uploadData.photos.length > 0 
                        ? `${uploadData.photos.length} photo(s) selected`
                        : 'Click to upload inspection photos'
                      }
                    </span>
                  </label>
                </div>
              </div>

              {/* Report File Upload */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Report Document (Optional)</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleReportFileUpload}
                    className="hidden"
                    id="report-upload"
                  />
                  <label
                    htmlFor="report-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <FileText size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {uploadData.reportFile 
                        ? uploadData.reportFile.name
                        : 'Upload detailed report document'
                      }
                    </span>
                  </label>
                </div>
              </div>

              {/* Estimated Cost */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Estimated Repair Cost (Optional)</h4>
                <input
                  type="number"
                  value={uploadData.estimatedCost}
                  onChange={(e) => setUploadData({ ...uploadData, estimatedCost: e.target.value })}
                  placeholder="Enter estimated cost in AED"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Upload Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}