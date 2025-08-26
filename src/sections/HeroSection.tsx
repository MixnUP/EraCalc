import React from 'react';
import { Button } from '../components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">EraCalc: Your Graal Era Currency Converter</h1>
        <p className="text-xl mb-8">Fast, simple, and community-driven conversions between Tro and Sellas.</p>
        <Button asChild size="lg">
          <a href="#calculator">
            Get Started
          </a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;