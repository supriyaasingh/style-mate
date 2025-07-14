import React, { useState } from 'react';
import { Palette, Upload, Camera, Save } from 'lucide-react';

const ColorAnalysis: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [personalPalette, setPersonalPalette] = useState<string[]>([]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        // Simulate color extraction
        setTimeout(() => {
          setExtractedColors(['#E8B4B8', '#F4D4D4', '#8B4513', '#DEB887', '#F5F5DC']);
          setPersonalPalette(['#FF6B8A', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FFB347']);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const colorSeasons = [
    {
      name: 'Spring',
      colors: ['#FFB6C1', '#98FB98', '#F0E68C', '#FFA07A', '#87CEEB'],
      description: 'Warm, light, and bright colors that complement fair to medium skin tones.'
    },
    {
      name: 'Summer',
      colors: ['#B0C4DE', '#DDA0DD', '#F0F8FF', '#E6E6FA', '#D8BFD8'],
      description: 'Cool, soft, and muted colors perfect for cool undertones.'
    },
    {
      name: 'Autumn',
      colors: ['#CD853F', '#D2691E', '#A0522D', '#8B4513', '#DAA520'],
      description: 'Warm, deep, and rich earth tones for warm undertones.'
    },
    {
      name: 'Winter',
      colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#800080'],
      description: 'Cool, deep, and clear colors with high contrast.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Color Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your perfect color palette by analyzing your features and personal style preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Photo Upload Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Camera className="h-6 w-6 mr-2 text-blue-500" />
              Upload Your Photo
            </h2>

            {uploadedImage ? (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setExtractedColors([]);
                      setPersonalPalette([]);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>

                {extractedColors.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Extracted Colors</h3>
                    <div className="flex space-x-3">
                      {extractedColors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="w-12 h-12 rounded-full shadow-md border-2 border-white"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-gray-600 mt-1 block">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload a well-lit photo of yourself</p>
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
          </div>

          {/* Personal Palette */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Palette className="h-6 w-6 mr-2 text-purple-500" />
              Your Personal Palette
            </h2>

            {personalPalette.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-5 gap-4">
                  {personalPalette.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-16 h-16 rounded-xl shadow-lg border-2 border-white mx-auto"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-gray-600 mt-2 block">{color}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Color Recommendations</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li>• These colors complement your skin tone perfectly</li>
                    <li>• Use the brightest colors as accent pieces</li>
                    <li>• Neutral tones work great for base garments</li>
                    <li>• Experiment with different shades of these hues</li>
                  </ul>
                </div>

                <button className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold flex items-center justify-center space-x-2">
                  <Save className="h-5 w-5" />
                  <span>Save Palette</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Upload a photo to generate your personalized color palette.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Color Seasons */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Seasonal Color Analysis
          </h2>
          <p className="text-gray-600 mb-8">
            Discover which seasonal color palette suits you best based on your skin tone, hair color, and eye color.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colorSeasons.map((season, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{season.name}</h3>
                <div className="flex space-x-2 mb-4">
                  {season.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-8 h-8 rounded-full shadow-md border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {season.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorAnalysis;