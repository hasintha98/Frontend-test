import { CButton, CFormInput, CModal, CModalBody } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import AuthService from 'src/services/AuthService'
import PermissionsService from 'src/services/PermissionsService'
import UserService from 'src/services/UserService'
import swal from 'sweetalert'

const RecordDeleteModel = ({ visible, onClose, recordId, page }) => {
    const [pin, setPin] = useState("")
    const authenticatePin = async () => {

        let auth = false
        const roles = AuthService.getCurrentUser().roles.map(role => {
            return role.replace("ROLE_", "").toLowerCase()
        })
        let access = null
        const newRoles = []
        await PermissionsService.getPermissionList("dash_page")
            .then(response => {
                const { PageAccessList } = response.data
                const accessItem = PageAccessList.find(o => o.page_name === page)
                access = accessItem
                if (roles.includes("admin") && accessItem.delete_admin == 1) {
                    auth = true
                    newRoles.push("admin")
                }
                if (roles.includes("moderator") && accessItem.delete_mod == 1) {
                    auth = true
                    newRoles.push("moderator")
                } 
            })
        if (auth) {
            await PermissionsService.actionPinCodeAuth(newRoles, pin)
                .then(response => {
                    onClose(false, "AUTHENTICATED")
                    setPin("")
                }).catch(error => {
                    setPin("")
                    swal("Error!", error.response.data.message, "error");

                })
        } else {
            if(access["delete_admin"] == 1 || access["delete_mod"] == 1) {
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
                    onClose(false, "AUTHENTICATED")
                    setPin("")
                }).catch(error => {
                    setPin("")
                    swal("Error!", `Unauthorized. Please Enter ${validateStrings} Pin Code`, "error");
                })
            }
            setPin("")
            swal("Error!", "Unauthorized. There is no assign users to alter this action", "error");
        }

        // UserService.modAdminAuthPin(["admin"], pin)
        // .then(response => {
        //     onClose(false, "AUTHENTICATED")
        // }).catch(error => {
         
        
        // })
       
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
                    To continue please enter pin code and press Enter key
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