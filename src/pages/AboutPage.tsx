import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function AboutPage() {
  const navigate = useNavigate();

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
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-foreground">
              For any questions or feedback, please reach out to us at [Your Contact Email].
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Button asChild>
              <Link to="/">Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
