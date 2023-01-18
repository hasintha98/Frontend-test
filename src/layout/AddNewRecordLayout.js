import { CAlert, CButton, CCol, CFormInput, CFormLabel, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useRef, useState } from 'react'
import AddProductionRecord from 'src/components/AddProductionRecord'
import LastRecordFooter from 'src/components/LastRecordFooter'
import NavBar from 'src/components/NavBar'

const AddNewRecordLayout = () => {
  
    return (
        <>
            <NavBar />
            <AddProductionRecord />
            <LastRecordFooter lastRecord={"9mm LO/EVR : 25"} />
            
        </>
    )
}

export default AddNewRecordLayout