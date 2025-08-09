import React from 'react';
import Header from './Header';
import { Star, Gift, Trophy, Crown, Zap, Calendar } from 'lucide-react';
import { LoyaltyProgram } from '../types';

interface LoyaltyProgramScreenProps {
  onBack: () => void;
}

export default function LoyaltyProgramScreen({ onBack }: LoyaltyProgramScreenProps) {
  const loyaltyData: LoyaltyProgram = {
    userId: '1',
    points: 2450,
    tier: 'gold',
    totalSpent: 8500,
    servicesCompleted: 12
  };

  const tiers = [
    { name: 'Bronze', minPoints: 0, color: 'bg-amber-600', icon: Star },
    { name: 'Silver', minPoints: 1000, color: 'bg-gray-400', icon: Trophy },
    { name: 'Gold', minPoints: 2000, color: 'bg-yellow-500', icon: Crown },
    { name: 'Platinum', minPoints: 5000, color: 'bg-purple-600', icon: Zap }
  ];

  const rewards = [
    {
      id: '1',
      title: '10% Off Next Service',
      points: 500,
      description: 'Valid for any service up to AED 1000',
      available: true
    },
    {
      id: '2',
      title: 'Free Oil Change',
      points: 800,
      description: 'Standard oil change service',
      available: true
    },
    {
      id: '3',
      title: 'Priority Booking',
      points: 300,
      description: '30 days of priority scheduling',
      available: true
    },
    {
      id: '4',
      title: 'Free Diagnostic',
      points: 1000,
      description: 'Complete vehicle diagnostic check',
      available: false
    },
    {
      id: '5',
      title: 'VIP Service Package',
      points: 2000,
      description: 'Premium service with pickup/delivery',
      available: true
    }
  ];

  const recentActivity = [
    { date: '2024-01-20', action: 'Service Completed', points: '+150', description: 'Oil Change at Al Futtaim' },
    { date: '2024-01-15', action: 'Referral Bonus', points: '+200', description: 'Friend joined Repyr' },
    { date: '2024-01-10', action: 'Review Bonus', points: '+50', description: '5-star review submitted' },
    { date: '2024-01-05', action: 'Service Completed', points: '+100', description: 'AC Service at Cool Air' }
  ];

  const currentTier = tiers.find(tier => tier.name.toLowerCase() === loyaltyData.tier);
  const nextTier = tiers.find(tier => tier.minPoints > loyaltyData.points);
  const pointsToNext = nextTier ? nextTier.minPoints - loyaltyData.points : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Loyalty Program" showBack onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Current Status */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {currentTier && (
                <div className={`w-12 h-12 ${currentTier.color} rounded-full flex items-center justify-center`}>
                  <currentTier.icon size={24} className="text-white" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold capitalize">{loyaltyData.tier} Member</h2>
                <p className="text-sm opacity-90">Repyr Rewards Program</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{loyaltyData.points}</p>
              <p className="text-sm opacity-90">Points</p>
            </div>
          </div>
          
          {nextTier && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to {nextTier.name}</span>
                <span>{pointsToNext} points to go</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((loyaltyData.points - (currentTier?.minPoints || 0)) / (nextTier.minPoints - (currentTier?.minPoints || 0))) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{loyaltyData.servicesCompleted}</p>
              <p className="text-sm text-gray-500">Services Completed</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">AED {loyaltyData.totalSpent}</p>
              <p className="text-sm text-gray-500">Total Spent</p>
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Rewards</h3>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <div 
                key={reward.id} 
                className={`p-4 rounded-lg border ${
                  reward.available && loyaltyData.points >= reward.points
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{reward.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star size={16} className="text-yellow-500" />
                      <span className="font-semibold text-gray-900">{reward.points}</span>
                    </div>
                    <button
                      disabled={!reward.available || loyaltyData.points < reward.points}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        reward.available && loyaltyData.points >= reward.points
                          ? 'bg-primary text-white hover:bg-primary-dark'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {loyaltyData.points >= reward.points ? 'Redeem' : 'Not Enough Points'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Gift size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{activity.points}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Earn Points</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Complete a service</span>
              <span className="font-medium text-gray-900">100-200 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Write a review</span>
              <span className="font-medium text-gray-900">50 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Refer a friend</span>
              <span className="font-medium text-gray-900">200 points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Book diagnosis</span>
              <span className="font-medium text-gray-900">75 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}