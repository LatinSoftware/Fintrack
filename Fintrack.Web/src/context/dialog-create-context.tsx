import useDialogState from '@/hooks/use-dialog-state'
import React, { useState } from 'react'

type DialogType = 'create' | 'update' | 'delete'

interface EntityContextType<T> {
  open: DialogType | null
  setOpen: (str: DialogType | null) => void
  currentRow: T | null
  setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>
}

const EntityContext = React.createContext<EntityContextType<any> | null>(null)

interface Props {
  children: React.ReactNode
}

export function createEntityProvider<T>() {
  return function EntityProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<DialogType>(null)
    const [currentRow, setCurrentRow] = useState<T | null>(null)

    return (
      <EntityContext value={{ open, setOpen, currentRow, setCurrentRow }}>
        {children}
      </EntityContext>
    )
  }
}

export function useEntity<T>() {
  const entityContext = React.useContext(
    EntityContext,
  ) as EntityContextType<T> | null
  if (!entityContext) {
    throw new Error('useEntity must be used within an EntityProvider')
  }
  return entityContext
}
