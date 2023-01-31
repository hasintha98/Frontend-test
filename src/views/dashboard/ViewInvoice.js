import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import CustomersServices from 'src/services/CustomersServices';
import InvoiceServices from 'src/services/InvoiceService';
import SalesOrderServices from 'src/services/SalesOrderServices';
import swal from 'sweetalert';
const ViewInvoice = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const invId = new URLSearchParams(search).get('inv')
    const sop = new URLSearchParams(search).get('sop')
    console.log(invId)
    const [invoice, setInvoice] = useState(null)
    const [totalAmount, setTotalAmount] = useState(0)

    const [invoiceStatus, setInvoiceStatus] = useState(0)

    const [customerDetails, setCustomer] = useState(null)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getInvoiceDetails = () => {
        InvoiceServices.getInvoicesList("dash_page", 0, 10, "", null, null, -1)
        .then(response => {
            const item = response.data.invoiceList.find(obj => obj.id === Number(invId));
            setTotalAmount(parseFloat(item.order_sub_chargers) - parseFloat(item.order_delivery_chargers))
            setInvoice(item)
            setInvoiceStatus(item.invoice_status)
            CustomersServices.getAllCustomersInfo("dash_page", 0, 10, "")
                .then(response => {

                    const customer = response.data.customersList.find(obj => obj.id === Number(item.Orders_Data_TB.customerId));
                    setCustomer(customer)
                    console.log(customer)
                })
            console.log(item)
        })
    }

    useEffect(() => {
        getInvoiceDetails()
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const updateInvoiceStatus = () => {
        InvoiceServices.updateInvoiceByStatus("user_page", Number(invoice?.orderedId), Number(invoice?.id), invoiceStatus == 0 ? 1 : 0)
        .then(response => {
            swal("Success!", "Invoice Status Changed Successfully", "success")
            getInvoiceDetails()
            
        }).catch(error => {
            swal("Error!", error.response.data.message, "error")
        })
    }

    return (
        <>
            <CRow style={{ overflow: 'hidden' }}>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Invoice# {invId}</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>


                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"
                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate('/invoices')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CButtonGroup>
                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"
                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => updateInvoiceStatus()}
                        >{invoiceStatus == 0 ? "Mark as Paid" : "Mark as Unpaid"} </CButton>
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
                                    <p style={{ fontSize: "2.5em", fontWeight: "bold", textTransform: 'uppercase', padding: 0, margin: 0 }}>Invoice</p>
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{sop}</p>
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Invoice# IN{invoice?.ip}</p>
                                </CCol>


                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className='mt-5'>
                        <CCol md={3} >
                            <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                            <p>{customerDetails?.name}, </p>
                            <p>{customerDetails?.address} </p>
                            <p>{customerDetails?.phone}</p>
                        </CCol>

                    </CRow>
                    <CRow className='d-flex justify-content-end'>
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Invoice Date </span>: 22/12/2021</span>
                    </CRow>

                    {/* Table */}

                    <CRow className='p-2 mt-4 mb-1'>
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                    <CTableHeaderCell scope="col" className='text-start' >Item Details</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' >Quantity</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' >Rate</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={200}>Row Total</CTableHeaderCell>


                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {invoice?.NewInvoice_Items_TBs.map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell className='text-start'>{item.item_details}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{item.qty_to_invoice}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{item.rates}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{item.discounts} %</CTableDataCell>
                                        <CTableDataCell className='text-center'>{item.taxes} %</CTableDataCell>
                                        <CTableDataCell className='text-center'>Rs. {numberWithCommas(Number(item.total).toFixed(2))}</CTableDataCell>

                                    </CTableRow>
                                ))}

                              
                            </CTableBody>
                        </CTable>

                    </CRow>

                    <CRow>
                        <CCol md={6}>

                            <p className='mt-5'>Notes:</p>
                            <p>{invoice?.invoice_remarks}</p>


                        </CCol>
                        <CCol style={{ textAlign: 'end' }} >
                            <CRow className='mt-2'>
                                <CCol>
                                    <span className='ms-5'>Sub Total</span>
                                </CCol>
                                <CCol>
                                    <span className='ms-5'>{numberWithCommas(Number(invoice?.invoice_sub_chargers).toFixed(2))}</span>
                                </CCol>

                            </CRow>
                            <CRow className='mt-2'>
                                <CCol>
                                    <span className='ms-5'>Delivery Chargers</span>
                                </CCol>
                                <CCol>
                                    <span className='ms-5'>{numberWithCommas(Number(invoice?.invoice_delivery_chargers).toFixed(2))}</span>
                                </CCol>
                            </CRow>

                            <CRow className='mt-4'>
                                <CCol >
                                    <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                                </CCol>
                                <CCol>
                                    <span style={{ fontWeight: 'bold' }}>{numberWithCommas(Number(invoice?.invoice_grand_total).toFixed(2))}</span>
                                </CCol>
                            </CRow>


                        </CCol>
                    </CRow>
                </CRow>
            </div>
        </>
    )
}

export default ViewInvoice