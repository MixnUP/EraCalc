import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const FormulaSection: React.FC = () => {
  return (
    <section className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Sellas to Tro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">To convert your Sellas to Tro, we use the following formula:</p>
              <code className="bg-primary/10 text-primary p-2 rounded-md">
                Tro = (Number of Sellas × Value of Sella) / Rate
              </code>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tro to Sellas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">To convert your Tro to Sellas, the formula is:</p>
              <code className="bg-primary/10 text-primary p-2 rounded-md">
                Sellas = (Number of Tro × Rate) / Value of Sella
              </code>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FormulaSection;
