import { useAccount } from '../context/account-context'
import AccountMutateDrawer from './account-mutate-drawer'

function AccountDialog() {
  const { open, setOpen } = useAccount()

  return (
    <>
      <AccountMutateDrawer
        key="account-create"
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />
    </>
  )
}

export { AccountDialog }
