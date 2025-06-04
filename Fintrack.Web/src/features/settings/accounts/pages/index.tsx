import ContentSection from '../../components/content-section'
import { AccountProvider } from '../context/account-context'
import { DataTable } from '@/components/datatable/data-table'
import { AccountType, type Account } from '../account.type'
import { accountColumns } from '../components/columns'
import DataTableHeader from '../components/data-table-header'
import { AccountDialog } from '../components/account-dialogs'

const data: Account[] = [
  {
    id: '1',
    name: 'Main Bank Account',
    type: AccountType.Bank,
    balance: 12345.67,
    currencyCode: 'USD',
    description: 'This is the main checking account',
  },
  {
    id: '2',
    name: 'Wallet',
    type: AccountType.Cash,
    balance: 200.0,
    currencyCode: 'USD',
    description: 'Cash in wallet',
  },
]

function AccountPage() {
  return (
    <AccountProvider>
      <ContentSection title="Accounts" desc="Manage your accounts">
        <>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <DataTable
              data={data ?? []}
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
