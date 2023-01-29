import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import CustomersServices from 'src/services/CustomersServices'
import swal from 'sweetalert'

const AddEditCustomerModel = ({visible, onClose, isEdit, values, refreshPage}) => {

    const [name, setName] = useState(isEdit ? values.name : "")
    const [email, setEmail] = useState(isEdit ? values.email : "")
    const [address, setAddress] = useState(isEdit ? values.address : "")
    const [phone, setPhone] = useState(isEdit ? values.phone : "")

    useEffect(() => {
      if(isEdit) {
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
        
        console.log("save")
        if(name == "") {
            console.log(name)
            return
        }

        if(email == "") {
            console.log(email)
            return
        }

        if(address == "") {
            console.log(address)
            return
        }

        if(phone == "") {
            console.log(phone)
            return
        }

        if(isEdit) {
            CustomersServices.updateCustomerRecord("user_page", Number(values.id), name, email, address, phone)
            .then(response => {
                swal("Success!", "Customer Updated Successfully", "success");
                onClose(false)
                refreshPage()
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
            }) 
        } else {
            CustomersServices.createNewCustomerRecord("user_page", name, email, address, phone)
            .then(response => {
                swal("Success!", "Customer added Successfully", "success");
                onClose(false)
                refreshPage()
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
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
                    style={{textAlign: 'center'}}
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
                        <CFormInput id="email" type='email'  value={email} onChange={(e) => setEmail(e.target.value)} />
                        
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
                        onClick={() => addCustomer()}>
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

export default AddEditCustomerModel