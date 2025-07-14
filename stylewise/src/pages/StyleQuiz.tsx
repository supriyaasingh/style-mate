import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { styleOptions, maleStyleOptions } from '../data/styleOptions';

const StyleQuiz: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedStyles, setRecommendedStyles] = useState<string[]>([]);

  const questions = [
    {
      id: 'lifestyle',
      question: 'How would you describe your lifestyle?',
      options: [
        { value: 'professional', label: 'Professional & Corporate', styles: ['classic', 'classic-gentleman'] },
        { value: 'creative', label: 'Creative & Artistic', styles: ['bohemian', 'edgy', 'streetwear'] },
        { value: 'casual', label: 'Relaxed & Casual', styles: ['casual-chic', 'casual-modern'] },
        { value: 'active', label: 'Active & Outdoorsy', styles: ['casual-chic', 'rugged'] }
      ]
    },
    {
      id: 'personality',
      question: 'Which personality traits best describe you?',
      options: [
        { value: 'confident', label: 'Confident & Bold', styles: ['edgy', 'classic', 'streetwear'] },
        { value: 'romantic', label: 'Gentle & Romantic', styles: ['romantic', 'bohemian'] },
        { value: 'practical', label: 'Practical & Organized', styles: ['minimalist', 'casual-modern'] },
        { value: 'adventurous', label: 'Adventurous & Free-spirited', styles: ['bohemian', 'rugged'] }
      ]
    },
    {
      id: 'colors',
      question: 'What color palette appeals to you most?',
      options: [
        { value: 'neutral', label: 'Neutral & Minimalist', styles: ['minimalist', 'classic'] },
        { value: 'earth', label: 'Earth Tones & Warm Colors', styles: ['bohemian', 'rugged'] },
        { value: 'bold', label: 'Bold & Vibrant Colors', styles: ['edgy', 'streetwear'] },
        { value: 'soft', label: 'Soft & Pastel Colors', styles: ['romantic', 'casual-chic'] }
      ]
    },
    {
      id: 'occasions',
      question: 'What occasions do you dress for most often?',
      options: [
        { value: 'work', label: 'Work & Professional Events', styles: ['classic', 'classic-gentleman'] },
        { value: 'social', label: 'Social Gatherings & Parties', styles: ['edgy', 'romantic'] },
        { value: 'daily', label: 'Daily Life & Errands', styles: ['casual-chic', 'casual-modern'] },
        { value: 'special', label: 'Special Events & Dates', styles: ['romantic', 'classic'] }
      ]
    },
    {
      id: 'comfort',
      question: 'How important is comfort in your clothing choices?',
      options: [
        { value: 'very', label: 'Very Important - Comfort First', styles: ['casual-chic', 'casual-modern'] },
        { value: 'balanced', label: 'Balanced - Style & Comfort', styles: ['minimalist', 'bohemian'] },
        { value: 'style', label: 'Style First - Comfort Secondary', styles: ['classic', 'edgy'] },
        { value: 'occasion', label: 'Depends on the Occasion', styles: ['romantic', 'classic-gentleman'] }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = () => {
    const styleScores: Record<string, number> = {};
    const availableStyles = user?.gender === 'male' ? maleStyleOptions : styleOptions;
    
    // Initialize scores
    availableStyles.forEach(style => {
      styleScores[style.id] = 0;
    });

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.value === answer);
      
      option?.styles.forEach(styleId => {
        if (styleScores[styleId] !== undefined) {
          styleScores[styleId] += 1;
        }
      });
    });

    // Get top 3 recommended styles
    const sortedStyles = Object.entries(styleScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([styleId]) => styleId);

    setRecommendedStyles(sortedStyles);
    setShowResults(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const saveResults = () => {
    if (user) {
      updateUser({
        preferences: {
          ...user.preferences,
          stylePreferences: recommendedStyles
        }
      });
      alert('Style preferences saved successfully!');
    }
  };

  const availableStyles = user?.gender === 'male' ? maleStyleOptions : styleOptions;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
              Your Style Profile
            </h1>
            <p className="text-xl text-gray-600">
              Based on your answers, here are your recommended style directions
            </p>
          </div>

          <div className="space-y-8">
            {recommendedStyles.map((styleId, index) => {
              const style = availableStyles.find(s => s.id === styleId);
              if (!style) return null;

              return (
                <div key={styleId} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          #{index + 1} Match
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900">{style.name}</h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{style.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Personality</h4>
                      <div className="space-y-1">
                        {style.personality.map((trait, i) => (
                          <span key={i} className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs mr-1 mb-1">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Best For</h4>
                      <div className="space-y-1">
                        {style.occasions.map((occasion, i) => (
                          <span key={i} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-1 mb-1">
                            {occasion}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Pieces</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {style.keyPieces.slice(0, 3).map((piece, i) => (
                          <li key={i}>• {piece}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Colors</h4>
                      <div className="flex flex-wrap gap-2">
                        {style.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                            style={{ 
                              backgroundColor: color.toLowerCase().includes('navy') ? '#1e3a8a' : 
                                             color.toLowerCase().includes('black') ? '#000000' :
                                             color.toLowerCase().includes('white') ? '#ffffff' :
                                             color.toLowerCase().includes('gray') ? '#6b7280' :
                                             color.toLowerCase().includes('beige') ? '#f5f5dc' :
                                             color.toLowerCase().includes('rust') ? '#b7410e' :
                                             color.toLowerCase().includes('mustard') ? '#ffdb58' :
                                             color.toLowerCase().includes('purple') ? '#7c3aed' :
                                             color.toLowerCase().includes('green') ? '#059669' :
                                             color.toLowerCase().includes('pink') ? '#ec4899' :
                                             color.toLowerCase().includes('blue') ? '#3b82f6' :
                                             color.toLowerCase().includes('red') ? '#ef4444' :
                                             '#6b7280'
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-br from-rose-50 to-purple-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Style Icons</h4>
                    <p className="text-sm text-gray-600">
                      Draw inspiration from: {style.examples.join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={saveResults}
              className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2 mx-auto"
            >
              <Save className="h-5 w-5" />
              <span>Save Style Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
            Style Personality Quiz
          </h1>
          <p className="text-xl text-gray-600">
            Discover your unique style personality in just a few questions
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-rose-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option) => (
                <label
                  key={option.value}
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                    answers[questions[currentQuestion].id] === option.value
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={questions[currentQuestion].id}
                    value={option.value}
                    checked={answers[questions[currentQuestion].id] === option.value}
                    onChange={(e) => handleAnswer(questions[currentQuestion].id, e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{option.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      answers[questions[currentQuestion].id] === option.value
                        ? 'border-rose-500 bg-rose-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[questions[currentQuestion].id] === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextQuestion}
              disabled={!answers[questions[currentQuestion].id]}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}</span>
              {currentQuestion === questions.length - 1 ? (
                <Sparkles className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleQuiz;