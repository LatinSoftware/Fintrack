import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Separator } from '@radix-ui/react-separator'
import {
  IconCoins,
  IconReceipt,
  IconWallet,
  IconReportMoney,
} from '@tabler/icons-react'
import { Outlet } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import SidebarNav from './components/sidebar-nav'

export default function Settings() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1">
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}

const sidebarNavItems = [
  {
    title: 'Income Categories',
    icon: <IconCoins size={18} />,
    href: '/settings',
  },
  {
    title: 'Expense Categories',
    icon: <IconReceipt size={18} />,
    href: '/settings/expense-categories',
  },
  {
    title: 'Accounts',
    icon: <IconWallet size={18} />,
    href: '/settings/accounts',
  },
  {
    title: 'Budget',
    icon: <IconReportMoney size={18} />,
    href: '/settings/budgets',
  },
]
