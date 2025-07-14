import React, { useState, useEffect } from 'react';
import { Heart, Filter, Shirt, Calendar, Star, ShoppingBag, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { outfitData } from '../data/outfits';
import { Outfit } from '../types';

const OutfitSuggestions: React.FC = () => {
  const { user } = useAuth();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const occasions = [
    { value: 'all', label: 'All Occasions' },
    { value: 'casual', label: 'Casual' },
    { value: 'work', label: 'Work' },
    { value: 'evening', label: 'Evening' },
    { value: 'formal', label: 'Formal' }
  ];

  useEffect(() => {
    // Simulate loading and filtering outfits based on user profile
    setTimeout(() => {
      let filteredOutfits = outfitData.filter(outfit => {
        // Filter by gender
        if (outfit.suitableFor.gender !== 'unisex' && outfit.suitableFor.gender !== user?.gender) {
          return false;
        }
        
        // Filter by body shape if available
        if (user?.bodyShape && !outfit.suitableFor.bodyShapes.includes(user.bodyShape.type)) {
          return false;
        }
        
        // Filter by occasion
        if (selectedOccasion !== 'all' && outfit.occasion !== selectedOccasion) {
          return false;
        }
        
        return true;
      });

      setOutfits(filteredOutfits);
      setLoading(false);
    }, 1000);
  }, [user, selectedOccasion]);

  const toggleFavorite = (outfitId: string) => {
    setFavorites(prev => 
      prev.includes(outfitId) 
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  const getPersonalizationScore = (outfit: Outfit): number => {
    let score = 70; // Base score
    
    if (user?.bodyShape && outfit.suitableFor.bodyShapes.includes(user.bodyShape.type)) {
      score += 20;
    }
    
    if (user?.faceShape && outfit.suitableFor.faceShapes.includes(user.faceShape.type)) {
      score += 10;
    }
    
    return Math.min(score, 100);
  };

  const handleTryLook = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
  };

  const closeOutfitModal = () => {
    setSelectedOutfit(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Curating perfect outfits for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Your Style Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized outfit suggestions based on your body shape, preferences, and lifestyle.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filter by occasion:</span>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {occasions.map(occasion => (
                  <option key={occasion.value} value={occasion.value}>
                    {occasion.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shirt className="h-4 w-4" />
              <span>{outfits.length} outfits found</span>
            </div>
          </div>
        </div>

        {/* Outfit Grid */}
        {outfits.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outfits.map((outfit) => {
              const personalizationScore = getPersonalizationScore(outfit);
              const isFavorite = favorites.includes(outfit.id);
              
              return (
                <div key={outfit.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {/* Outfit Images */}
                  <div className="relative">
                    <div className="grid grid-cols-3 gap-1 p-4">
                      {outfit.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Personalization Score */}
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{personalizationScore}% match</span>
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(outfit.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <Heart 
                        className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                      />
                    </button>
                  </div>

                  {/* Outfit Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{outfit.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3" />
                        <span className="capitalize">{outfit.occasion}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {outfit.description}
                    </p>
                    
                    {/* Color Palette */}
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700 mb-2 block">Color Palette:</span>
                      <div className="flex space-x-2">
                        {outfit.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: color === 'white' ? '#ffffff' : color === 'black' ? '#000000' : color === 'navy' ? '#1e3a8a' : color === 'denim' ? '#3b82f6' : color === 'blush' ? '#fecaca' : color === 'gold' ? '#fbbf24' : color === 'khaki' ? '#a3a3a3' : color === 'brown' ? '#92400e' : color === 'light-blue' ? '#93c5fd' : color === 'forest-green' ? '#166534' : color === 'dark-denim' ? '#1e40af' : '#6b7280' }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Outfit Items */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-700">Items included:</span>
                      <div className="space-y-1">
                        {outfit.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 capitalize">{item.type}</span>
                            <span className="text-gray-900 font-medium">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button 
                      onClick={() => handleTryLook(outfit)}
                      className="w-full mt-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>Try This Look</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Shirt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No outfits found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or complete your profile for better recommendations.
            </p>
            <button
              onClick={() => setSelectedOccasion('all')}
              className="bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Outfit Detail Modal */}
        {selectedOutfit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedOutfit.name}</h2>
                    <p className="text-gray-600">{selectedOutfit.description}</p>
                  </div>
                  <button
                    onClick={closeOutfitModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Outfit Visualization */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Look</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {selectedOutfit.items.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600 capitalize">{item.type}</p>
                          <p className="text-xs text-gray-500">{item.color}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Styling Tips</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Mix textures to add visual interest</li>
                        <li>• Ensure proper fit for a polished appearance</li>
                        <li>• Add personal accessories to make it your own</li>
                        <li>• Consider the occasion and dress code</li>
                      </ul>
                    </div>
                  </div>

                  {/* Shopping & Alternatives */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Shop Similar Items</h3>
                    <div className="space-y-4 mb-6">
                      {selectedOutfit.items.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600 capitalize">{item.type} in {item.color}</p>
                              <p className="text-lg font-bold text-rose-600 mt-1">
                                ${Math.floor(Math.random() * 100) + 20}
                              </p>
                            </div>
                            <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors flex items-center space-x-2">
                              <ShoppingBag className="h-4 w-4" />
                              <span>Shop</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Alternative Options</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Budget-friendly version</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                            <span>View</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Luxury version</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                            <span>View</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Sustainable options</span>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                            <span>View</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={() => toggleFavorite(selectedOutfit.id)}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
                          favorites.includes(selectedOutfit.id)
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${favorites.includes(selectedOutfit.id) ? 'fill-current' : ''}`} />
                        <span>{favorites.includes(selectedOutfit.id) ? 'Favorited' : 'Add to Favorites'}</span>
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                        Save Outfit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitSuggestions;