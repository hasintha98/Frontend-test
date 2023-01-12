import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


import addIcon  from 'src/assets/images/add.PNG'
const AppHeader = () => {
  return (
    <CHeader position="sticky" className="mb-4 bg-header">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
        
        >
           <img src={addIcon} height={"40px"} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex d-justify-content-end me-auto">

        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Admin
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <span className="material-symbols-sharp">
                settings
              </span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <span className="material-symbols-sharp">
                info
              </span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <span className="material-symbols-sharp">
                account_circle
              </span>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
     
      </CContainer>


    </CHeader>
  )
}

export default AppHeader
