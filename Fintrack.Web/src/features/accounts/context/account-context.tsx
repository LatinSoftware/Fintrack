import {
  createEntityProvider,
  useEntity,
} from '@/context/dialog-create-context'
import type { Account } from '../account.type'

export const AccountProvider = createEntityProvider<Account>()
export const useAccount = () => useEntity<Account>()
