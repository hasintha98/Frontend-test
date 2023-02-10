import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { ACTIONS, PAGES } from 'src/hooks/constants'
import ActivityLogsService from 'src/services/ActivityLogsService'
import AuthService from 'src/services/AuthService'
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices'
import swal from 'sweetalert'
import PinRequiredModel from './PinRequiredModel'

const PlyWoodConvertModel = ({ visible, onClose, item, refreshPage }) => {

    const [convertQty, setConvertQty] = useState(null)
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DDThh:mm"))
    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")

    console.log(date)

    const submitConvertInput = () => {
        setValidationAlert(false)
        
        if (!date) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Date")
            return
        }

        if (!convertQty) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Qty")
            return
        }

        if (convertQty > item.stock) {
            setValidationAlert(true)
            setValidationMsg("Entered Qty should be less than the current stock")
            return
        }


        PlyWoodTypesServices.convertProductionGrade2("dash_page", item.id, date, item.size, item.type, Number(convertQty))
            .then(response => {
                swal("Success!", "PlyWood Type Converted Successfully", "success");
                ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.EDIT, 1)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
                setValidationAlert(false)
                setConvertQty(null)
                setDate(null)
                onClose(false)
                refreshPage()
            }).catch(error => {
                console.log(error.response.data.message)
                setValidationAlert(false)
                swal("Error!", error.response.data.message, "error");
                ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.EDIT, 0)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
            })
    }
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
            >
                <p
                    className='fs-3'>
                    Convert To Grade 2
                </p>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="date" className="col-sm-2 col-form-label ">Date</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="datetime-local"
                            defaultValue={moment(new Date()).format("YYYY-MM-DDThh:mm")}
                            onChange={(e) => setDate(e.target.value)}
                            id="date"
                        />
                    </CCol>

                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label ">Qty *</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="name" type='text' value={convertQty} onChange={(e) => setConvertQty(e.target.value)} />
                    </CCol>
                </CRow>
                <CRow className='mt-3'>
                    <CAlert color="warning" dismissible visible={validationAlert} onClose={() => setValidationAlert(false)} className="d-flex align-items-center mt-2">
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
                        Save
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
                    pinStatus={(status) => status ? submitConvertInput() : setPinVisibleModel(false)}
                    onClose={(val) => setPinVisibleModel(val)} 
                    page={PAGES.PLYWOOD}
                    action={"update"}
                    />
            </CModalBody>
        </CModal>
    )
}

export default PlyWoodConvertModel