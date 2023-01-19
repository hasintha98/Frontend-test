import { CButton, CCol, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import React from 'react'

const ExportModel = ({visible, onClose}) => {
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
            >

                <p
                    className='fs-3'>
                    Export
                </p>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="period" className="col-sm-2 col-form-label">Period</CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect id="period" aria-label="Default select example">
                            <option>Last Week</option>
                            <option value="1">Last Month</option>
                            <option value="2">Last Year</option>

                        </CFormSelect>
                    </CCol>
                </CRow>

                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        color="success"
                        style={{ color: '#fff', width: "100%" }}
                        onClick={() => onClose(false)}>
                        Download
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

export default ExportModel