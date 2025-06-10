import ContentSection from '../../components/content-section'
import { AccountProvider } from '../context/account-context'
import { DataTable } from '@/components/datatable/data-table'

import { accountColumns } from '../components/columns'
import DataTableHeader from '../components/data-table-header'
import { AccountDialog } from '../components/account-dialogs'
import { useAccountsGet } from '@/features/accounts'

function AccountPage() {
  const { data = [] } = useAccountsGet()

  return (
    <AccountProvider>
      <ContentSection title="Accounts" desc="Manage your accounts">
        <>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <DataTable
              data={data}
              columns={accountColumns}
              tableHeader={<DataTableHeader />}
            />
          </div>

          <AccountDialog />
        </>
      </ContentSection>
    </AccountProvider>
  )
}

export { AccountPage }
