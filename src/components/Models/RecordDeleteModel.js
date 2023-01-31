import { CButton, CFormInput, CModal, CModalBody } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import UserService from 'src/services/UserService'

const RecordDeleteModel = ({ visible, onClose, recordId }) => {
    const [pin, setPin] = useState("")
    const authenticatePin = () => {

        UserService.modAdminAuthPin(["admin"], pin)
        .then(response => {
            onClose(false, "AUTHENTICATED")
        }).catch(error => {
         
        
        })
       
    }

    const pinInput = useRef(null);

    useEffect(() => {
        console.log(process.env.PIN_REQUIRED)
      if (pinInput.current) {
        pinInput.current.focus();
      }
    }, []);
    const handleKeypress = e => {
        if (e.key === 'Enter') {
            authenticatePin();
        }
    };


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
                    Are you sure?
                </p>
                <p
                    className='fs-5 mb-3'>
                    Record <span style={{ color: 'red' }}>{recordId}</span> will delete from the system.
                </p>
                <p
                    style={{ fontSize: '0.8em', marginBottom: '5px' }}>
                    To continue please enter admin pin code and press Enter key
                </p>
                <div
                    className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <CFormInput
                        style={{ backgroundColor: '#F2F2F2' }}
                        type="password"
                        autoFocus
                        onChange={(e) => setPin(e.target.value)}
                        value={pin}
                        onKeyPress={handleKeypress}
                        id="qty" />
                    <CButton
                        color="danger"
                        style={{ backgroundColor: '#FF5B5B', color: '#fff' }}
                        onClick={() => onClose(false, "UNAUTHENTICATED")}>
                        Cancel
                    </CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default RecordDeleteModel