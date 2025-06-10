import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { AccountsTable } from '../components/account-table'
import { useAccountsGet } from '../hooks/useAccountsQueries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { AccountProvider } from '../context/account-context'

export function AccountPage() {
  const { data: accounts = [], isLoading } = useAccountsGet()

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0,
  )
  const totalAssets = accounts
    .filter((acc) => acc.balance > 0)
    .reduce((sum, acc) => sum + acc.balance, 0)
  const totalLiabilities = Math.abs(
    accounts
      .filter((acc) => acc.balance < 0)
      .reduce((sum, acc) => sum + acc.balance, 0),
  )
  const accountsCount = accounts.length

  return (
    <AccountProvider>
      <Header />

      <Main>
        <div className="flex items-center justify-between mb-10 pt-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Accounts
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              View and visualize all your accounts.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="gap-2">
              <IconPlus size={18} />
              New Account
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Total Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {accountsCount}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold tracking-tight ${
                  totalBalance >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                $
                {Math.abs(totalBalance).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                Total Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                $
                {totalAssets.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-border/40 bg-card/60 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                Total Liabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-red-600 dark:text-red-400">
                $
                {totalLiabilities.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pb-10">
          <AccountsTable accounts={accounts} />
        </div>
      </Main>
    </AccountProvider>
  )
}
