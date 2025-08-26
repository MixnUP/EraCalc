import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const InfoSection: React.FC = () => {
  return (
    <section className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose EraCalc?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Simple & Intuitive</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                One tool, one purpose – fair and fast Tro ↔ Sellas conversions. No clutter, just results.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Community-Driven Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Players choose the conversion rate, ensuring it reflects the current community standard.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Accessible Anywhere</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Mobile-friendly, free to use, and supported by light, responsive ads for sustainability.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;