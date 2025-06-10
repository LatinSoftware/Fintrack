import ContentSection from '../../components/content-section'
import { AccountProvider } from '../../../accounts/context/account-context'

import { AccountDialog } from '../../../accounts/components/account-dialogs'
import { AccountsTable, useAccountsGet } from '@/features/accounts'
import { AccountCreateButton } from '@/features/accounts'

function AccountPage() {
  const { data: accounts = [] } = useAccountsGet()

  return (
    <AccountProvider>
      <ContentSection
        title="Accounts"
        desc="Manage your accounts"
        button={<AccountCreateButton />}
      >
        <>
          <AccountsTable accounts={accounts} />
          <AccountDialog />
        </>
      </ContentSection>
    </AccountProvider>
  )
}

export { AccountPage }
