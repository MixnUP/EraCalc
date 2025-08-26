import React, { useState, useEffect } from 'react';
import AdBanner from '../components/AdBanner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowUpDown, Check, Copy } from 'lucide-react';
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
import QuickTables from '../components/QuickTables';

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

interface SelectedItem {
  name: string;
  value: number;
  quantity: number;
}

const generateRateValues = () => {
  const rates = [];
  for (let i = 30; i <= 40; i++) {
    rates.push((i / 10).toFixed(1));
  }
  return rates;
};

const rateValues = generateRateValues();

const CalculatorSection: React.FC = () => {
  const [troAmount, setTroAmount] = useState<number | string>('');
  const [rate, setRate] = useState<string>(() => {
    const savedRate = localStorage.getItem('eraCalcRate');
    // If savedRate is 0 or NaN, treat as empty string for placeholder
    return savedRate && parseFloat(savedRate) !== 0 && !isNaN(parseFloat(savedRate)) ? savedRate : rateValues[0];
  });
  const [result, setResult] = useState<number>(0);
  const [conversionDirection, setConversionDirection] = useState<'troToSellas' | 'sellasToTro'>('troToSellas');

  const [selectedSellaItemName, setSelectedSellaItemName] = useState<string>(sellaValuesData[0].name); // Name of item currently selected in dropdown
  const [currentItemQuantity, setCurrentItemQuantity] = useState<number | string>(1); // Quantity for item to be added
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]); // List of added items

  // State for loading/feedback
  const [isCalculating, setIsCalculating] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  // Save rate to localStorage whenever it changes
  useEffect(() => {
    // Only save if rate is a valid number, otherwise save empty string
    const rateToSave = parseFloat(rate as string);
    localStorage.setItem('eraCalcRate', !isNaN(rateToSave) && rateToSave !== 0 ? rateToSave.toString() : '');
  }, [rate]);

  // Calculate total value of sella from selected items
  const totalValueOfSella = selectedItems.reduce((sum, item) => sum + (item.value * item.quantity), 0);

  const calculateConversion = () => {
    let calculatedResult = 0;
    const currentRate = parseFloat(rate as string) || parseFloat(rateValues[0]); // Fallback to first rate if empty or invalid

    if (conversionDirection === 'troToSellas') {
      const tro = parseFloat(troAmount as string);
      const selectedItem = sellaValuesData.find(item => item.name === selectedSellaItemName);
      const valueOfSellaForTroToSellas = selectedItem ? selectedItem.value : 1; // Value of the selected Sella item
      if (!isNaN(tro)) {
        calculatedResult = (tro * currentRate) / valueOfSellaForTroToSellas;
      }
    } else { // sellasToTro
      const sellas = totalValueOfSella; 
      // For Sellas to Tro, Value of Sella in the formula is implicitly 1 (as Sellas is the base unit)
      // The formula is: Tro = (Number of Sellas * 1) / Rate
      if (sellas > 0) { // Only calculate if there are sellas from items
        calculatedResult = sellas / currentRate;
      }
    }
    setResult(calculatedResult);
  };

  // Trigger conversion when relevant state changes
  useEffect(() => {
    setIsCalculating(true);
    calculateConversion();
    const timer = setTimeout(() => setIsCalculating(false), 300); // Duration for visual feedback
    return () => clearTimeout(timer);
  }, [troAmount, rate, selectedSellaItemName, totalValueOfSella, conversionDirection]);

  const handleTroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTroAmount(e.target.value);
  };

  const handleRateChange = (value: string) => {
    setRate(value);
  };

  const handleAddItem = () => {
    const selectedItemData = sellaValuesData.find(item => item.name === selectedSellaItemName);
    const quantity = parseFloat(currentItemQuantity as string);

    if (selectedItemData && !isNaN(quantity) && quantity > 0) {
      setSelectedItems(prevItems => [
        ...prevItems,
        { name: selectedItemData.name, value: selectedItemData.value, quantity: quantity }
      ]);
      setCurrentItemQuantity(1); // Reset quantity after adding
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleSwapDirection = () => {
    setConversionDirection(prev => {
      const newDirection = prev === 'troToSellas' ? 'sellasToTro' : 'troToSellas';
      // Clear selected items if switching to troToSellas
      if (newDirection === 'troToSellas') {
        setSelectedItems([]);
      }
      return newDirection;
    });
    // Clear inputs on swap to avoid confusion
    setTroAmount('');
    setResult(0);
  };

  const handleQuickSelect = (amount: number) => {
    setTroAmount(amount);
  };

  const handleCopyResult = () => {
    if (justCopied) return;
    navigator.clipboard.writeText(result.toFixed(2)); // Copy with 2 decimal places
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
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
            <Button variant="outline" onClick={handleSwapDirection} className="active:scale-[0.98]">
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

          {/* Conversion Rate Dropdown */}
          <div>
            <Label htmlFor="rate-select">Tro-Sella Rate</Label>
            <Select onValueChange={handleRateChange} value={rate}>
              <SelectTrigger id="rate-select">
                <SelectValue placeholder="Select Rate" />
              </SelectTrigger>
              <SelectContent>
                {rateValues.map((rateOption) => (
                  <SelectItem key={rateOption} value={rateOption}>
                    {rateOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Value of Sella Dropdown (Always present) */}
          <div>
            <Label htmlFor="sella-item-select">Value of Sella (Item)</Label>
            <Select onValueChange={setSelectedSellaItemName} defaultValue={selectedSellaItemName}>
              <SelectTrigger id="sella-item-select">
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

          {/* Conditional Add Sella Items and Selected Items List */}
          {conversionDirection === 'sellasToTro' && (
            <>
              {/* Add Sella Items */}
              <div>
                <Label htmlFor="qty-input">Quantity</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Qty"
                    className="w-20"
                    value={currentItemQuantity}
                    onChange={(e) => setCurrentItemQuantity(e.target.value)}
                    id="qty-input"
                    autoComplete="off" // Added to prevent browser autofill
                  />
                  <Button onClick={handleAddItem} className="active:scale-[0.98]">Add</Button>
                </div>
              </div>

              {/* Selected Items List */}
              {selectedItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">Selected Items ({totalValueOfSella} $)</h3>
                  <ul className="space-y-2">
                    {selectedItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                        <span>{item.name} x {item.quantity} ({item.value * item.quantity} $)</span>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(index)} className="active:scale-[0.98]">Remove</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Result Display */}
          <div>
            <Label>Result</Label>
            <div className={cn(
              "bg-card p-4 rounded-md w-full text-foreground text-2xl font-bold border border-border text-center transition-colors duration-300",
              isCalculating && "bg-muted/50"
            )}>
              {result.toFixed(2)} {conversionDirection === 'troToSellas' ? selectedSellaItemName : 'Tro'}
            </div>
          </div>

          {/* Copy Result Button */}
          <Button variant="secondary" className="w-full active:scale-[0.98]" onClick={handleCopyResult}>
            {justCopied ? (
              <>
                <Check className="h-4 w-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy Result
              </>
            )}
          </Button>

          {/* Ad Banner */}
          <AdBanner />

          {/* Quick Tables */}
          {conversionDirection === 'troToSellas' && (
            <QuickTables
              rate={parseFloat(rate)}
              sellaValue={sellaValuesData.find(item => item.name === selectedSellaItemName)?.value || 0}
              onSelect={handleQuickSelect}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default CalculatorSection;