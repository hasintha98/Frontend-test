import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import LoadingModel from 'src/components/Models/LoadingModel';
import SalesOrderServices from 'src/services/SalesOrderServices';
import swal from 'sweetalert';
const ViewSalesOrder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const search = useLocation().search
    const orderId = new URLSearchParams(search).get('sop')
    const id = new URLSearchParams(search).get('id')
    const [salesOrder, setSalesOrder] = useState(null)
    console.log(orderId)

    const [totalAmount, setTotalAmount] = useState(0)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        setLoading(false)
        SalesOrderServices.getSalesList("dash_page", 0, 10, "", null, null, 0)
            .then(response => {
                const item = response.data.salesList.find(obj => obj.id === Number(id));
                setTotalAmount(parseFloat(item.order_sub_chargers) + parseFloat(item.order_delivery_chargers) - parseFloat(item?.order_total_refund))
                setSalesOrder(item)
                console.log(item)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                swal("Error!", error.response.message, "error")
                console.log(error.response.message)
            })

    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <>
            <CRow style={{ overflow: 'hidden' }}>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Order# SO{salesOrder?.sop}</span>
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
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{salesOrder?.sop}</p>
                                </CCol>


                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow className='mt-5'>
                        <CCol>
                            <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                            <p>{salesOrder?.Customers_Data_TB.name}, </p>
                            <p>{salesOrder?.Customers_Data_TB.address} </p>
                            <p>{salesOrder?.Customers_Data_TB.phone}</p>
                        </CCol>
                    </CRow>
                    <CRow >
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Order Date </span>: {moment(salesOrder?.order_date).format('YYYY-MM-DD')}</span>
                    </CRow>

                    {/* Table */}

                    <CRow className='p-2 mt-4 mb-5'>
                        <CTable bordered>
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
                                            {item.qty_ordered ? <p>Ordered <br />{item.qty_ordered}</p> : null}
                                            {item.qty_invoiced ? <p>Invoiced <br />{item.qty_invoiced}</p> : null}
                                            {item.qty_shipped ? <p>Shipped <br />{item.qty_shipped}</p> : null}
                                            {item.qty_returned ? <p>Returned <br />{item.qty_returned}</p> : null}
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
                            <p>Notes:</p>
                            <p>{salesOrder?.order_remarks}</p>
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
                </CRow>
            </div>
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default ViewSalesOrder