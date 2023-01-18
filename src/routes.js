import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Production = React.lazy(() => import('./views/dashboard/Production'))
const AddProduction = React.lazy(() => import('./views/dashboard/AddProduction'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/production', name: 'Production', element: Production },
  { path: '/production/add', name: 'Production-Add', element: AddProduction }
]

export default routes
