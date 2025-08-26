import { useCalculatorStore } from '../store/calculator.store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const commonTroAmounts = [500, 1000, 5000, 10000, 20000];

export default function QuickTables() {
  const {
    rate,
    selectedSellaItemName,
    sellaValues,
    setTroAmount,
  } = useCalculatorStore();

  const sellaValue = sellaValues.find(item => item.name === selectedSellaItemName)?.value || 0;
  const parsedRate = parseFloat(rate);

  if (!parsedRate || !sellaValue) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-center mb-4">Quick Conversions</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tro</TableHead>
            <TableHead>Sellas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commonTroAmounts.map((amount) => {
            const sellaAmount = (amount * parsedRate) / sellaValue;
            return (
              <TableRow key={amount} onClick={() => setTroAmount(amount)} className="cursor-pointer">
                <TableCell>{amount}</TableCell>
                <TableCell>{sellaAmount.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
