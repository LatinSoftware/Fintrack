import { useTransaction } from '../context/transaction-context'
import { TransactionMutateDrawer } from './transaction-mutate-drawer'

export function TransactionDialogs() {
  const { open, category, account, setOpen, currentRow } = useTransaction()

  return (
    <>
      <TransactionMutateDrawer
        key="transaction-create"
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
        categories={category.data}
        accounts={account.data}
      />

      {currentRow && (
        <TransactionMutateDrawer
          key={`transaction-update-${currentRow.id}`}
          open={open === 'update'}
          onOpenChange={() => setOpen('update')}
          categories={category.data}
          accounts={account.data}
          currentRow={currentRow}
        />
      )}
    </>
  )
}
