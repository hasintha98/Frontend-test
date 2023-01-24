import { CButton, CFormInput, CModal, CModalBody } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PinRequiredModel = ({ visible, onClose }) => {

    const [pin, setPin] = useState("")
    const [icon, setIcon] = useState(
        <span
            style={{ fontSize: '5em', color: '#C55A11' }}
            className="material-symbols-outlined">
            warning
        </span>
    )
    const [primaryMessage, setPrimaryMessage] = useState("Pin Required!")
    const [errorMessage, setErrorMessage] = useState("")
    const [secondaryMessage, setSecondaryMessage] = useState("To continue please enter admin pin code and press Enter key")

    const navigate = useNavigate()
    const authenticatePin = () => {
        if (pin == "1234") {
            onClose(false)
        } else {
            setIcon(
                <span 
                style={{ fontSize: '5em', color: 'red' }}
                className="material-symbols-outlined">
                    close
                </span>
            )
            setPrimaryMessage("Pin Invalid!")
            setErrorMessage("You’re not authorized to alter this action.")
            setSecondaryMessage('To retry please enter admin pin code and press Enter key')
        }
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
            backdrop="static"
            onClose={() => onClose(false)}>
            <CModalBody
                style={{ textAlign: "center" }}>
                {icon}
                <p
                    className='fs-3'>
                    {primaryMessage}
                </p>
                <p
                    className='fs-4'>
                    {errorMessage}
                </p>
                <p
                    style={{ fontSize: '0.8em', marginBottom: '5px', marginBottom: '8px' }}>
                    {secondaryMessage}
                </p>
                <div
                    className='d-grid gap-2 d-md-flex justify-content-md-center'>
                    <CFormInput
                        style={{ backgroundColor: '#F2F2F2' }}
                        type="password"
                        ref={pinInput}
                        onChange={(e) => setPin(e.target.value)}
                        value={pin}
                        onKeyPress={handleKeypress}
                        autoFocus
                        id="qty" />
                    <CButton
                        color="danger"
                        style={{ backgroundColor: '#FF5B5B', color: '#fff' }}
                        onClick={() => navigate('/dashboard')}>
                        Cancel
                    </CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default PinRequiredModel