import { cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAlert, CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormCheck, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingModel from 'src/components/Models/LoadingModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import { PAGES } from 'src/hooks/constants';
import CreditMemoServices from 'src/services/CreditMemoService';
import SalesOrderServices from 'src/services/SalesOrderServices';
import swal from 'sweetalert';

const NewMemo = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const orderId = new URLSearchParams(search).get('id')
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    console.log(orderId)

    const [itemList, setItemList] = useState([])
    const [salesOrder, setSalesOrder] = useState(null)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")
    const [notes, setNotes] = useState("")
    const [memoDate, setMemoDate] = useState(new Date().toLocaleDateString('en-CA'))
    const [refundAdjustment, setRefundAdjustment] = useState(0)
    const [ref_no, setRef_no] = useState("")
    const [totalAmount, setTotalAmount] = useState(0)

    const [subAmount, setSubAmount] = useState(0)

    useEffect(() => {


        setLoading(true)
        SalesOrderServices.getSalesList("dash_page", 0, 10, "", null, null, 0)
            .then(response => {
                const item = response.data.salesList.find(obj => obj.id === Number(orderId));
                setSalesOrder(item)
                console.log(item)
                const array = item.Orders_Items_TBs.map(obj => ({
                    ...obj,
                    item_details: `${obj.type} - ${obj.size}mm`,
                    order_item_id: obj.id,
                    qty_returned_restock: false,
                    sub_rates: 0,
                    total: 0

                }))
                setItemList(array)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                swal("Error!", error.response.message, "error")
                console.log(error.response.message)
            })


    }, [])




    const handleQTY = (qty, id, shippedQty) => {
        console.log(qty, id)
        setValidationAlert(false)
        if(qty > shippedQty) {
            setValidationAlert(true)
            setValidationMsg(`Qty must be less than ${shippedQty}`)
            return
        }
   
        let subTotal = 0
        const newList = itemList.map(item => {
            if (item.id === id) {
                item.qty_returned = Number(qty)
                item.sub_rates = Number(qty) * parseFloat(item.rates)
                item.total = parseFloat(item.sub_rates) - (parseFloat(item.sub_rates) * parseFloat(item.discounts)) / 100 + (parseFloat(item.sub_rates) * parseFloat(item.taxes)) / 100

            }
            subTotal = parseFloat(subTotal) + parseFloat(item.total)
            setSubAmount(subTotal)
            setTotalAmount(subTotal - parseFloat(refundAdjustment ? refundAdjustment : 0))
            return item
        })

        setItemList(newList)
    }

    const handleReturnedStock = (status, id) => {
        const newList = itemList.map(item => {
            if (item.id === id) {
                item.qty_returned_restock = status ? 1 : 0
            }
            return item
        })
        setItemList(newList)
    }


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const createMemo = async () => {
        if(!memoDate) {
            return
        }

        
        if(!ref_no) {
            return
        }

        if(validationAlert) {
            return
        }
        setLoading(true)
        setLoadingMsg("Creating Credit Memo...")
        await CreditMemoServices.createNewCreditMemo("dash_page", Number(orderId), memoDate, 0, notes, parseFloat(subAmount), parseFloat(refundAdjustment), parseFloat(totalAmount), Number(ref_no), itemList)
            .then(response => {
                setLoading(false)
                setLoadingMsg(null)
                swal("Success!", "Credit Memo Created Successfully", "success").then((value) => {
                    navigate(`/sales/view?id=${orderId}`)
                });
            })
            .catch(error => {
                setLoading(false)
                setLoadingMsg(null)
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
                            onClick={() => navigate(`/sales/view?id=${orderId}&sop=${salesOrder?.sop}`)}
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
                                <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>New Memo</p>
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
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Memo Date </span></span>
                    </CCol>
                    <CCol md={2}>
                        <CFormInput type="date" defaultValue={new Date().toLocaleDateString('en-CA')} onChange={(e) => setMemoDate(e.target.value)} />
                    </CCol>


                </CRow>
                <CRow className='d-flex justify-content-end mt-2'>
                    <CCol md={1}>
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Reference # </span></span>
                    </CCol>
                    <CCol md={2}>
                        <CFormInput type="number"  onChange={(e) => setRef_no(e.target.value)} />
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
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Return to Stock</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={150}>Qty to Returned</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' >Sub Total</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={200}>Row Total</CTableHeaderCell>


                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {itemList?.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className='text-center'>{item.item_details}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{numberWithCommas(Number(item.rates).toFixed(2))}</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {item.qty_ordered ? <p>Ordered <br />{item.qty_ordered}</p> : null}
                                        {item.qty_invoiced ? <p>Invoiced <br />{item.qty_invoiced}</p> : null}
                                        {item.qty_shipped ? <p>Shipped <br />{item.qty_shipped}</p> : null}
                                        {item.qty_returned ? <p>Returned <br />{item.qty_returned}</p> : null}
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <CFormCheck type='checkbox' onChange={(e) => handleReturnedStock(e.target.checked, item.id)} />
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <CFormInput type="number" min="0" step="1" onChange={(e) => handleQTY(e.target.value, item.id, item.qty_shipped)} />
                                        <CAlert width={200} color="warning" dismissible visible={validationAlert} onClose={() => setValidationAlert(false)} className="d-flex align-items-center mt-2">
                                            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={10} height={10} />
                                            <div style={{fontSize: '0.7em'}}>{validationMsg}</div>
                                        </CAlert>
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>{numberWithCommas(Number(item.sub_rates).toFixed(2))}</CTableDataCell>
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
                                <span className='ms-5'>Adjustment Refund</span>
                            </CCol>
                            <CCol style={{ display: 'flex', justifyContent: 'end' }}>
                                <span className='ms-5' >  
                                <CFormInput style={{ width: "120px" }}
                                value={refundAdjustment}
                                    onChange={(e) => {
                                        setRefundAdjustment(e.target.value)
                                        setTotalAmount(parseFloat(subAmount) - parseFloat(e.target.value))
                                    }} type="number" /></span>
                            </CCol>
                        </CRow>

                        <CRow className='mt-4'>
                            <CCol >
                                <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>{numberWithCommas(Number(totalAmount ? totalAmount : 0).toFixed(2))}</span>
                            </CCol>
                        </CRow>
                        <CRow className='mt-4'>
                            <CCol>
                                <CButton color="secondary" variant="outline">Update Total {' '}
                                    <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                        sync
                                    </span></CButton>
                            </CCol>

                        </CRow>
                        <CButton
                            color="success"
                            style={{ color: '#fff', width: "30%", marginTop: '30px' }}
                            onClick={() => setPinVisibleModel(true)}
                        >
                            Refund Offline
                        </CButton>

                    </CCol>
                </CRow>
            </CRow>
            
            <PinRequiredModel
                visible={pinVisibleModel}
                pinStatus={(status) => status ? createMemo() : setPinVisibleModel(false)}
                onClose={(val) => setPinVisibleModel(val)} 
                page={PAGES.SALES_ORDER}
                action={"create"}
                />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default NewMemo