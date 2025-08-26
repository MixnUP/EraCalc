import React, { useState, useEffect } from 'react';
import AdBanner from '../components/AdBanner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel as SelectGroupLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const sellaValuesData = [
  { category: "Shells", name: "Aerolata", value: 3 },
  { category: "Shells", name: "Sand Dollar", value: 5 },
  { category: "Shells", name: "Scallop", value: 5 },
  { category: "Shells", name: "Starfish", value: 7 },
  { category: "Trash", name: "Paper", value: 4 },
  { category: "Trash", name: "Newspaper", value: 4 },
  { category: "Trash", name: "Bottles", value: 5 },
  { category: "Trash", name: "Tires", value: 6 },
  { category: "Mushrooms", name: "All mushroom types", value: 5 },
  { category: "Minerals", name: "Iron", value: 5 },
  { category: "Minerals", name: "Copper", value: 5 },
  { category: "Minerals", name: "Silver", value: 5 },
  { category: "Minerals", name: "Lead", value: 5 },
  { category: "Minerals", name: "Quarts", value: 5 },
  { category: "Minerals", name: "Gypsum", value: 5 },
  { category: "Minerals", name: "Diamond", value: 10 },
  { category: "Minerals", name: "Gold", value: 10 },
  { category: "Minerals", name: "Ruby", value: 7 },
  { category: "Minerals", name: "Sapphire", value: 7 },
  { category: "Minerals", name: "Emerald", value: 8 },
];

const CalculatorSection: React.FC = () => {
  const [troAmount, setTroAmount] = useState<number | string>('');
  const [sellasAmount, setSellasAmount] = useState<number | string>('');
  const [rate, setRate] = useState<number | string>(() => {
    const savedRate = localStorage.getItem('eraCalcRate');
    return savedRate ? parseFloat(savedRate) : 100; // Default rate
  });
  const [valueOfSella, setValueOfSella] = useState<number>(sellaValuesData[0].value); // Default to first item's value
  const [selectedSellaItem, setSelectedSellaItem] = useState<string>(sellaValuesData[0].name); // To display selected item name

  const [result, setResult] = useState<number>(0);
  const [conversionDirection, setConversionDirection] = useState<'troToSellas' | 'sellasToTro'>('troToSellas');

  // Save rate to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eraCalcRate', rate.toString());
  }, [rate]);

  // Update valueOfSella when selectedSellaItem changes
  useEffect(() => {
    const item = sellaValuesData.find(item => item.name === selectedSellaItem);
    if (item) {
      setValueOfSella(item.value);
    }
  }, [selectedSellaItem]);

  const calculateConversion = () => {
    let calculatedResult = 0;
    const currentRate = parseFloat(rate as string) || 100; // Fallback to 100 if empty or invalid

    if (conversionDirection === 'troToSellas') {
      const tro = parseFloat(troAmount as string);
      if (!isNaN(tro)) {
        calculatedResult = (tro * currentRate) / valueOfSella;
      }
    } else { // sellasToTro
      const sellas = parseFloat(sellasAmount as string);
      if (!isNaN(sellas)) {
        calculatedResult = (sellas * valueOfSella) / currentRate;
      }
    }
    setResult(calculatedResult);
  };

  // Trigger conversion when relevant state changes
  useEffect(() => {
    calculateConversion();
  }, [troAmount, sellasAmount, rate, valueOfSella, conversionDirection]);

  const handleTroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTroAmount(e.target.value);
    setSellasAmount(''); // Clear other input when one is typed into
  };

  const handleSellasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellasAmount(e.target.value);
    setTroAmount(''); // Clear other input when one is typed into
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(e.target.value);
  };

  const handleSwapDirection = () => {
    setConversionDirection(prev =>
      prev === 'troToSellas' ? 'sellasToTro' : 'troToSellas'
    );
    // Clear inputs on swap to avoid confusion
    setTroAmount('');
    setSellasAmount('');
    setResult(0);
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(result.toFixed(2)); // Copy with 2 decimal places
    // Optionally, add a visual feedback for copied
  };

  // Group sella values by category
  const groupedSellaValues = sellaValuesData.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, typeof sellaValuesData>);

  return (
    <section className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">EraCalc</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tro Input */}
          <div className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            conversionDirection === 'sellasToTro' ? "max-h-0 opacity-0 mb-0" : "max-h-24 opacity-100 mb-4"
          )}>
            <Label htmlFor="tro-input">Tro</Label>
            <Input
              type="number"
              id="tro-input"
              placeholder="0"
              value={troAmount}
              onChange={handleTroChange}
              disabled={conversionDirection === 'sellasToTro'}
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleSwapDirection}>
              {conversionDirection === 'troToSellas' ? (
                <>
                  Tro to Sellas <ArrowUpDown className="h-4 w-4" />
                </>
              ) : (
                <>
                  Sellas to Tro <ArrowUpDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Sellas Input */}
          <div className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            conversionDirection === 'troToSellas' ? "max-h-0 opacity-0 mb-0" : "max-h-24 opacity-100 mb-4"
          )}>
            <Label htmlFor="sellas-input">Sellas</Label>
            <Input
              type="number"
              id="sellas-input"
              placeholder="0"
              value={sellasAmount}
              onChange={handleSellasChange}
              disabled={conversionDirection === 'troToSellas'}
            />
          </div>

          {/* Conversion Rate */}
          <div>
            <Label htmlFor="rate-input">Conversion Rate (Sellas per Tro)</Label>
            <Input
              type="number"
              id="rate-input"
              placeholder="0"
              value={rate}
              onChange={handleRateChange}
            />
          </div>

          {/* Value of Sella Dropdown */}
          <div>
            <Label htmlFor="sella-value-select">Value of Sella (Item)</Label>
            <Select onValueChange={setSelectedSellaItem} defaultValue={selectedSellaItem}>
              <SelectTrigger id="sella-value-select">
                <SelectValue placeholder="Select a Sella Item" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(groupedSellaValues).map(([category, items]) => (
                  <SelectGroup key={category}>
                    <SelectGroupLabel>{category}</SelectGroupLabel>
                    {items.map(item => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name} ({item.value})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Result Display */}
          <div>
            <Label>Result</Label>
            <div className="bg-card p-4 rounded-md w-full text-foreground text-2xl font-bold border border-border text-center">
              {result.toFixed(2)} {conversionDirection === 'troToSellas' ? 'Sellas' : 'Tro'}
            </div>
          </div>

          {/* Copy Result Button */}
          <Button variant="secondary" className="w-full" onClick={handleCopyResult}>
            Copy Result
          </Button>

          {/* Ad Banner */}
          <AdBanner />
        </CardContent>
      </Card>
    </section>
  );
};

export default CalculatorSection;