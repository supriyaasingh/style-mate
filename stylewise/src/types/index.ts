export interface User {
  id: string;
  email: string;
  name: string;
  gender: 'male' | 'female';
  preferences: UserPreferences;
  measurements?: BodyMeasurements;
  faceShape?: FaceShape;
  bodyShape?: BodyShape;
}

export interface UserPreferences {
  favoriteColors: string[];
  stylePreferences: string[];
  occasions: string[];
  brands: string[];
}

export interface BodyMeasurements {
  bust: number;
  waist: number;
  hips: number;
  shoulders: number;
  height: number;
  weight: number;
}

export interface FaceShape {
  type: 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong';
  confidence: number;
}

export interface BodyShape {
  type: 'hourglass' | 'pear' | 'apple' | 'rectangle' | 'inverted-triangle';
  confidence: number;
}

export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  items: OutfitItem[];
  colors: string[];
  description: string;
  suitableFor: {
    bodyShapes: BodyShape['type'][];
    faceShapes: FaceShape['type'][];
    gender: 'male' | 'female' | 'unisex';
  };
}

export interface OutfitItem {
  type: string;
  name: string;
  color: string;
  image: string;
  price?: number;
  brand?: string;
  purchaseUrl?: string;
}

export interface StyleConsultation {
  id: string;
  userId: string;
  question: string;
  response: string;
  timestamp: Date;
  category: 'body-shape' | 'face-shape' | 'color' | 'outfit' | 'general';
}

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  personality: string[];
  occasions: string[];
  keyPieces: string[];
  colors: string[];
  examples: string[];
}