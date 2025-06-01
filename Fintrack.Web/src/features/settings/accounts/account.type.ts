export interface Account {
  /**
   * current amount
   */
  balance: number
  /**
   * ISO 4217
   */
  currencyCode: string
  description?: null | string
  id: string
  name: string
  type: Type
}

/**
 * account type
 */
export enum Type {
  Bank = 'bank',
  Cash = 'cash',
  CreditCard = 'credit_card',
}
