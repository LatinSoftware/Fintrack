import { useTransaction } from '../context/transaction-context'
import { TransactionMutateDrawer } from './transaction-mutate-drawer'

export function TransactionDialogs() {
  const { open, category, account, setOpen } = useTransaction()

  return (
    <>
      <TransactionMutateDrawer
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
        categories={category.data}
        accounts={account.data}
      />
    </>
  )
}
