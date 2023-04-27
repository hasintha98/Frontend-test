import { CButton, CFormInput, CModal, CModalBody } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'src/hooks/constants'
import UserStatus from 'src/hooks/UserStatus'
import AuthService from 'src/services/AuthService'
import PermissionsService from 'src/services/PermissionsService'
import UserService from 'src/services/UserService'
import LoadingModel from './LoadingModel'

const PinRequiredModel = ({ visible, onClose, pinStatus, isNavigation, isNavigate = false, page, action, padding = "5%", height = "auto" }) => {
    const [loading, setLoading] = useState(false)
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
    const [secondaryMessage, setSecondaryMessage] = useState("To continue please enter pin code and press Enter key")

    const navigate = useNavigate()
    const authenticatePin = async () => {
        setLoading(true)
        if (isNavigate) {
            PermissionsService.pagePinCodeAuth(AuthService.getCurrentUser().name, page, pin)
                .then(response => {
                    onClose(false)
                    pinStatus(true)
                    setLoading(false)
                }).catch(error => {
                    setIcon(
                        <span
                            style={{ fontSize: '5em', color: 'red' }}
                            className="material-symbols-outlined">
                            close
                        </span>
                    )
                    setPrimaryMessage("Pin Invalid!")
                    setErrorMessage(error.response.data.message)
                    setSecondaryMessage('To retry please enter pin code and press Enter key')
                    setLoading(false)
                })

        } else {

            let auth = false
            const roles = AuthService.getCurrentUser().roles.map(role => {
                return role.replace("ROLE_", "").toLowerCase()
            })
            console.log(roles)
            let access = null
            const newRoles = []
            await PermissionsService.getPermissionList("dash_page")
                .then(response => {
                    const { PageAccessList } = response.data

                    const accessItem = PageAccessList.find(o => o.page_name === page)
                    access = accessItem
              
                    console.log(roles.includes("moderator"))
                    if (roles.includes("admin") && accessItem[action + "_admin"] == 1) {
                        auth = true
                        newRoles.push("admin")
                    } 
                    if (roles.includes("moderator") && accessItem[action + "_mod"] == 1) {
                        console.log("called")
                        newRoles.push("moderator")
                        auth = true
                    } 
                })
                console.log(auth)
            if (auth) {
                await PermissionsService.actionPinCodeAuth(newRoles, pin)
                    .then(response => {
                        setPin("")
                        onClose(false)
                        pinStatus(true)
                        setLoading(false)
                    }).catch(error => {
                        setPin("")
                        setIcon(
                            <span
                                style={{ fontSize: '5em', color: 'red' }}
                                className="material-symbols-outlined">
                                close
                            </span>
                        )
                        setPrimaryMessage("Pin Invalid!")
                        setErrorMessage(error.response.data.message)
                        setSecondaryMessage('To retry please enter admin or moderator pin code and press Enter key')
                        setLoading(false)
                    })
            } else {
                if(access[action + "_admin"] == 1 || access[action+"_mod"] == 1) {
                    const needRoles = []
                    const validateStrings = ""
                    if( access["delete_admin"] == 1) {
                        needRoles.push("admin")
                        validateStrings = "admin"
                    }
    
                    if( access["delete_admin"] == 1) {
                        needRoles.push("moderator")
                        validateStrings = validateStrings + "/moderator"
                    }
                    await PermissionsService.actionPinCodeAuth(needRoles, pin)
                    .then(response => {
                        setPin("")
                        onClose(false)
                        pinStatus(true)
                        setLoading(false)
                    }).catch(error => {
                        setPin("")
                        setIcon(
                            <span
                                style={{ fontSize: '5em', color: 'red' }}
                                className="material-symbols-outlined">
                                close
                            </span>
                        )
                        setPrimaryMessage("Pin Invalid!")
                        setErrorMessage(error.response.data.message)
                        setSecondaryMessage(`To retry please enter ${validateStrings} pin code and press Enter key`)
                        setLoading(false)
                    })
                }
              
                setPin("")
                setIcon(
                    <span
                        style={{ fontSize: '5em', color: 'red' }}
                        className="material-symbols-outlined">
                        close
                    </span>
                )
                setPrimaryMessage("Pin Invalid!")
                setErrorMessage("Unauthorized")
                setSecondaryMessage('To retry please enter admin pin code and press Enter key')

            }

        }




    }

    const pinInput = useRef(null);

    useEffect(() => {
    
        if(!UserStatus.getPinStatus().navigation && isNavigate) {
            setPin("")
            onClose(false)
        } else if(!UserStatus.getPinStatus().actions && !isNavigate){
            setPin("")
            onClose(false)
        }

        if (pinInput.current) {
            pinInput.current.focus();
        }
    }, []);

    const handleKeypress = e => {
        if (e.key === 'Enter') {
            authenticatePin();
        }
    };

    return  (
        <CModal
            style={{ marginTop: "30%", padding: padding, height: height }}
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
                        onClick={() => isNavigation ? navigate('/dashboard') : onClose(false)}>
                        Cancel
                    </CButton>
                </div>
            </CModalBody>
            <LoadingModel visible={loading} loadingMsg={null} onClose={(val) => setLoading(false)} />
        </CModal>
    )
}

export default PinRequiredModel