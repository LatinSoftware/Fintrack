export type CategoryType = 'income' | 'expense'

export interface Category {
  id: string
  name: string
  description: string
  type: CategoryType
}
