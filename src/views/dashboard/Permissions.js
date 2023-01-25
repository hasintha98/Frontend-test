import { CButton, CCol, CCollapse, CFormCheck, CFormInput, CFormLabel, CFormSwitch, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react'
import React, { useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import PinResetModel from 'src/components/Models/PinResetModel'
import { useNavigate } from 'react-router-dom'
const Permissions = () => {
    const [generalCollapseVisible, setGeneralCollapseVisible] = useState(true)
    const [rawCollapseVisible, setRawCollapseVisible] = useState(true)
    const [visible, setVisible] = useState(false)

    const navigate = useNavigate()
    return (
        <>
            <CRow>
                <CCol md={8}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Permissions</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>

                    <CCol md={4}>
                        <CButton
                            color="secondary"
                            // className='default-border'
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                            onClick={() => navigate('/dashboard')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CCol>
                    <CCol md={4}>
                        <CButton
                            color="success"
                            className='default-border'
                            variant="outline"
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                        // onClick={() => setAddCustomerVisible(true)}
                        >Save</CButton>
                    </CCol>
                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <div className='p-5'>
                <CRow >
                    <CCol md={11}>
                        <span className='fs-5'>Roles and Capabilities</span>
                    </CCol>
                    <CCol>
                        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => setGeneralCollapseVisible(!generalCollapseVisible)}>
                            expand_more
                        </span>
                    </CCol>
                    <hr />
                </CRow>
                <CRow className='mt-3'>
                    <CCollapse visible={generalCollapseVisible} className='p-5' style={{marginLeft: "20px", marginRight: "50px"}}>
                      
                        <CTable bordered className='p-5'>
                            <CTableHead>
                                <CTableRow >
                                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Production</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Inventory</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Sales</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell scope="col">User</CTableDataCell>
                                    <CTableHeaderCell scope="row"><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                                    <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                                    <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>

                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell scope="col">Moderator</CTableDataCell>
                                    <CTableHeaderCell scope="row"><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                                    <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                                    <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>

                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell scope="col">Admin</CTableDataCell>
                                    <CTableHeaderCell scope="row"><CFormCheck id="flexCheckDefault" disabled /></CTableHeaderCell>
                                    <CTableDataCell><CFormCheck id="flexCheckDefault" disabled /></CTableDataCell>
                                    <CTableDataCell><CFormCheck id="flexCheckDefault" disabled /></CTableDataCell>

                                </CTableRow>
                            </CTableBody>
                        </CTable>

                        {/* 
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="Admin" className="col-sm-2 col-form-label">User</CFormLabel>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Capabilities</CButton>
                            </CCol>

                        </CRow>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="Admin" className="col-sm-2 col-form-label">Moderator</CFormLabel>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Capabilities</CButton>
                            </CCol>

                        </CRow>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="Admin" className="col-sm-2 col-form-label">Manager</CFormLabel>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Capabilities</CButton>
                            </CCol>

                        </CRow>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="Admin" className="col-sm-2 col-form-label">Admin</CFormLabel>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Capabilities</CButton>
                            </CCol>

                        </CRow> */}
                    </CCollapse>

                </CRow>
                <CRow >
                    <CCol md={11}>
                        <span className='fs-5'>Pins</span>
                    </CCol>
                    <CCol>
                        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={() => setRawCollapseVisible(!generalCollapseVisible)}>
                            expand_more
                        </span>
                    </CCol>
                    <hr />
                </CRow>
                <CRow className='mt-3'>
                    <CCollapse visible={rawCollapseVisible} style={{ marginLeft: '25%' }}>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="sPin" className="col-sm-2 col-form-label">Super Pin</CFormLabel>
                            <CCol md={1}>
                                <CFormSwitch color='success' size="lg" style={{ width: "70%" }} id="sPin" defaultChecked />
                            </CCol>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Pin</CButton>
                            </CCol>
                            <CCol>
                                <CTooltip content={
                                    <div style={{ textAlign: 'start' }}>
                                        <p>View/Modify any entry in</p>
                                        <ul>
                                            <li>Production</li>
                                            <li>Inventory   </li>
                                            <li>Sales</li>
                                        </ul>
                                    </div>
                                }>
                                    <span className="material-symbols-sharp" style={{ cursor: 'pointer' }}>
                                        info
                                    </span>
                                </CTooltip>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="production" className="col-sm-2 col-form-label">Production</CFormLabel>
                            <CCol md={1}>
                                <CFormSwitch color='success' size="lg" style={{ width: "70%" }} id="production" defaultChecked />
                            </CCol>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Pin</CButton>
                            </CCol>
                            <CCol>
                                <CTooltip content={
                                    <div style={{ textAlign: 'start' }}>
                                        <span>Add plywood production to the system</span>
                                    </div>
                                }>
                                    <span className="material-symbols-sharp" style={{ cursor: 'pointer' }}>
                                        info
                                    </span>
                                </CTooltip>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="Inventory" className="col-sm-2 col-form-label">Inventory</CFormLabel>
                            <CCol md={1}>
                                <CFormSwitch color='success' size="lg" style={{ width: "70%" }} id="Inventory" defaultChecked />

                            </CCol>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Pin</CButton>
                            </CCol>
                            <CCol>
                                <CTooltip content={
                                    <div style={{ textAlign: 'start' }}>
                                        <p>View/Update following inventories</p>
                                        <ul>
                                            <li>Plywood</li>
                                            <li>Raw Materials   </li>
                                            <li>Other</li>
                                        </ul>
                                    </div>
                                }>
                                    <span className="material-symbols-sharp" style={{ cursor: 'pointer' }}>
                                        info
                                    </span>
                                </CTooltip>
                            </CCol>

                        </CRow>
                        <CRow className="mb-3" >
                            <CFormLabel htmlFor="Sales" className="col-sm-2 col-form-label">Sales</CFormLabel>
                            <CCol md={1}>
                                <CFormSwitch color='success' size="lg" style={{ width: "70%" }} id="Sales" defaultChecked />
                            </CCol>
                            <CCol md={2}>
                                <CButton onClick={() => setVisible(true)} color='light' variant="outline" style={{ color: 'black', borderColor: 'black' }}>Modify Pin</CButton>
                            </CCol>
                            <CCol>
                                <CTooltip content={
                                    <div style={{ textAlign: 'start' }}>
                                        <p>View/Create following sales entries</p>
                                        <ul>
                                            <li>Sales Orders</li>
                                            <li>Invoices</li>
                                            <li>Shipments</li>
                                            <li>Credit Memos</li>
                                        </ul>
                                    </div>
                                }>
                                    <span className="material-symbols-sharp" style={{ cursor: 'pointer' }}>
                                        info
                                    </span>
                                </CTooltip>
                            </CCol>

                        </CRow>
                    </CCollapse>

                </CRow>
            </div>
            <PinResetModel visible={visible} onClose={(val) => setVisible(val)} role={"Super Admin"} />

        </>
    )
}

export default Permissions