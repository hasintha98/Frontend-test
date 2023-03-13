import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import LoadingModel from './LoadingModel'

const SendEmailModel = ({ visible, onClose, recordId, data, title }) => {

    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [subject, setSubject] = useState("")
    const [file, setFile] = useState(null)
    const [fileName, setfileName] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState("Sending...")

    useEffect(() => {
    
        setDescription(data?.description)
        setSubject(data?.subject)
        setFile(data?.file)
        setfileName(data?.fileName)
    }, [data])
    

    const sendEmail = async () => {
       
        if(email == "") {
            return
        }
        setLoading(true)
        console.log(file)
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('email', email);
        formData.append('file', file);
        formData.append('fileName', fileName)
        formData.append('description', description);
        // Use Axios to make a POST request to the backend with the PDF as data
    

        await axios.post('http://localhost:5000/api/auth/sendemail', formData)
        .then(response => {
          console.log('Email sent successfully. it will take up to 2-5 minutes');
          onClose(false)
          setLoading(false)
          swal("Success!", "Email sent successfully. it will take up to 2-5 minutes", "success")
        })
        .catch(error => {
          console.error('Error sending PDF to backend:', error);
          
          setLoading(false)
          swal("Error!", error.response.message, "error")
        });
    
    }

    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
                style={{ textAlign: 'center' }}
            >
                <span
                    style={{ fontSize: '5em', color: '#00965E' }}
                    className="material-symbols-outlined">
                    drafts
                </span>
                <p
                    className='fs-3'>
                    Email The {title}
                </p>
                <p
                    className='fs-5 mb-3'>
                    Invoice No. <span style={{ color: '#00965E' }}>{recordId}</span> will send to the customer.
                </p>
                <CRow className="mt-4">

                        <CFormLabel style={{width: "30%"}} htmlFor="email" className="col-sm-2 col-form-label">Customer Email :</CFormLabel>

                    <CCol >
                        <CFormInput id="email" type="email" aria-label="Default select example" onChange={(e) => setEmail(e.target.value)} />
                    </CCol>
                </CRow>

                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        className='blue-button'
                        style={{width: "100%" }}
                        variant="outline"
                        onClick={() => sendEmail()}>
                        Send
                    </CButton>
                    <CButton
                        color="danger"
                        style={{ backgroundColor: '#FF5B5B', color: '#fff', width: "100%" }}
                        onClick={() => onClose(false)}>
                        Cancel
                    </CButton>
                </div>
                <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
            </CModalBody>
           
        </CModal>
    )
}

export default SendEmailModel