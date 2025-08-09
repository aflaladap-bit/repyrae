import React, { useState } from 'react';
import { X, Star, MapPin, Phone, Clock, Shield, CheckCircle, ThumbsUp, ThumbsDown, Calendar, User } from 'lucide-react';
import { Quote } from '../types';

interface GarageProfileModalProps {
  garageId: string;
  onClose: () => void;
  onBookNow: (quote: Quote) => void;
}

interface GarageProfile {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  address: string;
  phone: string;
  distance: string;
  workingHours: string;
  services: string[];
  verified: boolean;
  responseTime: string;
  completedJobs: number;
  photos: string[];
  quote: Quote;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  helpful: number;
  photos?: string[];
  response?: {
    text: string;
    date: string;
  };
}

export default function GarageProfileModal({ garageId, onClose, onBookNow }: GarageProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos'>('overview');

  // Mock garage data - in real app this would come from API
  const garageProfile: GarageProfile = {
    id: garageId,
    name: 'Al Futtaim Motors',
    rating: 4.8,
    totalReviews: 156,
    address: 'Sheikh Zayed Road, Business Bay, Dubai',
    phone: '+971 4 123 4567',
    distance: '2.3 km',
    workingHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
    services: ['Oil Change', 'Brake Service', 'AC Repair', 'Engine Diagnostics', 'Tire Service'],
    verified: true,
    responseTime: '< 15 minutes',
    completedJobs: 1247,
    photos: ['garage1.jpg', 'garage2.jpg', 'garage3.jpg'],
    quote: {
      id: garageId,
      garageName: 'Al Futtaim Motors',
      rating: 4.8,
      price: 450,
      estimatedTime: '2-3 hours',
      description: 'Brake pad replacement with premium pads',
      distance: '2.3 km'
    }
  };

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Ahmed K.',
      rating: 5,
      date: '2024-01-20',
      service: 'Oil Change',
      comment: 'Excellent service! Very professional team and quick turnaround. The facility is clean and modern. Highly recommend for regular maintenance.',
      helpful: 12,
      photos: ['review1.jpg'],
      response: {
        text: 'Thank you Ahmed for your kind words! We appreciate your business and look forward to serving you again.',
        date: '2024-01-21'
      }
    },
    {
      id: '2',
      customerName: 'Sara M.',
      rating: 5,
      date: '2024-01-18',
      service: 'Brake Service',
      comment: 'Had my brakes serviced here and the experience was fantastic. They explained everything clearly and the pricing was transparent. No hidden charges!',
      helpful: 8,
      response: {
        text: 'We\'re glad you had a great experience Sara! Transparency is very important to us.',
        date: '2024-01-19'
      }
    },
    {
      id: '3',
      customerName: 'Omar H.',
      rating: 4,
      date: '2024-01-15',
      service: 'AC Repair',
      comment: 'Good service overall. Fixed my AC issue quickly. Only minor complaint is the waiting area could be more comfortable.',
      helpful: 5,
      response: {
        text: 'Thank you for the feedback Omar. We\'re working on improving our waiting area facilities.',
        date: '2024-01-16'
      }
    },
    {
      id: '4',
      customerName: 'Fatima A.',
      rating: 5,
      date: '2024-01-12',
      service: 'Engine Diagnostics',
      comment: 'Impressed with their diagnostic equipment and expertise. They found the issue quickly and provided a detailed explanation.',
      helpful: 15
    },
    {
      id: '5',
      customerName: 'Mohammed R.',
      rating: 4,
      date: '2024-01-10',
      service: 'Tire Service',
      comment: 'Professional service and good quality tires. Pricing is competitive. Will definitely come back.',
      helpful: 7
    }
  ];

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'reviews' as const, label: `Reviews (${garageProfile.totalReviews})` },
    { id: 'photos' as const, label: 'Photos' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {garageProfile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{garageProfile.name}</h3>
                  {garageProfile.verified && (
                    <Shield size={16} className="text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{garageProfile.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{garageProfile.totalReviews} reviews</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{garageProfile.distance}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

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

        <div className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{garageProfile.completedJobs}</p>
                  <p className="text-sm text-gray-500">Jobs Done</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{garageProfile.responseTime}</p>
                  <p className="text-sm text-gray-500">Response</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-500">On Time</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-gray-400" />
                  <span className="text-gray-700">{garageProfile.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-gray-400" />
                  <span className="text-gray-700">{garageProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-gray-400" />
                  <span className="text-gray-700">{garageProfile.workingHours}</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {garageProfile.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Quote */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Your Quote</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">{garageProfile.quote.description}</p>
                    <p className="text-sm text-gray-500">Estimated time: {garageProfile.quote.estimatedTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">AED {garageProfile.quote.price}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Rating Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">{garageProfile.rating}</p>
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(garageProfile.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{totalReviews} reviews</p>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-600 w-3">{rating}</span>
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-6">{ratingDistribution[rating as keyof typeof ratingDistribution]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.customerName}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{review.service}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    
                    {review.response && (
                      <div className="bg-gray-50 p-3 rounded-lg mt-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">Response from {garageProfile.name}</span>
                          <span className="text-xs text-gray-500">{new Date(review.response.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.response.text}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsUp size={14} />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">Verified Purchase</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((photo) => (
                  <div key={photo} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Garage Photo {photo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => onBookNow(garageProfile.quote)}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium text-lg hover:bg-primary-dark transition-colors"
          >
            Book Now - AED {garageProfile.quote.price}
          </button>
        </div>
      </div>
    </div>
  );
}