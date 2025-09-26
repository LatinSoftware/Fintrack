import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type { Account } from '@/types'

function useAccountsGet() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      return api.get<Account[]>('/accounts')
    },
  })
}

export { useAccountsGet }
