import { z } from 'zod'

export enum CategoryType {
  income = 'income',
  expense = 'expense',
}

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  type: z.nativeEnum(CategoryType).optional(),
})

export type Category = z.infer<typeof categorySchema>




