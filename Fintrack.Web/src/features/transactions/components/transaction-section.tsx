import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { TransactionType, type Transaction } from '@/types/transactions'
import {
  DollarSignIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  type LucideIcon,
} from 'lucide-react'
import * as React from 'react'
import { TransactionCard } from './transaction-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'

interface TransactionSectionProps {
  selectedDate: Date
  activeTab: string
  setActiveTab: (tab: string) => void
  isLoading: boolean
  error: any
  displayedTransactions: Transaction[]
  filteredTransactions: Transaction[]
}

export function TransactionSection({
  isLoading,
  error,
  displayedTransactions,
  filteredTransactions,
  selectedDate,
  activeTab,
  setActiveTab,
}: TransactionSectionProps) {
  const renderTabContent = (
    value: string,
    emptyIcon: LucideIcon,
    emptyTitle: string,
    emptyDescription: string,
  ) => {
    return (
      <TabsContent value={value} className="animate-in fade-in-50">
        {displayedTransactions.length === 0 ? (
          <div className="text-center py-16">
            <div
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
                {
                  'bg-emerald-100 dark:bg-emerald-900/30': value === 'income',
                  'text-red-600 dark:text-red-400': value === 'expenses',
                  'text-muted-foreground': value === 'all',
                },
              )}
            >
              {React.createElement(emptyIcon, {
                className: `h-8 w-8 ${
                  value === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : value === 'expenses'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-muted-foreground'
                }`,
              })}
            </div>
            <p className="text-lg font-medium text-muted-foreground">
              {emptyTitle}
            </p>
            <p className="text-sm text-muted-foreground/70">
              {emptyDescription}
            </p>
          </div>
        ) : (
          <div>
            <ScrollArea className="h-[600px] w-full rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm">
              <div className="space-y-4 p-6">
                {displayedTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="animate-in fade-in-50 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TransactionCard transaction={transaction} />
                  </div>
                ))}
                <div className="h-4" />
              </div>
            </ScrollArea>
          </div>
        )}
      </TabsContent>
    )
  }

  return (
    <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm py-0 ">
      <CardHeader className="border-b border-border/50 bg-muted/30 pt-6 ">
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full"></div>
            Transactions for {format(selectedDate, 'MMMM dd, yyyy')}
          </span>
          <div className="text-sm font-normal text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {isLoading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              `${displayedTransactions.length} transactions`
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="all"
              className="transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
            >
              All {isLoading ? '' : `(${filteredTransactions.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
            >
              Income{' '}
              {isLoading
                ? ''
                : `(${filteredTransactions.filter((t) => t.type === TransactionType.Income).length})`}
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
            >
              Expenses{' '}
              {isLoading
                ? ''
                : `(${filteredTransactions.filter((t) => t.type === TransactionType.Expense).length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="animate-in fade-in-50">
            {isLoading ? (
              <ScrollArea className="h-[600px] w-full rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm">
                {/* <TransactionListSkeleton /> */}
              </ScrollArea>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSignIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  Error loading transactions
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Please try again later
                </p>
              </div>
            ) : displayedTransactions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSignIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  No transactions found
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Try selecting a different date
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[600px] w-full rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm">
                <div className="space-y-4 p-6">
                  {displayedTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className="animate-in fade-in-50 slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TransactionCard transaction={transaction} />
                    </div>
                  ))}
                  <div className="h-4" />
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          {renderTabContent(
            'income',
            TrendingUpIcon,
            'No income transactions',
            'No income recorded for this date',
          )}

          {renderTabContent(
            'expenses',
            TrendingDownIcon,
            'No expense transactions',
            'No expenses recorded for this date',
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
