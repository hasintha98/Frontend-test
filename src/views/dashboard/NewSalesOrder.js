import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NewSalesOrder = () => {
    const navigate = useNavigate();

    const [itemDetails, setItemDetails] = useState("")
    const [qty, setQty] = useState(0)
    const [rate, setRate] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [tax, setTax] = useState(0)
    const [amount, setAmount] = useState("")
    const [deliveryCharge, setDeliveryCharge] = useState(1000)

    const [items, setItems] = useState([])

    const handleTableItemSubmit = () => {
        if(!itemDetails) {
            return
        }

        if(qty <= 0) {
            return
        }

        if(rate <= 0) {
            return
        }
        const total = (parseFloat(qty) * parseFloat(rate)) - (parseFloat(qty) * parseFloat(rate) * parseFloat(discount)) / 100 + (parseFloat(qty) * parseFloat(rate) * parseFloat(tax)) / 100
        
        setItems([...items, {
            itemDetails: itemDetails,
            qty: parseFloat(qty),
            rate: parseFloat(rate),
            discount: parseFloat(discount),
            tax: parseFloat(tax),
            amount: parseFloat(total)
        }])
        clearFields()
    }

    const handleTableItemDelete = (key) => {

        if(key > -1) {
            setItems(items=> items.filter((s,i)=>(i != key)))
        }
    }

    const clearFields = () => {
        setItemDetails("")
        setQty(0)
        setRate(0)
        setDiscount(0)
        setTax(0)
    }

    console.log(items)
    let subTotal = 0
    items.forEach(item => {
        subTotal = parseFloat(subTotal) + parseFloat(item.amount)
    })
    const total = (subTotal - parseFloat(deliveryCharge)) < 0 ? 0 : subTotal - parseFloat(deliveryCharge)

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <>
            <CRow>
                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>New Order</span>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
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
                        <CFormLabel htmlFor="delivery-date" className="col-sm-3 col-form-label">Delivery Date</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput type="date" id="delivery-date" aria-label="Default select example" />
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow className="mt-3">
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="date" className="col-sm-3 col-form-label">Sales Order Date *</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput type="date" id="date" aria-label="Default select example" />
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

            <CRow className='p-2 mt-4 mb-5'>
                <CTable bordered>
                    <CTableHead>
                        <CTableRow color="secondary">
                            <CTableHeaderCell scope="col" className='text-center' width={400}>Item Details</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Quantity</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Rate</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center' width={300}>Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center' width={15}></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>

                
                        {items?.map((item, key) => (
                            <CTableRow key={key}>
                                <CTableDataCell className='text-center'>{item.itemDetails}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.qty}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.rate}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.discount} %</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.tax} %</CTableDataCell>
                                <CTableDataCell className='text-center' width={250}>LKR {Number(item.amount).toFixed(2)}</CTableDataCell>
                                <CTableDataCell className='text-center' width={5} onClick={() => handleTableItemDelete(key)}>
                                    <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                                        delete
                                    </span></CTableDataCell>
                            </CTableRow>
                        ))}
                        <CTableRow>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{textAlign: 'center'}} type='text' className='no-border-input' value={itemDetails} onChange={(e) => setItemDetails(e.target.value)} placeholder="Type or click to select an item" required />
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{textAlign: 'center'}} type='number' step="0.01" className='no-border-input' value={qty} onChange={(e) => setQty(e.target.value)} required/>
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{textAlign: 'center'}} type='number' step="0.01" className='no-border-input' value={rate} onChange={(e) => setRate(e.target.value)} required/>
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{textAlign: 'center'}} type='number' step="0.01" className='no-border-input' value={discount} onChange={(e) => setDiscount(e.target.value)} required/>
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{textAlign: 'center'}} type='number' step="0.01" className='no-border-input' value={tax} onChange={(e) => setTax(e.target.value)} required/>
                            </CTableDataCell>
                            <CTableDataCell className='text-center' width={250}>

                            </CTableDataCell>
                            <CTableDataCell className='text-center' width={5}></CTableDataCell>


                        </CTableRow>


                    </CTableBody>
                </CTable>

                <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleTableItemSubmit()}>Add another line<span className="material-symbols-outlined" style={{ fontSize: "1em" }}>
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
                                <span className='ms-5'>{numberWithCommas(Number(subTotal).toFixed(2))}</span>
                            </CCol>

                        </CRow>
                        <CRow className='mt-2'>
                            <CCol>
                                <span className='ms-5'>Delivery Chargers</span>
                            </CCol>
                            <CCol>
                                <span className='ms-5'>{numberWithCommas(Number(deliveryCharge).toFixed(2))}</span>
                            </CCol>
                        </CRow>
                        <CRow className='mt-4'>
                            <CCol >
                                <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                            </CCol>
                            <CCol>
                                <span style={{ fontWeight: 'bold' }}>{numberWithCommas(Number(total).toFixed(2))}</span>
                            </CCol>
                        </CRow>

                    </CCol>
                </CRow>

            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <CRow>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol></CCol>
                    <CCol md={2}>
                        <CButton
                            role="button"
                            color='success'
                            style={{ width: "100%", color: '#fff' }}
                            onClick={() => navigate('/sales/view?id=6546')}
                        >Save</CButton>
                    </CCol>
                    <CCol md={2}>
                        <CButton
                            role="button"
                            color='danger'
                            style={{ width: "100%", color: '#fff' }}
                            onClick={() => navigate('/sales')}
                        >Cancel</CButton>
                    </CCol>

                </CCol>
            </CRow>
        </>
    )
}

export default NewSalesOrder