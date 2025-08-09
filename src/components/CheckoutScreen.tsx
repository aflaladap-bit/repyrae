import React, { useState } from 'react';
import Header from './Header';
import { MapPin, Clock, CreditCard, Star, Shield, CheckCircle, AlertTriangle, Car, User, Truck, Home, Building2 } from 'lucide-react';

interface CheckoutScreenProps {
  onBack: () => void;
  selectedQuote?: {
    id: string;
    garageName: string;
    rating: number;
    price: number;
    estimatedTime: string;
    description: string;
    distance: string;
  };
  serviceDetails?: {
    type: string;
    vehicleInfo: {
      make: string;
      model: string;
      year: number;
      plate: string;
    };
    scheduledDate: string;
    scheduledTime: string;
  };
}

export default function CheckoutScreen({ onBack, selectedQuote, serviceDetails }: CheckoutScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'financing'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [contactPreference, setContactPreference] = useState<'call' | 'whatsapp' | 'sms'>('whatsapp');
  const [serviceLocation, setServiceLocation] = useState<'pickup-dropoff' | 'repyr-facility' | 'selected-garage'>('pickup-dropoff');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - in real app this would come from props
  const quote = selectedQuote || {
    id: '1',
    garageName: 'Al Futtaim Motors',
    rating: 4.8,
    price: 450,
    estimatedTime: '2-3 hours',
    description: 'Brake pad replacement with premium pads',
    distance: '2.3 km'
  };

  const service = serviceDetails || {
    type: 'Brake Service',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      plate: 'A-12345'
    },
    scheduledDate: '2024-02-15',
    scheduledTime: '10:00'
  };

  const serviceLocationOptions = [
    {
      id: 'pickup-dropoff' as const,
      title: 'Pickup & Dropoff Service',
      subtitle: 'We collect and deliver your car',
      icon: Truck,
      price: '+AED 100',
      description: 'Convenient door-to-door service'
    },
    {
      id: 'repyr-facility' as const,
      title: 'Drop at Repyr Facility',
      subtitle: 'Use our nearest service center',
      icon: Building2,
      price: 'Free',
      description: 'Professional facility with waiting area'
    },
    {
      id: 'selected-garage' as const,
      title: 'Drop at Selected Garage',
      subtitle: 'Visit the garage directly',
      icon: Home,
      price: 'Free',
      description: 'Direct service at garage location'
    }
  ];

  const subtotal = quote.price;
  const pickupFee = serviceLocation === 'pickup-dropoff' ? 100 : 0;
  const platformFee = Math.round(subtotal * 0.05); // 5% platform fee
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0; // 10% discount
  const total = subtotal + pickupFee + platformFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'first10' || promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleBookService = async () => {
    setIsProcessing(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsProcessing(false);
      alert('Service booked successfully! You will receive confirmation shortly.');
      onBack();
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Checkout" showBack onBack={onBack} />
      
      <div className="p-4 space-y-4">
        {/* Service Summary Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Car size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{service.type}</h3>
              <p className="text-sm text-gray-600">
                {service.vehicleInfo.make} {service.vehicleInfo.model} {service.vehicleInfo.year}
              </p>
              <p className="text-xs text-gray-500">Plate: {service.vehicleInfo.plate}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Scheduled:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date(service.scheduledDate).toLocaleDateString()} at {service.scheduledTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Duration:</span>
              <span className="text-sm font-medium text-gray-900">{quote.estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Garage Details Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">{quote.garageName}</h4>
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
              <div className="flex items-center space-x-1">
                <Shield size={16} className="text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{quote.description}</p>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">6 months warranty included</span>
            </div>
          </div>
        </div>

        {/* Service Location Options */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Service Location</h4>
          <div className="space-y-3">
            {serviceLocationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setServiceLocation(option.id)}
                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                  serviceLocation === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <option.icon size={24} className={serviceLocation === option.id ? 'text-primary' : 'text-gray-600'} />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{option.title}</p>
                      <span className={`text-sm font-medium ${
                        option.price === 'Free' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {option.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{option.subtitle}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                  {serviceLocation === option.id && (
                    <CheckCircle size={20} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Address Details for Pickup/Dropoff */}
        {serviceLocation === 'pickup-dropoff' && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Pickup & Dropoff Addresses</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Address
                </label>
                <textarea
                  rows={2}
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter pickup address with landmarks..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dropoff Address
                </label>
                <textarea
                  rows={2}
                  value={dropoffAddress}
                  onChange={(e) => setDropoffAddress(e.target.value)}
                  placeholder="Enter dropoff address with landmarks..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle size={16} className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Pickup & Dropoff Service</p>
                    <ul className="text-xs space-y-1">
                      <li>• Vehicle will be collected within 2 hours of scheduled time</li>
                      <li>• Service completion notification will be sent</li>
                      <li>• Vehicle will be delivered within 2 hours of completion</li>
                      <li>• Additional AED 100 covers both pickup and dropoff</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Repyr Facility Info */}
        {serviceLocation === 'repyr-facility' && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Repyr Service Facility</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Dubai Marina Service Center</p>
                  <p className="text-sm text-gray-600">Sheikh Zayed Road, Dubai Marina</p>
                  <p className="text-xs text-gray-500">2.3 km from your location</p>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-1">Facility Benefits</p>
                    <ul className="text-xs space-y-1">
                      <li>• Comfortable waiting area with WiFi</li>
                      <li>• Complimentary refreshments</li>
                      <li>• Real-time service updates</li>
                      <li>• Professional customer service</li>
                      <li>• Secure parking facility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Garage Info */}
        {serviceLocation === 'selected-garage' && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3">Garage Location</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{quote.garageName}</p>
                  <p className="text-sm text-gray-600">Business Bay, Dubai</p>
                  <p className="text-xs text-gray-500">{quote.distance} from your location</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle size={16} className="text-gray-600 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Direct Garage Service</p>
                    <ul className="text-xs space-y-1">
                      <li>• Drop off your vehicle at the garage directly</li>
                      <li>• Coordinate timing with garage staff</li>
                      <li>• Pickup when service is completed</li>
                      <li>• Direct communication with technicians</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Preference */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Contact Preference</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
              { id: 'call', label: 'Phone Call', icon: '📞' },
              { id: 'sms', label: 'SMS', icon: '💬' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setContactPreference(option.id as any)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  contactPreference === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <span className="text-sm font-medium text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Special Instructions (Optional)</h4>
          <textarea
            rows={3}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any specific requirements or notes for the garage..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Promo Code</h4>
          <div className="flex space-x-3">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              disabled={promoApplied}
            />
            <button
              onClick={handleApplyPromo}
              disabled={promoApplied || !promoCode}
              className={`px-6 py-3 rounded-lg font-medium ${
                promoApplied
                  ? 'bg-green-100 text-green-800'
                  : 'bg-primary text-white hover:bg-primary-dark disabled:opacity-50'
              }`}
            >
              {promoApplied ? 'Applied' : 'Apply'}
            </button>
          </div>
          {promoApplied && (
            <div className="flex items-center space-x-2 mt-2 text-green-600">
              <CheckCircle size={16} />
              <span className="text-sm">10% discount applied!</span>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
          <div className="space-y-3">
            {[
              { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Pay securely with your card' },
              { id: 'cash', label: 'Cash on Service', icon: User, desc: 'Pay when service is completed' },
              { id: 'financing', label: 'Split Payment', icon: Clock, desc: 'Pay in installments (Tabby/Tamara)' }
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as any)}
                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <method.icon size={24} className={paymentMethod === method.id ? 'text-primary' : 'text-gray-600'} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{method.label}</p>
                    <p className="text-sm text-gray-600">{method.desc}</p>
                  </div>
                  {paymentMethod === method.id && (
                    <CheckCircle size={20} className="text-primary ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">Price Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Cost</span>
              <span className="font-medium">AED {subtotal}</span>
            </div>
            {pickupFee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup & Dropoff</span>
                <span className="font-medium">AED {pickupFee}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Fee</span>
              <span className="font-medium">AED {platformFee}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span className="font-medium">-AED {discount}</span>
              </div>
            )}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary">AED {total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={20} className="text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Important Notes:</p>
              <ul className="space-y-1 text-xs">
                <li>• Service time may vary based on actual condition</li>
                <li>• Additional charges may apply for extra parts/services</li>
                <li>• Cancellation allowed up to 2 hours before scheduled time</li>
                <li>• Warranty terms apply as per garage policy</li>
                {serviceLocation === 'pickup-dropoff' && (
                  <li>• Pickup/dropoff service operates 8 AM - 8 PM daily</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Book Service Button */}
        <div className="sticky bottom-4">
          <button
            onClick={handleBookService}
            disabled={isProcessing}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                <span>Book Service - AED {total}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}