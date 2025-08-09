import React, { useState } from 'react';
import { Car, Phone, Check } from 'lucide-react';

interface SignupScreenProps {
  onComplete: () => void;
  userRole?: string;
}

export default function SignupScreen({ onComplete, userRole }: SignupScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [garageInfo, setGarageInfo] = useState({
    garageName: '',
    ownerName: '',
    address: '',
    specializations: [] as string[],
    dailyCapacity: '',
    workingHours: {
      open: '08:00',
      close: '18:00'
    },
    services: [] as string[]
  });

  const vehicleSpecializations = [
    'Sedans & Hatchbacks',
    'SUVs & Crossovers',
    'Luxury Vehicles',
    'Commercial Vehicles',
    'Motorcycles',
    'Electric Vehicles',
    'Hybrid Vehicles',
    'Classic Cars',
    'Sports Cars',
    'Trucks & Vans'
  ];

  const serviceTypes = [
    'Oil Change',
    'Brake Service',
    'Engine Repair',
    'Transmission Service',
    'AC Service',
    'Tire Service',
    'Battery Service',
    'Electrical Diagnostics',
    'Body Work',
    'Paint Service',
    'Suspension Repair',
    'Exhaust System'
  ];

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 9) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setStep('profile');
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole === 'garage') {
      if (garageInfo.garageName.trim() && garageInfo.ownerName.trim() && 
          garageInfo.address.trim() && garageInfo.specializations.length > 0 && 
          garageInfo.dailyCapacity && garageInfo.services.length > 0) {
        onComplete();
      }
    } else if (name.trim()) {
      onComplete();
    }
  };

  const handleSpecializationToggle = (specialization: string) => {
    setGarageInfo(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const handleServiceToggle = (service: string) => {
    setGarageInfo(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Car size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Repyr</h1>
          <p className="text-white/80 text-lg">On-Demand Auto Repair</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                UAE Phone Number
              </label>
              <div className="flex">
                <span className="bg-white/10 text-white px-4 py-3 rounded-l-lg border border-white/20">
                  +971
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="50 123 4567"
                  className="flex-1 bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-r-lg border border-white/20 focus:outline-none focus:border-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-primary py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Enter OTP sent to +971 {phoneNumber}
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                maxLength={4}
                className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-white text-center text-2xl tracking-widest"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-primary py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Verify OTP
            </button>
            <button
              type="button"
              className="w-full text-white/80 text-sm"
            >
              Resend OTP
            </button>
          </form>
        )}

        {step === 'profile' && (
          <div className="max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {userRole === 'garage' ? (
                <>
                  {/* Garage Name */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Garage Name
                    </label>
                    <input
                      type="text"
                      value={garageInfo.garageName}
                      onChange={(e) => setGarageInfo(prev => ({ ...prev, garageName: e.target.value }))}
                      placeholder="Enter your garage name"
                      className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-white"
                      required
                    />
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      value={garageInfo.ownerName}
                      onChange={(e) => setGarageInfo(prev => ({ ...prev, ownerName: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-white"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Garage Address
                    </label>
                    <textarea
                      rows={3}
                      value={garageInfo.address}
                      onChange={(e) => setGarageInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter complete address"
                      className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-white"
                      required
                    />
                  </div>

                  {/* Vehicle Specializations */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Vehicle Specializations (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {vehicleSpecializations.map((specialization) => (
                        <button
                          key={specialization}
                          type="button"
                          onClick={() => handleSpecializationToggle(specialization)}
                          className={`p-3 rounded-lg text-sm transition-colors ${
                            garageInfo.specializations.includes(specialization)
                              ? 'bg-white text-primary'
                              : 'bg-white/10 text-white border border-white/20'
                          }`}
                        >
                          {specialization}
                        </button>
                      ))}
                    </div>
                    {garageInfo.specializations.length === 0 && (
                      <p className="text-white/60 text-xs mt-2">Please select at least one specialization</p>
                    )}
                  </div>

                  {/* Services Offered */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Services Offered (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceTypes.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className={`p-3 rounded-lg text-sm transition-colors ${
                            garageInfo.services.includes(service)
                              ? 'bg-white text-primary'
                              : 'bg-white/10 text-white border border-white/20'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                    {garageInfo.services.length === 0 && (
                      <p className="text-white/60 text-xs mt-2">Please select at least one service</p>
                    )}
                  </div>

                  {/* Daily Capacity */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Daily Vehicle Capacity
                    </label>
                    <select
                      value={garageInfo.dailyCapacity}
                      onChange={(e) => setGarageInfo(prev => ({ ...prev, dailyCapacity: e.target.value }))}
                      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-white"
                      required
                    >
                      <option value="" className="text-gray-900">Select daily capacity</option>
                      <option value="1-5" className="text-gray-900">1-5 vehicles per day</option>
                      <option value="6-10" className="text-gray-900">6-10 vehicles per day</option>
                      <option value="11-20" className="text-gray-900">11-20 vehicles per day</option>
                      <option value="21-30" className="text-gray-900">21-30 vehicles per day</option>
                      <option value="30+" className="text-gray-900">30+ vehicles per day</option>
                    </select>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Working Hours
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-xs mb-1">Opening Time</label>
                        <input
                          type="time"
                          value={garageInfo.workingHours.open}
                          onChange={(e) => setGarageInfo(prev => ({
                            ...prev,
                            workingHours: { ...prev.workingHours, open: e.target.value }
                          }))}
                          className="w-full bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-xs mb-1">Closing Time</label>
                        <input
                          type="time"
                          value={garageInfo.workingHours.close}
                          onChange={(e) => setGarageInfo(prev => ({
                            ...prev,
                            workingHours: { ...prev.workingHours, close: e.target.value }
                          }))}
                          className="w-full bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    What should we call you?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:border-white"
                  />
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-white text-primary py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Check size={20} />
                <span>Complete Setup</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}