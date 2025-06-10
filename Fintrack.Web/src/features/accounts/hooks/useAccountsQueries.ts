import { useQuery } from '@tanstack/react-query'
import { mockAccounts } from '../data/accounts-mock.data'

function useAccountsGet() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockAccounts
    },
  })
}

export { useAccountsGet }
