import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Production = React.lazy(() => import('./views/dashboard/Production'))
const AddProduction = React.lazy(() => import('./views/dashboard/AddProduction'))
const EditProduction = React.lazy(() => import('./views/dashboard/EditProduction'))
const Inventory = React.lazy(() => import('./views/dashboard/Inventory'))
const RawRecords = React.lazy(() => import('./views/dashboard/RawRecords'))
const SalesOrder = React.lazy(() => import('./views/dashboard/SalesOrder'))
const NewSalesOrder = React.lazy(() => import('./views/dashboard/NewSalesOrder'))
const Customers = React.lazy(() => import('./views/dashboard/Customers'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/production', name: 'Production', element: Production },
  { path: '/production/add', name: 'Production-Add', element: AddProduction },
  { path: '/production/edit', name: 'Production-edit', element: EditProduction },
  { path: '/inventory', name: 'Inventory', element: Inventory },
  { path: '/raw', name: 'Raw-Records', element: RawRecords },
  { path: '/sales', name: 'Sales-Order', element: SalesOrder },
  { path: '/sales/new', name: 'Sales-Order-new', element: NewSalesOrder },
  { path: '/customers', name: 'Customers', element: Customers }
]

export default routes
