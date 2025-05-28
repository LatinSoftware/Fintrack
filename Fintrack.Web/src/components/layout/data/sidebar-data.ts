import {
  IconBook2,
  IconChartArcs,
  IconCoins,
  IconHelp,
  IconLayoutDashboard,
  IconReceipt,
  IconRefresh,
  IconReportMoney,
  IconSettings,
  IconTarget,
  IconTrendingUp,
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
              title: 'Income Category',
              url: '/settings',
              icon: IconCoins,
            },
            {
              title: 'Expenses Category',
              url: '/settings/expense-categories',
              icon: IconReceipt,
            },
            {
              title: 'Accounts',
              url: '/settings/accounts',
              icon: IconWallet,
            },
            {
              title: 'Budget',
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
