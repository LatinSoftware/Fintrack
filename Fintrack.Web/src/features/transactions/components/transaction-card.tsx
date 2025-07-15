import { Card, CardContent } from '@/components/ui/card'
import { TransactionType, type Transaction } from '@/types/transactions'
import { format } from 'date-fns'
import { Clock, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const isIncome = transaction.type === TransactionType.Income
  const amountColor = isIncome
    ? 'text-emerald-600 dark:text-emerald-400'
    : 'text-red-600 dark:text-red-400'
  const bgColor = isIncome
    ? 'bg-emerald-50/80 dark:bg-emerald-950/30'
    : 'bg-red-50/80 dark:bg-red-950/30'
  const borderColor = isIncome
    ? 'border-emerald-200/60 dark:border-emerald-800/60'
    : 'border-red-200/60 dark:border-red-800/60'
  const sign = isIncome ? '+' : '-'

  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border ${borderColor} ${bgColor} hover:scale-[1.02] backdrop-blur-sm`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <div
              className={`p-2 sm:p-3 rounded-xl ${isIncome ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-red-100 dark:bg-red-900/50'} transition-colors flex-shrink-0`}
            >
              {isIncome ? (
                <TrendingUpIcon
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${amountColor}`}
                />
              ) : (
                <TrendingDownIcon
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${amountColor}`}
                />
              )}
            </div>

            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <h3 className="font-semibold text-base sm:text-lg leading-tight text-foreground group-hover:text-primary transition-colors truncate">
                  {transaction.description || `${transaction.type} Transaction`}
                </h3>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p
                    className={`text-xl sm:text-2xl font-bold ${amountColor} tracking-tight`}
                  >
                    {sign}
                    {transaction.currencyCode}
                    {Math.abs(transaction.amount).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">
                    {format(
                      transaction.transactionDate,
                      'MMM dd, yyyy • HH:mm',
                    )}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-xs font-medium uppercase tracking-wide self-start sm:self-auto ${
                    isIncome
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                  }`}
                >
                  {transaction.type}
                </span>
              </div>

              {transaction.note && (
                <p className="text-xs sm:text-sm text-muted-foreground bg-background/60 p-2 sm:p-3 rounded-lg border border-border/40 break-words">
                  {transaction.note}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
