/**
 * account type
 */
export enum AccountType {
  Bank = 'bank',
  Cash = 'cash',
  CreditCard = 'credit_card',
  Investment = 'investment',
  Savings = 'savings',
  Checking = 'checking',
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
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export const AccountTypeLabels: Record<AccountType, string> = {
  [AccountType.Checking]: 'Checking',
  [AccountType.Savings]: 'Savings',
  [AccountType.CreditCard]: 'Credit Card',
  [AccountType.Investment]: 'Investment',
  [AccountType.Cash]: 'Cash',
  [AccountType.Bank]: 'Bank',
}
