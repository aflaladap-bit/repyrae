import React, { useState } from 'react';
import Header from './Header';
import { CheckCircle, Calendar, Star, MapPin, FileText, Download, Filter } from 'lucide-react';

interface CompletedJobsScreenProps {
  onBack: () => void;
}

interface CompletedJob {
  id: string;
  serviceName: string;
  garageName: string;
  completedDate: string;
  cost: number;
  rating: number;
  description: string;
  warrantyPeriod?: string;
  invoiceUrl?: string;
  beforePhotos?: string[];
  afterPhotos?: string[];
  blockchainHash: string;
}

export default function CompletedJobsScreen({ onBack }: CompletedJobsScreenProps) {
  const [filterBy, setFilterBy] = useState<'all' | 'this-month' | 'last-3-months' | 'this-year'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'cost' | 'rating'>('date');

  const completedJobs: CompletedJob[] = [
    {
      id: '1',
      serviceName: 'Complete Brake Service',
      garageName: 'Al Futtaim Motors',
      completedDate: '2024-01-20',
      cost: 850,
      rating: 5,
      description: 'Front and rear brake pads replaced, brake fluid changed, rotors resurfaced',
      warrantyPeriod: '6 months / 10,000 km',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12'
    },
    {
      id: '2',
      serviceName: 'Engine Oil Change',
      garageName: 'Quick Lube Center',
      completedDate: '2024-01-15',
      cost: 180,
      rating: 4,
      description: '5W-30 synthetic oil change with premium filter replacement',
      warrantyPeriod: '3 months / 5,000 km',
      blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234'
    },
    {
      id: '3',
      serviceName: 'AC System Repair',
      garageName: 'Cool Air Services',
      completedDate: '2024-01-10',
      cost: 650,
      rating: 5,
      description: 'AC compressor replacement, refrigerant refill, system leak test',
      warrantyPeriod: '12 months / 15,000 km',
      blockchainHash: '0x3c4d5e6f7890abcdef1234567890abcdef123456'
    },
    {
      id: '4',
      serviceName: 'Tire Replacement',
      garageName: 'Tire Pro Center',
      completedDate: '2024-01-05',
      cost: 1200,
      rating: 4,
      description: 'Four new Michelin tires installed with wheel alignment',
      warrantyPeriod: '24 months / 40,000 km',
      blockchainHash: '0x4d5e6f7890abcdef1234567890abcdef12345678'
    },
    {
      id: '5',
      serviceName: 'Battery Replacement',
      garageName: 'Auto Electric Pro',
      completedDate: '2023-12-28',
      cost: 320,
      rating: 5,
      description: 'Premium AGM battery installation with electrical system check',
      warrantyPeriod: '18 months',
      blockchainHash: '0x5e6f7890abcdef1234567890abcdef1234567890'
    }
  ];

  const getFilteredJobs = () => {
    const now = new Date();
    let filtered = completedJobs;

    switch (filterBy) {
      case 'this-month':
        filtered = completedJobs.filter(job => {
          const jobDate = new Date(job.completedDate);
          return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear();
        });
        break;
      case 'last-3-months':
        filtered = completedJobs.filter(job => {
          const jobDate = new Date(job.completedDate);
          const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          return jobDate >= threeMonthsAgo;
        });
        break;
      case 'this-year':
        filtered = completedJobs.filter(job => {
          const jobDate = new Date(job.completedDate);
          return jobDate.getFullYear() === now.getFullYear();
        });
        break;
      default:
        filtered = completedJobs;
    }

    // Sort the filtered results
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'cost':
          return b.cost - a.cost;
        case 'rating':
          return b.rating - a.rating;
        case 'date':
        default:
          return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
      }
    });
  };

  const totalSpent = completedJobs.reduce((sum, job) => sum + job.cost, 0);
  const averageRating = completedJobs.reduce((sum, job) => sum + job.rating, 0) / completedJobs.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Completed Jobs" showBack onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Summary Stats */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{completedJobs.length}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">AED {totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Spent</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                <Star size={20} className="text-yellow-500 fill-current" />
              </div>
              <p className="text-sm text-gray-500">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filter & Sort</h3>
            <Filter size={20} className="text-gray-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Time</option>
                <option value="this-month">This Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="date">Date</option>
                <option value="cost">Cost</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Completed Jobs List */}
        <div className="space-y-4">
          {getFilteredJobs().map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{job.serviceName}</h4>
                    <p className="text-sm text-gray-600">{job.garageName}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(job.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">AED {job.cost}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < job.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{job.description}</p>
              
              {job.warrantyPeriod && (
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Warranty Coverage</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">{job.warrantyPeriod}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-500">
                  <span className="font-mono">#{job.blockchainHash.substring(0, 8)}...</span>
                  <span className="text-green-600">✓ Verified</span>
                </div>
                <div className="flex space-x-3">
                  <button className="text-primary font-medium hover:underline">
                    View Details
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
                    <Download size={14} />
                    <span>Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getFilteredJobs().length === 0 && (
          <div className="bg-white p-8 rounded-xl text-center">
            <CheckCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No completed jobs found for the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
}