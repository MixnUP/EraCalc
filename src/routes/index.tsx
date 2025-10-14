import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage';
import MetaTags from '../components/MetaTags';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <MetaTags
              title="EraCalc - Graal Era Tro and Sellas Calculator"
              description="A simple and fast calculator for converting between Tro and Sellas in Graal Era. Community-driven rates for accurate conversions."
            />
            <LandingPage />
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <MetaTags
              title="About EraCalc - Graal Era Calculator"
              description="Learn more about EraCalc, a fast and simple calculator for converting between Tro and Sellas in Graal Era."
            />
            <AboutPage />
          </>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <>
            <MetaTags
              title="Privacy Policy - EraCalc"
              description="Read the Privacy Policy for EraCalc, the Graal Era Tro and Sellas calculator."
            />
            <PrivacyPolicyPage />
          </>
        }
      />
      <Route
        path="/terms-and-conditions"
        element={
          <>
            <MetaTags
              title="Terms and Conditions - EraCalc"
              description="Review the Terms and Conditions for using EraCalc, the Graal Era Tro and Sellas calculator."
            />
            <TermsAndConditionsPage />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <MetaTags
              title="Page Not Found - EraCalc"
              description="The page you are looking for does not exist on EraCalc."
            />
            <NotFoundPage />
          </>
        }
      />
    </Routes>
  );
}