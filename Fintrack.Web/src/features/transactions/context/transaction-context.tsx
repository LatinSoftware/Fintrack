import { useAccountsGet } from '@/features/accounts'
import { useGetCategories } from '@/features/settings/categories'

import useDialogState from '@/hooks/use-dialog-state'
import type { Account, Category, Transaction } from '@/types'
import React, { useState } from 'react'

type TransactionDialogType = 'create' | 'update' | 'delete' | 'import'

interface TransactionContextType {
  open: TransactionDialogType | null
  setOpen: (str: TransactionDialogType | null) => void
  currentRow: Transaction | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Transaction | null>>
  category: {
    loading: boolean
    data: Category[]
    error: Error | null
  }
  account: {
    loading: boolean
    data: Account[]
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
  const {
    data: accounts = [],
    isFetching: isAccountLoading,
    error: accountError,
  } = useAccountsGet()

  return (
    <TransactionContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        category: { loading: isFetching, data: data || [], error },
        account: {
          data: accounts,
          loading: isAccountLoading,
          error: accountError,
        },
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
