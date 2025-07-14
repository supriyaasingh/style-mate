import React, { useState } from 'react';
import { Calculator, Save, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { calculateBodyShape, getBodyShapeDescription } from '../utils/calculations';
import { BodyMeasurements, BodyShape } from '../types';

const BodyCalculator: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    bust: user?.measurements?.bust || 0,
    waist: user?.measurements?.waist || 0,
    hips: user?.measurements?.hips || 0,
    shoulders: user?.measurements?.shoulders || 0,
    height: user?.measurements?.height || 0,
    weight: user?.measurements?.weight || 0
  });
  
  const [result, setResult] = useState<BodyShape | null>(user?.bodyShape || null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const bodyShape = calculateBodyShape(measurements);
      setResult(bodyShape);
      setIsCalculating(false);
    }, 1500);
  };

  const handleSave = () => {
    if (user && result) {
      updateUser({
        measurements,
        bodyShape: result
      });
      alert('Measurements and body shape saved successfully!');
    }
  };

  const reset = () => {
    setMeasurements({
      bust: 0,
      waist: 0,
      hips: 0,
      shoulders: 0,
      height: 0,
      weight: 0
    });
    setResult(null);
  };

  const inputFields = [
    { name: 'bust', label: user?.gender === 'male' ? 'Chest' : 'Bust', unit: 'inches' },
    { name: 'waist', label: 'Waist', unit: 'inches' },
    { name: 'hips', label: 'Hips', unit: 'inches' },
    { name: 'shoulders', label: 'Shoulders', unit: 'inches' },
    { name: 'height', label: 'Height', unit: 'inches' },
    { name: 'weight', label: 'Weight', unit: 'lbs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Body Shape Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your measurements to discover your body shape and get personalized styling advice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-rose-500" />
              Enter Measurements
            </h2>
            
            <div className="space-y-6">
              {inputFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} ({field.unit})
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    value={measurements[field.name as keyof BodyMeasurements] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    step="0.1"
                  />
                </div>
              ))}
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleCalculate}
                  disabled={isCalculating || Object.values(measurements).some(v => v <= 0)}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <Calculator className="h-5 w-5" />
                      <span>Calculate</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={reset}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Body Shape
            </h2>
            
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                      {result.type.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                    {result.type.replace('-', ' ')}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-sm text-gray-600">Confidence:</span>
                    <div className="bg-gray-200 rounded-full h-2 w-32">
                      <div 
                        className="bg-gradient-to-r from-rose-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">About Your Body Shape</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {getBodyShapeDescription(result.type, user?.gender || 'female')}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Styling Tips</h4>
                  <ul className="text-gray-700 space-y-2">
                    {result.type === 'hourglass' && (
                      <>
                        <li>• Emphasize your waist with belted outfits</li>
                        <li>• Choose fitted tops and bottoms</li>
                        <li>• Avoid boxy or shapeless clothing</li>
                      </>
                    )}
                    {result.type === 'pear' && (
                      <>
                        <li>• Highlight your upper body with bright colors</li>
                        <li>• Choose A-line skirts and wide-leg pants</li>
                        <li>• Add volume to your shoulders</li>
                      </>
                    )}
                    {result.type === 'apple' && (
                      <>
                        <li>• Draw attention to your legs and arms</li>
                        <li>• Choose empire waists and flowy tops</li>
                        <li>• Avoid tight-fitting waistlines</li>
                      </>
                    )}
                    {result.type === 'rectangle' && (
                      <>
                        <li>• Create curves with belts and layers</li>
                        <li>• Choose peplum tops and flared bottoms</li>
                        <li>• Add volume with ruffles and textures</li>
                      </>
                    )}
                    {result.type === 'inverted-triangle' && (
                      <>
                        <li>• Balance your frame with fuller bottoms</li>
                        <li>• Choose darker colors for your upper body</li>
                        <li>• Add volume to your hips</li>
                      </>
                    )}
                  </ul>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Results</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your measurements and click calculate to see your body shape results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCalculator;