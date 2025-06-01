import ContentSection from '../../components/content-section'
import { AccountProvider } from '../context/account-context'
import { DataTable } from '@/components/datatable/data-table'
import { Type, type Account } from '../account.type'
import { accountColumns } from '../components/columns'
import DataTableHeader from '../components/data-table-header'

const data: Account[] = [
  {
    id: '1',
    name: 'Main Bank Account',
    type: Type.Bank,
    balance: 12345.67,
    currencyCode: 'USD',
    description: 'This is the main checking account',
  },
  {
    id: '2',
    name: 'Wallet',
    type: Type.Cash,
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
        </>
      </ContentSection>
    </AccountProvider>
  )
}

export { AccountPage }
