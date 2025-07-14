import { Outfit } from '../types';

export const outfitData: Outfit[] = [
  {
    id: '1',
    name: 'Classic Business Professional',
    occasion: 'work',
    items: [
      { type: 'blazer', name: 'Tailored Blazer', color: 'navy', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'blouse', name: 'Silk Blouse', color: 'white', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'trousers', name: 'High-waisted Trousers', color: 'navy', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' }
    ],
    colors: ['navy', 'white', 'gold'],
    description: 'A sophisticated look perfect for important meetings and professional presentations.',
    suitableFor: {
      bodyShapes: ['hourglass', 'rectangle', 'inverted-triangle'],
      faceShapes: ['oval', 'square', 'oblong'],
      gender: 'female'
    }
  },
  {
    id: '2',
    name: 'Casual Weekend Chic',
    occasion: 'casual',
    items: [
      { type: 'sweater', name: 'Cozy Cardigan', color: 'blush', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'jeans', name: 'High-rise Jeans', color: 'denim', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'sneakers', name: 'White Sneakers', color: 'white', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' }
    ],
    colors: ['blush', 'denim', 'white'],
    description: 'Comfortable yet stylish for weekend outings and casual meetups.',
    suitableFor: {
      bodyShapes: ['pear', 'rectangle', 'hourglass'],
      faceShapes: ['round', 'oval', 'heart'],
      gender: 'female'
    }
  },
  {
    id: '3',
    name: 'Evening Elegance',
    occasion: 'evening',
    items: [
      { type: 'dress', name: 'Little Black Dress', color: 'black', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'heels', name: 'Classic Pumps', color: 'black', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'clutch', name: 'Evening Clutch', color: 'gold', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' }
    ],
    colors: ['black', 'gold', 'silver'],
    description: 'Timeless elegance for dinner dates and evening events.',
    suitableFor: {
      bodyShapes: ['hourglass', 'pear', 'apple'],
      faceShapes: ['oval', 'diamond', 'heart'],
      gender: 'female'
    }
  },
  {
    id: '4',
    name: 'Smart Casual Office',
    occasion: 'work',
    items: [
      { type: 'shirt', name: 'Button-down Shirt', color: 'light-blue', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'chinos', name: 'Slim Fit Chinos', color: 'khaki', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'loafers', name: 'Leather Loafers', color: 'brown', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' }
    ],
    colors: ['light-blue', 'khaki', 'brown'],
    description: 'Professional yet relaxed for modern office environments.',
    suitableFor: {
      bodyShapes: ['rectangle', 'inverted-triangle', 'apple'],
      faceShapes: ['square', 'oval', 'oblong'],
      gender: 'male'
    }
  },
  {
    id: '5',
    name: 'Weekend Explorer',
    occasion: 'casual',
    items: [
      { type: 't-shirt', name: 'Crew Neck Tee', color: 'forest-green', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'jeans', name: 'Relaxed Fit Jeans', color: 'dark-denim', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' },
      { type: 'sneakers', name: 'Canvas Sneakers', color: 'white', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200' }
    ],
    colors: ['forest-green', 'dark-denim', 'white'],
    description: 'Comfortable and versatile for weekend activities and casual outings.',
    suitableFor: {
      bodyShapes: ['rectangle', 'pear', 'hourglass'],
      faceShapes: ['round', 'oval', 'square'],
      gender: 'male'
    }
  }
];