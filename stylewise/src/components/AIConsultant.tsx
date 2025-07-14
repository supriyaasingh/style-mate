import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIConsultant: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi ${user?.name}! I'm your personal AI style consultant. I can see you have ${user?.bodyShape ? `a ${user.bodyShape.type} body shape` : 'not completed your body shape analysis yet'} ${user?.faceShape ? `and ${user.faceShape.type} face shape` : 'and haven\'t analyzed your face shape yet'}. I can help you with personalized outfit suggestions, color combinations, styling tips, and answer any fashion questions based on your unique features. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What styles suit my body shape?",
    "Best colors for my face shape?",
    "How to dress for a job interview?",
    "Casual outfit ideas for my shape?",
    "What accessories work with my features?"
  ];

  const getBodyShapeAdvice = (bodyShape: string, gender: string): string => {
    const advice = {
      hourglass: {
        female: "Your hourglass figure is naturally balanced! Emphasize your waist with fitted tops, wrap dresses, and high-waisted bottoms. Avoid boxy or shapeless clothing that hides your curves. Try belted coats, bodycon dresses, and tucked-in blouses.",
        male: "Your athletic build with defined waist is great for fitted clothing! Try slim-fit shirts, tailored jackets, and well-fitted jeans. Avoid oversized clothing that hides your proportions."
      },
      pear: {
        female: "With your pear shape, highlight your upper body! Try bright colors on top, statement necklaces, and structured blazers. For bottoms, choose A-line skirts, bootcut jeans, and avoid tight-fitting pants. Empire waist dresses work beautifully.",
        male: "Balance your proportions by adding visual weight to your upper body. Try layered tops, horizontal stripes on shirts, and structured jackets. Well-fitted jeans and chinos work great for your lower body."
      },
      apple: {
        female: "Draw attention to your beautiful legs and arms! Try empire waist tops, A-line dresses, and open necklines. Avoid tight waistlines and opt for flowy tops that skim your midsection. High-waisted bottoms are your friend!",
        male: "Your strong upper body looks great in V-necks and open collars. Try unstructured blazers, vertical stripes, and avoid tight-fitting shirts around the midsection. Well-fitted trousers balance your silhouette."
      },
      rectangle: {
        female: "Create curves with strategic styling! Try peplum tops, belted dresses, and layered looks. Add volume with ruffles, textures, and patterns. High-low hemlines and cropped jackets create visual interest.",
        male: "Your lean build is perfect for layering! Try textured fabrics, horizontal stripes, and fitted clothing that adds dimension. Blazers with structured shoulders work well."
      },
      'inverted-triangle': {
        female: "Balance your strong shoulders with fuller bottoms! Try A-line skirts, wide-leg pants, and darker colors on top with brighter colors below. Avoid shoulder pads and horizontal stripes on top.",
        male: "Your V-shaped physique is naturally athletic! Fitted clothing shows off your build perfectly. Try slim-fit shirts, tailored jackets, and avoid overly loose clothing."
      }
    };

    const shape = bodyShape.replace('-', '') as keyof typeof advice;
    return advice[shape]?.[gender as 'female' | 'male'] || "Focus on wearing clothes that make you feel confident and comfortable!";
  };

  const getFaceShapeAdvice = (faceShape: string): string => {
    const advice = {
      oval: "Lucky you! Oval faces suit almost every style. Experiment with bold accessories, various necklines, and different hairstyles. You can wear statement earrings, scarves, and glasses of any shape.",
      round: "Add angles and height to complement your soft features! Try angular accessories, vertical lines in clothing, and avoid round necklines. Statement earrings and structured blazers work beautifully.",
      square: "Soften your strong jawline with curved lines and soft textures! Try round necklaces, flowing scarves, and avoid sharp, angular accessories. Soft, wavy hairstyles complement your features.",
      heart: "Balance your wider forehead with attention to your lower face! Try statement earrings, scarves that add width at the chin, and avoid heavy bangs. V-necks and scoop necklines are flattering.",
      diamond: "Highlight your stunning cheekbones! Try statement earrings, side-swept hairstyles, and accessories that add width at the forehead and chin. Avoid very narrow accessories.",
      oblong: "Add width to balance your face length! Try horizontal accessories, wide-brimmed hats, and avoid very long necklaces. Layered looks and textured fabrics work well."
    };

    return advice[faceShape as keyof typeof advice] || "Choose accessories and styles that make you feel confident!";
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const bodyShape = user?.bodyShape?.type;
    const faceShape = user?.faceShape?.type;
    const gender = user?.gender || 'female';
    
    if (lowerMessage.includes('body shape') || lowerMessage.includes('figure') || lowerMessage.includes('body')) {
      if (bodyShape) {
        return `Based on your ${bodyShape} body shape, here's my advice: ${getBodyShapeAdvice(bodyShape, gender)} Would you like specific outfit ideas for any particular occasion?`;
      } else {
        return "I'd love to give you personalized body shape advice! Please complete your body shape analysis first using our Body Shape Calculator, then I can provide specific styling tips for your figure.";
      }
    }
    
    if (lowerMessage.includes('face shape') || lowerMessage.includes('face') || lowerMessage.includes('accessories')) {
      if (faceShape) {
        return `With your ${faceShape} face shape, ${getFaceShapeAdvice(faceShape)} This will help you choose the most flattering accessories and necklines!`;
      } else {
        return "To give you the best advice about accessories and necklines, I'd recommend completing your face shape analysis first. Once I know your face shape, I can suggest the most flattering styles for you!";
      }
    }
    
    if (lowerMessage.includes('color') || lowerMessage.includes('colours')) {
      let response = "For colors, I recommend considering both your body and face shape! ";
      if (bodyShape && faceShape) {
        response += `With your ${bodyShape} body shape, try using darker colors to minimize areas and brighter colors to highlight. For your ${faceShape} face, colors near your face should complement your features. `;
      }
      response += "Warm skin tones look great in coral, peach, and gold, while cool tones suit navy, emerald, and silver. Would you like me to suggest a specific color palette?";
      return response;
    }
    
    if (lowerMessage.includes('interview') || lowerMessage.includes('work') || lowerMessage.includes('professional')) {
      let response = "For professional settings, here's my advice: ";
      if (bodyShape) {
        if (bodyShape === 'hourglass') {
          response += "Your hourglass shape looks amazing in fitted blazers and pencil skirts. ";
        } else if (bodyShape === 'pear') {
          response += "Try a structured blazer with straight-leg trousers to balance your proportions. ";
        } else if (bodyShape === 'apple') {
          response += "An empire waist blouse with a blazer and straight-leg pants will be perfect. ";
        } else if (bodyShape === 'rectangle') {
          response += "Add definition with a belted blazer and fitted trousers. ";
        } else if (bodyShape === 'inverted-triangle') {
          response += "Balance your shoulders with A-line skirts or wide-leg trousers. ";
        }
      }
      response += "Keep accessories minimal and elegant, choose closed-toe shoes, and stick to neutral colors like navy, black, or gray.";
      return response;
    }
    
    if (lowerMessage.includes('casual') || lowerMessage.includes('weekend')) {
      let response = "For casual styling: ";
      if (bodyShape) {
        if (bodyShape === 'hourglass') {
          response += "Try high-waisted jeans with a fitted top, or a wrap dress with sneakers. ";
        } else if (bodyShape === 'pear') {
          response += "Bright tops with dark bottoms work great - try a colorful blouse with dark jeans. ";
        } else if (bodyShape === 'apple') {
          response += "Flowy tops with fitted bottoms are perfect - try a tunic with leggings. ";
        } else if (bodyShape === 'rectangle') {
          response += "Create curves with layered looks - try a cardigan over a fitted tee. ";
        } else if (bodyShape === 'inverted-triangle') {
          response += "Balance with fuller bottoms - try a simple top with wide-leg pants. ";
        }
      }
      response += "The key is comfort while still looking put-together!";
      return response;
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('fashion')) {
      let response = "Current trends to consider for your shape: ";
      if (bodyShape && faceShape) {
        response += `For ${bodyShape} figures, oversized blazers can work if balanced properly, and wide-leg trousers are very flattering. With your ${faceShape} face shape, statement earrings are trending and would look great on you! `;
      }
      response += "Remember, the best trend is one that works with your body and makes you feel confident. What's your style preference - classic, trendy, or somewhere in between?";
      return response;
    }
    
    if (lowerMessage.includes('outfit') || lowerMessage.includes('what to wear')) {
      let response = "Let me suggest some outfits based on your features! ";
      if (bodyShape && faceShape) {
        response += `For your ${bodyShape} body shape and ${faceShape} face shape: `;
        if (bodyShape === 'hourglass') {
          response += "Try a wrap dress with statement earrings, or high-waisted trousers with a tucked-in blouse. ";
        } else if (bodyShape === 'pear') {
          response += "A bright blazer with dark straight-leg jeans and delicate jewelry would be perfect. ";
        }
        response += "What occasion are you dressing for?";
      } else {
        response += "I'd love to give you specific outfit suggestions! Complete your body and face shape analysis first, then I can create personalized looks for you.";
      }
      return response;
    }
    
    // Default response with personalization
    let response = "That's a great question! ";
    if (bodyShape || faceShape) {
      response += `Based on your profile${bodyShape ? ` (${bodyShape} body shape)` : ''}${faceShape ? ` and ${faceShape} face shape` : ''}, `;
    }
    response += "I'd recommend focusing on pieces that highlight your best features and make you feel confident. Every person is unique, and the best style is one that reflects your personality while flattering your natural features. Would you like me to suggest some specific styling tips or outfit ideas for a particular occasion?";
    
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
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
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold">AI Style Consultant</h3>
            <p className="text-xs text-purple-100">
              {user?.bodyShape && user?.faceShape 
                ? `${user.bodyShape.type} • ${user.faceShape.type}` 
                : 'Complete your analysis for better advice'
              }
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-purple-100' : 'bg-pink-100'}`}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4 text-purple-600" />
                ) : (
                  <Bot className="h-4 w-4 text-pink-600" />
                )}
              </div>
              <div className={`p-3 rounded-2xl ${message.type === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
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

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1">
            {quickQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full hover:bg-purple-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Status */}
      {(!user?.bodyShape || !user?.faceShape) && (
        <div className="px-4 pb-2">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
            <p className="text-xs text-yellow-700">
              💡 Complete your {!user?.bodyShape ? 'body shape' : ''} {!user?.bodyShape && !user?.faceShape ? 'and ' : ''} {!user?.faceShape ? 'face shape' : ''} analysis for more personalized advice!
            </p>
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
            placeholder="Ask me about styling for your shape..."
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

export default AIConsultant;