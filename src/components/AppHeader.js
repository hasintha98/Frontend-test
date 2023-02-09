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
import { useNavigate } from 'react-router-dom';

import addIcon from 'src/assets/images/add.PNG'
import { AppHeaderDropdown } from './header';
import AuthService from 'src/services/AuthService';
const AppHeader = () => {
  const navigate = useNavigate();
  return (
    <CHeader position="sticky" className="mb-4 bg-header">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => navigate('/add-record')}
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
          {AuthService.getCurrentUser().roles.includes("ROLE_ADMIN", "ROLE_SUPERADMIN")  && (
              <CNavItem>
                <CNavLink >
                  <span className="material-symbols-sharp" onClick={() => navigate('/permissions')} style={{ cursor: 'pointer' }}>
                    settings
                  </span>
                </CNavLink>
              </CNavItem>
            )}

          <CNavItem>
            <CNavLink href="#">
              <span className="material-symbols-sharp" style={{ cursor: 'pointer' }}>
                info
              </span>
            </CNavLink>
          </CNavItem>
          <AppHeaderDropdown />
        </CHeaderNav>


      </CContainer>


    </CHeader>
  )
}

export default AppHeader
