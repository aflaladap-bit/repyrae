import React, { useState } from 'react';
import Header from './Header';
import { Brain, CheckCircle, FileText, AlertTriangle, Wrench, Download, Share } from 'lucide-react';

interface AIDiagnosticsScreenProps {
  onBack: () => void;
}

interface DiagnosticResult {
  confidence: number;
  primaryIssue: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  possibleCauses: string[];
  recommendations: string[];
  partsRequired: string[];
  estimatedCost: { min: number; max: number };
  urgency: string;
  nextSteps: string[];
}

export default function AIDiagnosticsScreen({ onBack }: AIDiagnosticsScreenProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiagnosticResult | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [errorCodes, setErrorCodes] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const commonSymptoms = [
    'Engine making strange noises',
    'Car won\'t start',
    'Engine overheating',
    'Brake squealing',
    'Steering wheel vibration',
    'Check engine light on',
    'Poor fuel economy',
    'Transmission slipping',
    'AC not cooling',
    'Battery warning light',
    'Oil pressure warning',
    'Rough idle',
    'Smoke from exhaust',
    'Grinding noise when braking',
    'Car pulls to one side',
    'Unusual vibrations',
    'Loss of power',
    'Strange smells',
    'Dashboard warning lights',
    'Difficulty shifting gears'
  ];

  const mockAnalyzeSymptoms = async (): Promise<DiagnosticResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate more realistic results based on selected symptoms
        const hasEngineSymptoms = selectedSymptoms.some(s => 
          s.includes('engine') || s.includes('power') || s.includes('fuel')
        );
        const hasBrakeSymptoms = selectedSymptoms.some(s => 
          s.includes('brake') || s.includes('grinding')
        );
        
        if (hasEngineSymptoms) {
          resolve({
            confidence: 89,
            primaryIssue: 'Engine Performance Issue',
            severity: 'high',
            description: 'Based on the selected symptoms and error codes, your vehicle is experiencing engine performance problems that require immediate attention.',
            possibleCauses: [
              'Faulty spark plugs or ignition coils',
              'Clogged fuel injectors',
              'Air filter restriction',
              'Fuel pump malfunction',
              'Oxygen sensor failure'
            ],
            recommendations: [
              'Perform engine diagnostic scan',
              'Replace spark plugs and ignition coils',
              'Clean or replace fuel injectors',
              'Check and replace air filter',
              'Test fuel pressure system'
            ],
            partsRequired: [
              'Spark Plugs (Set of 4)',
              'Air Filter',
              'Engine Oil (5L)'
            ],
            estimatedCost: { min: 250, max: 800 },
            urgency: 'Address within 1-2 days to prevent further damage',
            nextSteps: [
              'Book diagnostic appointment immediately',
              'Avoid heavy acceleration until repaired',
              'Monitor engine temperature closely',
              'Keep emergency contact ready'
            ]
          });
        } else if (hasBrakeSymptoms) {
          resolve({
            confidence: 94,
            primaryIssue: 'Brake System Warning',
            severity: 'high',
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
            estimatedCost: { min: 300, max: 1200 },
            urgency: 'URGENT - Address immediately for safety',
            nextSteps: [
              'Schedule emergency brake inspection',
              'Drive carefully to nearest garage',
              'Test brakes in safe area before driving',
              'Have vehicle towed if unsafe'
            ]
          });
        } else {
          resolve({
            confidence: 76,
            primaryIssue: 'General Maintenance Required',
            severity: 'medium',
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
            estimatedCost: { min: 150, max: 400 },
            urgency: 'Schedule within 1-2 weeks',
            nextSteps: [
              'Book routine maintenance appointment',
              'Monitor symptoms for changes',
              'Keep maintenance log updated',
              'Follow manufacturer service schedule'
            ]
          });
        }
      }, 3000);
    });
  };

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    setResults(null);
    
    try {
      const result = await mockAnalyzeSymptoms();
      setResults(result);
    } catch (error) {
      console.error('Symptom analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const generateReport = () => {
    if (!results) return;
    
    const reportData = {
      date: new Date().toISOString(),
      symptoms: selectedSymptoms,
      errorCodes,
      additionalDetails,
      results
    };
    
    // In a real app, this would generate and download a PDF
    console.log('Diagnostic Report:', reportData);
    alert('Diagnostic report generated! (In production, this would download a PDF)');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="AI Symptom Checker" showBack onBack={onBack} />
      
      {/* AI Header */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white p-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Brain size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI-Powered Symptom Analysis</h2>
            <p className="text-sm opacity-90">Describe your vehicle's symptoms for instant diagnosis</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Symptom Selection */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Symptoms</h3>
          <div className="space-y-2">
            {commonSymptoms.map((symptom, index) => (
              <button
                key={index}
                onClick={() => handleSymptomToggle(symptom)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedSymptoms.includes(symptom)
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {selectedSymptoms.includes(symptom) && (
                      <CheckCircle size={12} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm">{symptom}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Codes Input */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Codes (Optional)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter any error codes displayed
              </label>
              <input
                type="text"
                value={errorCodes}
                onChange={(e) => setErrorCodes(e.target.value)}
                placeholder="e.g., P0301, P0420, B1234"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple codes with commas
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                rows={3}
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Describe when the issue occurs, how long it's been happening, any recent changes..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0 || isAnalyzing}
          className="w-full bg-primary text-white py-4 rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing Symptoms...' : `Analyze Symptoms (${selectedSymptoms.length})`}
        </button>

        {/* Analysis Loading */}
        {isAnalyzing && (
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain size={32} className="text-purple-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis in Progress</h3>
            <p className="text-gray-600 mb-4">Our AI is analyzing your symptoms and error codes...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        )}

        {/* Diagnostic Report Results */}
        {results && (
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Diagnostic Report</h3>
                <p className="text-sm text-gray-500">AI Confidence: {results.confidence}%</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Primary Issue */}
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold text-gray-900">{results.primaryIssue}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(results.severity)}`}>
                    {results.severity} priority
                  </span>
                </div>
                <p className="text-gray-600">{results.description}</p>
              </div>
              
              {/* Urgency */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle size={20} className="text-yellow-600" />
                  <h5 className="font-semibold text-yellow-800">Urgency</h5>
                </div>
                <p className="text-yellow-700">{results.urgency}</p>
              </div>

              {/* Possible Causes */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Possible Causes:</h5>
                <ul className="space-y-2">
                  {results.possibleCauses.map((cause, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-600">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Parts Required */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Parts Required:</h5>
                <ul className="space-y-2">
                  {results.partsRequired.map((part, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-600">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{part}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recommendations */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Required Repairs:</h5>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-600">
                      <Wrench size={16} className="text-primary mt-1" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Next Steps:</h5>
                <ul className="space-y-2">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-600">
                      <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Cost Estimate */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Repair Cost:</span>
                  <span className="text-xl font-bold text-gray-900">
                    AED {results.estimatedCost.min} - {results.estimatedCost.max}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={generateReport}
                  className="flex items-center justify-center space-x-2 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Download size={16} />
                  <span>Download Report</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  <Share size={16} />
                  <span>Get Quotes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Diagnosis</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <CheckCircle size={16} className="text-green-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Be Specific</p>
                <p className="text-gray-600">Select all relevant symptoms, even minor ones</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={16} className="text-green-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Include Error Codes</p>
                <p className="text-gray-600">OBD-II codes provide precise diagnostic information</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={16} className="text-green-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Describe Context</p>
                <p className="text-gray-600">When, where, and how the issues occur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}