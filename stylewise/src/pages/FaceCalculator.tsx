import React, { useState } from 'react';
import { Camera, Save, RefreshCw, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { calculateFaceShape, getFaceShapeDescription } from '../utils/calculations';
import { FaceShape } from '../types';

const FaceCalculator: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [measurements, setMeasurements] = useState({
    faceLength: 0,
    faceWidth: 0,
    jawWidth: 0,
    foreheadWidth: 0
  });
  
  const [result, setResult] = useState<FaceShape | null>(user?.faceShape || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        // Simulate automatic measurement detection
        setMeasurements({
          faceLength: 6.5,
          faceWidth: 5.2,
          jawWidth: 4.1,
          foreheadWidth: 5.0
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const faceShape = calculateFaceShape(measurements);
      setResult(faceShape);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSave = () => {
    if (user && result) {
      updateUser({
        faceShape: result
      });
      alert('Face shape analysis saved successfully!');
    }
  };

  const reset = () => {
    setMeasurements({
      faceLength: 0,
      faceWidth: 0,
      jawWidth: 0,
      foreheadWidth: 0
    });
    setResult(null);
    setUploadedImage(null);
  };

  const inputFields = [
    { name: 'faceLength', label: 'Face Length', description: 'From forehead to chin' },
    { name: 'faceWidth', label: 'Face Width', description: 'Widest part of cheekbones' },
    { name: 'jawWidth', label: 'Jaw Width', description: 'Widest part of jawline' },
    { name: 'foreheadWidth', label: 'Forehead Width', description: 'Widest part of forehead' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Face Shape Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a photo or enter manual measurements to determine your face shape and get personalized beauty recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Photo Upload */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Camera className="h-6 w-6 mr-2 text-purple-500" />
              Upload Photo
            </h2>
            
            <div className="space-y-6">
              {uploadedImage ? (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded face"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload a selfie</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              <div className="bg-purple-50 rounded-xl p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Photo Tips</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Face the camera directly</li>
                  <li>• Good lighting is essential</li>
                  <li>• Remove hair from face</li>
                  <li>• Neutral expression works best</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Manual Measurements */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Manual Measurements
            </h2>
            
            <div className="space-y-6">
              {inputFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label} (inches)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                  <input
                    type="number"
                    name={field.name}
                    value={measurements[field.name as keyof typeof measurements] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="0.0"
                    step="0.1"
                  />
                </div>
              ))}
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || Object.values(measurements).some(v => v <= 0)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-5 w-5" />
                      <span>Analyze</span>
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
              Your Face Shape
            </h2>
            
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                      {result.type.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                    {result.type}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-sm text-gray-600">Confidence:</span>
                    <div className="bg-gray-200 rounded-full h-2 w-32">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">About Your Face Shape</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {getFaceShapeDescription(result.type)}
                  </p>
                </div>

                <div className="bg-pink-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Beauty Tips</h4>
                  <ul className="text-gray-700 space-y-2">
                    {result.type === 'oval' && (
                      <>
                        <li>• Most hairstyles suit you perfectly</li>
                        <li>• Experiment with bold accessories</li>
                        <li>• Angular and round glasses both work</li>
                      </>
                    )}
                    {result.type === 'round' && (
                      <>
                        <li>• Add height with voluminous hairstyles</li>
                        <li>• Choose angular accessories</li>
                        <li>• Contour cheeks for definition</li>
                      </>
                    )}
                    {result.type === 'square' && (
                      <>
                        <li>• Soften angles with wavy hairstyles</li>
                        <li>• Round glasses complement your features</li>
                        <li>• Highlight eyes with bold makeup</li>
                      </>
                    )}
                    {result.type === 'heart' && (
                      <>
                        <li>• Balance with chin-length hairstyles</li>
                        <li>• Draw attention to your eyes</li>
                        <li>• Choose glasses that add width to jaw</li>
                      </>
                    )}
                    {result.type === 'diamond' && (
                      <>
                        <li>• Emphasize your striking cheekbones</li>
                        <li>• Side-swept bangs work beautifully</li>
                        <li>• Bold earrings complement your features</li>
                      </>
                    )}
                    {result.type === 'oblong' && (
                      <>
                        <li>• Add width with layered hairstyles</li>
                        <li>• Horizontal lines in accessories</li>
                        <li>• Focus makeup on cheeks and lips</li>
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
                <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Upload a photo or enter measurements to analyze your face shape.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceCalculator;