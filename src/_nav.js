import React from 'react'

import { CNavItem } from '@coreui/react'

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
    component: CNavItem,
    name: 'Inventory',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon" >
      manage_search
    </span>,
  },
  {
    component: CNavItem,
    name: 'Sales Orders',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
      trolley
    </span>,
  },
  {
    component: CNavItem,
    name: 'Invoices',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
      export_notes
    </span>,
  },
  {
    component: CNavItem,
    name: 'Purchase Orders',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
      inventory
    </span>,
  }

]
export const _midNav = [
  {
    component: CNavItem,
    name: 'Customers',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
    reviews
    </span>,
  },
  {
    component: CNavItem,
    name: 'Vendors',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
    storefront
    </span>,
  },
  {
    component: CNavItem,
    name: 'User Accounts',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
    groups
    </span>,
  },
]

export const _bottomNav = [
  {
    component: CNavItem,
    name: 'Reports',
    to: '/',
    icon: <span className="material-symbols-outlined nav-icon">
    chart_data
    </span>,
  },
  
]


export default _nav

