import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Camera, Palette, Shirt, TrendingUp, Heart, Sparkles, Scale, Users, BarChart3 } from 'lucide-react';
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
      icon: Scale,
      title: 'Health & BMI Calculator',
      description: 'Get health-conscious styling recommendations',
      link: '/bmi-calculator',
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50'
    },
    {
      icon: Scale,
      title: 'Health & BMI Calculator',
      description: 'Get health-conscious styling recommendations',
      link: '/bmi-calculator',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: Users,
      title: 'Style Community',
      description: 'Share looks and get inspired by others',
      link: '/social',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
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
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: Users,
      title: 'Style Community',
      description: 'Share looks and get inspired by others',
      link: '/social',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
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
                Ready to discover new styles, connect with the community, and perfect your look?
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
                <p className="text-2xl font-bold text-gray-900">
                  {user?.bodyShape && user?.faceShape ? '95%' : user?.bodyShape || user?.faceShape ? '75%' : '45%'}
                </p>
                  {user?.bodyShape && user?.faceShape ? '95%' : user?.bodyShape || user?.faceShape ? '75%' : '45%'}
                </p>
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
                <p className="text-sm text-gray-600">Community Likes</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <Users className="h-8 w-8 text-rose-500" />
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
            Your Style Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Health & Style Integration */}
        {user?.bmi && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Scale className="h-6 w-6 mr-2 text-green-500" />
              Your Health & Style Profile
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{user.bmi.value}</p>
                <p className="text-sm text-gray-600">BMI ({user.bmi.category})</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{user.bodyShape?.type || 'Unknown'}</p>
                <p className="text-sm text-gray-600">Body Shape</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{user.healthProfile?.fitnessLevel || 'Not Set'}</p>
                <p className="text-sm text-gray-600">Fitness Level</p>
              </div>
            </div>
          </div>
        )}

        {/* Health & Style Integration */}
        {user?.bmi && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Scale className="h-6 w-6 mr-2 text-green-500" />
              Your Health & Style Profile
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{user.bmi.value}</p>
                <p className="text-sm text-gray-600">BMI ({user.bmi.category})</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{user.bodyShape?.type || 'Unknown'}</p>
                <p className="text-sm text-gray-600">Body Shape</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{user.healthProfile?.fitnessLevel || 'Not Set'}</p>
                <p className="text-sm text-gray-600">Fitness Level</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Scale className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">BMI calculated</p>
                <p className="text-sm text-gray-600">Health-conscious styling recommendations updated</p>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Scale className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">BMI calculated</p>
                <p className="text-sm text-gray-600">Health-conscious styling recommendations updated</p>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            
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
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Outfit shared to community</p>
                <p className="text-sm text-gray-600">Your casual chic look got 12 likes!</p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Camera className="h-5 w-5 text-blue-600" />
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