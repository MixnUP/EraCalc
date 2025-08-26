import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

interface QuickTablesProps {
  rate: number;
  sellaValue: number;
  onSelect: (amount: number) => void;
}

const commonTroAmounts = [500, 1000, 5000, 10000, 20000];

const QuickTables: React.FC<QuickTablesProps> = ({ rate, sellaValue, onSelect }) => {
  if (!rate || !sellaValue) {
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
            const sellaAmount = (amount * rate) / sellaValue;
            return (
              <TableRow key={amount} onClick={() => onSelect(amount)} className="cursor-pointer">
                <TableCell>{amount}</TableCell>
                <TableCell>{sellaAmount.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuickTables;
