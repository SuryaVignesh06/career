import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import MentorPage from './pages/MentorPage';
import AnalyzerPage from './pages/AnalyzerPage';
import ResumePage from './pages/ResumePage';
import CodeVisualizerPage from './pages/CodeVisualizerPage';
import FeedPage from './pages/FeedPage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected — requires login */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
          <Route path="/mentor" element={<ProtectedRoute><MentorPage /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
          <Route path="/visualizer" element={<ProtectedRoute><CodeVisualizerPage /></ProtectedRoute>} />
          <Route path="/certifications" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/status" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/analyzer" element={<ProtectedRoute><AnalyzerPage /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
