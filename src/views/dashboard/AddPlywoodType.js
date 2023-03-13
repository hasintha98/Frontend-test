import { cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAlert, CButton, CCard, CCardBody, CCol, CCollapse, CFormInput, CFormLabel, CFormSwitch, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingModel from 'src/components/Models/LoadingModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import { ACTIONS, PAGES } from 'src/hooks/constants';
import ActivityLogsService from 'src/services/ActivityLogsService';
import AuthService from 'src/services/AuthService';
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices';
import swal from 'sweetalert';

const AddPlywoodType = () => {
    const search = useLocation().search
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")
    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [generalCollapseVisible, setGeneralCollapseVisible] = useState(true)
    const [rawCollapseVisible, setRawCollapseVisible] = useState(true)
    const [type, setType] = useState("")
    const [size, setSize] = useState(null)
    const [stock, setStock] = useState(null)
    const [minQty, setMinQty] = useState(null)
    const [profile, setProfile] = useState([])
    const [id, setId] = useState(new URLSearchParams(search).get('id'))
    const [plyWood, setPlyWood] = useState(null)
    const [rawType, setRawType] = useState("")
    const [rawStock, setRawStock] = useState(null)
    const [active, setActive] = useState(1)
    const navigate = useNavigate();

    const submitPlyWoodType = async () => {
        if (type == "") {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Type")
            return
        }
        if (!size) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Size")
            return
        }
        if (!stock) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Stock")
            return
        }
        if (!minQty) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : Min Qty")
            return
        }

        if (profile.length == 0) {
            setValidationAlert(true)
            setValidationMsg("Please fill the required fields : items")
            return
        }

        setLoadingMsg("Creating Plywood Type...")
        setLoading(true)
        if (id) {
            await PlyWoodTypesServices.updatePlyWoodTypeRecord("dash_page", id, size, type, stock, minQty, active, profile)
                .then(response => {
                    setValidationAlert(false)
                    setLoadingMsg(null)
                    setLoading(false)
                    swal("Success!", "Plywood Type Updated Successfully", "success");
                    //clearFields()
                    ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.EDIT, 1)
                        .catch((error) => {
                            console.log(error)
                            swal("Error!", "Something Went Wrong With Logging", "error");
                        })
                    console.log(response)

                }).catch(error => {
                    console.log(error.response.data.message)
                    setValidationAlert(false)
                    setLoadingMsg(null)
                    setLoading(false)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.EDIT, 0)
                        .catch((error) => {
                            console.log(error)
                            swal("Error!", "Something Went Wrong With Logging", "error");
                        })
                })
        } else {


            await PlyWoodTypesServices.createNewPlyWoodTypeRecord("dash_page", size, type, stock, minQty, profile)
                .then(response => {
                    setValidationAlert(false)
                    setLoadingMsg(null)
                    setLoading(false)
                    swal("Success!", "Plywood Type Created Successfully", "success");
                    //clearFields()
                    ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.CREATE, 1)
                        .catch((error) => {
                            console.log(error)
                            swal("Error!", "Something Went Wrong With Logging", "error");
                        })
                    console.log(response)

                }).catch(error => {
                    console.log(error.response.data.message)
                    setValidationAlert(false)
                    setLoadingMsg(null)
                    setLoading(false)
                    swal("Error!", error.response.data.message, "error");
                    ActivityLogsService.createLog(PAGES.PLYWOOD, AuthService.getCurrentUser().name, ACTIONS.CREATE, 0)
                        .catch((error) => {
                            console.log(error)
                            swal("Error!", "Something Went Wrong With Logging", "error");
                        })
                })
        }
    }

    const addRawMaterials = () => {
        if (rawType == "") {
            return
        }

        if (!rawStock) {
            return
        }
        const pro = { type: rawType, stock: rawStock }
        const profileCloned = profile
        profileCloned.push(pro)

        setProfile(profileCloned)
        setRawStock("")
        setRawType("")
    }

    useEffect(() => {
        setId(new URLSearchParams(search).get('id'))
        if (id) {
            getPlywoodType()
        }

    }, [id])

    const getPlywoodType = async () => {
        await PlyWoodTypesServices.getPlyWoodTypesListAll(
            "dash_page",
            "dash_page"
        )
            .then(response => {
                const { plyWoodsInfoAll } = response.data;
                const plywood = plyWoodsInfoAll.find(o => o.id == id)
                setPlyWood(plywood)
                setType(plywood?.type)
                setSize(plywood?.size)
                setStock(plywood?.stock)
                setMinQty(plywood?.limit)
                const profileList = JSON.parse(plywood.profile)
                console.log("profile", profileList)
                const rawMatArray = profileList.map(item => {
                    return { type: item.type, stock: item.stock }
                })

                // const rawMatArray = plywood?.RawMaterials_PlyWood__Inventory_TBs.map(item => {
                //     return { type: item.type, stock: item.Plywood_Type_Profiles_TB.stock }
                // })

                setProfile(rawMatArray)
           
                console.log("plyWoodList", plyWoodsInfoAll)
                console.log("rawMatArray", plywood)
            })
    }

    console.log(profile)

    const removeProfileRaw = (item) => {
        setProfile(profile => profile.filter((raw) => (raw.type != item.type)))
    }

    const handleActive = (e) => {
        if (e) setActive(1)
        else setActive(0)

    }
    return (
        <>
            <CRow>
                <CCol>
                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>{id ? "Edit Plywood Type" : "Add New Plywood Type"}</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol md={5}>

                    </CCol>
                    <CCol >
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%" }}
                            onClick={() => navigate('/inventory/plywood')}
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
                            onClick={() => setPinVisibleModel(true)}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                add
                            </span>{' '}Save</CButton>
                    </CCol>
                </CCol>
                <CAlert color="warning" dismissible visible={validationAlert} onClose={() => setValidationAlert(false)} className="d-flex align-items-center mt-2">
                    <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                    <div>{validationMsg}</div>
                </CAlert>
            </CRow>

            <CRow className='mt-3'>
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
                            <CFormSwitch color='success' size="lg" style={{ width: "12%" }} id="enable" value={active} onChange={(e) => handleActive(e.target.checked)} />
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
                    {/* <CRow className="mb-3" >
                        <CFormLabel htmlFor="enable" className="col-sm-2 col-form-label">Enable</CFormLabel>
                        <CCol md={3}>
                            <CFormSwitch color='success' size="lg" style={{ width: "12%" }} id="enable" defaultChecked />
                        </CCol>
                    </CRow> */}
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
                                            <span style={{ color: 'red', cursor: 'pointer' }}
                                                className="material-symbols-outlined"
                                                onClick={() => removeProfileRaw(item)}
                                            >
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
                                    {/* <CTableDataCell width={15} >
                                        <span style={{ color: 'red', cursor: 'pointer' }} className="material-symbols-outlined">
                                            close
                                        </span></CTableDataCell> */}
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
                                onClick={() => navigate('/inventory/plywood')}
                            >Reset & Fetch {' '} <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                    autorenew
                                </span></CButton>
                        </CRow>
                    </CRow>
                </CCollapse>

            </CRow>
            <PinRequiredModel
                visible={pinVisibleModel}
                pinStatus={(status) => status ? submitPlyWoodType() : setPinVisibleModel(false)}
                onClose={(val) => setPinVisibleModel(val)}
                page={PAGES.PLYWOOD}
                action={id ? "edit" : "create"}
            />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default AddPlywoodType