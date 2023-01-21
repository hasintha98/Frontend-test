import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormCheck, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const NewMemo = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const orderId = new URLSearchParams(search).get('id')
    console.log(orderId)
    return (
        <>
            <CRow style={{ overflow: 'hidden' }}>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Order# {orderId}</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>


                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate('/sales/view?id=6546')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CButtonGroup>

                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <CRow className='ms-2 mb-5' style={{ overflow: 'scroll' }}>
                <CRow className='mt-5 '>
                    <CCol>
                        <p style={{ fontWeight: 'bold' }}>Riviruply Enterprises,</p>
                        <p>Ganegama, </p>
                        <p>Pelmadulla, </p>
                        <p>Sri Lanka</p>
                        <p>+94 754422606</p>
                    </CCol>
                    <CCol className='d-flex justify-content-end'>
                        <CRow>
                            <CCol>
                                <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>New Memo</p>
                                <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# {orderId}</p>
                            </CCol>


                        </CRow>
                    </CCol>
                </CRow>
                <CRow className='mt-5'>
                    <CCol md={3} >
                        <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                        <p>John Doe, </p>
                        <p>Homagama, </p>
                        <p>+94 77 045 1234</p>
                    </CCol>

                </CRow>
                <CRow className='d-flex justify-content-end'>
                    <CCol md={1}>
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Memo Date </span></span>
                    </CCol>
                    <CCol md={2}>
                        <CFormInput type="date" defaultValue={new Date().toLocaleDateString('en-CA')} />
                    </CCol>


                </CRow>

                {/* Table */}

                <CRow className='p-2 mt-4 mb-1'>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                <CTableHeaderCell scope="col" className='text-center' >Item Details</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' >Rate</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' >Qty</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Return to Stock</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={150}>Qty to Invoice</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' >Sub Total</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={200}>Row Total</CTableHeaderCell>


                            </CTableRow>
                        </CTableHead>
                        <CTableBody>

                            <CTableRow >
                                <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
                                <CTableDataCell className='text-center'>5400.00</CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <p>Ordered 200</p>
                                    <p>Shipped 175</p>
                                </CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <CFormCheck type='checkbox' />
                                </CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <CFormInput type="number" />
                                </CTableDataCell>
                                <CTableDataCell className='text-center'>1,166,400.00</CTableDataCell>
                                <CTableDataCell className='text-center'>0 %</CTableDataCell>
                                <CTableDataCell className='text-center'>8 %</CTableDataCell>
                                <CTableDataCell className='text-center'>1,020,600.00</CTableDataCell>

                            </CTableRow>
                            <CTableRow >
                                <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
                                <CTableDataCell className='text-center'>5400.00</CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <p>Ordered 200</p>
                                    <p>Shipped 175</p>
                                </CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <CFormCheck type='checkbox' />
                                </CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <CFormInput type="number" />
                                </CTableDataCell>
                                <CTableDataCell className='text-center'>1,166,400.00</CTableDataCell>
                                <CTableDataCell className='text-center'>0 %</CTableDataCell>
                                <CTableDataCell className='text-center'>8 %</CTableDataCell>
                                <CTableDataCell className='text-center'>1,020,600.00</CTableDataCell>

                            </CTableRow>
                        </CTableBody>
                    </CTable>

                </CRow>

                <CRow>
                    <CCol md={6}>

                        <p className='mt-5'>Notes:</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>


                    </CCol>
                    <CCol style={{ textAlign: 'end' }} >
                        <CRow className='mt-2'>
                            <CCol>
                                <span className='ms-5'>Sub Total</span>
                            </CCol>
                            <CCol>
                                <span className='ms-5'>1,224,720.00</span>
                            </CCol>

                        </CRow>
                        <CRow className='mt-2'>
                            <CCol>
                                <span className='ms-5'>Adjustment Refund</span>
                            </CCol>
                            <CCol>
                                <span className='ms-5'>10,000.00</span>
                            </CCol>
                        </CRow>
                  
                        <CRow className='mt-4'>
                            <CCol >
                                <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>1,181,400.00</span>
                            </CCol>
                        </CRow>
                        <CRow className='mt-4'>
                            <CCol>
                            <CButton color="secondary" variant="outline">Update Total {' '}
                                <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                    sync
                                </span></CButton>
                            </CCol>
                          
                        </CRow>
                        <CButton
                            color="success"
                            style={{ color: '#fff', width: "30%", marginTop: '30px' }}
                        // onClick={() => onClose(false)}
                        >
                            Refund Offline
                        </CButton>

                    </CCol>
                </CRow>
            </CRow>

        </>
    )
}

export default NewMemo