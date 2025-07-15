export interface Transaction {
  amount: number
  categoryId: string
  createdAt: Date
  currencyCode: string
  description?: null | string
  id: string
  note?: null | string
  originAccountId: string
  transactionDate: Date
  type: TransactionType
  [property: string]: any
}

export enum TransactionType {
  Expense = 'expense',
  Income = 'income',
}
