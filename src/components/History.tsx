import { useCalculatorStore } from '../store/calculator.store';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function History() {
  const { history } = useCalculatorStore();

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <CardTitle className="text-center">History</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-center text-muted-foreground">No history yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((entry, index) => (
              <li key={index} className="bg-muted p-2 rounded-md">{entry}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}