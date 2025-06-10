import { AccountType } from '@/types/account'
import { z } from 'zod'

export const accountMutationScheme = z.object({
  name: z.string().min(1),
  balance: z.number(),
  currencyCode: z.string(),
  description: z.string().optional(),
  type: z.nativeEnum(AccountType),
})

export type AccountMutation = z.infer<typeof accountMutationScheme>
