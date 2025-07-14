@@ .. @@
 export interface User {
   id: string;
   email: string;
   name: string;
   gender: 'male' | 'female';
   preferences: UserPreferences;
   measurements?: BodyMeasurements;
   faceShape?: FaceShape;
   bodyShape?: BodyShape;
+  bmi?: BMIData;
+  healthProfile?: HealthProfile;
+  socialProfile?: SocialProfile;
+  activityLog?: ActivityLog[];
 }

 export interface UserPreferences {
   favoriteColors: string[];
   stylePreferences: string[];
   occasions: string[];
   brands: string[];
+  budgetRange?: BudgetRange;
+  sustainabilityPreference?: 'low' | 'medium' | 'high';
+  fitnessGoals?: string[];
 }

 export interface BodyMeasurements {
   bust: number;
   waist: number;
   hips: number;
   shoulders: number;
   height: number;
   weight: number;
 }

+export interface BMIData {
+  value: number;
+  category: 'underweight' | 'normal' | 'overweight' | 'obese';
+  healthyRange: { min: number; max: number };
+  recommendations: string[];
+  lastUpdated: Date;
+}
+
+export interface HealthProfile {
+  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
+  bodyGoals: string[];
+  dietaryRestrictions: string[];
+  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
+}
+
+export interface SocialProfile {
+  username: string;
+  bio: string;
+  followers: string[];
+  following: string[];
+  publicOutfits: string[];
+  achievements: Achievement[];
+}
+
+export interface Achievement {
+  id: string;
+  title: string;
+  description: string;
+  icon: string;
+  unlockedAt: Date;
+}
+
+export interface ActivityLog {
+  id: string;
+  type: 'login' | 'outfit_view' | 'outfit_save' | 'quiz_complete' | 'measurement_update' | 'social_interaction';
+  timestamp: Date;
+  details: Record<string, any>;
+  deviceInfo?: string;
+}
+
+export interface BudgetRange {
+  min: number;
+  max: number;
+  currency: string;
+}

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
+    bmiRange?: { min: number; max: number };
+    fitnessLevel?: string[];
   };
+  tags: string[];
+  difficulty: 'easy' | 'medium' | 'hard';
+  seasonality: string[];
+  priceRange: BudgetRange;
+  sustainability: 'low' | 'medium' | 'high';
+  createdBy?: string;
+  likes: number;
+  saves: number;
+  shares: number;
 }

 export interface OutfitItem {
   type: string;
   name: string;
   color: string;
   image: string;
   price?: number;
   brand?: string;
   purchaseUrl?: string;
+  alternatives?: OutfitItem[];
+  sustainability?: 'low' | 'medium' | 'high';
+  size?: string;
+  fit?: 'tight' | 'regular' | 'loose';
 }

 export interface StyleConsultation {
   id: string;
   userId: string;
   question: string;
   response: string;
   timestamp: Date;
   category: 'body-shape' | 'face-shape' | 'color' | 'outfit' | 'general';
+  satisfaction?: number;
+  followUp?: string;
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
+  difficulty: 'beginner' | 'intermediate' | 'advanced';
+  budget: 'low' | 'medium' | 'high';
+  maintenance: 'low' | 'medium' | 'high';
 }
+
+export interface AdminAnalytics {
+  totalUsers: number;
+  activeUsers: number;
+  newUsersToday: number;
+  popularStyles: { style: string; count: number }[];
+  averageBMI: number;
+  topOutfits: Outfit[];
+  userEngagement: {
+    dailyLogins: number;
+    outfitViews: number;
+    quizCompletions: number;
+  };
+}
+
+export interface SocialPost {
+  id: string;
+  userId: string;
+  outfitId: string;
+  caption: string;
+  image: string;
+  likes: string[];
+  comments: Comment[];
+  createdAt: Date;
+  tags: string[];
+}
+
+export interface Comment {
+  id: string;
+  userId: string;
+  content: string;
+  createdAt: Date;
+  likes: string[];
+}