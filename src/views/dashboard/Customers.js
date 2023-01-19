import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';

const Customers = () => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const navigate = useNavigate();
    return (
        <>
            <CRow>
                <CCol md={8}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Customers</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol >
                        <CInputGroup >
                            <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search here' />
                            <CInputGroupText className='default-border'><span className="material-symbols-outlined">
                                search
                            </span></CInputGroupText>
                        </CInputGroup>
                    </CCol>
                    <CCol md={4}>
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
            <CRow className='mt-5'>


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
                            <CTableHeaderCell scope="col" className='text-center'>Customer</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Phone</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Done Orders</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Pending Orders</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Cancel Orders</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell className='text-center'>Cash Customer</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>759999999</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#00B050' }}>1</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF6720' }}>0</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF0000' }}>0</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} >
                                    description
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'>Cash Customer</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>759999999</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#00B050' }}>1</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF6720' }}>0</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF0000' }}>0</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} >
                                    description
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'>Cash Customer</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>759999999</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#00B050' }}>1</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF6720' }}>0</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF0000' }}>0</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} >
                                    description
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'>Cash Customer</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>759999999</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#00B050' }}>1</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF6720' }}>0</CTableDataCell>
                            <CTableDataCell className='text-center' style={{ color: '#FF0000' }}>0</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} >
                                    description
                                </span>
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

                            {/* <CFormSelect id="pageNo" aria-label="Default select example" style={{ width: "100%" }} direction="dropup">
                                <option>1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>

                            </CFormSelect> */}
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
        </>
    )
}

export default Customers