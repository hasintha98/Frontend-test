import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import SendEmailModel from 'src/components/Models/SendEmailModel';
import CustomersServices from 'src/services/CustomersServices';
import ShipmentServices from 'src/services/ShipmentService';
const ViewShipment = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const shipId = new URLSearchParams(search).get('shipId')
    const [emailVisible, setEmailVisible] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [shipment, setShipment] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [isPrinting, setIsPrinting] = useState(false)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const onPrint = () => {

        setIsPrinting(true)
        setTimeout(() =>  {
            handlePrint()
            setIsPrinting(false)

        }, 500)
       
    }

    const getShipmentDetails = () => {
        ShipmentServices.getShipmentList("dash_page", 0, 999, "", null, null, -1)
            .then(response => {
                const item = response.data.shipmentInvoiceList.find(obj => obj.id === Number(shipId));
                // setTotalAmount(parseFloat(item.order_sub_chargers) - parseFloat(item.order_delivery_chargers))
                setShipment(item)
                // setInvoiceStatus(item.invoice_status)
                CustomersServices.getAllCustomersInfo("dash_page", 0, 999, "")
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

    const handleEmailPDF = async () => {
        // Get the component's HTML element
        const element = document.getElementById('ship-to-export');

        // Use html2canvas to convert the element to a canvas
        const canvas = await html2canvas(element);

        // Use jsPDF to create a PDF from the canvas
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

        const file = new File([pdf.output('blob')], "document.pdf", { type: 'application/pdf' });

        setSelectedData({
            subject: "SHIPMENT INVOICE: SN" + shipment?.sip,
            description: "This is to sending the shipment invoice of SN" + shipment?.sip,
            file: file,
            fileName: "SN" + shipment?.sip
        })
        setEmailVisible(true)
    }

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
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={onPrint}>
                                picture_as_pdf
                            </span>
                        </CButton>
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={onPrint}>
                                print
                            </span>
                        </CButton>
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={() => handleEmailPDF()}>
                                mail
                            </span>
                        </CButton>
                    </CButtonGroup>
                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <div ref={componentRef} style={{ padding: '40px', fontSize: '0.8em' }}>
                <div id="ship-to-export" style={{ minHeight: "500px", maxHeight: "500px" }}>
                    <CRow className='ms-2 mb-1' style={{ overflow: 'scroll' }}>
                        <CRow className='mt-1 '>
                            <CCol md={3}>
                                <span style={{ fontWeight: 'bold' }}>Riviruply Enterprises,</span><br />
                                <span>Ganegama, </span><br />
                                <span>Pelmadulla, </span><br />
                                <span>Sri Lanka</span><br />
                                <span>+94 754422606</span>
                            </CCol>
                            <CCol md={3} >
                                <span style={{ fontWeight: 'bold' }}>Bill To:</span><br />
                                <span>{customer?.name}, </span><br />
                                <span>{customer?.address} </span><br />
                                <span>{customer?.phone}</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>Ship To:</span><br />
                                <span>{shipment?.shipment_to_name}, </span><br />
                                <span>{shipment?.shipment_to_address} </span><br />
                                <span>{shipment?.shipment_to_phone}</span>
                            </CCol>
                            <CCol className='d-flex justify-content-end'>
                                <CRow>
                                    <CCol>
                                        <p style={{ fontSize: "2.1em", fontWeight: "bold", padding: 0, margin: 0 }}>Shipping Note</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{shipment?.Orders_Data_TB.sop}</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Shipment# SN{shipment?.sip ? shipment?.sip : shipId}</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Shipment Ref# {shipment?.ref_no ? shipment?.ref_no : shipId}</p>
                                    </CCol>


                                </CRow>
                            </CCol>
                        </CRow>

                        <CRow className='d-flex justify-content-end'>
                            <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Shipment Date </span>: {moment(shipment?.shipment_date).format("YYYY-MM-DD")}</span>
                        </CRow>

                        {/* Table */}

                        <CRow className='p-2 mb-1'>
                            <CTable bordered small>
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

                                <span className='mt-3'>Notes:</span>
                                <span>{shipment?.shipment_remarks}</span>

                                <p className='mt-3'>Vehicle No: </p>

                            </CCol>

                        </CRow>
                        <CRow className='mt-5'>
                            <CCol>
                                Checked By ........................
                            </CCol>
                            <CCol>
                                Approved By ........................
                            </CCol>
                            <CCol>
                                Customer Signature ........................
                            </CCol>
                        </CRow>
                    </CRow>
                </div>
                <hr />
                <div hidden={!isPrinting} >
                    <CRow className='ms-2 mb-1' style={{ overflow: 'scroll' }}>
                        <CRow className='mt-1 '>
                            <CCol md={3}>
                                <span style={{ fontWeight: 'bold' }}>Riviruply Enterprises,</span><br />
                                <span>Ganegama, </span><br />
                                <span>Pelmadulla, </span><br />
                                <span>Sri Lanka</span><br />
                                <span>+94 754422606</span>
                            </CCol>
                            <CCol md={3} >
                                <span style={{ fontWeight: 'bold' }}>Bill To:</span><br />
                                <span>{customer?.name}, </span><br />
                                <span>{customer?.address} </span><br />
                                <span>{customer?.phone}</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>Ship To:</span><br />
                                <span>{shipment?.shipment_to_name}, </span><br />
                                <span>{shipment?.shipment_to_address} </span><br />
                                <span>{shipment?.shipment_to_phone}</span>
                            </CCol>
                            <CCol className='d-flex justify-content-end'>
                                <CRow>
                                    <CCol>
                                        <p style={{ fontSize: "2.1em", fontWeight: "bold", padding: 0, margin: 0 }}>Shipping Note</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{shipment?.Orders_Data_TB.sop}</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Shipment# SN{shipment?.sip ? shipment?.sip : shipId}</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Shipment Ref# {shipment?.ref_no ? shipment?.ref_no : shipId}</p>
                                    </CCol>


                                </CRow>
                            </CCol>
                        </CRow>

                        <CRow className='d-flex justify-content-end'>
                            <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Shipment Date </span>: {moment(shipment?.shipment_date).format("YYYY-MM-DD")}</span>
                        </CRow>

                        {/* Table */}

                        <CRow className='p-2 mb-1'>
                            <CTable bordered small>
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

                                <span className='mt-3'>Notes:</span>
                                <span>{shipment?.shipment_remarks}</span>

                                <p className='mt-3'>Vehicle No: </p>
                            </CCol>

                        </CRow>
                        <CRow className='mt-5'>
                            <CCol>
                                Checked By ........................
                            </CCol>
                            <CCol>
                                Approved By ........................
                            </CCol>
                            <CCol>
                                Customer Signature ........................
                            </CCol>
                        </CRow>
                    </CRow>
                </div>
            </div>
            <SendEmailModel visible={emailVisible} onClose={(val) => setEmailVisible(val)} recordId={"SN" + shipment?.sip} data={selectedData} title="Shipment Note" />

        </>
    )
}

export default ViewShipment