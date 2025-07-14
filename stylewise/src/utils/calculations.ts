import { BodyMeasurements, BodyShape, FaceShape } from '../types';

export const calculateBodyShape = (measurements: BodyMeasurements): BodyShape => {
  const { bust, waist, hips } = measurements;
  
  const bustWaistRatio = bust / waist;
  const hipWaistRatio = hips / waist;
  const bustHipDiff = Math.abs(bust - hips);
  
  let type: BodyShape['type'];
  let confidence = 0;
  
  if (bustWaistRatio >= 1.25 && hipWaistRatio >= 1.25 && bustHipDiff <= 2) {
    type = 'hourglass';
    confidence = 0.9;
  } else if (hips > bust && hipWaistRatio >= 1.2) {
    type = 'pear';
    confidence = 0.85;
  } else if (bust > hips && bustWaistRatio >= 1.2) {
    type = 'inverted-triangle';
    confidence = 0.85;
  } else if (waist >= bust * 0.9 && waist >= hips * 0.9) {
    type = 'apple';
    confidence = 0.8;
  } else {
    type = 'rectangle';
    confidence = 0.75;
  }
  
  return { type, confidence };
};

export const calculateFaceShape = (measurements: {
  faceLength: number;
  faceWidth: number;
  jawWidth: number;
  foreheadWidth: number;
}): FaceShape => {
  const { faceLength, faceWidth, jawWidth, foreheadWidth } = measurements;
  
  const lengthWidthRatio = faceLength / faceWidth;
  const jawForeheadRatio = jawWidth / foreheadWidth;
  
  let type: FaceShape['type'];
  let confidence = 0;
  
  if (lengthWidthRatio >= 1.5) {
    if (jawWidth < foreheadWidth * 0.8) {
      type = 'heart';
      confidence = 0.85;
    } else {
      type = 'oblong';
      confidence = 0.8;
    }
  } else if (lengthWidthRatio <= 1.1) {
    if (jawWidth >= foreheadWidth * 0.9) {
      type = 'round';
      confidence = 0.85;
    } else {
      type = 'square';
      confidence = 0.8;
    }
  } else if (jawWidth < foreheadWidth * 0.7 && faceWidth < foreheadWidth * 0.8) {
    type = 'diamond';
    confidence = 0.8;
  } else {
    type = 'oval';
    confidence = 0.9;
  }
  
  return { type, confidence };
};

export const getBodyShapeDescription = (shape: BodyShape['type'], gender: 'male' | 'female'): string => {
  const descriptions = {
    hourglass: gender === 'female' 
      ? 'Balanced bust and hip measurements with a defined waist. Your silhouette is naturally proportioned.'
      : 'Broad shoulders and chest with a defined waist. Your physique shows athletic proportions.',
    pear: gender === 'female'
      ? 'Hips are wider than bust with a defined waist. Your lower body is your strongest feature.'
      : 'Hips are wider than shoulders. Focus on building upper body strength for balance.',
    apple: gender === 'female'
      ? 'Fuller midsection with narrower hips and shoulders. Emphasize your legs and arms.'
      : 'Broader midsection with strong shoulders. Athletic build with power in the core.',
    rectangle: gender === 'female'
      ? 'Balanced proportions with similar bust, waist, and hip measurements. Very versatile body type.'
      : 'Athletic and lean build with balanced proportions. Natural runner or swimmer physique.',
    'inverted-triangle': gender === 'female'
      ? 'Broader shoulders and bust with narrower hips. Strong, athletic upper body.'
      : 'Broad shoulders and chest with narrow waist and hips. Classic V-shaped physique.'
  };
  
  return descriptions[shape];
};

export const getFaceShapeDescription = (shape: FaceShape['type']): string => {
  const descriptions = {
    oval: 'Balanced proportions with a slightly longer face than it is wide. The most versatile face shape.',
    round: 'Full cheeks with a rounded chin and hairline. Face length and width are similar.',
    square: 'Strong jawline with a broad forehead. Face length and width are similar.',
    heart: 'Wider forehead with a narrower chin. Often has a widow\'s peak hairline.',
    diamond: 'Narrow forehead and chin with wider cheekbones. Angular and striking features.',
    oblong: 'Longer face with balanced width. Similar to oval but more elongated.'
  };
  
  return descriptions[shape];
};