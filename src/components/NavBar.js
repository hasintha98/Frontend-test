import { CButton, CContainer, CNavbar, CNavbarBrand } from '@coreui/react'
import React from 'react'

const NavBar = () => {
    return (
        <CNavbar
            style={{ height: "80px", backgroundColor: "#414A4E" }}
            colorScheme="dark"
            expand="xxl">
            <CContainer fluid>
                <CNavbarBrand
                    className="mb-0 m-1 h1 ">
                    <h4
                        style={{ fontWeight: 700, fontSize: "2em" }}>
                        <span style={{ color: '#00965E', marginRight: '10px' }}>Riviruply</span>
                        <span style={{ color: '#fff' }}>Inventory</span>
                    </h4>
                </CNavbarBrand>
                <CButton
                    color="dark"
                    shape="rounded-pill"
                    style={{ color: "#FEFDFE", backgroundColor: '#21292B', marginRight: "15px" }}>
                    LOGIN
                </CButton>
            </CContainer>
        </CNavbar>
    )

}

export default NavBar