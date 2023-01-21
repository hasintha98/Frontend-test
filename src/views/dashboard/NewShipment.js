import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const NewShipment = () => {
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
                                <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>New Shipment</p>
                                <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# {orderId}</p>
                            </CCol>


                        </CRow>
                    </CCol>
                </CRow>
                <CRow className='mt-5'>
                    <CCol md={3} className="mt-5">
                        <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                        <p>John Doe, </p>
                        <p>Homagama, </p>
                        <p>+94 77 045 1234</p>
                    </CCol>
                    <CCol>
                        <p style={{ color: 'green', cursor: 'pointer' }}>Edit</p>
                        <p style={{ fontWeight: 'bold' }}>Ship To:</p>
                        <p>John Doe, </p>
                        <p>Homagama, </p>
                        <p>+94 77 045 1234</p>
                    </CCol>
                </CRow>
                <CRow className='d-flex justify-content-end'>
                    <CCol md={1}>
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Delivery Date </span></span>
                    </CCol>
                    <CCol md={2}>
                        <CFormInput type="date" defaultValue={new Date().toLocaleDateString('en-CA')} />
                    </CCol>


                </CRow>

                {/* Table */}

                <CRow className='p-2 mt-4 mb-5'>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                <CTableHeaderCell scope="col" className='text-center' >Item Details</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' >Qty</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={200}>Qty to Ship</CTableHeaderCell>
                        

                            </CTableRow>
                        </CTableHead>
                        <CTableBody>

                            <CTableRow >
                                <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
                                <CTableDataCell className='text-center'>Ordered 200</CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <CFormInput type="number" />
                                </CTableDataCell>
           

                            </CTableRow>
                            <CTableRow >
                                <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
                                <CTableDataCell className='text-center'>Ordered 200</CTableDataCell>
                                <CTableDataCell className='text-center'>
                                    <CFormInput type="number" />
                                </CTableDataCell>
           

                            </CTableRow>
                        </CTableBody>
                    </CTable>

                </CRow>

                <CRow>
                <CCol md={6}>
                        <CRow className='mt-5'>
                            <CForm>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    label="Notes"
                                    rows={3}

                                ></CFormTextarea>
                            </CForm>
                        </CRow>

                    </CCol>
                    <CCol style={{ textAlign: 'end', marginTop: '100px' }} >
                    <CButton
                        color="success"
                        style={{ color: '#fff', width: "30%" }}
                        // onClick={() => onClose(false)}
                        >
                        Submit Shipment
                    </CButton>

                    </CCol>
                </CRow>
            </CRow>

        </>
    )
}

export default NewShipment