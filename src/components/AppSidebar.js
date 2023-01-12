import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation, { _bottomNav, _midNav } from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      className="bg-sidebar"
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex bg-sidebar-header-left" to="/">
        <h4 style={{fontWeight: 700}}><span style={{color: '#00965E'}}>Riviruply</span> <span style={{color: '#2C363B'}}>Inventory</span></h4>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav className="bg-sidebar-row" items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav className="bg-sidebar-row" items={_midNav} />
          <br /><br /><br /><br />
          <AppSidebarNav className="bg-sidebar-row" items={_bottomNav} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav className="bg-sidebar-row" items={_bottomNav} />
        </SimpleBar>
      </CSidebarNav> */}
      
   
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
