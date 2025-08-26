import React from 'react';
import HeroSection from '../sections/HeroSection';
import CalculatorSection from '../sections/CalculatorSection';
import InfoSection from '../sections/InfoSection';
import FormulaSection from '../sections/FormulaSection';

const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <CalculatorSection />
      <FormulaSection />
      <InfoSection />
    </div>
  );
};

export default LandingPage;