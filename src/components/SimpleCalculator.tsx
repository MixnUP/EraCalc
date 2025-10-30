import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Check, Copy, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCalculatorStore } from '../store/calculator.store';
import type { ISelectedItem } from '../types/calculator.type';

const imageModules = import.meta.glob('../assets/*.png', { eager: true });

const itemImages: { [key: string]: string } = {};
for (const path in imageModules) {
  const fileNameWithExtension = path.split('/').pop();
  if (fileNameWithExtension) {
    const fileName = fileNameWithExtension.split('.')[0];
    itemImages[fileName] = (imageModules[path] as { default: string }).default;
  }
}

const formatItemNameToFileName = (itemName: string) => {
  return itemName.toLowerCase().replace(/ /g, '_');
};

export default function SimpleCalculator({ toggleButton }: { toggleButton: React.ReactNode }) {
  const { sellaValues, rateValues } = useCalculatorStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);
  const [result, setResult] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [justCopied, setJustCopied] = useState(false);
  const [rate, setRate] = useState(rateValues[0]);

  const calculateConversion = () => {
    let calculatedResult = 0;
    const currentRate = parseFloat(rate as string) || parseFloat(rateValues[0]);
    const totalValueOfSella = selectedItems.reduce((sum, item) => sum + (item.value * item.quantity), 0);

    const sellas = totalValueOfSella;
    if (sellas > 0) {
      calculatedResult = sellas / currentRate;
    }

    setIsCalculating(true);
    setResult(calculatedResult);
    setTimeout(() => setIsCalculating(false), 300);
  };

  useEffect(() => {
    calculateConversion();
  }, [rate, selectedItems]);

  const categories = [...new Set(sellaValues.map(item => item.category))];

  const filteredSellaValues = selectedCategory
    ? sellaValues.filter(item => item.category === selectedCategory)
    : [];

  const totalValueOfSella = selectedItems.reduce((sum, item) => sum + (item.value * item.quantity), 0);

  const removeSellaItem = (index: number) => {
    setSelectedItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const clearSellaItems = () => {
    setSelectedItems([]);
  };

  const updateSellaItemQuantity = (index: number, quantity: number) => {
    setSelectedItems(prevItems => prevItems.map((item, i) => i === index ? { ...item, quantity } : item));
  };

  const handleAddItem = (item: { name: string, value: number }) => {
    setSelectedItems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
  };

  const copyResult = () => {
    if (justCopied) return;
    navigator.clipboard.writeText(result.toFixed(2));
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  return (
    <section className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-center">EraCalc</CardTitle>
          {toggleButton}
        </CardHeader>
        <CardContent className="space-y-6">
          <>
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Conversion Rate Dropdown */}
            <div>
              <Label htmlFor="rate-select">Tro-Sella Rate</Label>
              <Select onValueChange={setRate} value={rate}>
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

            {selectedCategory && (
              <div className="space-y-2">
                <Label>Item</Label>
                <div className="grid grid-cols-3 gap-2">
                  {filteredSellaValues.map(item => (
                    <Button
                      key={item.name}
                      variant={'outline'}
                      onClick={() => handleAddItem(item)}
                      className="h-auto py-2 flex flex-col items-center justify-center"
                    >
                      <img src={itemImages[formatItemNameToFileName(item.name)]} alt={item.name} className="h-8 w-8 mb-1" />
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.value}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {selectedItems.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">Selected Items ({totalValueOfSella} $)</h3>
                  <Button variant="destructive" size="sm" onClick={clearSellaItems}>Clear</Button>
                </div>
                <ul className="space-y-2">
                  {selectedItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                                                  <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateSellaItemQuantity(index, parseInt(e.target.value))}
                                                    className="w-20 h-8 bg-white"
                                                  />                        <Button variant="ghost" size="icon" onClick={() => removeSellaItem(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>

          <div className="space-y-2">
            <Label>Result</Label>
            <div className={cn(
              "bg-card p-4 rounded-md w-full text-foreground text-2xl font-bold border border-border text-center transition-colors duration-300",
              isCalculating && "bg-muted/50"
            )}>
              {result.toFixed(0)} Tro
            </div>
          </div>

          <Button variant="secondary" className="w-full active:scale-[0.98]" onClick={copyResult}>
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
        </CardContent>
      </Card>
    </section>
  );
}