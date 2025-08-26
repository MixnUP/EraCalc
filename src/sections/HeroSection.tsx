import React from 'react';
import { Button } from '../components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Instant Graal Era Conversions</h1>
        <p className="text-xl mb-8">Quickly convert between Tro and Sellas using community-driven rates.</p>
        
      </div>
    </section>
  );
};

export default HeroSection;