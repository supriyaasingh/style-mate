import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Camera, Palette, Shirt, TrendingUp, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Sparkles,
      title: 'Style Personality Quiz',
      description: 'Discover your unique style personality and preferences',
      link: '/style-quiz',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50'
    },
    {
      icon: Calculator,
      title: 'Body Shape Calculator',
      description: 'Discover your body shape with precise measurements',
      link: '/body-calculator',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50 to-pink-50'
    },
    {
      icon: Camera,
      title: 'Face Shape Analysis',
      description: 'Identify your face shape for perfect styling',
      link: '/face-calculator',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50'
    },
    {
      icon: Palette,
      title: 'Color Palette',
      description: 'Find colors that complement your features',
      link: '/color-analysis',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Shirt,
      title: 'Outfit Suggestions',
      description: 'Get personalized outfit recommendations',
      link: '/outfits',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'serif' }}>
                Welcome back, {user?.name}! ✨
              </h1>
              <p className="text-rose-100 text-lg">
                Ready to discover new styles and perfect your look?
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Style Score</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Outfits Created</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Shirt className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorite Looks</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Heart className="h-8 w-8 text-rose-500" />
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
            Your Style Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <Calculator className="h-5 w-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Body shape calculated</p>
                <p className="text-sm text-gray-600">You have an hourglass body shape</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shirt className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">New outfit suggestion</p>
                <p className="text-sm text-gray-600">Evening elegance look created</p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Camera className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Face shape analyzed</p>
                <p className="text-sm text-gray-600">Oval face shape detected</p>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;