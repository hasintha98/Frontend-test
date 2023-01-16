import { CAlert, CButton, CCol, CFormInput, CFormLabel, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useState } from 'react'
import LastRecordFooter from 'src/components/LastRecordFooter'
import NavBar from 'src/components/NavBar'

const AddNewRecordLayout = () => {
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <NavBar />
            <CAlert
                color="success"
                style={{ textAlign: "center" }}
                dismissible
            >
                Production <strong>#5752</strong> Recorded Successfully
            </CAlert>
            <CRow>
                <CCol
                    className='add_header mt-5'
                    style={{ textAlign: 'center', fontSize: '2.5em' }}
                >
                    Add New Production Record
                </CCol>
            </CRow>

            <CRow className="mt-5">
                <CCol></CCol>
                <CCol>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="date" className="col-sm-2 col-form-label">Date</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="date"
                                id="date" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="size" className="col-sm-2 col-form-label">Size</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="text"
                                id="size" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="type" className="col-sm-2 col-form-label">Type</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="text"
                                id="type" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-4">
                        <CFormLabel htmlFor="qty" className="col-sm-2 col-form-label">Qty</CFormLabel>
                        <CCol sm={10}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="number"
                                id="qty" />
                        </CCol>
                    </CRow>
                    <div className="mt-5 d-flex flex-row-reverse" >
                        <CButton
                            onClick={() => setVisible(!visible)}
                            color="success"
                            shape="rounded-pill"
                            style={{ color: "#fff", backgroundColor: '#00B050', paddingRight: "30px", paddingLeft: "30px", fontSize: "0.9em", fontWeight: "700" }}
                        >
                            SUBMIT
                        </CButton>
                    </div>
                </CCol>
                <CCol></CCol>
            </CRow>
            <LastRecordFooter />
            <CModal
                style={{ marginTop: "30%", padding: "5%" }}
                visible={visible}
                onClose={() => setVisible(false)}>
                <CModalBody
                    style={{ textAlign: "center" }}>
                    <span
                        style={{ fontSize: '5em', color: '#C55A11' }}
                        className="material-symbols-outlined">
                        warning
                    </span>
                    <p
                        className='fs-3'>
                        Are you sure?
                    </p>
                    <p
                        style={{ color: '#00B050' }}>
                        9mm LO/EVR : 25
                    </p>
                    <p
                        style={{ fontSize: '0.8em' }}>
                        To continue please enter admin pin code and press Enter key
                    </p>
                    <div
                        className='d-grid gap-2 d-md-flex justify-content-md-center'>
                        <CFormInput
                            style={{ backgroundColor: '#F2F2F2' }}
                            type="number"
                            id="qty" />
                        <CButton
                            color="danger"
                            style={{backgroundColor: '#FF5B5B', color: '#fff'}}
                            onClick={() => setVisible(false)}>
                            Cancel
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    )
}

export default AddNewRecordLayout