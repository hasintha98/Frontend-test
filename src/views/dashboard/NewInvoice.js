import { cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAlert, CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import { PAGES } from 'src/hooks/constants';
import InvoiceServices from 'src/services/InvoiceService';
import SalesOrderServices from 'src/services/SalesOrderServices';
import swal from 'sweetalert';

const NewInvoice = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const orderId = new URLSearchParams(search).get('id')
    const [itemList, setItemList] = useState([])
    const [salesOrder, setSalesOrder] = useState(null)
    const [totalAmount, setTotalAmount] = useState(0)
    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [subAmount, setSubAmount] = useState(0)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")
    const [notes, setNotes] = useState("")
    const [itemStocks, setItemStocks] = useState([])

    const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString('en-CA'))
    useEffect(() => {
        SalesOrderServices.getSalesList("dash_page", 0, 10, "", null, null, 0)
            .then(response => {
                const item = response.data.salesList.find(obj => obj.id === Number(orderId));
                console.log(item)
                // setTotalAmount(parseFloat(item.order_sub_chargers) - parseFloat(item.order_delivery_chargers))
                setSalesOrder(item)
                setItemList(item.Orders_Items_TBs)
                SalesOrderServices.getMaxMinStockAvailability("dash_page", item.Orders_Items_TBs)
                    .then(response => {
                        setItemStocks(response.data)
                    })

            })
            .catch(error => {
                swal("Error!", error.response.message, "error")
                console.log(error.response.message)
            })




    }, [])

    const handleQTY = (qty, id, itemDetails, orderQTY, invoicedQTY, stock) => {
        setValidationAlert(false)
        if (qty > orderQTY) {
            setValidationAlert(true)
            setValidationMsg(`Qty must be less than ${orderQTY}`)
            return
        }

        // if (qty < invoicedQTY) {
        //     setValidationAlert(true)
        //     setValidationMsg(`Qty must be higher than ${invoicedQTY}`)
        //     return
        // }

        if (qty > stock) {
            setValidationAlert(true)
            setValidationMsg(`Qty must be higher than stock (${stock})`)
            return
        }

        let subTotal = 0
        const newList = itemList.map(item => {
            if (item.id === id) {
                item.sub_rates = qty * parseFloat(item.rates)
                item.total = parseFloat(item.sub_rates) - (parseFloat(item.sub_rates) * parseFloat(item.discounts)) / 100 + (parseFloat(item.sub_rates) * parseFloat(item.taxes)) / 100
            }
            subTotal = parseFloat(subTotal) + parseFloat(item.total)
            item.new_rates = 0
            item.order_item_id = id
            item.qty_to_invoice = Number(qty)
            item.item_details = itemDetails
            return item
        })

        console.log(newList)
        setItemList(newList)
        setSubAmount(subTotal)
        setTotalAmount(subTotal + parseFloat(salesOrder.order_delivery_chargers))
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getItemStock = (type, size) => {
        const item = itemStocks.find(o => o.type === type && o.size === size)
        return item?.stock
    }

    const createInvoice = () => {

        if (!invoiceDate) {
            return
        }

        if (validationAlert) {
            return
        }

        InvoiceServices.createNewInvoice("dash_page", Number(orderId), invoiceDate, notes, subAmount, salesOrder?.order_delivery_chargers, totalAmount, itemList)
            .then(response => {
                swal("Success!", "Invoice Created Successfully", "success").then((value) => {
                    navigate(`/sales/view?id=${orderId}`)
                });
            })
            .catch(error => {
                swal("Error!", error.response.data.message, "error")
            })
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
                            onClick={() => navigate(`/sales/view?id=${orderId}`)}
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
                                <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>New Invoice</p>
                                <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{salesOrder?.sop}</p>
                            </CCol>


                        </CRow>
                    </CCol>
                </CRow>
                <CRow className='mt-5'>
                    <CCol md={3} >
                        <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                        <p>{salesOrder?.Customers_Data_TB.name}, </p>
                        <p>{salesOrder?.Customers_Data_TB.address} </p>
                        <p>{salesOrder?.Customers_Data_TB.phone}</p>
                    </CCol>

                </CRow>
                <CRow className='d-flex justify-content-end'>
                    <CCol md={1}>
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Invoice Date </span></span>
                    </CCol>
                    <CCol md={2}>
                        <CFormInput type="date" defaultValue={new Date().toLocaleDateString('en-CA')} onChange={(e) => setInvoiceDate(e.target.value)} />
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
                                <CTableHeaderCell scope="col" className='text-center' width={150}>Qty to Invoice</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' >Sub Total</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={200}>Row Total</CTableHeaderCell>


                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {itemList?.map((item, index) => (
                                <CTableRow key={index} >
                                    <CTableDataCell className='text-center'>{item.type} - {item.size}mm ({getItemStock(item.type, item.size)})</CTableDataCell>
                                    <CTableDataCell className='text-center'>{numberWithCommas(Number(item.rates).toFixed(2))}</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {item.qty_ordered ? <p>Ordered <br />{item.qty_ordered}</p> : null}
                                        {item.qty_invoiced ? <p>Invoiced <br />{item.qty_invoiced}</p> : null}
                                        {item.qty_shipped ? <p>Shipped <br />{item.qty_shipped}</p> : null}
                                        {item.qty_returned ? <p>Returned <br />{item.qty_returned}</p> : null}
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <CFormInput type="number" step="1" max={item.qty_ordered} onChange={(e) => handleQTY(e.target.value, item.id, `${item.type} - ${item.size}mm`, item.qty_ordered, item.qty_invoiced, getItemStock(item.type, item.size))} />
                                        <CAlert width={200} color="warning" dismissible visible={validationAlert} onClose={() => setValidationAlert(false)} className="d-flex align-items-center mt-2">
                                            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={10} height={10} />
                                            <div style={{ fontSize: '0.7em' }}>{validationMsg}</div>
                                        </CAlert>
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>{numberWithCommas(Number(item?.sub_rates ? item?.sub_rates : 0).toFixed(2))}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{item.discounts} %</CTableDataCell>
                                    <CTableDataCell className='text-center'>{item.taxes} %</CTableDataCell>
                                    <CTableDataCell className='text-center'>Rs.{numberWithCommas(Number(item?.total ? item?.total : 0).toFixed(2))}</CTableDataCell>

                                </CTableRow>
                            ))}

                        </CTableBody>
                    </CTable>

                </CRow>

                <CRow>
                    <CCol md={6}>
                        <CButton color="secondary" variant="outline">Update Qty&apos;s {' '}
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                sync
                            </span>
                        </CButton>
                        <p className='mt-5'>Notes:</p>
                        <CFormTextarea
                            id="exampleFormControlTextarea1"
                            rows={3}
                            onChange={(e) => setNotes(e.target.value)}
                        ></CFormTextarea>

                    </CCol>
                    <CCol style={{ textAlign: 'end' }} >
                        <CRow className='mt-2'>
                            <CCol>
                                <span className='ms-5'>Sub Total</span>
                            </CCol>
                            <CCol>
                                <span className='ms-5'>{numberWithCommas(Number(subAmount).toFixed(2))}</span>
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

                        <CRow className='mt-4'>
                            <CCol >
                                <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>{numberWithCommas(Number(totalAmount).toFixed(2))}</span>
                            </CCol>
                        </CRow>
                        <CButton
                            color="success"
                            style={{ color: '#fff', width: "30%", marginTop: '50px' }}
                            onClick={() => setPinVisibleModel(true)}
                        >
                            Submit Invoice
                        </CButton>

                    </CCol>
                </CRow>
            </CRow>
            <PinRequiredModel
                visible={pinVisibleModel}
                pinStatus={(status) => status ? createInvoice() : setPinVisibleModel(false)}
                onClose={(val) => setPinVisibleModel(val)}
                page={PAGES.SALES_ORDER}
                action={"create"}
            />
        </>
    )
}

export default NewInvoice