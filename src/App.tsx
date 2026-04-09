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
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* App pages (no hard auth gate so demo works) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/visualizer" element={<CodeVisualizerPage />} />
          <Route path="/certifications" element={<DashboardPage />} />
          <Route path="/internships" element={<DashboardPage />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
