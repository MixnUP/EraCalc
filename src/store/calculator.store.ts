import { create } from 'zustand';
import type { ConversionDirection, ISelectedItem } from '../types/calculator.type';

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

const generateRateValues = () => {
  const rates = [];
  for (let i = 30; i <= 40; i++) {
    rates.push((i / 10).toFixed(1));
  }
  return rates;
};

const rateValues = generateRateValues();

interface CalculatorState {
  troAmount: number | string;
  rate: string;
  result: number;
  conversionDirection: ConversionDirection;
  selectedSellaItemName: string;
  currentItemQuantity: number | string;
  selectedItems: ISelectedItem[];
  isCalculating: boolean;
  justCopied: boolean;
  sellaValues: typeof sellaValuesData;
  rateValues: string[];
  setTroAmount: (amount: number | string) => void;
  setRate: (rate: string) => void;
  setConversionDirection: (direction: ConversionDirection) => void;
  setSelectedSellaItemName: (name: string) => void;
  setCurrentItemQuantity: (quantity: number | string) => void;
  addSelectedItem: () => void;
  removeSelectedItem: (index: number) => void;
  calculateConversion: () => void;
  copyResult: () => void;
  swapConversionDirection: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  troAmount: '',
  rate: (() => {
    if (typeof window !== 'undefined') {
      const savedRate = localStorage.getItem('eraCalcRate');
      return savedRate && parseFloat(savedRate) !== 0 && !isNaN(parseFloat(savedRate)) ? savedRate : rateValues[0];
    }
    return rateValues[0];
  })(),
  result: 0,
  conversionDirection: 'troToSellas',
  selectedSellaItemName: sellaValuesData[0].name,
  currentItemQuantity: 1,
  selectedItems: [],
  isCalculating: false,
  justCopied: false,
  sellaValues: sellaValuesData,
  rateValues: rateValues,

  setTroAmount: (amount) => set({ troAmount: amount }),
  setRate: (rate) => {
    if (typeof window !== 'undefined') {
      const rateToSave = parseFloat(rate as string);
      localStorage.setItem('eraCalcRate', !isNaN(rateToSave) && rateToSave !== 0 ? rateToSave.toString() : '');
    }
    set({ rate })
  },
  setConversionDirection: (direction) => set({ conversionDirection: direction }),
  setSelectedSellaItemName: (name) => set({ selectedSellaItemName: name }),
  setCurrentItemQuantity: (quantity) => set({ currentItemQuantity: quantity }),

  addSelectedItem: () => {
    const { selectedSellaItemName, currentItemQuantity, sellaValues } = get();
    const selectedItemData = sellaValues.find(item => item.name === selectedSellaItemName);
    const quantity = parseFloat(currentItemQuantity as string);

    if (selectedItemData && !isNaN(quantity) && quantity > 0) {
      set(state => ({
        selectedItems: [
          ...state.selectedItems,
          { name: selectedItemData.name, value: selectedItemData.value, quantity: quantity }
        ],
        currentItemQuantity: 1,
      }));
    }
  },

  removeSelectedItem: (index) => {
    set(state => ({
      selectedItems: state.selectedItems.filter((_, i) => i !== index),
    }));
  },

  calculateConversion: () => {
    const { troAmount, rate, conversionDirection, selectedSellaItemName, selectedItems, sellaValues, rateValues } = get();
    let calculatedResult = 0;
    const currentRate = parseFloat(rate as string) || parseFloat(rateValues[0]);
    const totalValueOfSella = selectedItems.reduce((sum, item) => sum + (item.value * item.quantity), 0);

    if (conversionDirection === 'troToSellas') {
      const tro = parseFloat(troAmount as string);
      const selectedItem = sellaValues.find(item => item.name === selectedSellaItemName);
      const valueOfSellaForTroToSellas = selectedItem ? selectedItem.value : 1;
      if (!isNaN(tro)) {
        calculatedResult = (tro * currentRate) / valueOfSellaForTroToSellas;
      }
    } else { // sellasToTro
      const sellas = totalValueOfSella;
      if (sellas > 0) {
        calculatedResult = sellas / currentRate;
      }
    }

    set({ isCalculating: true });
    set({ result: calculatedResult });
    setTimeout(() => set({ isCalculating: false }), 300);
  },

  copyResult: () => {
    const { result, justCopied } = get();
    if (justCopied) return;
    navigator.clipboard.writeText(result.toFixed(2));
    set({ justCopied: true });
    setTimeout(() => set({ justCopied: false }), 2000);
  },

  swapConversionDirection: () => {
    const { conversionDirection } = get();
    const newDirection = conversionDirection === 'troToSellas' ? 'sellasToTro' : 'troToSellas';
    if (newDirection === 'troToSellas') {
      set({ selectedItems: [] });
    }
    set({ conversionDirection: newDirection, troAmount: '', result: 0 });
  },
}));
