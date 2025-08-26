import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-destructive">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4">
            The page you are looking for does not exist.
          </p>
          <Button asChild>
            <a href="/">
              Go to Home Page
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;