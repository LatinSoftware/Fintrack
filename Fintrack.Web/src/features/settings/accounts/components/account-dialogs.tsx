import { ConfirmDialog } from '@/components/confirm-dialog'
import { useAccount } from '../context/account-context'
import AccountMutateDrawer from './account-mutate-drawer'
import { showSubmittedData } from '@/utils/show-submitted-data'

function AccountDialog() {
  const { open, setOpen, currentRow, setCurrentRow } = useAccount()

  return (
    <>
      <AccountMutateDrawer
        key="account-create"
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
        currentRow={currentRow}
      />

      {currentRow && (
        <>
          <AccountMutateDrawer
            key={`account-update-${currentRow.id}`}
            open={open === 'update'}
            currentRow={currentRow}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
          />

          <ConfirmDialog
            key="task-delete"
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
              showSubmittedData(
                currentRow,
                'the following account has been deleted',
              )
              // mutate(currentRow.id || '', {
              //   onSuccess: () => {
              //     showSubmittedData(
              //       currentRow,
              //       'the following account has been deleted',
              //     )
              //   },

              //   onSettled: () => {
              //     setCurrentRow(null)
              //   },
              // })
            }}
            className="max-w-md"
            title={`Delete this account: ${currentRow.name} ?`}
            desc={
              <>
                You are about to delete a account{' '}
                <strong>{currentRow.name}</strong>. <br />
                This action cannot be undone
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  )
}

export { AccountDialog }
