import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useState } from 'react'

const PinResetModel = ({visible, onClose, role, values}) => {

    const [name, setName] = useState("")
    

    console.log(name)
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
            >

                <p
                    style={{textAlign: 'center'}}
                    className='fs-3'>
                    Pin Reset : {role}
                </p>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="oPin" className="col-sm-2 col-form-label">Old Pin</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="oPin" type='password' value={name} onChange={(e) => setName(e.target.value)} />
                        
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="nPin" className="col-sm-2 col-form-label">New Pin</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="nPin" type='password' value={name} onChange={(e) => setName(e.target.value)} />
                        
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="cPin" className="col-sm-2 col-form-label">Confirm Pin</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="cPin" type='password' value={name} onChange={(e) => setName(e.target.value)} />
                        
                    </CCol>
                </CRow>
                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        color="success"
                        style={{ color: '#fff', width: "100%" }}
                        onClick={() => onClose(false)}>
                             {/* {isEdit ? "Update" : "Save"} */}Save
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
    )
}

export default PinResetModel