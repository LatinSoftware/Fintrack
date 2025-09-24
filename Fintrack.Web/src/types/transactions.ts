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

export interface TransactionMutate {
  amount: string
  type: TransactionType
  categoryId: string
  description: string
  originAccountId: string
  transactionDate: Date
  note?: string
}

export enum TransactionType {
  Expense = 'expense',
  Income = 'income',
}
