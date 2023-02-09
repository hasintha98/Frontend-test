import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCol, CFormInput, CFormLabel, CFormSelect, CFormSwitch, CFormTextarea, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { ACTIONS, PAGES } from 'src/hooks/constants'
import ActivityLogsService from 'src/services/ActivityLogsService'
import AuthService from 'src/services/AuthService'
import UserService from 'src/services/UserService'
import swal from 'sweetalert'
import PinRequiredModel from './PinRequiredModel'

const AddEditUsersModel = ({ visible, onClose, isEdit, values, refreshPage }) => {

    const [name, setName] = useState(isEdit ? values.name : "")
    const [email, setEmail] = useState(isEdit ? values.email : "")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState([])
    const [isEnable, setIsEnable] = useState(isEdit ? values.active : 0)
    const [pinVisibleModel, setPinVisibleModel] = useState(false)

    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")

    useEffect(() => {
        if (isEdit) {
            setName(values.name)
            setEmail(values.email)
            const updatedRoles = values.roles.map(role => {
                return { label: role.charAt(0).toUpperCase() + role.slice(1), value: role }
            })
            setRole(updatedRoles)
            setIsEnable(values.active)
        } else {
            setName("")
            setEmail("")
            setPassword("")
            setRole([])
            setIsEnable(0)
            handleIsEnable(false)

        }


    }, [values])

    const handleIsEnable = (state) => {
        if (state) setIsEnable(1)
        else setIsEnable(0)
    }


    const addUser = () => {

        console.log("save")
        if (name == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Name")
            return
        }

        if (email == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Email")
            return
        }

        if (role == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Roles")
            return
        }

        const updatedRoles = role.map(role => {
            return role.value
        })

        if (isEdit) {

            UserService.updateUsersInfo("dash_page", Number(values.id), name, email, password, updatedRoles, isEnable)
                .then(response => {
                    swal("Success!", "Customer Updated Successfully", "success");
                    ActivityLogsService.createLog(PAGES.USER, AuthService.getCurrentUser().name, ACTIONS.EDIT, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                    onClose(false)
                    refreshPage()
                }).catch(error => {
                    console.log(error.response.data.message)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.USER, AuthService.getCurrentUser().name, ACTIONS.EDIT, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                })
        } else {
            if (password == "") {
                console.log(password)
                return
            }
            UserService.createUsersInfo("dash_page", name, email, password, updatedRoles, isEnable)
                .then(response => {
                    swal("Success!", "Customer added Successfully", "success");
                    ActivityLogsService.createLog(PAGES.USER, AuthService.getCurrentUser().name, ACTIONS.CREATE, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                    onClose(false)
                    refreshPage()
                }).catch(error => {
                    console.log(error.response.data.message)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.USER, AuthService.getCurrentUser().name, ACTIONS.CREATE, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                })
        }


    }



    const handleRoles = (roleDetails) => {

        const updatedRoles = roleDetails.map(role => {
            return role.value
        })

        setRole(updatedRoles)
    }
    console.log(role)

    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
            >

                <p
                    style={{ textAlign: 'center' }}
                    className='fs-3'>
                    {isEdit ? "Edit User" : "Add New User"}
                </p>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="enable" className="col-sm-2 col-form-label">Enable</CFormLabel>
                    <CCol sm={10}>
                        <CFormSwitch size="lg" id="enable" checked={isEnable == 0 ? false : true} onChange={(e) => handleIsEnable(e.target.checked)} />

                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="role" className="col-sm-2 col-form-label">Role *</CFormLabel>
                    <CCol sm={10}>
                        <Select
                            isMulti
                            aria-label="Default select example"
                            id="inputState"
                            name="features"
                            label="features"
                            onChange={(e) => setRole(e)}
                            value={role}
                            options={
                                [
                                    { label: "User", value: "user" },
                                    { label: "Admin", value: "admin" },
                                    { label: "Moderator", value: "moderator" },
                                    { label: "Other", value: "other" }
                                ]
                            }
                        // onChange={(e) => handlePersonas(e)}
                        ></Select>


                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name *</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="name" type='text' value={name} onChange={(e) => setName(e.target.value)} />

                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="password" className="col-sm-2 col-form-label">Password</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    </CCol>
                </CRow>
                <CRow className='mt-3'>
                    <CAlert color="warning" dismissible visible={validationAlert} onClose={() => setValidationAlert(false)} className="d-flex align-items-center">
                        <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                        <div>{validationMsg}</div>
                    </CAlert>
                </CRow>
                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        color="success"
                        style={{ color: '#fff', width: "100%" }}
                        onClick={() => setPinVisibleModel(true)}>
                        {isEdit ? "Update" : "Save"}
                    </CButton>
                    <CButton
                        color="danger"
                        style={{ backgroundColor: '#FF5B5B', color: '#fff', width: "100%" }}
                        onClick={() => onClose(false)}>
                        Cancel
                    </CButton>
                </div>
                <PinRequiredModel
                    visible={pinVisibleModel}
                    pinStatus={(status) => status ? addUser() : setPinVisibleModel(false)}
                    onClose={(val) => setPinVisibleModel(val)} 
                    page={PAGES.USER}
                    action={isEdit ? "edit": "create"}
                    />
            </CModalBody>
        </CModal>
    )
}

export default AddEditUsersModel