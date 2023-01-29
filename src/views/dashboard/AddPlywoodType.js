import { CButton, CCard, CCardBody, CCol, CCollapse, CFormInput, CFormLabel, CFormSwitch, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices';
import swal from 'sweetalert';

const AddPlywoodType = () => {
    const [generalCollapseVisible, setGeneralCollapseVisible] = useState(true)
    const [rawCollapseVisible, setRawCollapseVisible] = useState(true)
    const [type, setType] = useState("")
    const [size, setSize] = useState(null)
    const [stock, setStock] = useState(null)
    const [minQty, setMinQty] = useState(null)
    const [profile, setProfile] = useState([])

    const [rawType, setRawType] = useState("")
    const [rawStock, setRawStock] = useState(null)
    const navigate = useNavigate();

    const submitPlyWoodType = () => {
        if (type == "") {
            console.log("validation error: type")
            return
        }
        if (!size) {
            console.log("validation error: size")
            return
        }
        if (!stock) {
            console.log("validation error: stock")
            return
        }
        if (!minQty) {
            console.log("validation error: minQty")
            return
        }

        if (profile.length == 0) {
            console.log("validation error: profile")
            return
        }
        PlyWoodTypesServices.createNewPlyWoodTypeRecord("user_page", size, type, stock, minQty, profile)
            .then(response => {
                swal("Success!", "Plywood Type Added Successfully", "success");
                //clearFields()
                console.log(response)
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
            })
    }

    const addRawMaterials = () => {
        if(rawType == "") {
            return
        }

        if(!rawStock) {
            return
        }
        const pro = { type: rawType, stock: rawStock }
        const profileCloned = profile
        profileCloned.push(pro)

        setProfile(profileCloned)
        setRawStock(null)
        setRawType("")
    }

    console.log(profile)
    return (
        <>
            <CRow>
                <CCol>
                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Add New Plywood Type</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol md={5}>

                    </CCol>
                    <CCol >
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%" }}
                            onClick={() => navigate('/inventory?type=plywood')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CCol>
                    <CCol>
                        <CButton
                            color="success"
                            className='default-border'
                            variant="outline"
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                            onClick={() => submitPlyWoodType()}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                add
                            </span>{' '}Save</CButton>
                    </CCol>
                </CCol>
            </CRow>
            <CRow className='mt-5'>
                <CCol md={11}>
                    <span className='fs-5'>General</span>
                </CCol>
                <CCol>
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => setGeneralCollapseVisible(!generalCollapseVisible)}>
                        expand_more
                    </span>
                </CCol>
                <hr />
            </CRow>
            <CRow className='mt-3'>
                <CCollapse visible={generalCollapseVisible} style={{ marginLeft: '25%' }}>
                    <CRow className="mb-3" >
                        <CFormLabel htmlFor="enable" className="col-sm-2 col-form-label">Enable</CFormLabel>
                        <CCol md={3}>
                            <CFormSwitch color='success' size="lg" style={{ width: "12%" }} id="enable" defaultChecked />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3" >
                        <CFormLabel htmlFor="type" className="col-sm-2 col-form-label">Type</CFormLabel>
                        <CCol md={3}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="text"
                                placeholder='Type Name'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                id="type" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="Size" className="col-sm-2 col-form-label">Size</CFormLabel>
                        <CCol md={3}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="number"
                                placeholder='Size in (mm)'
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                id="Size" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="Stock" className="col-sm-2 col-form-label">Stock</CFormLabel>
                        <CCol md={3}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="number"
                                placeholder='Available Stock'
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                id="Stock" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="qty" className="col-sm-2 col-form-label">Min Qty</CFormLabel>
                        <CCol md={3}>
                            <CFormInput
                                style={{ backgroundColor: '#F2F2F2' }}
                                type="number"
                                placeholder='Low Stock Threshold'
                                value={minQty}
                                onChange={(e) => setMinQty(e.target.value)}
                                id="qty" />
                        </CCol>
                    </CRow>
                </CCollapse>

            </CRow>
            <CRow className='mt-3' >
                <CCol md={11}>
                    <span className='fs-5'>Raw Materials</span>
                </CCol>
                <CCol>
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => setRawCollapseVisible(!rawCollapseVisible)}>
                        expand_more
                    </span>
                </CCol>
                <hr />
                <CCollapse className='mt-3' visible={rawCollapseVisible} style={{ marginLeft: '25%' }}>
                    <CRow className="mb-3" >
                        <CFormLabel htmlFor="enable" className="col-sm-2 col-form-label">Enable</CFormLabel>
                        <CCol md={3}>
                            <CFormSwitch color='success' size="lg" style={{ width: "12%" }} id="enable" defaultChecked />
                        </CCol>
                    </CRow>
                    <CRow >
                        <CTable style={{ width: "50%" }} >
                            <CTableHead>
                                <CTableRow color="secondary">
                                    <CTableHeaderCell className='text-center' scope="col">Type</CTableHeaderCell>
                                    <CTableHeaderCell className='text-center' scope="col">Stock</CTableHeaderCell>
                                    <CTableHeaderCell width={15} scope="col"></CTableHeaderCell>

                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {profile?.map((item, index) => (
                                    <CTableRow key={index}>

                                        <CTableDataCell className='text-center' >
                                            {item.type}
                                        </CTableDataCell>
                                        <CTableDataCell className='text-center' >
                                            {item.stock}
                                        </CTableDataCell>
                                        <CTableDataCell width={15} >
                                            <span style={{ color: 'red', cursor: 'pointer' }} className="material-symbols-outlined">
                                                close
                                            </span></CTableDataCell>
                                    </CTableRow>

                                ))}
                                <CTableRow>

                                    <CTableDataCell className='text-center' >
                                        <CFormInput
                                            style={{ backgroundColor: '#F2F2F2' }}
                                            type="text"
                                            value={rawType}
                                            onChange={(e) => setRawType(e.target.value)}
                                            id="qty" />
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center' >
                                        <CFormInput
                                            style={{ backgroundColor: '#F2F2F2' }}
                                            type="number"
                                            value={rawStock}
                                            onChange={(e) => setRawStock(e.target.value)}
                                            id="qty" />
                                    </CTableDataCell>
                                    <CTableDataCell width={15} >
                                        <span style={{ color: 'red', cursor: 'pointer' }} className="material-symbols-outlined">
                                            close
                                        </span></CTableDataCell>
                                </CTableRow>


                            </CTableBody>
                        </CTable>
                        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => addRawMaterials()}
                        >
                            Add another line
                            <span className="material-symbols-outlined" style={{ fontSize: "1em" }}>
                                add
                            </span>
                        </span>
                        <CRow>
                            <CButton
                                role="button"
                                className='mt-3'
                                color='secondary'
                                style={{ width: "15%" }}
                                onClick={() => navigate('/inventory?type=plywood')}
                            >Reset & Fetch {' '} <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                    autorenew
                                </span></CButton>
                        </CRow>
                    </CRow>
                </CCollapse>

            </CRow>
        </>
    )
}

export default AddPlywoodType