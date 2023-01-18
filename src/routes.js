import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Production = React.lazy(() => import('./views/dashboard/Production'))
const AddProduction = React.lazy(() => import('./views/dashboard/AddProduction'))
const EditProduction = React.lazy(() => import('./views/dashboard/EditProduction'))
const Inventory = React.lazy(() => import('./views/dashboard/Inventory'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/production', name: 'Production', element: Production },
  { path: '/production/add', name: 'Production-Add', element: AddProduction },
  { path: '/production/edit', name: 'Production-edit', element: EditProduction },
  { path: '/inventory', name: 'Inventory', element: Inventory }
]

export default routes
