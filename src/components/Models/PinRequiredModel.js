import { CButton, CFormInput, CModal, CModalBody } from '@coreui/react'
import React from 'react'

const PinRequiredModel = ({ visible, onClose }) => {
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
                style={{ textAlign: "center" }}>
                <span
                    style={{ fontSize: '5em', color: '#C55A11' }}
                    className="material-symbols-outlined">
                    warning
                </span>
                <p
                    className='fs-3'>
                    Pin Required!
                </p>
      
                <p
                    style={{ fontSize: '0.8em', marginBottom: '5px' }}>
                    To continue please enter admin pin code and press Enter key
                </p>
                <div
                    className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <CFormInput
                        style={{ backgroundColor: '#F2F2F2' }}
                        type="number"
                        autoFocus
                        id="qty" />
                    <CButton
                        color="danger"
                        style={{ backgroundColor: '#FF5B5B', color: '#fff' }}
                        onClick={() => onClose(false)}>
                        Cancel
                    </CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default PinRequiredModel