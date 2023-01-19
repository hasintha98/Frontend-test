import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import React from 'react'

const StockUpdateModel = ({ visible, onClose }) => {
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
            >

                <p
                    className='fs-3'>
                    Stock Update
                </p>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="Product" className="col-sm-2 col-form-label">Product</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="Product" aria-label="Default select example" />



                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="Qty" className="col-sm-2 col-form-label">Qty</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="Qty" aria-label="Default select example" />
                    </CCol>
                </CRow>

                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        color="success"
                        style={{ color: '#fff', width: "100%" }}
                        onClick={() => onClose(false)}>
                        Update
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

export default StockUpdateModel