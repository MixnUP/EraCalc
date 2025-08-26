import React from 'react';
import HeroSection from '../sections/HeroSection';
import CalculatorSection from '../sections/CalculatorSection';
import InfoSection from '../sections/InfoSection';

const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <CalculatorSection />
      <InfoSection />
    </div>
  );
};

export default LandingPage;