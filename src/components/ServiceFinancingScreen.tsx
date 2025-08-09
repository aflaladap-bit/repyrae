import React, { useState } from 'react';
import Header from './Header';
import { CreditCard, Calendar, CheckCircle, Info, Calculator } from 'lucide-react';
import { FinancingOption } from '../types';

interface ServiceFinancingScreenProps {
  onBack: () => void;
  serviceAmount?: number;
  serviceName?: string;
}

export default function ServiceFinancingScreen({ onBack, serviceAmount = 1200, serviceName = "Brake Service Package" }: ServiceFinancingScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const financingOptions: FinancingOption[] = [
    {
      id: 'tabby-4',
      provider: 'tabby',
      totalAmount: serviceAmount,
      installments: 4,
      monthlyAmount: serviceAmount / 4,
      interestRate: 0,
      approved: true
    },
    {
      id: 'tabby-6',
      provider: 'tabby',
      totalAmount: serviceAmount,
      installments: 6,
      monthlyAmount: serviceAmount / 6,
      interestRate: 2.5,
      approved: true
    },
    {
      id: 'tamara-3',
      provider: 'tamara',
      totalAmount: serviceAmount,
      installments: 3,
      monthlyAmount: serviceAmount / 3,
      interestRate: 0,
      approved: true
    },
    {
      id: 'postpay-4',
      provider: 'postpay',
      totalAmount: serviceAmount,
      installments: 4,
      monthlyAmount: serviceAmount / 4,
      interestRate: 1.5,
      approved: false
    }
  ];

  const getProviderLogo = (provider: string) => {
    const logos = {
      tabby: '🟣',
      tamara: '🟢',
      postpay: '🔵'
    };
    return logos[provider as keyof typeof logos] || '💳';
  };

  const getProviderColor = (provider: string) => {
    const colors = {
      tabby: 'border-purple-200 bg-purple-50',
      tamara: 'border-green-200 bg-green-50',
      postpay: 'border-blue-200 bg-blue-50'
    };
    return colors[provider as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setShowApplication(true);
  };

  const selectedFinancingOption = financingOptions.find(opt => opt.id === selectedOption);

  if (showApplication && selectedFinancingOption) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Header title="Financing Application" showBack onBack={() => setShowApplication(false)} />
        
        <div className="p-4 space-y-6">
          {/* Selected Option Summary */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Plan</h3>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">{getProviderLogo(selectedFinancingOption.provider)}</span>
              <div>
                <h4 className="font-medium text-gray-900 capitalize">{selectedFinancingOption.provider}</h4>
                <p className="text-sm text-gray-600">
                  {selectedFinancingOption.installments} payments of AED {selectedFinancingOption.monthlyAmount.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span>Service Total:</span>
                <span>AED {serviceAmount}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Interest ({selectedFinancingOption.interestRate}%):</span>
                <span>AED {((serviceAmount * selectedFinancingOption.interestRate) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total to Pay:</span>
                <span>AED {(serviceAmount + (serviceAmount * selectedFinancingOption.interestRate) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emirates ID
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="784-XXXX-XXXXXXX-X"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter monthly income in AED"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Status
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value="">Select employment status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business-owner">Business Owner</option>
                </select>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <p className="text-sm text-gray-600">
                  I agree to the terms and conditions and authorize credit checks
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Service Financing" showBack onBack={onBack} />
      
      <div className="p-4 space-y-6">
        {/* Service Summary */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{serviceName}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-2xl font-bold text-gray-900">AED {serviceAmount}</span>
          </div>
        </div>

        {/* Financing Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Choose Your Payment Plan</h3>
          
          {financingOptions.map((option) => (
            <div
              key={option.id}
              className={`bg-white rounded-xl p-4 border-2 ${getProviderColor(option.provider)} ${
                !option.approved ? 'opacity-60' : 'cursor-pointer hover:shadow-md'
              }`}
              onClick={() => option.approved && handleSelectOption(option.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getProviderLogo(option.provider)}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">{option.provider}</h4>
                    <p className="text-sm text-gray-600">
                      Split into {option.installments} payments
                    </p>
                  </div>
                </div>
                {option.approved ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                    Pre-approval required
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-500">Monthly Payment</p>
                  <p className="text-xl font-bold text-gray-900">
                    AED {option.monthlyAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Rate</p>
                  <p className="text-xl font-bold text-gray-900">
                    {option.interestRate}%
                  </p>
                </div>
              </div>
              
              {option.interestRate === 0 && (
                <div className="flex items-center space-x-2 text-green-600 text-sm">
                  <CheckCircle size={16} />
                  <span>0% Interest - No additional fees</span>
                </div>
              )}
              
              {!option.approved && (
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                  <Info size={16} />
                  <span>Subject to credit approval</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment Calculator */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Calculator size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Payment Calculator</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Amount:</span>
              <span className="font-medium">AED {serviceAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Best 0% Option:</span>
              <span className="font-medium text-green-600">
                {Math.min(...financingOptions.filter(o => o.interestRate === 0).map(o => o.installments))} payments of AED {(serviceAmount / Math.min(...financingOptions.filter(o => o.interestRate === 0).map(o => o.installments))).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lowest Monthly:</span>
              <span className="font-medium text-blue-600">
                AED {Math.min(...financingOptions.map(o => o.monthlyAmount)).toFixed(2)} per month
              </span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Financing?</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Instant Approval</p>
                <p className="text-sm text-gray-600">Get approved in seconds with our partner providers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">No Hidden Fees</p>
                <p className="text-sm text-gray-600">Transparent pricing with no surprise charges</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Flexible Terms</p>
                <p className="text-sm text-gray-600">Choose the payment plan that works for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}