export const currencies = {
  USD: {
    name: 'US Dollar',
    symbol: '$',
    decimalDigits: 2,
  },
  EUR: {
    name: 'Euro',
    symbol: '€',
    decimalDigits: 2,
  },
  GBP: {
    name: 'British Pound',
    symbol: '£',
    decimalDigits: 2,
  },
  JPY: {
    name: 'Japanese Yen',
    symbol: '¥',
    decimalDigits: 0,
  },
  AUD: {
    name: 'Australian Dollar',
    symbol: 'A$',
    decimalDigits: 2,
  },
  CAD: {
    name: 'Canadian Dollar',
    symbol: 'C$',
    decimalDigits: 2,
  },
  CHF: {
    name: 'Swiss Franc',
    symbol: 'CHF',
    decimalDigits: 2,
  },
  CNY: {
    name: 'Chinese Yuan',
    symbol: '¥',
    decimalDigits: 2,
  },
  HKD: {
    name: 'Hong Kong Dollar',
    symbol: 'HK$',
    decimalDigits: 2,
  },
  MXN: {
    name: 'Mexican Peso',
    symbol: 'MX$',
    decimalDigits: 2,
  },
  BRL: {
    name: 'Brazilian Real',
    symbol: 'R$',
    decimalDigits: 2,
  },
  INR: {
    name: 'Indian Rupee',
    symbol: '₹',
    decimalDigits: 2,
  },
  RUB: {
    name: 'Russian Ruble',
    symbol: '₽',
    decimalDigits: 2,
  },
  KRW: {
    name: 'South Korean Won',
    symbol: '₩',
    decimalDigits: 0,
  },
  SGD: {
    name: 'Singapore Dollar',
    symbol: 'S$',
    decimalDigits: 2,
  },
  NZD: {
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
    decimalDigits: 2,
  },
  // Add more currencies as needed
} as const

export type CurrencyCode = keyof typeof currencies

export function getCurrencySymbol(currencyCode: CurrencyCode) {
  return currencies[currencyCode]?.symbol || currencyCode
}

export function formatCurrency(
  value: number,
  currencyCode: CurrencyCode,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    ...options,
  }).format(value)
}

// Utility to get all currency codes as array
export const currencyCodes = Object.keys(currencies) as CurrencyCode[]
