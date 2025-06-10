import { Button } from '@/components/ui/button'
import { useAccount } from '../context/account-context'
import { PlusIcon } from 'lucide-react'

function AccountCreateButton() {
  const { setOpen } = useAccount()
  return (
    <Button
      className="space-x-1"
      onClick={() => {
        setOpen('create')
      }}
    >
      <span>Create Account</span> <PlusIcon size={18} />
    </Button>
  )
}

export { AccountCreateButton }
