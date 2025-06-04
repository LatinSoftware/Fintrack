/**
 * account type
 */
export enum AccountType {
  Bank = 'bank',
  Cash = 'cash',
  CreditCard = 'credit_card',
}

export interface Account {
  id: string
  /**
   * current amount
   */
  balance: number
  /**
   * ISO 4217
   */
  currencyCode: string
  description?: null | string
  name: string
  type: AccountType
}
