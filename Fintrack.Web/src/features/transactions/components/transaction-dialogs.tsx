import { ConfirmDialog } from '@/components/confirm-dialog'
import { useTransaction } from '../context/transaction-context'
import { TransactionMutateDrawer } from './transaction-mutate-drawer'
import { useTransactionMutation } from '../hooks/useTransactionMutation'
import { showSubmittedData } from '@/utils/show-submitted-data'

export function TransactionDialogs() {
  const { open, category, account, setOpen, currentRow, setCurrentRow } =
    useTransaction()

  const { remove, isLoading: isRemoving } = useTransactionMutation()

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
        <>
          <TransactionMutateDrawer
            key={`transaction-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            categories={category.data}
            accounts={account.data}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key={`transaction-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              remove(currentRow.id || '', {
                onSuccess: () => {
                  showSubmittedData(
                    currentRow,
                    'the following category has been deleted',
                  )
                },

                onSettled: () => {
                  setCurrentRow(null)
                },
              })
            }}
            className="max-w-md"
            title={`Delete this transaction ?`}
            desc={
              <>
                You are about to delete a transaction{' '}
                {/* <strong>{currentRow.name}</strong>. <br /> */}
                This action cannot be undone
              </>
            }
            isLoading={isRemoving}
            confirmText="Delete"
          />
        </>
      )}
    </>
  )
}
