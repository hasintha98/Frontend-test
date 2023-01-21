import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {useReactToPrint } from 'react-to-print';
const ViewShipment = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const shipId = new URLSearchParams(search).get('shipId')
    console.log(shipId)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    return (
        <>
            <CRow style={{ overflow: 'hidden' }}>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Shipment# {shipId}</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>


                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"
                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate('/shipments')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CButtonGroup>

                    <CButtonGroup className="me-2" style={{ height: '35px' }} role="group" aria-label="Second group">
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
                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <div ref={componentRef} style={{padding: '50px'}}>
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
                                <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>Shipping Note</p>
                                <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO451</p>
                                <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Shipment# {shipId}</p>
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
                    <CCol>
                        <p style={{ fontWeight: 'bold' }}>Ship To:</p>
                        <p>John Doe, </p>
                        <p>Homagama, </p>
                        <p>+94 77 045 1234</p>
                    </CCol>
                </CRow>
                <CRow className='d-flex justify-content-end'>
                    <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Shipment Date </span>: 22/12/2021</span>
                </CRow>

                {/* Table */}

                <CRow className='p-2 mt-4 mb-5'>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                <CTableHeaderCell scope="col" className='text-start' >Item Details</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={300}>Quantity</CTableHeaderCell>

                            </CTableRow>
                        </CTableHead>
                        <CTableBody>

                            <CTableRow >
                                <CTableDataCell className='text-start'>OK-G1</CTableDataCell>
                                <CTableDataCell className='text-center'>175</CTableDataCell>
                            </CTableRow>
                            <CTableRow >
                                <CTableDataCell className='text-start'>OK-G1</CTableDataCell>
                                <CTableDataCell className='text-center'>175</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>

                </CRow>

                <CRow>
                    <CCol md={6}>

                        <p className='mt-3'>Notes:</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.</p>


                    </CCol>

                </CRow>
            </CRow>
            </div>

        </>
    )
}

export default ViewShipment