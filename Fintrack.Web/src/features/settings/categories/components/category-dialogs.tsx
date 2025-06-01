import { ConfirmDialog } from '@/components/confirm-dialog'

import { CategoryMutateDrawer } from './category-mutate-drawer'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { useDeleteCategory } from '../hooks'
import { useCategory } from '../context/category-context'

export function CategoryDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCategory()

  const { mutate } = useDeleteCategory()

  return (
    <>
      <CategoryMutateDrawer
        key="category-create"
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <CategoryMutateDrawer
            key={`task-update-${currentRow.id}`}
            currentRow={currentRow}
            open={open === 'update'}
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
              mutate(currentRow.id || '', {
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
            title={`Delete this category: ${currentRow.name} ?`}
            desc={
              <>
                You are about to delete a category{' '}
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
