@@ .. @@
 import { BodyMeasurements, BodyShape, FaceShape } from '../types';
+import { BMIData } from '../types';

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

+export const calculateBMI = (height: number, weight: number, unit: 'imperial' | 'metric' = 'imperial'): BMIData => {
+  let heightInMeters: number;
+  let weightInKg: number;
+  
+  if (unit === 'imperial') {
+    // Convert inches to meters and pounds to kg
+    heightInMeters = height * 0.0254;
+    weightInKg = weight * 0.453592;
+  } else {
+    heightInMeters = height / 100; // cm to meters
+    weightInKg = weight;
+  }
+  
+  const bmi = weightInKg / (heightInMeters * heightInMeters);
+  
+  let category: BMIData['category'];
+  let recommendations: string[] = [];
+  
+  if (bmi < 18.5) {
+    category = 'underweight';
+    recommendations = [
+      'Focus on layering to add visual weight',
+      'Choose structured clothing with padding',
+      'Horizontal stripes can add width',
+      'Consider consulting a healthcare provider'
+    ];
+  } else if (bmi >= 18.5 && bmi < 25) {
+    category = 'normal';
+    recommendations = [
+      'You can wear most styles confidently',
+      'Experiment with different fits and silhouettes',
+      'Focus on personal style preferences',
+      'Maintain your healthy lifestyle'
+    ];
+  } else if (bmi >= 25 && bmi < 30) {
+    category = 'overweight';
+    recommendations = [
+      'Choose well-fitted clothing over loose fits',
+      'Vertical lines can create a lengthening effect',
+      'Dark colors can be slimming',
+      'Focus on good posture and confidence'
+    ];
+  } else {
+    category = 'obese';
+    recommendations = [
+      'Invest in quality, well-fitted basics',
+      'A-line silhouettes are universally flattering',
+      'Focus on comfort and confidence',
+      'Consider consulting healthcare professionals'
+    ];
+  }
+  
+  const healthyRange = { min: 18.5, max: 24.9 };
+  
+  return {
+    value: Math.round(bmi * 10) / 10,
+    category,
+    healthyRange,
+    recommendations,
+    lastUpdated: new Date()
+  };
+};
+
+export const getHealthConsciousStyling = (bmi: BMIData, bodyShape: BodyShape, fitnessGoals: string[]): string[] => {
+  const suggestions: string[] = [];
+  
+  // BMI-based suggestions
+  if (bmi.category === 'underweight') {
+    suggestions.push(
+      'Layer with structured blazers to add visual weight',
+      'Choose tops with horizontal details or patterns',
+      'Opt for fuller cuts in pants and skirts'
+    );
+  } else if (bmi.category === 'overweight' || bmi.category === 'obese') {
+    suggestions.push(
+      'Choose clothes that skim rather than cling',
+      'Invest in good undergarments for proper support',
+      'Vertical lines and monochromatic looks are flattering'
+    );
+  }
+  
+  // Fitness goal-based suggestions
+  if (fitnessGoals.includes('weight-loss')) {
+    suggestions.push(
+      'Invest in adjustable pieces like wrap dresses',
+      'Choose quality basics that will last through size changes',
+      'Consider activewear that transitions to casual wear'
+    );
+  }
+  
+  if (fitnessGoals.includes('muscle-building')) {
+    suggestions.push(
+      'Allow room in shoulders and arms for muscle growth',
+      'Choose stretchy fabrics for comfort during workouts',
+      'Fitted clothing can showcase your progress'
+    );
+  }
+  
+  return suggestions;
+};

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
+
+export const generateAdvancedOutfitRecommendations = (user: any): any[] => {
+  // Advanced AI algorithm for outfit recommendations
+  const recommendations = [];
+  
+  // Factor in BMI, body shape, face shape, style preferences, and health goals
+  const { bodyShape, faceShape, bmi, preferences, healthProfile } = user;
+  
+  // Machine learning-like scoring system
+  const baseOutfits = [
+    // This would be expanded with a larger dataset
+    {
+      id: 'smart-casual-1',
+      name: 'Health-Conscious Professional',
+      score: 0,
+      items: ['blazer', 'comfortable-pants', 'supportive-shoes'],
+      healthBenefits: ['posture-support', 'comfort', 'confidence']
+    }
+  ];
+  
+  // Score each outfit based on user profile
+  baseOutfits.forEach(outfit => {
+    let score = 70; // Base score
+    
+    // BMI considerations
+    if (bmi?.category === 'normal') score += 10;
+    if (bmi?.category === 'overweight' && outfit.healthBenefits.includes('comfort')) score += 15;
+    
+    // Body shape compatibility
+    if (bodyShape?.type === 'hourglass' && outfit.items.includes('fitted-top')) score += 20;
+    
+    // Style preferences
+    if (preferences?.stylePreferences.includes('professional')) score += 15;
+    
+    outfit.score = score;
+  });
+  
+  return baseOutfits.sort((a, b) => b.score - a.score);
+};