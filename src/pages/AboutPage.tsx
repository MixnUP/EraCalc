import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>About EraCalc</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4">
            EraCalc is a fast and simple calculator for converting between Tro and Sellas in Graal Era.
            It uses community-set values and rates to provide instant conversions.
          </p>
          <p className="text-foreground mb-4">
            This application is 100% frontend, lightweight, and mobile-friendly.
          </p>
          <p className="text-foreground">
            Developed with React and Tailwind CSS.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;