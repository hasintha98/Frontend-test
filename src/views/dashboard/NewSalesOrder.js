import { CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'

const NewSalesOrder = () => {
    return (
        <>
            <CRow>
                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>New Sales Orders</span>
            </CRow>
            <hr style={{ height: "12px" }} />
            <CRow className="mt-4">
                <CCol md={6} >
                    <CRow>
                        <CFormLabel htmlFor="Qty" className="col-sm-3 col-form-label">Customer Name *</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput id="Qty" aria-label="Default select example" />
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow className="mt-3">
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="Qty" className="col-sm-3 col-form-label">Sales Order# *</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput id="Qty" aria-label="Default select example" />
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow className="mt-3">
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="Qty" className="col-sm-3 col-form-label">Reference#</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput id="Qty" aria-label="Default select example" />
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="Qty" className="col-sm-3 col-form-label">Delivery Date</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput id="Qty" aria-label="Default select example" />
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow className="mt-3">
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="Qty" className="col-sm-3 col-form-label">Sales Order Date *</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput id="Qty" aria-label="Default select example" />
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="Qty" className="col-sm-3 col-form-label">Delivery Method</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput id="Qty" aria-label="Default select example" />
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            {/* Table */}

            <CRow className='p-2 mt-4'>
                <CTable bordered>
                    <CTableHead>
                        <CTableRow color="secondary">
                            <CTableHeaderCell scope="col" className='text-center'>Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Order #</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Customer Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Order Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Amount</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>

                        <CTableRow>
                            <CTableDataCell className='text-center'>15 Oct 2022</CTableDataCell>
                            <CTableDataCell className='text-center'>#SO452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe</CTableDataCell>
                            <CTableDataCell className='text-center'>INVOICED</CTableDataCell>
                            <CTableDataCell className='text-center'>LKR 201,500</CTableDataCell>
                            <CTableDataCell className='text-center' width={5}>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                                    delete
                                </span></CTableDataCell>


                        </CTableRow>



                    </CTableBody>
                </CTable>

                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Add another line<span className="material-symbols-outlined" style={{ fontSize: "1em" }}>
                    add
                </span>
                </span>
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
                    <CCol style={{ textAlign: 'end' }} >
                        <CRow className='mt-2'>
                            <CCol>
                                <span className='ms-5'>Sub Total</span>
                            </CCol>
                            <CCol>
                                <span className='ms-5'>1,080,000.00</span>
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
                        <CRow className='mt-4'>
                            <CCol >
                                <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>1,090,000.00</span>
                            </CCol>
                        </CRow>

                    </CCol>
                </CRow>

            </CRow>

        </>
    )
}

export default NewSalesOrder