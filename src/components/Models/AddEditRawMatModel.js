import { cilWarning } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { ACTIONS, PAGES } from 'src/hooks/constants'
import ActivityLogsService from 'src/services/ActivityLogsService'
import AuthService from 'src/services/AuthService'
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices'
import RawMaterialService from 'src/services/RawMaterialService'
import swal from 'sweetalert'
import PinRequiredModel from './PinRequiredModel'

const AddEditRawMatModel = ({ visible, onClose, product, isEdit, refreshPage }) => {

    const [date, setDate] = useState(null)
    const [qty, setQty] = useState(null)
    const [type, setType] = useState("")
    const [stock, setStock] = useState(0)
    const [limit, setLimit] = useState(0)

    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")

    useEffect(() => {
        if (isEdit) {
            setType(product?.type)
            setStock(product?.stock)
            setQty(product?.limit)
        }

    }, [isEdit, product])


    const stockUpdate = () => {
        setValidationAlert(false)
        if (!type) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Type")
            return
        }

        if (!stock) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Stock")
            return
        }

        if (!qty) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Limit")
            return
        }

        RawMaterialService.updateRawMaterialRecord("dash_page", Number(product.id), type, Number(stock), Number(qty))
            .then(response => {
                swal("Success!", "Stock Updated Successfully", "success");
                ActivityLogsService.createLog(PAGES.RAW_MATERIAL, AuthService.getCurrentUser().name, ACTIONS.EDIT, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                onClose(false)
                refreshPage()
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
                ActivityLogsService.createLog(PAGES.RAW_MATERIAL, AuthService.getCurrentUser().name, ACTIONS.EDIT, 0)
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
                    {isEdit ? "Edit" : "Add"}
                </p>

                <CRow className="mt-4">
                    <CFormLabel htmlFor="Product" className="col-sm-2 col-form-label">Product</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="Product" value={type} onCha aria-label="Default select example" onChange={(e) => setType(e.target.value)} />
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="was" className="col-sm-2 col-form-label">Stock</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="was" value={stock} aria-label="Default select example" onChange={(e) => setStock(e.target.value)} />
                    </CCol>
                </CRow>
                <CRow className="mt-4">
                    <CFormLabel htmlFor="Limit" className="col-sm-2 col-form-label">Limit</CFormLabel>
                    <CCol sm={10}>
                        <CFormInput id="Limit" value={qty} aria-label="Default select example" type='number' onChange={(e) => setQty(e.target.value)} />
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
                    page={PAGES.RAW_MATERIAL}
                    pinStatus={(status) => status ? stockUpdate() : setPinVisibleModel(false)}
                    onClose={(val) => setPinVisibleModel(val)}
                    action={"edit"}
                    />
            </CModalBody>

        </CModal>
    )
}

export default AddEditRawMatModel