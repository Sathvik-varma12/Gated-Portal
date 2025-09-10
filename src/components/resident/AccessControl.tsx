
import React, { useState } from 'react';
import { Shield, Key, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Define types for resident and visitor
interface Resident {
  name: string;
  unit: string;
}

interface Visitor {
  name: string;
  hostResident: string;
  validUntil: string;
}

// Union type
type Person = Resident | Visitor;

// Validation result type
interface ValidationResult {
  isValid: boolean;
  person?: Person;
  type?: 'resident' | 'visitor';
  message: string;
}

const AccessControl: React.FC = () => {
  const { validateAccessCode, recordEntry } = useApp();
  const [accessCode, setAccessCode] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      setValidationResult({
        isValid: false,
        message: 'Please enter an access code'
      });
      return;
    }

    const result = validateAccessCode(accessCode);
    
    if (result.isValid && result.person && result.type) {
      // Record successful entry
      recordEntry({
        personName: result.person.name,
        personType: result.type,
        accessCode: accessCode,
        success: true,
        unitNumber: result.type === 'resident' ? (result.person as Resident).unit : undefined,
        notes: result.type === 'visitor' ? `Visiting ${(result.person as Visitor).hostResident}` : undefined
      });

      setValidationResult({
        isValid: true,
        person: result.person,
        type: result.type,
        message: `Access granted for ${result.person.name}`
      });
    } else {
      // Record failed entry attempt
      recordEntry({
        personName: 'Unknown',
        personType: 'resident', // Default to resident for failed attempts
        accessCode: accessCode,
        success: false,
        notes: 'Invalid access code'
      });

      setValidationResult({
        isValid: false,
        message: 'Invalid or expired access code'
      });
    }

    // Clear the input after a delay
    setTimeout(() => {
      setAccessCode('');
      setValidationResult(null);
    }, 5000);
  };

  const formatValidUntil = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 rounded-full p-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Access Control Terminal</h2>
        <p className="text-gray-600">Enter your access code to gain entry</p>
      </div>

      {/* Access Code Input */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleValidateCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Access Code
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="w-full pl-10 pr-4 py-4 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  maxLength={6}
                  autoComplete="off"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Validate Access
            </button>
          </form>

          {/* Validation Result */}
          {validationResult && (
            <div className={`mt-6 p-4 rounded-lg ${
              validationResult.isValid 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {validationResult.isValid ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 mr-3" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    validationResult.isValid ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {validationResult.isValid ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                  </p>
                  <p className={`text-sm ${
                    validationResult.isValid ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {validationResult.message}
                  </p>
                </div>
              </div>

              {validationResult.isValid && validationResult.person && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-600 font-medium">Name:</p>
                      <p className="text-green-800">{validationResult.person.name}</p>
                    </div>
                    <div>
                      <p className="text-green-600 font-medium">Type:</p>
                      <p className="text-green-800 capitalize">{validationResult.type}</p>
                    </div>
                    {validationResult.type === 'resident' && 'unit' in validationResult.person && (
                      <div>
                        <p className="text-green-600 font-medium">Unit:</p>
                        <p className="text-green-800">{validationResult.person.unit}</p>
                      </div>
                    )}
                    {validationResult.type === 'visitor' && 'hostResident' in validationResult.person && (
                      <>
                        <div>
                          <p className="text-green-600 font-medium">Host:</p>
                          <p className="text-green-800">{validationResult.person.hostResident}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-green-600 font-medium">Valid Until:</p>
                          <p className="text-green-800">
                            {formatValidUntil(validationResult.person.validUntil)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Security Information */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Security Notice</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• All entry attempts are logged and monitored</li>
                <li>• Report any suspicious activity to security immediately</li>
                <li>• Do not share your access code with unauthorized persons</li>
                <li>• Contact management for lost or compromised codes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Residents</h4>
              <p className="text-sm text-gray-600">Use your permanent 6-digit access code</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                <Key className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Visitors</h4>
              <p className="text-sm text-gray-600">Use your temporary code within valid timeframe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
