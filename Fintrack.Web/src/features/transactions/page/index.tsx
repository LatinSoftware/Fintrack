import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { DateSelector } from '../components/date-selector'
import { useMemo, useState } from 'react'
import SummaryCards from '../components/summary-cards'
import { TransactionSection } from '../components/transaction-section'
import { useGetTransaction } from '../hooks/useGetTransaction'
import { TransactionType } from '@/types/transactions'
import TransactionProvider from '../context/transaction-context'
import { TransactionDialogs } from '../components/transaction-dialogs'

export function Transactions() {
  return (
    <TransactionProvider>
      <Transaction />
    </TransactionProvider>
  )
}

export function Transaction() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState<string>('all')

  const { transactions, isLoading, error } = useGetTransaction(selectedDate)

  // Further filter by transaction type based on active tab
  const displayedTransactions = useMemo(() => {
    if (activeTab === 'income') {
      return transactions.filter((t) => t.type === TransactionType.Income)
    }
    if (activeTab === 'expenses') {
      return transactions.filter((t) => t.type === TransactionType.Expense)
    }
    return transactions
  }, [transactions, activeTab])

  // Calculate totals
  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === TransactionType.Income)
      .reduce((sum, t) => sum + t.amount, 0)

    const expenses = transactions
      .filter((t) => t.type === TransactionType.Expense)
      .reduce((sum, t) => sum + t.amount, 0)

    return { income, expenses, net: income - expenses }
  }, [transactions])

  return (
    <>
      <Header />
      <Main>
        <div className="flex items-center justify-between mb-10 pt-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transactions
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Track your daily transactions with precision and clarity
            </p>
          </div>
        </div>

        <div className="grid gap-8 mb-10">
          <div className="grid gap-6 lg:grid-cols-4">
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            <SummaryCards
              isLoading={false}
              totals={totals}
              filteredTransactions={transactions}
            />
          </div>

          <TransactionSection
            selectedDate={selectedDate}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoading={isLoading}
            error={error}
            displayedTransactions={displayedTransactions}
            filteredTransactions={transactions}
          />
        </div>
      </Main>
      <TransactionDialogs />
    </>
  )
}
