import { StyleOption } from '../types';

export const enhancedStyleOptions: StyleOption[] = [
  {
    id: 'classic',
    name: 'Classic Elegance',
    description: 'Timeless, sophisticated pieces that never go out of style. Clean lines, neutral colors, and quality fabrics.',
    personality: ['Professional', 'Refined', 'Confident'],
    occasions: ['Work', 'Business meetings', 'Formal events'],
    keyPieces: ['Blazer', 'White button-down', 'Pencil skirt', 'Trench coat', 'Pearl accessories'],
    colors: ['Navy', 'Black', 'White', 'Beige', 'Gray'],
    examples: ['Audrey Hepburn', 'Grace Kelly', 'Cate Blanchett'],
    difficulty: 'intermediate',
    budget: 'medium',
    maintenance: 'medium'
  },
  {
    id: 'bohemian',
    name: 'Bohemian Chic',
    description: 'Free-spirited, artistic style with flowing fabrics, earthy tones, and eclectic accessories.',
    personality: ['Creative', 'Free-spirited', 'Artistic'],
    occasions: ['Festivals', 'Casual outings', 'Creative work'],
    keyPieces: ['Maxi dresses', 'Fringe bags', 'Layered jewelry', 'Kimono jackets', 'Ankle boots'],
    colors: ['Earth tones', 'Rust', 'Mustard', 'Deep purple', 'Forest green'],
    examples: ['Sienna Miller', 'Vanessa Hudgens', 'Florence Welch'],
    difficulty: 'advanced',
    budget: 'medium',
    maintenance: 'low'
  },
  {
    id: 'minimalist',
    name: 'Modern Minimalist',
    description: 'Clean, simple lines with a focus on quality over quantity. Neutral palette and streamlined silhouettes.',
    personality: ['Organized', 'Efficient', 'Sophisticated'],
    occasions: ['Work', 'Casual', 'Modern events'],
    keyPieces: ['Cashmere sweaters', 'Straight-leg pants', 'Structured coats', 'Simple dresses', 'Clean sneakers'],
    colors: ['White', 'Black', 'Gray', 'Camel', 'Cream'],
    examples: ['Phoebe Philo', 'Gwyneth Paltrow', 'Tilda Swinton'],
    difficulty: 'beginner',
    budget: 'high',
    maintenance: 'low'
  },
  {
    id: 'romantic',
    name: 'Romantic Feminine',
    description: 'Soft, feminine pieces with delicate details, florals, and flowing fabrics that celebrate femininity.',
    personality: ['Gentle', 'Romantic', 'Dreamy'],
    occasions: ['Dates', 'Brunches', 'Garden parties'],
    keyPieces: ['Floral dresses', 'Lace tops', 'Cardigans', 'Ballet flats', 'Delicate jewelry'],
    colors: ['Blush pink', 'Lavender', 'Cream', 'Soft blue', 'Mint green'],
    examples: ['Taylor Swift', 'Emma Stone', 'Reese Witherspoon'],
    difficulty: 'intermediate',
    budget: 'medium',
    maintenance: 'medium'
  },
  {
    id: 'edgy',
    name: 'Edgy Modern',
    description: 'Bold, contemporary style with leather, metallics, and statement pieces that make an impact.',
    personality: ['Bold', 'Confident', 'Trendsetter'],
    occasions: ['Nightlife', 'Creative events', 'Fashion-forward occasions'],
    keyPieces: ['Leather jackets', 'Statement boots', 'Bold accessories', 'Asymmetric pieces', 'Dark denim'],
    colors: ['Black', 'Silver', 'Deep red', 'Electric blue', 'Metallic'],
    examples: ['Rihanna', 'Lady Gaga', 'Zendaya'],
    difficulty: 'advanced',
    budget: 'medium',
    maintenance: 'high'
  },
  {
    id: 'casual-chic',
    name: 'Casual Chic',
    description: 'Effortlessly stylish everyday wear that looks put-together while remaining comfortable and practical.',
    personality: ['Relaxed', 'Approachable', 'Stylish'],
    occasions: ['Daily wear', 'Weekend outings', 'Casual meetings'],
    keyPieces: ['Well-fitted jeans', 'Comfortable sneakers', 'Casual blazers', 'T-shirts', 'Crossbody bags'],
    colors: ['Denim blue', 'White', 'Olive green', 'Burgundy', 'Tan'],
    examples: ['Jennifer Aniston', 'Meghan Markle', 'Gigi Hadid'],
    difficulty: 'beginner',
    budget: 'low',
    maintenance: 'low'
  },
  {
    id: 'sustainable',
    name: 'Eco-Conscious Style',
    description: 'Environmentally responsible fashion choices with sustainable brands, vintage pieces, and mindful consumption.',
    personality: ['Conscious', 'Responsible', 'Innovative'],
    occasions: ['All occasions', 'Eco-events', 'Conscious lifestyle'],
    keyPieces: ['Vintage finds', 'Sustainable brands', 'Quality basics', 'Upcycled pieces', 'Natural fabrics'],
    colors: ['Natural tones', 'Organic dyes', 'Earth colors', 'Undyed fabrics', 'Plant-based hues'],
    examples: ['Emma Watson', 'Stella McCartney', 'Livia Firth'],
    difficulty: 'intermediate',
    budget: 'medium',
    maintenance: 'medium'
  },
  {
    id: 'athleisure',
    name: 'Athletic Luxe',
    description: 'Sporty meets sophisticated with high-quality athletic wear that transitions from gym to street.',
    personality: ['Active', 'Health-conscious', 'Dynamic'],
    occasions: ['Gym', 'Casual outings', 'Active lifestyle', 'Travel'],
    keyPieces: ['Designer leggings', 'Stylish sneakers', 'Athletic dresses', 'Performance fabrics', 'Sports luxe accessories'],
    colors: ['Black', 'White', 'Gray', 'Navy', 'Bright accents'],
    examples: ['Gigi Hadid', 'Hailey Bieber', 'Kendall Jenner'],
    difficulty: 'beginner',
    budget: 'medium',
    maintenance: 'low'
  }
];

export const enhancedMaleStyleOptions: StyleOption[] = [
  {
    id: 'classic-gentleman',
    name: 'Classic Gentleman',
    description: 'Timeless, refined menswear with tailored fits, quality fabrics, and sophisticated details.',
    personality: ['Professional', 'Refined', 'Traditional'],
    occasions: ['Business', 'Formal events', 'Professional meetings'],
    keyPieces: ['Tailored suits', 'Dress shirts', 'Leather shoes', 'Ties', 'Watches'],
    colors: ['Navy', 'Charcoal', 'White', 'Light blue', 'Burgundy'],
    examples: ['George Clooney', 'Ryan Gosling', 'Tom Hiddleston'],
    difficulty: 'intermediate',
    budget: 'high',
    maintenance: 'high'
  },
  {
    id: 'casual-modern',
    name: 'Casual Modern',
    description: 'Contemporary, relaxed style that balances comfort with a polished appearance.',
    personality: ['Relaxed', 'Modern', 'Approachable'],
    occasions: ['Casual work', 'Weekend', 'Social gatherings'],
    keyPieces: ['Chinos', 'Polo shirts', 'Casual blazers', 'Sneakers', 'Denim jackets'],
    colors: ['Khaki', 'Navy', 'White', 'Gray', 'Olive'],
    examples: ['Ryan Reynolds', 'Chris Evans', 'Michael B. Jordan'],
    difficulty: 'beginner',
    budget: 'medium',
    maintenance: 'low'
  },
  {
    id: 'streetwear',
    name: 'Urban Streetwear',
    description: 'Bold, contemporary street style with graphic elements, comfortable fits, and trendy pieces.',
    personality: ['Trendy', 'Creative', 'Youthful'],
    occasions: ['Casual outings', 'Creative work', 'Social events'],
    keyPieces: ['Hoodies', 'Graphic tees', 'Joggers', 'Sneakers', 'Baseball caps'],
    colors: ['Black', 'White', 'Bold colors', 'Neon accents', 'Gray'],
    examples: ['A$AP Rocky', 'Pharrell Williams', 'Tyler, The Creator'],
    difficulty: 'intermediate',
    budget: 'medium',
    maintenance: 'low'
  },
  {
    id: 'rugged',
    name: 'Rugged Outdoorsman',
    description: 'Masculine, practical style inspired by outdoor activities with durable fabrics and earthy tones.',
    personality: ['Adventurous', 'Practical', 'Masculine'],
    occasions: ['Outdoor activities', 'Casual wear', 'Weekend trips'],
    keyPieces: ['Flannel shirts', 'Work boots', 'Denim', 'Leather jackets', 'Canvas bags'],
    colors: ['Brown', 'Forest green', 'Denim blue', 'Tan', 'Burgundy'],
    examples: ['Chris Hemsworth', 'Hugh Jackman', 'Jason Momoa'],
    difficulty: 'beginner',
    budget: 'medium',
    maintenance: 'low'
  },
  {
    id: 'smart-casual',
    name: 'Smart Casual Professional',
    description: 'Polished yet relaxed style perfect for modern workplaces and professional networking.',
    personality: ['Professional', 'Adaptable', 'Confident'],
    occasions: ['Modern office', 'Business casual', 'Networking events'],
    keyPieces: ['Blazers', 'Dress pants', 'Button-down shirts', 'Loafers', 'Quality knitwear'],
    colors: ['Navy', 'Gray', 'White', 'Light blue', 'Burgundy'],
    examples: ['Ryan Gosling', 'Jon Hamm', 'Idris Elba'],
    difficulty: 'intermediate',
    budget: 'medium',
    maintenance: 'medium'
  },
  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    description: 'Clean, streamlined aesthetic with focus on quality basics and neutral colors.',
    personality: ['Organized', 'Efficient', 'Sophisticated'],
    occasions: ['Work', 'Casual', 'Modern lifestyle'],
    keyPieces: ['Quality basics', 'Neutral sweaters', 'Clean sneakers', 'Simple accessories', 'Structured coats'],
    colors: ['Black', 'White', 'Gray', 'Navy', 'Camel'],
    examples: ['Kanye West', 'Daniel Craig', 'Brad Pitt'],
    difficulty: 'beginner',
    budget: 'high',
    maintenance: 'low'
  }
];