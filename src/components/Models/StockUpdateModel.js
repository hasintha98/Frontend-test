import { CButton, CCol, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices'
import RawMaterialService from 'src/services/RawMaterialService'
import swal from 'sweetalert'

const StockUpdateModel = ({ visible, onClose, product, isAdding, refreshPage, type }) => {

    const [date, setDate] = useState(null)
    const [qty, setQty] = useState(null)
    // const [product, setProduct] = useState(second)

    const stockUpdate = () => {


        if (!qty) {
            return
        }
        console.log("lol")
        if (type == "raw") {
            if (!date) {
                return
            }
            RawMaterialService.addRawMaterialRecord("user_page", Number(product.id), Number(qty), date, isAdding ? 1 : 0)
                .then(response => {
                    swal("Success!", "Stock Updated Successfully", "success");
                    onClose(false)
                    refreshPage()
                }).catch(error => {
                    console.log(error.response.data.message)
                    swal("Error!", error.response.data.message, "error");
                })
        } else {
            PlyWoodTypesServices.addStockPlyWoodTypeRecord("user_page", Number(product.id), Number(qty))
                .then(response => {
                    swal("Success!", "Stock Updated Successfully", "success");
                    onClose(false)
                    refreshPage()
                }).catch(error => {
                    console.log(error.response.data.message)
                    swal("Error!", error.response.data.message, "error");
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

                <div
                    className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
                    <CButton
                        color="success"
                        style={{ color: '#fff', width: "100%" }}
                        onClick={() => stockUpdate()}>
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

export default StockUpdateModel