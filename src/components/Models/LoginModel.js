import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import AuthService from 'src/services/AuthService'
import swal from 'sweetalert'

const LoginModel = ({ visible, onClose, isLoading, loadingMsg }) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    // const [product, setProduct] = useState(second)
    // isLoading(true)
    const login = () => {

        if (!username) {
            return
        }

        if (!password) {
            return
        }
        isLoading(true)
        loadingMsg("Logging In...")
        AuthService.login(username, password)
            .then(response => {
                swal("Success!", "Login Successfully", "success");
                onClose(false)
                window.location.reload(false);
                isLoading(false)
                loadingMsg(null)
            }).catch(error => {
                console.log(error.response.data.message)
                isLoading(false)
                loadingMsg(null)
                swal("Error!", error.response.data.message, "error");

            })


    }

    return (
        <>
            <CModal
                style={{ marginTop: "30%", padding: "5%", textAlign: 'center', alignItems: 'center', display: 'flex' }}
                visible={visible}
                onClose={() => onClose(false)}>
                <CModalBody
                >
                    <p
                        className='fs-3'>
                        Login
                    </p>

                    <CRow className="mt-4">
                        <CFormInput id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} aria-label="Default select example" />
                    </CRow>
                    <CRow className="mt-4">
                        <CFormInput id="was" label="Password" type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Default select example" />
                    </CRow>

                    <div
                        className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                        <CButton
                            color="success"
                            style={{ color: '#fff', width: "100%" }}
                            onClick={() => login()}>
                            Login
                        </CButton>
                        <CButton
                            color="danger"
                            style={{ backgroundColor: '#FF5B5B', color: '#fff', width: "100%" }}
                            onClick={() => onClose(false)}>
                            Cancel
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>

        </>
    )
}

export default LoginModel