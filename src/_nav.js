import React from 'react'

import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <span className="material-symbols-outlined nav-icon">
      home
    </span>,
  },
  {
    component: CNavItem,
    name: 'Production',
    to: '/production',
    icon: <span className="material-symbols-outlined nav-icon">
      factory
    </span>,
  },
  {
    component: CNavGroup,
    name: 'Inventory',
    to: '/inventory',
    icon: <span className="material-symbols-outlined nav-icon" >
      manage_search
    </span>,
     items: [
      {
        component: CNavItem,
        name: 'PlyWood',
        to: '/inventory?type=plywood',
      },
      {
        component: CNavItem,
        name: 'Row Materials',
        to: '/inventory?type=raw',
      },
      {
        component: CNavItem,
        name: 'Other',
        to: '/inventory?type=other',
      },
 
    ],
  },
  {
    component: CNavItem,
    name: 'Raw Records',
    to: '/raw',
    icon: <span className="material-symbols-outlined nav-icon">
      info
    </span>,
  },
  {
    component: CNavGroup,
    name: 'Sales Orders',
    to: '/sales',
    icon: <span className="material-symbols-outlined nav-icon">
      trolley
    </span>,
     items: [
      {
        component: CNavItem,
        name: 'Orders',
        to: '/sales',
      },
      {
        component: CNavItem,
        name: 'Invoices',
        to: '/invoices',
      },
      {
        component: CNavItem,
        name: 'Shipments',
        to: '/shipments',
      },
      {
        component: CNavItem,
        name: 'Credit Memos',
        to: '/memos',
      },
 
    ],
  },
  {
    component: CNavItem,
    name: 'Purchase Orders',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
      inventory
    </span>,
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customers',
    icon: <span className="material-symbols-outlined nav-icon">
    reviews
    </span>,
  },
  {
    component: CNavItem,
    name: 'Vendors',
    to: '/vendors',
    icon: <span className="material-symbols-outlined nav-icon">
    storefront
    </span>,
  },
  {
    component: CNavItem,
    name: 'User Accounts',
    to: '/users',
    icon: <span className="material-symbols-outlined nav-icon">
    groups
    </span>,
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
    chart_data
    </span>,
  }

]



export default _nav

