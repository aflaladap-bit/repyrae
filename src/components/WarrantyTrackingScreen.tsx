import React, { useState } from 'react';
import Header from './Header';
import { Shield, Calendar, FileText, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Warranty, WarrantyClaim } from '../types';

interface WarrantyTrackingScreenProps {
  onBack: () => void;
}

export default function WarrantyTrackingScreen({ onBack }: WarrantyTrackingScreenProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'claims' | 'expired'>('active');

  const warranties: Warranty[] = [
    {
      id: '1',
      vehicleId: '1',
      type: 'manufacturer',
      provider: 'Toyota UAE',
      startDate: '2020-01-15',
      endDate: '2025-01-15',
      coverageDetails: 'Comprehensive coverage including engine, transmission, and electrical systems',
      claimHistory: [
        {
          id: '1',
          date: '2023-06-15',
          description: 'AC Compressor Replacement',
          status: 'approved',
          amount: 1200
        }
      ]
    },
    {
      id: '2',
      vehicleId: '1',
      type: 'extended',
      provider: 'Al Futtaim Extended Warranty',
      startDate: '2023-01-15',
      endDate: '2026-01-15',
      coverageDetails: 'Extended coverage for major components after manufacturer warranty',
      claimHistory: []
    },
    {
      id: '3',
      vehicleId: '1',
      type: 'service',
      provider: 'Premium Auto Care',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      coverageDetails: 'Annual service package including oil changes and basic maintenance',
      claimHistory: [
        {
          id: '2',
          date: '2024-01-20',
          description: 'Oil Change Service',
          status: 'approved',
          amount: 180
        }
      ]
    }
  ];

  const getWarrantyStatus = (warranty: Warranty) => {
    const now = new Date();
    const endDate = new Date(warranty.endDate);
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'expired', color: 'text-red-600 bg-red-100', days: 0 };
    if (daysUntilExpiry < 30) return { status: 'expiring', color: 'text-yellow-600 bg-yellow-100', days: daysUntilExpiry };
    return { status: 'active', color: 'text-green-600 bg-green-100', days: daysUntilExpiry };
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const activeWarranties = warranties.filter(w => getWarrantyStatus(w).status !== 'expired');
  const expiredWarranties = warranties.filter(w => getWarrantyStatus(w).status === 'expired');
  const allClaims = warranties.flatMap(w => 
    w.claimHistory.map(claim => ({ ...claim, warrantyProvider: w.provider, warrantyType: w.type }))
  );

  const tabs = [
    { id: 'active' as const, label: 'Active Warranties' },
    { id: 'claims' as const, label: 'Claims History' },
    { id: 'expired' as const, label: 'Expired' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Warranty Tracking" showBack onBack={onBack} />
      
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
        {activeTab === 'active' && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Active Warranties</h3>
              <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus size={16} />
                <span>Add Warranty</span>
              </button>
            </div>
            
            {activeWarranties.map((warranty) => {
              const status = getWarrantyStatus(warranty);
              return (
                <div key={warranty.id} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">{warranty.type} Warranty</h4>
                        <p className="text-sm text-gray-600">{warranty.provider}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      {status.status === 'expiring' ? `${status.days} days left` : status.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{warranty.coverageDetails}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-600">
                        Valid until: {new Date(warranty.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-gray-600">
                        {warranty.claimHistory.length} claim(s) made
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-4">
                    <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                      View Details
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">Auto-updated</span>
                      </div>
                    </button>
                    <button className="flex-1 py-2 bg-primary text-white rounded-lg text-sm">
                      File Claim
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {activeTab === 'claims' && (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Claims History</h3>
              <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus size={16} />
                <span>New Claim</span>
              </button>
            </div>
            
            {allClaims.length > 0 ? (
              <div className="space-y-4">
                {allClaims.map((claim) => (
                  <div key={claim.id} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{claim.description}</h4>
                        <p className="text-sm text-gray-600 capitalize">{claim.warrantyProvider} • {claim.warrantyType} warranty</p>
                        <p className="text-sm text-gray-500">{new Date(claim.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getClaimStatusColor(claim.status)}`}>
                          {claim.status}
                        </span>
                        <p className="text-sm font-semibold text-gray-900 mt-1">AED {claim.amount}</p>
                      </div>
                    </div>
                    
                    <button className="text-primary text-sm font-medium hover:underline">
                      View Claim Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl text-center">
                <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No warranty claims yet</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'expired' && (
          <>
            <h3 className="text-lg font-semibold text-gray-900">Expired Warranties</h3>
            
            {expiredWarranties.length > 0 ? (
              <div className="space-y-4">
                {expiredWarranties.map((warranty) => (
                  <div key={warranty.id} className="bg-white rounded-xl p-4 border border-gray-200 opacity-75">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Shield size={24} className="text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">{warranty.type} Warranty</h4>
                          <p className="text-sm text-gray-600">{warranty.provider}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                        Expired
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{warranty.coverageDetails}</p>
                    
                    <div className="text-sm text-gray-500">
                      Expired on: {new Date(warranty.endDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl text-center">
                <Shield size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No expired warranties</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}