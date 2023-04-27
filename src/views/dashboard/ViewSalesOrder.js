import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import LoadingModel from 'src/components/Models/LoadingModel';
import SalesOrderServices from 'src/services/SalesOrderServices';
import swal from 'sweetalert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import SendEmailModel from 'src/components/Models/SendEmailModel';

const ViewSalesOrder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const search = useLocation().search
    const orderId = new URLSearchParams(search).get('sop')
    const id = new URLSearchParams(search).get('id')
    const [salesOrder, setSalesOrder] = useState(null)
    console.log(orderId)
    const [selectedData, setSelectedData] = useState(null)
    const [totalAmount, setTotalAmount] = useState(0)
    const [orderStatus, setOrderStatus] = useState(0)
    const [emailVisible, setEmailVisible] = useState(false)
    const [isPrinting, setIsPrinting] = useState(false)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const onPrint = () => {
        setLoading(true)
        setIsPrinting(true)
        setTimeout(() =>  {
            handlePrint()
            setIsPrinting(false)
            setLoading(false)
        }, 500)
       
    }

    useEffect(() => {
        getDetails()

    }, [])

    const getDetails = () => {
        setLoading(false)
        SalesOrderServices.getSalesList("dash_page", 0, 999, "", null, null, -1)
            .then(response => {
                console.log(response)
                const item = response.data.salesList.find(obj => obj.id === Number(id));
                setTotalAmount(parseFloat(item.order_sub_chargers) + parseFloat(item.order_delivery_chargers) - parseFloat(item?.order_total_refund))
                setSalesOrder(item)
                setOrderStatus(item.order_status)
                console.log(item)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                swal("Error!", error.response.message, "error")
                console.log(error.response.message)
            })
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const changeStatus = (status) => {
        setLoading(true)
        setLoadingMsg('')
        SalesOrderServices.updateSalesOrderStatus("dash_page", Number(salesOrder?.id), status)
            .then(response => {
                swal("Success!", "Credit Memo Status Changed Successfully", "success")
                getDetails()
                setLoading(false)

            }).catch(error => {
                swal("Error!", error.response.data.message, "error")
                setLoading(false)
            })
    }


    const handleEmailPDF = async () => {
        // Get the component's HTML element

        const element = document.getElementById('component-to-export');

        // Use html2canvas to convert the element to a canvas
        const canvas = await html2canvas(element);

        // Use jsPDF to create a PDF from the canvas
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

        const file = new File([pdf.output('blob')], "document.pdf", { type: 'application/pdf' });

        setSelectedData({
            subject: "SALES ORDER: " + orderId,
            description: "This is to sending the sales order invoice of " + orderId,
            file: file,
            fileName: orderId
        })
        setEmailVisible(true)

    }

    return (
        <>
            <CRow style={{ overflow: 'hidden' }}>
                <CCol md={4}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Order# SO{salesOrder?.sop} ({orderStatus == 0 ? "PENDING" : orderStatus == 1 ? "INVOICED" : "CANCELED"})</span>
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
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={onPrint}>
                                picture_as_pdf
                            </span>
                        </CButton>
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={() =>

                                onPrint()}>
                                print
                            </span>
                        </CButton>
                        <CButton style={{ backgroundColor: '#D9D9D9' }} color="secondary">
                            <span className="material-symbols-outlined pt-1" onClick={() => handleEmailPDF()} style={{ fontSize: "1.1em" }}>
                                mail
                            </span>
                        </CButton>
                    </CButtonGroup>

                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate(`/memos/new?id=${id}`)}
                        >Credit Memo</CButton>
                    </CButtonGroup>

                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate(`/invoices/new?id=${id}`)}
                        >Invoice</CButton>
                    </CButtonGroup>

                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"

                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate(`/shipments/new?id=${id}`)}
                        >Ship</CButton>
                    </CButtonGroup>
                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CDropdown >
                            <CDropdownToggle color="secondary" style={{ width: "100%", backgroundColor: '#D9D9D9' }}>Mark As</CDropdownToggle>
                            <CDropdownMenu className='mt-2'>
                                {orderStatus != 0 ? <CDropdownItem onClick={() => changeStatus(0)}>PENDING</CDropdownItem> : null}
                                {orderStatus != 1 ? <CDropdownItem onClick={() => changeStatus(1)}>INVOICED</CDropdownItem> : null}
                                {orderStatus != 2 ? <CDropdownItem onClick={() => changeStatus(2)} >CANCELED</CDropdownItem> : null}
                            </CDropdownMenu>
                        </CDropdown>
                    </CButtonGroup>
                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CDropdown >
                            <CDropdownToggle color="secondary" style={{ width: "100%", backgroundColor: '#D9D9D9' }}>View</CDropdownToggle>
                            <CDropdownMenu className='mt-2'>
                                <CDropdownItem onClick={() => navigate(`/invoices?sop=${orderId}`)}>Invoice</CDropdownItem>
                                <CDropdownItem onClick={() => navigate(`/shipments?sop=${orderId}`)}>Shipment</CDropdownItem>
                                <CDropdownItem onClick={() => navigate(`/memos?sop=${orderId}`)} >Credit Info</CDropdownItem>
                                <CDropdownItem onClick={() => navigate(`/logs?id=${orderId}`)} >Activity Logs</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CButtonGroup>

                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <div ref={componentRef} style={{ padding: '30px', fontSize: '0.8em' }}>
                <div id="component-to-export" style={{ minHeight: "500px", maxHeight: "500px" }}>
                    <CRow className='ms-2 mb-1' style={{ overflow: 'scroll' }}>
                        <CRow className='mt-1 '>
                            <CCol md={3}>
                                <span style={{ fontWeight: 'bold' }}>Riviruply Enterprises,</span><br />
                                <span>Ganegama, </span><br />
                                <span>Pelmadulla, </span><br />
                                <span>Sri Lanka</span><br />
                                <span>+94 754422606</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>Bill To:</span><br />
                                <span>{salesOrder?.Customers_Data_TB.name}, </span><br />
                                <span>{salesOrder?.Customers_Data_TB.address} </span><br />
                                <span>{salesOrder?.Customers_Data_TB.phone}</span>
                            </CCol>
                            <CCol className='d-flex justify-content-end'>
                                <CRow>
                                    <CCol>
                                        <p style={{ fontSize: "2.5em", fontWeight: "bold", textTransform: 'uppercase', padding: 0, margin: 0 }}>SALES ORDER</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{salesOrder?.sop}</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order Ref# {salesOrder?.ref_no}</p>
                                    </CCol>


                                </CRow>
                            </CCol>
                        </CRow>

                        <CRow >
                            <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Order Date </span>: {moment(salesOrder?.order_date).format('YYYY-MM-DD')}</span>
                        </CRow>

                        {/* Table */}

                        <CRow className='p-2 mb-1'>
                            <CTable bordered small>
                                <CTableHead>
                                    <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                        <CTableHeaderCell scope="col" className='text-center' width={400}>Item Details</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={100}>Item Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={150}>Quantity</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={150}>Rate</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={300}>Raw Total</CTableHeaderCell>

                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {salesOrder?.Orders_Items_TBs.map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell className='text-center'>{item.type} - {item.size}mm</CTableDataCell>
                                            <CTableDataCell className='text-center'>{item.item_status == 0 ? "Partial" : "Shipped"}</CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                                {item.qty_ordered ? <><span>Ordered {item.qty_ordered}</span><br /></> : null}
                                                {item.qty_invoiced ? <><span>Invoiced {item.qty_invoiced}</span> <br /></> : null}
                                                {item.qty_shipped ? <><span>Shipped {item.qty_shipped}</span> <br /></> : null}
                                                {item.qty_returned ? <><span>Returned {item.qty_returned}</span> <br /></> : null}
                                            </CTableDataCell>
                                            <CTableDataCell className='text-center'>{numberWithCommas(Number(item.rates).toFixed(2))}</CTableDataCell>
                                            <CTableDataCell className='text-center'>{item.discounts} %</CTableDataCell>
                                            <CTableDataCell className='text-center'>{item.taxes} %</CTableDataCell>
                                            <CTableDataCell className='text-center'>{numberWithCommas(Number(item.total).toFixed(2))}</CTableDataCell>

                                        </CTableRow>
                                    ))}

                                </CTableBody>
                            </CTable>

                        </CRow>

                        <CRow>
                            <CCol md={6}>
                                <span>Notes:</span> <span>{salesOrder?.order_remarks}</span>

                                <p className='mt-3'>Vehicle No: </p>
                            </CCol>
                            <CCol style={{ textAlign: 'end' }} >
                                <CRow className='mt-2'>
                                    <CCol>
                                        <span className='ms-5'>Sub Total</span>
                                    </CCol>
                                    <CCol>
                                        <span className='ms-5'>{numberWithCommas(Number(salesOrder?.order_sub_chargers).toFixed(2))}</span>
                                    </CCol>

                                </CRow>
                                <CRow className='mt-2'>
                                    <CCol>
                                        <span className='ms-5'>Delivery Chargers</span>
                                    </CCol>
                                    <CCol>
                                        <span className='ms-5'>{numberWithCommas(Number(salesOrder?.order_delivery_chargers).toFixed(2))}</span>
                                    </CCol>
                                </CRow>
                                {salesOrder?.order_total_refund ? <CRow className='mt-2'>
                                    <CCol>
                                        <span className='ms-5'>Credit Memo</span>
                                    </CCol>
                                    <CCol>
                                        <span className='ms-5'>{numberWithCommas(Number(salesOrder?.order_total_refund).toFixed(2))}</span>
                                    </CCol>
                                </CRow> : null}
                                <CRow className='mt-4'>
                                    <CCol >
                                        <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                                    </CCol>
                                    <CCol>
                                        <span style={{ fontWeight: 'bold' }}>{numberWithCommas(Number(totalAmount).toFixed(2))}</span>
                                    </CCol>
                                </CRow>

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
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>Bill To:</span><br />
                                <span>{salesOrder?.Customers_Data_TB.name}, </span><br />
                                <span>{salesOrder?.Customers_Data_TB.address} </span><br />
                                <span>{salesOrder?.Customers_Data_TB.phone}</span>
                            </CCol>
                            <CCol className='d-flex justify-content-end'>
                                <CRow>
                                    <CCol>
                                        <p style={{ fontSize: "2.5em", fontWeight: "bold", textTransform: 'uppercase', padding: 0, margin: 0 }}>SALES ORDER</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{salesOrder?.sop}</p>
                                        <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order Ref# {salesOrder?.ref_no}</p>
                                    </CCol>


                                </CRow>
                            </CCol>
                        </CRow>

                        <CRow >
                            <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Order Date </span>: {moment(salesOrder?.order_date).format('YYYY-MM-DD')}</span>
                        </CRow>

                        {/* Table */}

                        <CRow className='p-2 mb-1'>
                            <CTable bordered small>
                                <CTableHead>
                                    <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                        <CTableHeaderCell scope="col" className='text-center' width={400}>Item Details</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={100}>Item Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={150}>Quantity</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={150}>Rate</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='text-center' width={300}>Raw Total</CTableHeaderCell>

                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {salesOrder?.Orders_Items_TBs.map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell className='text-center'>{item.type} - {item.size}mm</CTableDataCell>
                                            <CTableDataCell className='text-center'>{item.item_status == 0 ? "Partial" : "Shipped"}</CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                                {item.qty_ordered ? <><span>Ordered {item.qty_ordered}</span><br /></> : null}
                                                {item.qty_invoiced ? <><span>Invoiced {item.qty_invoiced}</span> <br /></> : null}
                                                {item.qty_shipped ? <><span>Shipped {item.qty_shipped}</span> <br /></> : null}
                                                {item.qty_returned ? <><span>Returned {item.qty_returned}</span> <br /></> : null}
                                            </CTableDataCell>
                                            <CTableDataCell className='text-center'>{numberWithCommas(Number(item.rates).toFixed(2))}</CTableDataCell>
                                            <CTableDataCell className='text-center'>{item.discounts} %</CTableDataCell>
                                            <CTableDataCell className='text-center'>{item.taxes} %</CTableDataCell>
                                            <CTableDataCell className='text-center'>{numberWithCommas(Number(item.total).toFixed(2))}</CTableDataCell>

                                        </CTableRow>
                                    ))}

                                </CTableBody>
                            </CTable>

                        </CRow>

                        <CRow>
                            <CCol md={6}>
                                <span>Notes:</span> <span>{salesOrder?.order_remarks}</span>

                                <p className='mt-3'>Vehicle No: </p>
                            </CCol>
                            <CCol style={{ textAlign: 'end' }} >
                                <CRow className='mt-2'>
                                    <CCol>
                                        <span className='ms-5'>Sub Total</span>
                                    </CCol>
                                    <CCol>
                                        <span className='ms-5'>{numberWithCommas(Number(salesOrder?.order_sub_chargers).toFixed(2))}</span>
                                    </CCol>

                                </CRow>
                                <CRow className='mt-2'>
                                    <CCol>
                                        <span className='ms-5'>Delivery Chargers</span>
                                    </CCol>
                                    <CCol>
                                        <span className='ms-5'>{numberWithCommas(Number(salesOrder?.order_delivery_chargers).toFixed(2))}</span>
                                    </CCol>
                                </CRow>
                                {salesOrder?.order_total_refund ? <CRow className='mt-2'>
                                    <CCol>
                                        <span className='ms-5'>Credit Memo</span>
                                    </CCol>
                                    <CCol>
                                        <span className='ms-5'>{numberWithCommas(Number(salesOrder?.order_total_refund).toFixed(2))}</span>
                                    </CCol>
                                </CRow> : null}
                                <CRow className='mt-4'>
                                    <CCol >
                                        <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                                    </CCol>
                                    <CCol>
                                        <span style={{ fontWeight: 'bold' }}>{numberWithCommas(Number(totalAmount).toFixed(2))}</span>
                                    </CCol>
                                </CRow>

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
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
            <SendEmailModel visible={emailVisible} onClose={(val) => setEmailVisible(val)} recordId={orderId} data={selectedData} title="Sales Order" />
        </>
    )
}

export default ViewSalesOrder