import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'
import NotFoundError from '@/features/not-found-error'
import { NavigationProgress } from '@/components/navigation-progress'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NavigationProgress />
      <Outlet />
      <TanStackRouterDevtools />
      <TanstackQueryLayout />
    </>
  ),
  notFoundComponent: NotFoundError,
})
