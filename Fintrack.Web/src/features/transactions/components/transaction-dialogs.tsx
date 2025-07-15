import { useTransaction } from '../context/transaction-context'
import { TransactionMutateDrawer } from './transaction-mutate-drawer'

export function TransactionDialogs() {
  const { open, categories, setOpen } = useTransaction()

  return (
    <>
      <TransactionMutateDrawer
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
        categories={categories.data}
      />
    </>
  )
}
