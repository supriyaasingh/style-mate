import React, { useState } from 'react';
import { Calculator, Save, TrendingUp, Heart, Target, Scale } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { calculateBMI, getHealthConsciousStyling } from '../utils/calculations';
import { BMIData } from '../types';

const BMICalculator: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [measurements, setMeasurements] = useState({
    height: user?.measurements?.height || 0,
    weight: user?.measurements?.weight || 0
  });
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [result, setResult] = useState<BMIData | null>(user?.bmi || null);
  const [fitnessGoals, setFitnessGoals] = useState<string[]>(user?.healthProfile?.bodyGoals || []);
  const [showHealthProfile, setShowHealthProfile] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleCalculate = () => {
    if (measurements.height > 0 && measurements.weight > 0) {
      const bmiResult = calculateBMI(measurements.height, measurements.weight, unit);
      setResult(bmiResult);
    }
  };

  const handleSave = () => {
    if (user && result) {
      updateUser({
        bmi: result,
        measurements: {
          ...user.measurements,
          height: measurements.height,
          weight: measurements.weight
        },
        healthProfile: {
          ...user.healthProfile,
          bodyGoals: fitnessGoals
        }
      });
      alert('BMI and health profile saved successfully!');
    }
  };

  const toggleFitnessGoal = (goal: string) => {
    setFitnessGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const availableGoals = [
    'weight-loss', 'muscle-building', 'maintenance', 'flexibility', 
    'endurance', 'strength', 'general-fitness', 'posture-improvement'
  ];

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'underweight': return 'text-blue-600 bg-blue-100';
      case 'normal': return 'text-green-600 bg-green-100';
      case 'overweight': return 'text-yellow-600 bg-yellow-100';
      case 'obese': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const healthSuggestions = result && user?.bodyShape && fitnessGoals.length > 0 
    ? getHealthConsciousStyling(result, user.bodyShape, fitnessGoals)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Health & Style Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your BMI and get health-conscious styling recommendations tailored to your wellness goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* BMI Calculator */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Scale className="h-6 w-6 mr-2 text-blue-500" />
              BMI Calculator
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit System
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="imperial"
                      checked={unit === 'imperial'}
                      onChange={(e) => setUnit(e.target.value as 'imperial' | 'metric')}
                      className="mr-2"
                    />
                    Imperial (ft/in, lbs)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="metric"
                      checked={unit === 'metric'}
                      onChange={(e) => setUnit(e.target.value as 'imperial' | 'metric')}
                      className="mr-2"
                    />
                    Metric (cm, kg)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height ({unit === 'imperial' ? 'inches' : 'cm'})
                </label>
                <input
                  type="number"
                  name="height"
                  value={measurements.height || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={unit === 'imperial' ? 'e.g., 68' : 'e.g., 173'}
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
                </label>
                <input
                  type="number"
                  name="weight"
                  value={measurements.weight || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={unit === 'imperial' ? 'e.g., 150' : 'e.g., 68'}
                  step="0.1"
                />
              </div>

              <button
                onClick={handleCalculate}
                disabled={measurements.height <= 0 || measurements.weight <= 0}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Calculator className="h-5 w-5" />
                <span>Calculate BMI</span>
              </button>
            </div>
          </div>

          {/* BMI Results */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Results
            </h2>
            
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
                      {result.value}
                    </span>
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getBMIColor(result.category)}`}>
                    {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Health Range</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Healthy BMI: {result.healthyRange.min} - {result.healthyRange.max}
                  </p>
                  <div className="bg-gray-200 rounded-full h-3 relative">
                    <div 
                      className="bg-green-400 h-3 rounded-full absolute"
                      style={{ 
                        left: `${((result.healthyRange.min - 15) / 25) * 100}%`,
                        width: `${((result.healthyRange.max - result.healthyRange.min) / 25) * 100}%`
                      }}
                    />
                    <div 
                      className="w-3 h-3 bg-blue-600 rounded-full absolute top-0 transform -translate-x-1/2"
                      style={{ left: `${((result.value - 15) / 25) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Style Recommendations</h4>
                  <ul className="text-gray-700 space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm">• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your measurements to calculate your BMI and get personalized recommendations.
                </p>
              </div>
            )}
          </div>

          {/* Health Profile */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-green-500" />
              Fitness Goals
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-4">
                  Select your fitness and wellness goals to get more personalized styling advice:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {availableGoals.map(goal => (
                    <button
                      key={goal}
                      onClick={() => toggleFitnessGoal(goal)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        fitnessGoals.includes(goal)
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      {goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              {healthSuggestions.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-green-600" />
                    Health-Conscious Styling
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    {healthSuggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm">• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result && (
                <button
                  onClick={handleSave}
                  className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Health Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Health Tips */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Wellness & Style Integration
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comfort First</h3>
              <p className="text-gray-600 text-sm">
                Choose clothing that supports your body and makes you feel confident throughout the day.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
              <p className="text-gray-600 text-sm">
                Align your wardrobe with your fitness journey and lifestyle changes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">
                Monitor your style evolution as you work towards your health goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;