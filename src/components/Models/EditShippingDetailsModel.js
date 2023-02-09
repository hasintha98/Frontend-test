import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'

const EditShippingDetailsModel = ({visible, onClose, values, setValues}) => {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
          setName(values.name)
          setAddress(values.address)
          setPhone(values.phone)
      }, [values])

    const addDetails = () => {
        values.name = name;
        values.phone = phone;
        values.address = address
        setValues(values)
        onClose(false)
    }

    return (
        <CModal
        style={{ marginTop: "30%", padding: "5%" }}
        visible={visible}
        onClose={() => onClose(false)}>
        <CModalBody
        >

            <p
                style={{textAlign: 'center'}}
                className='fs-3'>
                Edit Shipping Details
            </p>
            <CRow className="mt-4">
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name *</CFormLabel>
                <CCol sm={10}>
                    <CFormInput id="name" type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    
                </CCol>
            </CRow>
            <CRow className="mt-4">
                <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">Address</CFormLabel>
                <CCol sm={10}>
                    <CFormTextarea id="address" type='text'  value={address} onChange={(e) => setAddress(e.target.value)} />
                    
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
                    onClick={() => addDetails()}>
                        Update
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

export default EditShippingDetailsModel