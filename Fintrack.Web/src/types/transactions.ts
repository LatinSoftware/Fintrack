export interface Transaction {
  id: string
  currencyCode: string
  amount: number
  type: TransactionType
  note: null | string
  description?: null | string
  transactionDate: Date

  category: {
    id: string
    name: string
  }

  originAccount: {
    id: string
    name: string
  }

  createdAt: Date
}

export interface TransactionMutate {
  amount: string
  type: TransactionType
  categoryId: string
  originAccountId: string
  transactionDate: Date
  note: string
  description?: string
}

export enum TransactionType {
  Expense = 'expense',
  Income = 'income',
}
