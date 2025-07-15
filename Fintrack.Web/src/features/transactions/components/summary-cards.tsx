import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { TransactionType } from '@/types/transactions'
import { DollarSignIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

interface SummaryCardsProps {
  isLoading: boolean
  totals: {
    income: number
    expenses: number
    net: number
  }
  filteredTransactions: Array<{ type: TransactionType }>
}

function SummaryCards({
  isLoading,
  totals,
  filteredTransactions,
}: SummaryCardsProps) {
  return (
    <>
      {/* Income Card */}
      <Card className="group gap-0 hover:shadow-xl transition-all duration-300 border-emerald-200/50 dark:border-emerald-800/50 hover:border-emerald-300 dark:hover:border-emerald-700 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/30 dark:to-emerald-900/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <TrendingUpIcon className="h-4 w-4" />
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                $
                {totals.income.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
                +
                {
                  filteredTransactions.filter(
                    (t) => t.type === TransactionType.Income,
                  ).length
                }{' '}
                transactions
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Expenses Card */}
      <Card className="group gap-0 hover:shadow-xl transition-all duration-300 border-red-200/50 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-950/30 dark:to-red-900/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
            <TrendingDownIcon className="h-4 w-4" />
            Total Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 tracking-tight">
                $
                {totals.expenses.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">
                -
                {
                  filteredTransactions.filter(
                    (t) => t.type === TransactionType.Expense,
                  ).length
                }{' '}
                transactions
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Net Balance Card */}
      <Card className="group gap-0 hover:shadow-xl transition-all duration-300 border-primary/30 hover:border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-primary flex items-center gap-2">
            <DollarSignIcon className="h-4 w-4" />
            Net Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
          ) : (
            <>
              <p
                className={`text-3xl font-bold tracking-tight ${
                  totals.net >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                $
                {Math.abs(totals.net).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p
                className={`text-xs mt-1 ${
                  totals.net >= 0
                    ? 'text-emerald-600/70 dark:text-emerald-400/70'
                    : 'text-red-600/70 dark:text-red-400/70'
                }`}
              >
                {totals.net >= 0 ? 'Surplus' : 'Deficit'}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default SummaryCards
