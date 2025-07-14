import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calculator, Palette, Shirt, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
              Discover Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                {" "}Perfect Style
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered styling that understands your unique body shape, face structure, 
              and personal preferences to create outfits that make you look and feel incredible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <Sparkles className="h-5 w-5" />
                <span>Start Your Style Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-rose-300 hover:text-rose-600 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <span>Already have an account?</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
              Everything You Need for Perfect Style
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From body shape analysis to AI-powered outfit recommendations, 
              we have all the tools you need to look your best.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="h-7 w-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Calculators</h3>
              <p className="text-gray-600 leading-relaxed">
                Accurate body and face shape analysis using advanced algorithms. 
                Get precise measurements and shape identification.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                <Palette className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Color Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Extract perfect color palettes from your photos and discover 
                colors that complement your skin tone.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6">
                <Shirt className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Outfit Suggestions</h3>
              <p className="text-gray-600 leading-relaxed">
                Personalized outfit recommendations for every occasion, 
                tailored to your body shape and style preferences.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gender Inclusive</h3>
              <p className="text-gray-600 leading-relaxed">
                Designed for everyone with comprehensive styling advice 
                for both men and women of all body types.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Learning Algorithm</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI learns your preferences over time to provide 
                increasingly personalized and accurate recommendations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mb-6">
                <ArrowRight className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy to Use</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface with smooth animations and helpful 
                guidance every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
            Ready to Transform Your Style?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have discovered their perfect style with StyleWise.
          </p>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-10 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2 text-lg font-semibold"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;