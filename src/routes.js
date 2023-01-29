import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Production = React.lazy(() => import('./views/dashboard/Production'))
const AddProduction = React.lazy(() => import('./views/dashboard/AddProduction'))
const EditProduction = React.lazy(() => import('./views/dashboard/EditProduction'))
const Inventory = React.lazy(() => import('./views/dashboard/Inventory'))
const PlyWood = React.lazy(() => import('./views/dashboard/PlyWood'))
const Other = React.lazy(() => import('./views/dashboard/Other'))
const AddPlywoodType = React.lazy(() => import('./views/dashboard/AddPlywoodType'))
const RawRecords = React.lazy(() => import('./views/dashboard/RawRecords'))
const SalesOrder = React.lazy(() => import('./views/dashboard/SalesOrder'))
const NewSalesOrder = React.lazy(() => import('./views/dashboard/NewSalesOrder'))
const ViewSalesOrder = React.lazy(() => import('./views/dashboard/ViewSalesOrder'))
const Invoices = React.lazy(() => import('./views/dashboard/Invoices'))
const NewInvoice = React.lazy(() => import('./views/dashboard/NewInvoice'))
const ViewInvoice = React.lazy(() => import('./views/dashboard/ViewInvoice'))
const Shipments = React.lazy(() => import('./views/dashboard/Shipments'))
const NewShipment = React.lazy(() => import('./views/dashboard/NewShipment'))
const ViewShipment = React.lazy(() => import('./views/dashboard/ViewShipment'))
const CreditMemos = React.lazy(() => import('./views/dashboard/CreditMemos'))
const NewMemo = React.lazy(() => import('./views/dashboard/NewMemo'))
const ViewMemo = React.lazy(() => import('./views/dashboard/ViewMemo'))
const ActivityLogs = React.lazy(() => import('./views/dashboard/ActivityLogs'))
const Customers = React.lazy(() => import('./views/dashboard/Customers'))
const Vendors = React.lazy(() => import('./views/dashboard/Vendors'))
const Users = React.lazy(() => import('./views/dashboard/Users'))
const Permissions = React.lazy(() => import('./views/dashboard/Permissions'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/production', name: 'Production', element: Production },
  { path: '/production/add', name: 'Production-Add', element: AddProduction },
  { path: '/production/edit', name: 'Production-edit', element: EditProduction },
  { path: '/inventory/raw', name: 'Inventory-raw', element: Inventory },
  { path: '/inventory/plywood', name: 'Inventory-ply', element: PlyWood },
  { path: '/inventory/other', name: 'Inventory-ply', element: Other },
  { path: '/inventory/add-plywood', name: 'Inventory-Plywoord', element: AddPlywoodType },
  { path: '/raw', name: 'Raw-Records', element: RawRecords },
  { path: '/sales', name: 'Sales-Order', element: SalesOrder },
  { path: '/sales/new', name: 'Sales-Order-new', element: NewSalesOrder },
  { path: '/sales/view', name: 'Sales-Order-view', element: ViewSalesOrder },
  { path: '/invoices', name: 'Invoices', element: Invoices },
  { path: '/invoices/new', name: 'Invoices-new', element: NewInvoice },
  { path: '/invoices/view', name: 'Invoices-view', element: ViewInvoice },
  { path: '/shipments', name: 'Shipments', element: Shipments },
  { path: '/shipments/new', name: 'Shipments-new', element: NewShipment },
  { path: '/shipments/view', name: 'Shipments-view', element: ViewShipment },
  { path: '/memos', name: 'Memos', element: CreditMemos },
  { path: '/memos/new', name: 'Memos-new', element: NewMemo },
  { path: '/memos/view', name: 'Memos-view', element: ViewMemo },
  { path: '/logs', name: 'Activity-logs', element: ActivityLogs },
  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/vendors', name: 'Vendors', element: Vendors },
  { path: '/users', name: 'Users', element: Users },
  { path: '/permissions', name: 'Permissions', element: Permissions }
]

export default routes
