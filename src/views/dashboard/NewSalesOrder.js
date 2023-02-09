import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingModel from 'src/components/Models/LoadingModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import { ACTIONS, PAGES } from 'src/hooks/constants';
import ActivityLogsService from 'src/services/ActivityLogsService';
import AuthService from 'src/services/AuthService';
import CustomersServices from 'src/services/CustomersServices';
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices';
import SalesOrderServices from 'src/services/SalesOrderServices';
import swal from 'sweetalert';
import SalesOrder from './SalesOrder';

const NewSalesOrder = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [customerName, setCustomerName] = useState("")
    const [deliveryDate, setDeliveryDate] = useState(new Date())
    const [orderDate, setOrderDate] = useState(new Date())
    const [deliveryMethod, setDeliveryMethod] = useState("")
    const [note, setNote] = useState("")

    const [itemDetails, setItemDetails] = useState("")
    const [qty, setQty] = useState(0)
    const [rate, setRate] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [tax, setTax] = useState(0)
    const [amount, setAmount] = useState("")
    const [deliveryCharge, setDeliveryCharge] = useState(1000)
    const [customerList, setCustomerList] = useState([])

    const [orderExtraCharge, setOrderExtraCharge] = useState(0)

    const [items, setItems] = useState([])

    const [plywoodList, setPlywoodList] = useState([])

    useEffect(() => {
        getCustomerList()
        getPlyWoodTypes()
    }, [])

    const getCustomerList = () => {
        CustomersServices.getAllCustomersInfo("dash_page", 0, 10, "")
            .then(response => {
                const { customersList, totalPages } = response.data;

                //console.log("testing -> ", customersList);
                var customersFinal = [];
                var customersEdited = [];
                var cash_customer = {};
                if (customersList.length) {
                    var revCustomersList = customersList;//.reverse();

                    for (let i = 0; i < revCustomersList.length; i++) {
                        var crr_customer = revCustomersList[i];

                        if (crr_customer.id === 1) {
                            cash_customer = crr_customer;
                        } else {
                            customersEdited.push(crr_customer);
                        }
                    }

                    customersFinal.push(cash_customer);

                    for (let i = 0; i < customersEdited.length; i++) {
                        var crr_customerX = customersEdited[i];

                        customersFinal.push(crr_customerX);
                    }
                    setCustomerList(customersFinal);
                }
            })
    }

    const getPlyWoodTypes = async () => {
        setLoading(true)
        setLoadingMsg("Loading Plywood Types...")

        await PlyWoodTypesServices.getPlyWoodTypesListAll("dash_page", "dash_page")
            .then(response => {
                const filteredArray = response.data.plyWoodsInfoAll.map(item => {
                    return { id: item.id, label: `${item.type} - ${item.size}mm`, type: item.type, size: item.size }
                })
                setPlywoodList(filteredArray)
                setLoading(false)
                setLoadingMsg(null)
            })
            .catch(error => {
                setLoading(false)
                setLoadingMsg(null)
                swal("Error!", error.response.data.message, "error");
            })

    }

    const handlePlyWoodType = (id) => {
        const item = plywoodList.find(obj => obj.id === Number(id));
        console.log(item)
        setItemDetails(item)
    }


    const handleTableItemSubmit = () => {
        if (!itemDetails) {
            return
        }

        if (qty <= 0) {
            return
        }

        if (rate <= 0) {
            return
        }

        const total = (parseFloat(qty) * parseFloat(rate)) - (parseFloat(qty) * parseFloat(rate) * parseFloat(discount)) / 100 + (parseFloat(qty) * parseFloat(rate) * parseFloat(tax)) / 100

        setItems([...items, {
            type: itemDetails.type,
            qty: parseFloat(qty),
            size: parseFloat(itemDetails.size),
            rates: parseFloat(rate),
            discounts: parseFloat(discount),
            taxes: parseFloat(tax),
            total: parseFloat(total)
        }])
        setPlywoodList(oldValues => {
            return oldValues.filter(item => item.id !== Number(itemDetails.id))
        })
        clearFields()
    }

    console.log(items)

    const handleOrderSubmit = async () => {
        if (customerName == "") {
            return
        }

        if (deliveryMethod == "") {

        }

        setLoading(true)
        setLoadingMsg("Creating Sales Order...")

        await SalesOrderServices.createNewSalesOrder("dash_page", orderDate, deliveryDate, deliveryMethod, subTotal, deliveryCharge, orderExtraCharge, note, customerName, items)
            .then(response => {
                setLoading(false)
                setLoadingMsg(null)
                //swal("Success!", error.response.data.message, "error");
                ActivityLogsService.createLog(PAGES.SALES_ORDER, AuthService.getCurrentUser().name, ACTIONS.CREATE, 1)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
                swal("Success!", "Sales Order Created Successfully", "success").then((value) => {
                    navigate('/sales')
                });
            }).catch(error => {
                console.log(error.response.data.message)
                setLoading(false)
                setLoadingMsg(null)
                swal("Error!", error.response.data.message, "error");
                ActivityLogsService.createLog(PAGES.SALES_ORDER, AuthService.getCurrentUser().name, ACTIONS.CREATE, 0)
                .catch((error) => {
                    console.log(error)
                    swal("Error!", "Something Went Wrong With Logging", "error");
                })
            })

    }


    const handleTableItemDelete = (key) => {

        if (key > -1) {
            setItems(items => items.filter((s, i) => (i != key)))
        }
    }

    const clearFields = () => {
        setItemDetails("")
        setQty(0)
        setRate(0)
        setDiscount(0)
        setTax(0)
    }

    let subTotal = 0
    items.forEach(item => {
        subTotal = parseFloat(subTotal) + parseFloat(item.total)
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
                            <CFormSelect onChange={(e) => setCustomerName(e.target.value)} aria-label="Default select example">
                                <option>- Select a customer -</option>
                                {customerList.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </CFormSelect>
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
                            <CFormInput type="date" id="delivery-date" aria-label="Default select example" onChange={(e) => setDeliveryDate(e.target.value)} />
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow className="mt-3">
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="date" className="col-sm-3 col-form-label">Sales Order Date *</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput type="date" id="date" aria-label="Default select example" onChange={(e) => setOrderDate(e.target.value)} />
                        </CCol>
                    </CRow>
                </CCol>
                <CCol md={6}>
                    <CRow>
                        <CFormLabel htmlFor="Qty" className="col-sm-3 col-form-label">Delivery Method</CFormLabel>
                        <CCol sm={10} style={{ width: "60%" }}>
                            <CFormInput id="Qty" aria-label="Default select example" onChange={(e) => setDeliveryMethod(e.target.value)} />
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
                                <CTableDataCell className='text-center'>{item.type} - {item.size}mm</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.qty}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.rates}</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.discounts} %</CTableDataCell>
                                <CTableDataCell className='text-center'>{item.taxes} %</CTableDataCell>
                                <CTableDataCell className='text-center' width={250}>LKR {Number(item.total).toFixed(2)}</CTableDataCell>
                                <CTableDataCell className='text-center' width={5} onClick={() => handleTableItemDelete(key)}>
                                    <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                                        delete
                                    </span></CTableDataCell>
                            </CTableRow>
                        ))}
                        <CTableRow>
                            <CTableDataCell className='text-center'>
                                <CFormSelect onChange={(e) => handlePlyWoodType(e.target.value)} aria-label="Default select example">
                                    <option>Type or click to select an item</option>
                                    {plywoodList.map((item, index) => (
                                        <option key={index} value={item.id}>{item.label}</option>
                                    ))}
                                </CFormSelect>
                                {/* <CFormInput style={{ textAlign: 'center' }} type='text' className='no-border-input' value={itemDetails} onChange={(e) => setItemDetails(e.target.value)} placeholder="Type or click to select an item" required /> */}
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{ textAlign: 'center' }} type='number' step="0.01" className='no-border-input' value={qty} onChange={(e) => setQty(e.target.value)} required />
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{ textAlign: 'center' }} type='number' step="0.01" className='no-border-input' value={rate} onChange={(e) => setRate(e.target.value)} required />
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{ textAlign: 'center' }} type='number' step="0.01" className='no-border-input' value={discount} onChange={(e) => setDiscount(e.target.value)} required />
                            </CTableDataCell>
                            <CTableDataCell className='text-center'>
                                <CFormInput style={{ textAlign: 'center' }} type='number' step="0.01" className='no-border-input' value={tax} onChange={(e) => setTax(e.target.value)} required />
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
                                    onChange={(e) => setNote(e.target.value)}
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
                            onClick={() => setPinVisibleModel(true)}
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
            <PinRequiredModel
                visible={pinVisibleModel}
                pinStatus={(status) => status ? handleOrderSubmit() : setPinVisibleModel(false)}
                onClose={(val) => setPinVisibleModel(val)} 
                page={PAGES.SALES_ORDER}
                action={"create"}
                />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default NewSalesOrder