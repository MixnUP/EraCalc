import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}