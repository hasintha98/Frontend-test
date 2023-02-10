import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ACTIONS, PAGES } from 'src/hooks/constants'
import ActivityLogsService from 'src/services/ActivityLogsService'
import AuthService from 'src/services/AuthService'
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices'
import RawMaterialService from 'src/services/RawMaterialService'
import swal from 'sweetalert'
import PinRequiredModel from './PinRequiredModel'

const StockUpdateModel = ({ visible, onClose, product, isAdding, refreshPage, type }) => {

    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DDThh:mm"))
    const [qty, setQty] = useState(null)

    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")

    const stockUpdate = () => {
        setValidationAlert(false)
        if (!qty) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Qty")
            return
        }

        if (type == "raw") {
            if (!date) {
                setValidationAlert(true)
                setValidationMsg("Please fill the required fields : Date")
                return
            }
            RawMaterialService.addRawMaterialRecord("dash_page", Number(product.id), Number(qty), date, isAdding ? 1 : 0)
                .then(response => {
                    swal("Success!", "Stock Updated Successfully", "success");
                    ActivityLogsService.createLog(PAGES.RAW_MATERIAL, AuthService.getCurrentUser().name, ACTIONS.UPDATE, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                    setValidationAlert(false)
                    onClose(false)
                    refreshPage()
                    
                }).catch(error => {
                    console.log(error.response.data.message)
                    setValidationAlert(false)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.RAW_MATERIAL, AuthService.getCurrentUser().name, ACTIONS.UPDATE, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                })
        } else {
            PlyWoodTypesServices.addStockPlyWoodTypeRecord("dash_page", Number(product.id), Number(qty))
                .then(response => {
                    swal("Success!", "Stock Updated Successfully", "success");
                    ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.UPDATE, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                    onClose(false)
                    refreshPage()
                }).catch(error => {
                    console.log(error.response.data.message)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.UPDATE, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                })
        }

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
                    Stock Update
                </p>
                {type == "raw" ? <CRow className="mt-4">
                    <CFormLabel htmlFor="date" className="col-sm-2 col-form-label">Date</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput
                            type="datetime-local"
                            defaultValue={moment(new Date()).format("YYYY-MM-DDThh:mm")}
                            onChange={(e) => setDate(e.target.value)}
                            id="date" />
                    </CCol>
                </CRow> : null}
                <CRow className="mt-4">
                    <CFormLabel htmlFor="Product" className="col-sm-2 col-form-label">Product</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="Product" value={product?.type} disabled aria-label="Default select example" />
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="was" className="col-sm-2 col-form-label">Stock was</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="was" value={product?.stock} disabled aria-label="Default select example" />
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="Qty" className="col-sm-2 col-form-label">Qty({isAdding ? "+" : "-"})</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="Qty" aria-label="Default select example" type='number' onChange={(e) => setQty(e.target.value)} />
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
                        Update
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
                    page={type == "raw" ? PAGES.RAW_MATERIAL : PAGES.PLYWOOD}
                    pinStatus={(status) => status ? stockUpdate() : setPinVisibleModel(false)}
                    onClose={(val) => setPinVisibleModel(val)}
                    action="update"
                    />
            </CModalBody>

        </CModal>
    )
}

export default StockUpdateModel