import {
  IconBook2,
  IconBrowserCheck,
  IconChartArcs,
  IconCoins,
  IconHelp,
  IconLayoutDashboard,
  IconNotification,
  IconPalette,
  IconReceipt,
  IconRefresh,
  IconReportMoney,
  IconSettings,
  IconTarget,
  IconTool,
  IconTrendingUp,
  IconUserCog,
  IconWallet,
} from '@tabler/icons-react'

import type { SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'caonabo mena',
    email: 'camena@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },

  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Transactions',
          url: '/transactions',
          icon: IconBook2,
        },
        {
          title: 'Accounts',
          url: '/accounts',
          icon: IconWallet,
        },
        {
          title: 'Stats',
          url: '/stats',
          badge: '3',
          icon: IconChartArcs,
        },
        {
          title: 'Recurring',
          url: '/recurring',
          icon: IconRefresh,
        },
        {
          title: 'Goals',
          url: '/goals',
          icon: IconTarget,
        },
        {
          title: 'Investments',
          url: '/investments',
          icon: IconTrendingUp,
        },
      ],
    },

    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Income Category settings',
              url: '/settings/income-categories',
              icon: IconCoins,
            },
            {
              title: 'Expenses Category settings',
              url: '/settings/expense-categories',
              icon: IconReceipt,
            },
            {
              title: 'Accounts settings',
              url: '/settings/accounts',
              icon: IconWallet,
            },
            {
              title: 'Budget settings',
              url: '/settings/budgets',
              icon: IconReportMoney,
            },
           
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
