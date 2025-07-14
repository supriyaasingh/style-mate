@@ .. @@
 import React from 'react';
 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 import { AuthProvider, useAuth } from './contexts/AuthContext';
 import Header from './components/Header';
 import LandingPage from './pages/LandingPage';
 import AuthPage from './pages/AuthPage';
 import Dashboard from './pages/Dashboard';
 import BodyCalculator from './pages/BodyCalculator';
 import FaceCalculator from './pages/FaceCalculator';
 import OutfitSuggestions from './pages/OutfitSuggestions';
 import ColorAnalysis from './pages/ColorAnalysis';
 import StyleQuiz from './pages/StyleQuiz';
-import AIConsultant from './components/AIConsultant';
+import BMICalculator from './pages/BMICalculator';
+import AdminDashboard from './pages/AdminDashboard';
+import SocialFeed from './pages/SocialFeed';
+import EnhancedAIConsultant from './components/EnhancedAIConsultant';

 const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { user } = useAuth();
   return user ? <>{children}</> : <Navigate to="/login" />;
 };

+const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
+  const { user } = useAuth();
+  // In a real app, you'd check for admin role
+  const isAdmin = user?.email === 'admin@stylewise.com';
+  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
+};

 const AppContent: React.FC = () => {
   const { user } = useAuth();

   return (
     <div className="min-h-screen bg-gray-50">
       <Header />
       <Routes>
         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
         <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
         <Route path="/body-calculator" element={<ProtectedRoute><BodyCalculator /></ProtectedRoute>} />
         <Route path="/face-calculator" element={<ProtectedRoute><FaceCalculator /></ProtectedRoute>} />
         <Route path="/outfits" element={<ProtectedRoute><OutfitSuggestions /></ProtectedRoute>} />
         <Route path="/color-analysis" element={<ProtectedRoute><ColorAnalysis /></ProtectedRoute>} />
         <Route path="/style-quiz" element={<ProtectedRoute><StyleQuiz /></ProtectedRoute>} />
+        <Route path="/bmi-calculator" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
+        <Route path="/social" element={<ProtectedRoute><SocialFeed /></ProtectedRoute>} />
+        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
       </Routes>
-      {user && <AIConsultant />}
+      {user && <EnhancedAIConsultant />}
     </div>
   );
 };

 function App() {
   return (
     <AuthProvider>
       <Router>
         <AppContent />
       </Router>
     </AuthProvider>
   );
 }

 export default App;