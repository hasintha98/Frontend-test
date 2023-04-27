import { CButton, CContainer, CNavbar, CNavbarBrand } from '@coreui/react'
import React, { useState } from 'react'
import LoadingModel from './Models/LoadingModel'
import LoginModel from './Models/LoginModel'

const NavBar = () => {
    const [loginVisible, setLoginVisible] = useState(false)

    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
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
                    onClick={() => setLoginVisible(true)}
                    first style={{ color: "#FEFDFE", backgroundColor: '#21292B', marginRight: "15px" }}>
                    LOGIN
                </CButton>
            </CContainer>
            <LoginModel visible={loginVisible}
                onClose={(val) => setLoginVisible(val)}
                isLoading={(val) => setLoading(val)}
                loadingMsg={(val) => setLoadingMsg(val)} />
            <LoadingModel
                visible={loading}
                loadingMsg={loadingMsg}
                onClose={(val) => setLoading(val)}
                padding={"13%"}
                height={"330px" }
            />
        </CNavbar>
    )

}

export default NavBar