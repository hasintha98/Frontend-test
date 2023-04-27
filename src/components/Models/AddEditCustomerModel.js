import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { ACTIONS, PAGES } from 'src/hooks/constants'
import ActivityLogsService from 'src/services/ActivityLogsService'
import AuthService from 'src/services/AuthService'
import CustomersServices from 'src/services/CustomersServices'
import swal from 'sweetalert'
import PinRequiredModel from './PinRequiredModel'

const AddEditCustomerModel = ({ visible, onClose, isEdit, values, refreshPage }) => {

    const [name, setName] = useState(isEdit ? values.name : "")
    const [email, setEmail] = useState(isEdit ? values.email : "")
    const [address, setAddress] = useState(isEdit ? values.address : "")
    const [phone, setPhone] = useState(isEdit ? values.phone : "")
    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")

    useEffect(() => {
        if (isEdit) {
            setName(values.name)
            setEmail(values.email)
            setAddress(values.address)
            setPhone(values.phone)
        } else {
            setName("")
            setEmail("")
            setAddress("")
            setPhone("")
        }


    }, [values])


    const addCustomer = () => {
        setValidationAlert(false)
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

        if (address == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Address")
            return
        }

        if (phone == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Phone")
            return
        }

        if (isEdit) {
            CustomersServices.updateCustomerRecord("dash_page", Number(values.id), name, email, address, phone)
                .then(response => {
                    swal("Success!", "Customer Updated Successfully", "success");
                    ActivityLogsService.createLog(PAGES.CUSTOMER, AuthService.getCurrentUser().name, ACTIONS.EDIT, 1)
                        .catch((error) => {
                            console.log(error)
                            swal("Error!", "Something Went Wrong With Logging", "error");
                        })
                    onClose(false)
                    refreshPage()
                }).catch(error => {
                    console.log(error.response.data.message)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.CUSTOMER, AuthService.getCurrentUser().name, ACTIONS.EDIT, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                })
        } else {
            CustomersServices.createNewCustomerRecord("dash_page", name, email, address, phone)
                .then(response => {
                    swal("Success!", "Customer added Successfully", "success");
                    ActivityLogsService.createLog(PAGES.CUSTOMER, AuthService.getCurrentUser().name, ACTIONS.CREATE, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                    onClose(false)
                    refreshPage()
                }).catch(error => {
                    console.log(error.response.data.message)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.CUSTOMER, AuthService.getCurrentUser().name, ACTIONS.CREATE, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                })
        }


    }


    console.log(name)
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
                    {isEdit ? "Edit Customer" : "Add New Customer"}
                </p>
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
                    <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">Address</CFormLabel>
                    <CCol sm={10}>
                        <CFormTextarea id="address" type='text' value={address} onChange={(e) => setAddress(e.target.value)} />

                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">Phone</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="phone" type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />

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
                    pinStatus={(status) => status ? addCustomer() : setPinVisibleModel(false)}
                    onClose={(val) => setPinVisibleModel(val)} 
                    page={PAGES.CUSTOMER}
                    action={isEdit ? "edit": "create"}
                    height='420px'
                    padding='15%'
                    />
            </CModalBody>
        </CModal>
    )
}

export default AddEditCustomerModel