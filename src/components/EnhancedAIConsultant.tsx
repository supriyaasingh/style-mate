import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles, Camera, ShoppingBag, Palette, Calculator, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'outfit' | 'color' | 'body-shape' | 'shopping' | 'trend' | 'general';
  attachments?: { type: 'image' | 'outfit' | 'product'; url: string; title: string }[];
}

const EnhancedAIConsultant: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);

  const categories = [
    { id: 'general', label: 'General', icon: MessageCircle, color: 'purple' },
    { id: 'outfit', label: 'Outfits', icon: ShoppingBag, color: 'blue' },
    { id: 'color', label: 'Colors', icon: Palette, color: 'green' },
    { id: 'body-shape', label: 'Body Shape', icon: Calculator, color: 'orange' },
    { id: 'trend', label: 'Trends', icon: TrendingUp, color: 'pink' }
  ];

  const quickActions = [
    { text: "Suggest an outfit for today", category: 'outfit' },
    { text: "What colors suit my skin tone?", category: 'color' },
    { text: "How to style my body shape?", category: 'body-shape' },
    { text: "What's trending this season?", category: 'trend' },
    { text: "Help me build a capsule wardrobe", category: 'general' }
  ];

  useEffect(() => {
    if (user) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: `Hi ${user.name}! 👋 I'm your enhanced AI style consultant. I can see you have ${user.bodyShape ? `a ${user.bodyShape.type} body shape` : 'not completed your body shape analysis yet'} ${user.faceShape ? `and ${user.faceShape.type} face shape` : 'and haven\'t analyzed your face shape yet'}. ${user.bmi ? `Your BMI is ${user.bmi.value} (${user.bmi.category}).` : ''}\n\nI can help you with:\n• Personalized outfit recommendations\n• Color analysis and palettes\n• Body-conscious styling tips\n• Shopping recommendations\n• Latest fashion trends\n• Health-conscious fashion choices\n\nWhat would you like to explore today?`,
        timestamp: new Date(),
        category: 'general'
      };
      setMessages([welcomeMessage]);
    }
  }, [user]);

  const generateAdvancedResponse = (userMessage: string, category: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let content = '';
    let attachments: Message['attachments'] = [];

    // Advanced AI responses based on user profile and conversation context
    if (category === 'outfit' || lowerMessage.includes('outfit') || lowerMessage.includes('wear')) {
      content = generateOutfitResponse(userMessage);
      attachments = [
        { type: 'outfit', url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200', title: 'Recommended Outfit 1' },
        { type: 'outfit', url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200', title: 'Alternative Option' }
      ];
    } else if (category === 'color' || lowerMessage.includes('color')) {
      content = generateColorResponse(userMessage);
    } else if (category === 'body-shape' || lowerMessage.includes('body') || lowerMessage.includes('shape')) {
      content = generateBodyShapeResponse(userMessage);
    } else if (category === 'trend' || lowerMessage.includes('trend')) {
      content = generateTrendResponse(userMessage);
    } else if (lowerMessage.includes('shop') || lowerMessage.includes('buy')) {
      content = generateShoppingResponse(userMessage);
      attachments = [
        { type: 'product', url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200', title: 'Recommended Product - $49.99' }
      ];
    } else {
      content = generateGeneralResponse(userMessage);
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content,
      timestamp: new Date(),
      category: category as any,
      attachments
    };
  };

  const generateOutfitResponse = (message: string): string => {
    const { bodyShape, faceShape, bmi, preferences } = user || {};
    let response = "Based on your profile, here are my outfit recommendations:\n\n";

    if (bodyShape) {
      response += `For your ${bodyShape.type} body shape:\n`;
      if (bodyShape.type === 'hourglass') {
        response += "• Fitted blazer with high-waisted trousers\n• Wrap dress that emphasizes your waist\n• Tucked-in blouses with A-line skirts\n\n";
      } else if (bodyShape.type === 'pear') {
        response += "• Bright colored tops with dark bottoms\n• Statement necklaces to draw attention up\n• A-line dresses that skim your hips\n\n";
      }
    }

    if (bmi) {
      response += `Health-conscious styling for BMI ${bmi.value}:\n`;
      response += bmi.recommendations.slice(0, 2).map(rec => `• ${rec}`).join('\n') + '\n\n';
    }

    if (preferences?.stylePreferences.length) {
      response += `Matching your ${preferences.stylePreferences.join(' and ')} style preferences.\n\n`;
    }

    response += "Would you like me to suggest specific pieces or help you shop for any of these items?";
    return response;
  };

  const generateColorResponse = (message: string): string => {
    const { faceShape, preferences } = user || {};
    let response = "Let me help you with color recommendations:\n\n";

    response += "Based on color theory and your features:\n";
    response += "• Warm undertones: Try coral, peach, gold, and warm browns\n";
    response += "• Cool undertones: Navy, emerald, silver, and cool grays work well\n";
    response += "• Universal colors: Classic white, black, and denim blue\n\n";

    if (faceShape) {
      response += `For your ${faceShape.type} face shape, colors near your face should:\n`;
      if (faceShape.type === 'round') {
        response += "• Use darker colors to create definition\n• Avoid very bright colors right at the neckline\n\n";
      }
    }

    if (preferences?.favoriteColors.length) {
      response += `I see you love ${preferences.favoriteColors.join(', ')}! These can be great accent colors in your outfits.\n\n`;
    }

    response += "Would you like me to create a personalized color palette for you?";
    return response;
  };

  const generateBodyShapeResponse = (message: string): string => {
    const { bodyShape, bmi } = user || {};
    let response = "";

    if (bodyShape) {
      response += `Your ${bodyShape.type} body shape styling guide:\n\n`;
      
      if (bodyShape.type === 'hourglass') {
        response += "✨ Your naturally balanced proportions are perfect for:\n";
        response += "• Fitted clothing that shows your waist\n• Wrap styles and belted pieces\n• Avoid boxy or shapeless clothing\n\n";
      } else if (bodyShape.type === 'pear') {
        response += "✨ Highlight your upper body and balance your proportions:\n";
        response += "• Bright colors and patterns on top\n• Structured shoulders and statement sleeves\n• A-line and straight-leg bottoms\n\n";
      }

      response += "Confidence tips:\n• Good posture enhances any outfit\n• Proper fit is more important than size\n• Wear what makes YOU feel amazing\n\n";
    } else {
      response += "I'd love to give you personalized body shape advice! Please complete your body shape analysis first, then I can provide specific styling tips.\n\n";
    }

    if (bmi) {
      response += `Health-conscious styling considerations:\n${bmi.recommendations.slice(0, 2).join('\n')}\n\n`;
    }

    response += "Remember: Every body is beautiful, and style is about expressing your personality!";
    return response;
  };

  const generateTrendResponse = (message: string): string => {
    return `🔥 Current fashion trends for ${new Date().getFullYear()}:\n\n` +
           "✨ Key Trends:\n" +
           "• Oversized blazers with structured shoulders\n" +
           "• Wide-leg trousers and palazzo pants\n" +
           "• Statement sleeves and dramatic silhouettes\n" +
           "• Sustainable and eco-friendly fashion\n" +
           "• Bold color blocking and prints\n\n" +
           "🎨 Color Trends:\n" +
           "• Digital lime and electric blues\n" +
           "• Warm terracotta and rust tones\n" +
           "• Classic neutrals with pops of neon\n\n" +
           "💡 How to incorporate trends:\n" +
           "• Start with one trendy piece per outfit\n" +
           "• Mix trends with your personal style\n" +
           "• Invest in trend pieces that suit your body shape\n\n" +
           "Which trend would you like to try first?";
  };

  const generateShoppingResponse = (message: string): string => {
    const { preferences } = user || {};
    let response = "🛍️ Smart shopping recommendations:\n\n";

    response += "Essential pieces to invest in:\n";
    response += "• Quality blazer in a neutral color\n";
    response += "• Well-fitted jeans in your best wash\n";
    response += "• Classic white button-down shirt\n";
    response += "• Little black dress (or equivalent)\n";
    response += "• Comfortable, stylish shoes\n\n";

    if (preferences?.budgetRange) {
      response += `For your budget range ($${preferences.budgetRange.min}-${preferences.budgetRange.max}):\n`;
      response += "• Focus on cost-per-wear for investment pieces\n";
      response += "• Mix high and low-end items strategically\n\n";
    }

    response += "💰 Money-saving tips:\n";
    response += "• Shop your closet first\n";
    response += "• Buy versatile pieces that mix and match\n";
    response += "• Wait for sales on non-seasonal items\n";
    response += "• Consider sustainable/second-hand options\n\n";

    response += "Would you like specific product recommendations or help finding the best deals?";
    return response;
  };

  const generateGeneralResponse = (message: string): string => {
    return "I'm here to help with all your style questions! Whether you need outfit ideas, color advice, body shape guidance, or shopping tips, I've got you covered.\n\n" +
           "💡 Pro tip: The best style advice is personalized to YOU. Complete your body shape analysis, face shape assessment, and style quiz for the most accurate recommendations.\n\n" +
           "What specific area would you like to explore today?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      category: selectedCategory as any
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAdvancedResponse(inputMessage, selectedCategory);
      setMessages(prev => [...prev, aiResponse]);
      setConversationHistory(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: { text: string; category: string }) => {
    setSelectedCategory(action.category);
    setInputMessage(action.text);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold">Enhanced AI Stylist</h3>
            <p className="text-xs text-purple-100">
              Powered by advanced fashion AI
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      {/* Category Selector */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? `bg-${category.color}-100 text-${category.color}-700`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon className="h-3 w-3" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-purple-100' : 'bg-pink-100'}`}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4 text-purple-600" />
                ) : (
                  <Bot className="h-4 w-4 text-pink-600" />
                )}
              </div>
              <div className={`p-3 rounded-2xl ${message.type === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="bg-white rounded-lg p-2 border">
                        <img
                          src={attachment.url}
                          alt={attachment.title}
                          className="w-full h-20 object-cover rounded mb-2"
                        />
                        <p className="text-xs text-gray-600">{attachment.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-pink-600" />
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
          <div className="space-y-1">
            {quickActions.slice(0, 3).map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="w-full text-left text-xs bg-purple-50 text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors"
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask about ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}...`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIConsultant;