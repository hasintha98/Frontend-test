import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import CustomersServices from 'src/services/CustomersServices';
import ShipmentServices from 'src/services/ShipmentService';
const ViewShipment = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const shipId = new URLSearchParams(search).get('shipId')

    const [shipment, setShipment] = useState(null)
    const [customer, setCustomer] = useState(null)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getShipmentDetails = () => {
        ShipmentServices.getShipmentList("dash_page", 0, 10, "", null, null, -1)
            .then(response => {
                const item = response.data.shipmentInvoiceList.find(obj => obj.id === Number(shipId));
                // setTotalAmount(parseFloat(item.order_sub_chargers) - parseFloat(item.order_delivery_chargers))
                setShipment(item)
                // setInvoiceStatus(item.invoice_status)
                CustomersServices.getAllCustomersInfo("dash_page", 0, 10, "")
                    .then(response => {
                        console.log(response)
                        const customer = response.data.customersList.find(obj => obj.id === Number(item?.Orders_Data_TB.customerId));
                        setCustomer(customer)

                    })
                console.log(item)
            })
    }

    useEffect(() => {
        getShipmentDetails()
    }, [])
    return (
        <>
            <CRow style={{ overflow: 'hidden' }}>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Order# SO{shipment?.Orders_Data_TB.sop}</span>
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
                                    <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>Shipping Note</p>
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{shipment?.Orders_Data_TB.sop}</p>
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Shipment# SN{shipment?.sip ? shipment?.sip : shipId}</p>
                                </CCol>


                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className='mt-5'>
                        <CCol md={3} >
                            <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                            <p>{customer?.name}, </p>
                            <p>{customer?.address} </p>
                            <p>{customer?.phone}</p>
                        </CCol>
                        <CCol>
                            <p style={{ fontWeight: 'bold' }}>Ship To:</p>
                            <p>{shipment?.shipment_to_name}, </p>
                            <p>{shipment?.shipment_to_address} </p>
                            <p>{shipment?.shipment_to_phone}</p>
                        </CCol>
                    </CRow>
                    <CRow className='d-flex justify-content-end'>
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Shipment Date </span>: {moment(shipment?.shipment_date).format("YYYY-MM-DD")}</span>
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
                                {shipment?.ShipmentInvoice_Items_TBs.map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell className='text-start'>{item.item_details}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{item.qty_shipping}</CTableDataCell>
                                    </CTableRow>
                                ))}

                            </CTableBody>
                        </CTable>

                    </CRow>

                    <CRow>
                        <CCol md={6}>

                            <p className='mt-3'>Notes:</p>
                            <p>{shipment?.shipment_remarks}</p>


                        </CCol>

                    </CRow>
                </CRow>
            </div>

        </>
    )
}

export default ViewShipment