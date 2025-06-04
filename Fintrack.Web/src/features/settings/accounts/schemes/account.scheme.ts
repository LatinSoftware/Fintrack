import { z } from 'zod'
import { AccountType } from '../account.type'

export const accountMutationScheme = z.object({
  name: z.string().min(1),
  balance: z.number(),
  currencyCode: z.string(),
  description: z.string().optional(),
  type: z.nativeEnum(AccountType),
})

export type AccountMutation = z.infer<typeof accountMutationScheme>
