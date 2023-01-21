import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import React from 'react'

const SendEmailModel = ({ visible, onClose, recordId }) => {
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
                style={{ textAlign: 'center' }}
            >
                <span
                    style={{ fontSize: '5em', color: '#00965E' }}
                    className="material-symbols-outlined">
                    drafts
                </span>
                <p
                    className='fs-3'>
                    Email The Sales Order
                </p>
                <p
                    className='fs-5 mb-3'>
                    Order <span style={{ color: '#00965E' }}>{recordId}</span> will send to the customer.
                </p>
                <CRow className="mt-4">

                        <CFormLabel style={{width: "30%"}} htmlFor="email" className="col-sm-2 col-form-label">Customer Email :</CFormLabel>

                    <CCol >
                        <CFormInput id="email" type="email" aria-label="Default select example" />
                    </CCol>
                </CRow>

                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        className='blue-button'
                        style={{width: "100%" }}
                        variant="outline"
                        onClick={() => onClose(false)}>
                        Send
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

export default SendEmailModel