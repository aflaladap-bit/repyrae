import React from 'react';
import Header from './Header';
import { Calendar, Wrench, AlertTriangle, CheckCircle, Clock, FileText, Shield, Link, ExternalLink, Copy } from 'lucide-react';

interface DiagnosticTimelineScreenProps {
  onBack: () => void;
}

export default function DiagnosticTimelineScreen({ onBack }: DiagnosticTimelineScreenProps) {
  const [showVerificationModal, setShowVerificationModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);
  const [copiedHash, setCopiedHash] = React.useState<string | null>(null);

  const timelineEvents = [
    {
      id: '1',
      date: '2024-01-20',
      type: 'service',
      title: 'Oil Change Completed',
      description: 'Regular maintenance - 5W-30 synthetic oil',
      status: 'completed',
      cost: 180,
      garage: 'Al Futtaim Motors',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      blockchainNetwork: 'Ethereum',
      transactionFee: '0.002 ETH',
      blockNumber: 18756432,
      confirmations: 1247
    },
    {
      id: '2',
      date: '2024-01-15',
      type: 'diagnosis',
      title: 'Engine Performance Issue',
      description: 'Diagnosed misfiring in cylinder 2',
      status: 'completed',
      cost: 150,
      garage: 'Expert Diagnosis',
      blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      blockchainNetwork: 'Ethereum',
      transactionFee: '0.0018 ETH',
      blockNumber: 18756201,
      confirmations: 1478
    },
    {
      id: '3',
      date: '2024-01-10',
      type: 'service',
      title: 'AC System Check',
      description: 'Refrigerant levels checked and topped up',
      status: 'completed',
      cost: 120,
      garage: 'Cool Air Services',
      blockchainHash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      blockchainNetwork: 'Ethereum',
      transactionFee: '0.0021 ETH',
      blockNumber: 18755987,
      confirmations: 1692
    },
    {
      id: '4',
      date: '2024-01-05',
      type: 'diagnosis',
      title: 'Brake System Inspection',
      description: 'Comprehensive brake system evaluation',
      status: 'completed',
      cost: 100,
      garage: 'Safety First Auto',
      blockchainHash: '0x4d5e6f7890abcdef1234567890abcdef12345678',
      blockchainNetwork: 'Ethereum',
      transactionFee: '0.0019 ETH',
      blockNumber: 18755743,
      confirmations: 1936
    },
    {
      id: '5',
      date: '2023-12-20',
      type: 'service',
      title: 'Tire Rotation & Alignment',
      description: 'All four tires rotated and aligned',
      status: 'completed',
      cost: 200,
      garage: 'Tire Pro Center',
      blockchainHash: '0x5e6f7890abcdef1234567890abcdef1234567890',
      blockchainNetwork: 'Ethereum',
      transactionFee: '0.0023 ETH',
      blockNumber: 18754892,
      confirmations: 2787
    }
  ];

  const getIcon = (type: string, status: string) => {
    if (type === 'diagnosis') {
      return <FileText size={20} className="text-blue-500" />;
    }
    if (status === 'completed') {
      return <CheckCircle size={20} className="text-green-500" />;
    }
    if (status === 'pending') {
      return <Clock size={20} className="text-yellow-500" />;
    }
    return <Wrench size={20} className="text-gray-500" />;
  };

  const totalSpent = timelineEvents.reduce((sum, event) => sum + event.cost, 0);

  const handleVerifyOnBlockchain = (event: any) => {
    setSelectedEvent(event);
    setShowVerificationModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const openEtherscan = (hash: string) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank');
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Service Timeline" showBack onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Summary Stats */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle History Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{timelineEvents.length}</p>
              <p className="text-sm text-gray-500">Total Services</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">AED {totalSpent}</p>
              <p className="text-sm text-gray-500">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {timelineEvents.filter(e => e.date.startsWith('2024')).length}
              </p>
              <p className="text-sm text-gray-500">This Year</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Service Timeline</h2>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Shield size={16} />
              <span>Blockchain Verified</span>
            </div>
          </div>
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getIcon(event.type, event.status)}
                  </div>
                  {index !== timelineEvents.length - 1 && (
                    <div className="w-px h-12 bg-gray-200 mt-2"></div>
                  )}
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>{event.garage}</span>
                        <button 
                          onClick={() => handleVerifyOnBlockchain(event)}
                          className="flex items-center space-x-1 hover:text-primary transition-colors"
                        >
                          <Link size={12} />
                          <span className="font-mono">
                            {event.blockchainHash?.substring(0, 8)}...
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-gray-900">AED {event.cost}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        event.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Verification Info */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Shield size={20} className="text-green-500" />
            <h3 className="font-semibold text-gray-900">Blockchain Verification</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• All service records are permanently stored on the Ethereum blockchain</p>
            <p>• Click any transaction hash to view verification details</p>
            <p>• Records cannot be altered or deleted, ensuring complete transparency</p>
            <p>• Each service is cryptographically signed by the garage</p>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Export Options</h3>
          <div className="space-y-2">
            <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Generate Vehicle History Report</span>
                <span className="text-sm text-gray-500">For buyers/insurance</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Blockchain-verified comprehensive report</p>
            </button>
            <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Export as PDF</span>
                <span className="text-sm text-gray-500">For insurance/resale</span>
              </div>
            </button>
            <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Email Report</span>
                <span className="text-sm text-gray-500">Send to email</span>
              </div>
            </button>
            <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-medium">Share Public Link</span>
                <span className="text-sm text-gray-500">Shareable URL</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Anonymous link for potential buyers</p>
            </button>
          </div>
        </div>

        {/* Vehicle History Report Preview */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Shield size={20} className="text-green-500" />
            <h3 className="font-semibold text-gray-900">Vehicle History Report</h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
          </div>
          
          <div className="space-y-4">
            {/* Vehicle Info */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Vehicle Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Make/Model:</span>
                  <span className="ml-2 font-medium">Toyota Camry 2020</span>
                </div>
                <div>
                  <span className="text-gray-500">Plate:</span>
                  <span className="ml-2 font-medium">A-12345</span>
                </div>
                <div>
                  <span className="text-gray-500">Total Services:</span>
                  <span className="ml-2 font-medium">{timelineEvents.length}</span>
                </div>
                <div>
                  <span className="text-gray-500">Total Spent:</span>
                  <span className="ml-2 font-medium">AED {totalSpent}</span>
                </div>
              </div>
            </div>

            {/* Service Summary */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Service Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Regular Maintenance:</span>
                  <span className="font-medium text-green-600">
                    {timelineEvents.filter(e => e.type === 'service').length} services
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Diagnostic Checks:</span>
                  <span className="font-medium text-blue-600">
                    {timelineEvents.filter(e => e.type === 'diagnosis').length} checks
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Service:</span>
                  <span className="font-medium">{new Date(timelineEvents[0]?.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance Score:</span>
                  <span className="font-medium text-green-600">Excellent (95/100)</span>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Blockchain Verification</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p>✓ All records permanently stored on Ethereum blockchain</p>
                <p>✓ {timelineEvents.length} transactions verified and immutable</p>
                <p>✓ No tampering or fraud possible</p>
                <p>✓ Independently verifiable by any party</p>
              </div>
            </div>

            {/* Generate Report Button */}
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Generate Complete Vehicle History Report
            </button>
          </div>
        </div>
        {/* Vehicle History Report Preview */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Shield size={20} className="text-green-500" />
            <h3 className="font-semibold text-gray-900">Vehicle History Report</h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
          </div>
          
          <div className="space-y-4">
            {/* Vehicle Info */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Vehicle Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Make/Model:</span>
                  <span className="ml-2 font-medium">Toyota Camry 2020</span>
                </div>
                <div>
                  <span className="text-gray-500">Plate:</span>
                  <span className="ml-2 font-medium">A-12345</span>
                </div>
                <div>
                  <span className="text-gray-500">Total Services:</span>
                  <span className="ml-2 font-medium">{timelineEvents.length}</span>
                </div>
                <div>
                  <span className="text-gray-500">Total Spent:</span>
                  <span className="ml-2 font-medium">AED {totalSpent}</span>
                </div>
              </div>
            </div>

            {/* Service Summary */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Service Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Regular Maintenance:</span>
                  <span className="font-medium text-green-600">
                    {timelineEvents.filter(e => e.type === 'service').length} services
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Diagnostic Checks:</span>
                  <span className="font-medium text-blue-600">
                    {timelineEvents.filter(e => e.type === 'diagnosis').length} checks
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Service:</span>
                  <span className="font-medium">{new Date(timelineEvents[0]?.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance Score:</span>
                  <span className="font-medium text-green-600">Excellent (95/100)</span>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Blockchain Verification</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p>✓ All records permanently stored on Ethereum blockchain</p>
                <p>✓ {timelineEvents.length} transactions verified and immutable</p>
                <p>✓ No tampering or fraud possible</p>
                <p>✓ Independently verifiable by any party</p>
              </div>
            </div>

            {/* Generate Report Button */}
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Generate Complete Vehicle History Report
            </button>
          </div>
        </div>
      </div>

      {/* Blockchain Verification Modal */}
      {showVerificationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Blockchain Verification</h3>
              <p className="text-sm text-gray-500">{selectedEvent.title}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Hash
                </label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 p-2 rounded text-xs font-mono break-all">
                    {selectedEvent.blockchainHash}
                  </code>
                  <button
                    onClick={() => copyToClipboard(selectedEvent.blockchainHash)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                {copiedHash === selectedEvent.blockchainHash && (
                  <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Network
                  </label>
                  <p className="text-sm text-gray-900">{selectedEvent.blockchainNetwork}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Block Number
                  </label>
                  <p className="text-sm text-gray-900">#{selectedEvent.blockNumber?.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmations
                  </label>
                  <p className="text-sm text-green-600 font-medium">{selectedEvent.confirmations?.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Fee
                  </label>
                  <p className="text-sm text-gray-900">{selectedEvent.transactionFee}</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Verified on Blockchain</span>
                </div>
                <p className="text-xs text-green-700">
                  This service record has been permanently recorded and cannot be altered.
                </p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => openEtherscan(selectedEvent.blockchainHash)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>View on Etherscan</span>
                </button>
                
                <button
                  onClick={() => copyToClipboard(`https://etherscan.io/tx/${selectedEvent.blockchainHash}`)}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
                >
                  <Link size={16} />
                  <span>Copy Verification Link</span>
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowVerificationModal(false)}
              className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}