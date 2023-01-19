import { CButton, CCol, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import React from 'react'

const StockUpdateAlertModel = ({ visible, onClose }) => {
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
                style={{ textAlign: "center" }}
            >

                <p
                    className='fs-3 mb-5'>
                    Stock Update
                </p>
                <p
                    className='fs-5 mb-1'>
                    You will redirect to the production page to update the stock.
                </p>

                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        className='model-blue-button'
                        style={{ color: '#fff', width: "100%" }}
                        onClick={() => onClose(false)}>
                        Ok
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

export default StockUpdateAlertModel