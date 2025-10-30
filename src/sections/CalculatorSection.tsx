import { Button } from '../components/ui/button';
import { useCalculatorStore } from '../store/calculator.store';
import AdvancedCalculator from '../components/AdvancedCalculator';
import SimpleCalculator from '../components/SimpleCalculator';

export default function CalculatorSection() {
  const {
    calculatorMode,
    setCalculatorMode,
  } = useCalculatorStore();

  const toggleButton = (
    <Button onClick={() => setCalculatorMode(calculatorMode === 'simple' ? 'advanced' : 'simple')}>
      {calculatorMode === 'simple' ? 'Advanced Mode' : 'Simple Mode'}
    </Button>
  );

  return (
    <section className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {calculatorMode === 'simple' ? <SimpleCalculator toggleButton={toggleButton} /> : <AdvancedCalculator toggleButton={toggleButton} />}
      </div>
    </section>
  );
}