import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CFormSwitch, CFormTextarea, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useState } from 'react'

const AddEditUsersModel = ({ visible, onClose, isEdit, values }) => {

    const [name, setName] = useState(isEdit ? values.name : "")
    const [email, setEmail] = useState(isEdit ? values.email : "")
    const [address, setAddress] = useState(isEdit ? values.address : "")
    const [phone, setPhone] = useState(isEdit ? values.phone : "")


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
                    {isEdit ? "Edit User" : "Add New User"}
                </p>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="enable" className="col-sm-2 col-form-label">Enable</CFormLabel>
                    <CCol sm={10}>
                        <CFormSwitch size="lg" id="enable" />

                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="role" className="col-sm-2 col-form-label">Role *</CFormLabel>
                    <CCol sm={10}>
                        <CFormSelect aria-label="Default select example">
                            <option>Select the role</option>
                            <option value="1">Admin</option>
                            <option value="2">Moderator</option>
                            <option value="3" disabled>Other</option>
                        </CFormSelect>

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
                    <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">Phone</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="phone" type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />

                    </CCol>
                </CRow>
                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        color="success"
                        style={{ color: '#fff', width: "100%" }}
                        onClick={() => onClose(false)}>
                        {isEdit ? "Update" : "Save"}
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

export default AddEditUsersModel