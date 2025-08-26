import { useEffect } from 'react';
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
import { useCalculatorStore } from '../store/calculator.store';

export default function CalculatorSection() {
  const {
    troAmount,
    rate,
    result,
    conversionDirection,
    selectedSellaItemName,
    currentItemQuantity,
    selectedItems,
    isCalculating,
    justCopied,
    sellaValues,
    rateValues,
    setTroAmount,
    setRate,
    setSelectedSellaItemName,
    setCurrentItemQuantity,
    addSelectedItem,
    removeSelectedItem,
    calculateConversion,
    copyResult,
    swapConversionDirection,
  } = useCalculatorStore();

  useEffect(() => {
    calculateConversion();
  }, [troAmount, rate, selectedSellaItemName, selectedItems, conversionDirection, calculateConversion]);

  const totalValueOfSella = selectedItems.reduce((sum, item) => sum + (item.value * item.quantity), 0);

  const groupedSellaValues = sellaValues.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, typeof sellaValues>);

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
              onChange={(e) => setTroAmount(e.target.value)}
              disabled={conversionDirection === 'sellasToTro'}
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={swapConversionDirection} className="active:scale-[0.98]">
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
                  <Button onClick={addSelectedItem} className="active:scale-[0.98]">Add</Button>
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
                        <Button variant="destructive" size="sm" onClick={() => removeSelectedItem(index)} className="active:scale-[0.98]">Remove</Button>
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

          {/* Ad Banner */}
          <AdBanner />

          {/* Quick Tables */}
          {conversionDirection === 'troToSellas' && (
            <QuickTables />
          )}
        </CardContent>
      </Card>
    </section>
  );
}