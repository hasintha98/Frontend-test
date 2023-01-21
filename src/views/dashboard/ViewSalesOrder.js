import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
const ViewSalesOrder = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const orderId = new URLSearchParams(search).get('id')
    console.log(orderId)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


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
                            onClick={() => navigate('/sales')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CButtonGroup>



                    <CButtonGroup className="me-2" style={{ height: '35px' }} role="group" aria-label="Second group">
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                edit
                            </span>
                        </CButton>
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={handlePrint}>
                                picture_as_pdf
                            </span>
                        </CButton>
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={handlePrint}>
                                print
                            </span>
                        </CButton>
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                mail
                            </span>
                        </CButton>
                    </CButtonGroup>

                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate('/memos/new?id=6546')}
                        >Credit Memo</CButton>
                    </CButtonGroup>

                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate('/invoices/new?id=6546')}
                        >Invoice</CButton>
                    </CButtonGroup>

                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate('/shipments/new?id=6546')}
                        >Ship</CButton>
                    </CButtonGroup>
                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CDropdown >
                            <CDropdownToggle color="secondary" style={{ width: "100%", backgroundColor: '#D9D9D9' }}>View</CDropdownToggle>
                            <CDropdownMenu className='mt-2'>
                                <CDropdownItem onClick={() => navigate('/invoices')}>Invoice</CDropdownItem>
                                <CDropdownItem onClick={() => navigate('/shipments')}>Shipment</CDropdownItem>
                                <CDropdownItem onClick={() => navigate('/memos')} >Credit Info</CDropdownItem>
                                <CDropdownItem onClick={() => navigate(`/logs?id=${orderId}`)} >Activity Logs</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CButtonGroup>

                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <div ref={componentRef} style={{ padding: '50px' }}>
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
                                    <p style={{ fontSize: "2.5em", fontWeight: "bold", textTransform: 'uppercase', padding: 0, margin: 0 }}>SALES ORDER</p>
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# {orderId}</p>
                                </CCol>


                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className='mt-5'>
                        <CCol>
                            <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                            <p>John Doe, </p>
                            <p>Homagama, </p>
                            <p>+94 77 045 1234</p>
                        </CCol>
                    </CRow>
                    <CRow >
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Order Date </span>: 22/12/2021</span>
                    </CRow>

                    {/* Table */}

                    <CRow className='p-2 mt-4 mb-5'>
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                    <CTableHeaderCell scope="col" className='text-center' width={400}>Item Details</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center'>Item Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={150}>Quantity</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={150}>Rate</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={300}>Raw Total</CTableHeaderCell>

                                </CTableRow>
                            </CTableHead>
                            <CTableBody>

                                <CTableRow >
                                    <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
                                    <CTableDataCell className='text-center'>Partial</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <p>Ordered 200</p>
                                        <p>Shipped 200</p>
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>5400.00</CTableDataCell>
                                    <CTableDataCell className='text-center'>0 %</CTableDataCell>
                                    <CTableDataCell className='text-center'>8 %</CTableDataCell>
                                    <CTableDataCell className='text-center'>1,166,400.00</CTableDataCell>

                                </CTableRow>
                                <CTableRow >
                                    <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
                                    <CTableDataCell className='text-center'>Partial</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <p>Ordered 200</p>
                                        <p>Shipped 200</p>
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>5400.00</CTableDataCell>
                                    <CTableDataCell className='text-center'>0 %</CTableDataCell>
                                    <CTableDataCell className='text-center'>8 %</CTableDataCell>
                                    <CTableDataCell className='text-center'>1,166,400.00</CTableDataCell>

                                </CTableRow>
                            </CTableBody>
                        </CTable>

                    </CRow>

                    <CRow>
                        <CCol md={6}>
                            <p>Notes:</p>
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
                                    <span className='ms-5'>Delivery Chargers</span>
                                </CCol>
                                <CCol>
                                    <span className='ms-5'>10,000.00</span>
                                </CCol>
                            </CRow>
                            <CRow className='mt-2'>
                                <CCol>
                                    <span className='ms-5'>Credit Memo</span>
                                </CCol>
                                <CCol>
                                    <span className='ms-5'>53,320.00</span>
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

                        </CCol>
                    </CRow>
                </CRow>
            </div>
        </>
    )
}

export default ViewSalesOrder