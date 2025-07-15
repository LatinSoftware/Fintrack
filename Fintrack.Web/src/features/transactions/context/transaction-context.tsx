import { useGetCategories } from '@/features/settings/categories/hooks'
import useDialogState from '@/hooks/use-dialog-state'
import type { Category, Transaction } from '@/types'
import React, { useState } from 'react'

type TransactionDialogType = 'create' | 'update' | 'delete' | 'import'

interface TransactionContextType {
  open: TransactionDialogType | null
  setOpen: (str: TransactionDialogType | null) => void
  currentRow: Transaction | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Transaction | null>>
  categories: {
    loading: boolean
    data: Category[]
    error: Error | null
  }
}

const TransactionContext = React.createContext<TransactionContextType | null>(
  null,
)

interface Props {
  children: React.ReactNode
}

export default function TransactionProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TransactionDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Transaction | null>(null)
  const { data, isFetching, error } = useGetCategories()

  return (
    <TransactionContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        categories: { loading: isFetching, data: data || [], error },
      }}
    >
      {children}
    </TransactionContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTransaction = () => {
  const categoryContext = React.useContext(TransactionContext)

  if (!categoryContext) {
    throw new Error('useTransaction has to be used within <TransactionContext>')
  }

  return categoryContext
}
