import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateRangePicker } from 'rsuite'
import ExportModel from 'src/components/Models/ExportModel'
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel'
import { predefinedRanges } from 'src/data/preDefinedDateRanges'
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import "rsuite/dist/rsuite.min.css"

const SalesOrder = () => {
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)

    const navigate = useNavigate();
    return (
        <>
            <CRow>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Sales Orders</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol md={5}>
                        <CInputGroup >
                            <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search here' />
                            <CInputGroupText className='default-border'><span className="material-symbols-outlined">
                                search
                            </span></CInputGroupText>
                        </CInputGroup>
                    </CCol>
                    <CCol >
                        <CButton
                            role="button"
                            className='blue-button'
                            style={{ width: "100%" }}
                            variant="outline"
                            onClick={() => setVisible(true)}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                download
                            </span>{' '}Export</CButton>
                    </CCol>
                    <CCol>
                        <CButton
                            color="success"
                            className='default-border'
                            variant="outline"
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                            onClick={() => navigate('/sales/new')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                add
                            </span>{' '}New</CButton>
                    </CCol>
                </CCol>
            </CRow>

            <CRow className='mt-3'>
                <CCol md={2}>
                    <CFormSelect className='default-border' aria-label="Default select example">
                        <option>Bulk Action</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>Three</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Apply</CButton>
                </CCol>
                <CCol md={2}>
                    <DateRangePicker
                        ranges={predefinedRanges}
                        style={{ width: "100%" }}
                        placeholder="Date"
                        format="yyyy-MM-dd HH:mm:ss"
                        defaultCalendarValue={[new Date('2023-01-01 00:00:00'), new Date()]}
                    />
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
                </CCol>
                <CCol md={2}>
                    <CFormSelect className='default-border' aria-label="Default select example">
                        <option>Order Status</option>
                        <option value="1">INVOICED</option>
                        <option value="2">COMPLETED</option>
                        <option value="3" disabled>PENDING</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
                </CCol>

                <CCol className="d-flex justify-content-end">
                    <CRow>
                        <CCol>
                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Prev</CButton>
                        </CCol>
                        <CCol>
                            <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>1 of 5</span>
                        </CCol>
                        <CCol>

                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Next</CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>

            {/* Table */}

            <CRow className='p-2 mt-4'>
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col" className='text-center' width={5}><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Order #</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Customer Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Order Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row" className='text-center'>15 Oct 2022</CTableHeaderCell>
                            <CTableDataCell className='text-center'>#SO452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe</CTableDataCell>
                            <CTableDataCell className='text-center'>INVOICED</CTableDataCell>
                            <CTableDataCell className='text-center'>LKR 201,500</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row" className='text-center'>15 Oct 2022</CTableHeaderCell>
                            <CTableDataCell className='text-center'>#SO452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe</CTableDataCell>
                            <CTableDataCell className='text-center'>COMPLETED</CTableDataCell>
                            <CTableDataCell className='text-center'>LKR 201,500</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row" className='text-center'>15 Oct 2022</CTableHeaderCell>
                            <CTableDataCell className='text-center'>#SO452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe</CTableDataCell>
                            <CTableDataCell className='text-center'>COMPLETED</CTableDataCell>
                            <CTableDataCell className='text-center'>LKR 201,500</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row" className='text-center'>15 Oct 2022</CTableHeaderCell>
                            <CTableDataCell className='text-center'>#SO452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe</CTableDataCell>
                            <CTableDataCell className='text-center'>PENDING</CTableDataCell>
                            <CTableDataCell className='text-center'>LKR 201,500</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>

                    </CTableBody>
                </CTable>
            </CRow>

            <CRow>
                <CCol md={1}></CCol>
                <CCol className="d-flex justify-content-end" >
                    <CRow>
                        <CCol>

                            <CDropdown variant="btn-group" direction="dropup" >
                                <CDropdownToggle style={{ backgroundColor: '#fff' }} color="secondary">1</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem href="#">2</CDropdownItem>
                                    <CDropdownItem href="#">3</CDropdownItem>
                                    <CDropdownItem href="#">4</CDropdownItem>

                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol>
                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Prev</CButton>
                        </CCol>
                        <CCol>
                            <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>1 of 5</span>
                        </CCol>
                        <CCol>

                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Next</CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>
            <RecordDeleteModel visible={deleteVisible} onClose={(val) => setDeleteVisible(val)} recordId={"#5765"} />

            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
        </>
    )
}

export default SalesOrder