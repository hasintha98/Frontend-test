import { cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAlert, CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import EditShippingDetailsModel from 'src/components/Models/EditShippingDetailsModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import { PAGES } from 'src/hooks/constants';
import SalesOrderServices from 'src/services/SalesOrderServices';
import ShipmentServices from 'src/services/ShipmentService';
import swal from 'sweetalert';

const NewShipment = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const orderId = new URLSearchParams(search).get('id')
    console.log(orderId)
    const [validationAlert, setValidationAlert] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")
    const [visible, setVisible] = useState(false)
    const [pinVisibleModel, setPinVisibleModel] = useState(false)
    const [isUpdatedShipAddress, setIsUpdatedShipAddress] = useState(false)
    const [shipementAddress, setShipementAddress] = useState({})
    const [itemList, setItemList] = useState([])
    const [salesOrder, setSalesOrder] = useState(null)
    const [itemStocks, setItemStocks] = useState([])
    const [notes, setNotes] = useState("")

    const [deliveryDate, setDeliveryDate] = useState(new Date().toLocaleDateString('en-CA'))

    useEffect(() => {
        SalesOrderServices.getSalesList("dash_page", 0, 10, "", null, null, 0)
            .then(response => {
                const item = response.data.salesList.find(obj => obj.id === Number(orderId));
                setSalesOrder(item)
                console.log(item)
                const array = item.Orders_Items_TBs.map(obj => ({ ...obj, item_details: `${obj.type} - ${obj.size}mm`, qty_shipping: 0, order_item_id: obj.id }))
                setItemList(array)
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

    const handleQTY = (qty, id, orderQTY, shippedQTY, stock) => {
        console.log(qty, id)
        setValidationAlert(false)
        if (qty > orderQTY) {
            setValidationAlert(true)
            setValidationMsg(`Qty must be less than ${orderQTY}`)
            return
        }

        if (qty < shippedQTY) {
            setValidationAlert(true)
            setValidationMsg(`Qty must be higher than ${shippedQTY}`)
            return
        }

        if (qty > stock) {
            setValidationAlert(true)
            setValidationMsg(`Qty must be higher than stock (${stock})`)
            return
        }

        const newList = itemList.map(item => {
            if (item.id === id) {
                item.qty_shipping = Number(qty)
            }
            return item
        })

        setItemList(newList)
    }

    console.log("itemList", itemList)

    const getItemStock = (type, size) => {
        const item = itemStocks.find(o => o.type === type && o.size === size)
        return item?.stock
    }



    const createShipment = () => {

        let shipmentDetails = null

        if (isUpdatedShipAddress) {
            shipmentDetails = shipementAddress
        } else {
            shipmentDetails = {
                name: salesOrder?.Customers_Data_TB.name,
                address: salesOrder?.Customers_Data_TB.address,
                phone: salesOrder?.Customers_Data_TB.phone
            }
        }

        if (!deliveryDate) {
            return
        }

        if (validationAlert) {
            return
        }
        ShipmentServices.createNewShipment("dash_page", Number(orderId), deliveryDate, shipmentDetails.name, shipmentDetails.phone, shipmentDetails.address, notes, 1, itemList)
            .then(response => {
                swal("Success!", "Shipment Created Successfully", "success").then((value) => {
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
                            onClick={() => navigate('/sales/view?id=6546')}
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
                                <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>New Shipment</p>
                                <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{salesOrder?.sop}</p>
                            </CCol>


                        </CRow>
                    </CCol>
                </CRow>
                <CRow className='mt-5'>
                    <CCol md={3} className="mt-5">
                        <p style={{ fontWeight: 'bold' }}>Bill To:</p>
                        <p>{salesOrder?.Customers_Data_TB.name}, </p>
                        <p>{salesOrder?.Customers_Data_TB.address} </p>
                        <p>{salesOrder?.Customers_Data_TB.phone}</p>
                    </CCol>
                    {isUpdatedShipAddress ? <CCol>
                        <p style={{ color: 'green', cursor: 'pointer' }}>Edit</p>
                        <p style={{ fontWeight: 'bold' }}>Ship To:</p>
                        <p>{shipementAddress?.name} </p>
                        <p>{shipementAddress?.address} </p>
                        <p>{shipementAddress?.phone}</p>
                    </CCol> :

                        <CCol>
                            <p style={{ color: 'green', cursor: 'pointer' }} onClick={() => setVisible(true)}>Edit</p>
                            <p style={{ fontWeight: 'bold' }}>Ship To:</p>
                            <p>{salesOrder?.Customers_Data_TB.name} </p>
                            <p>{salesOrder?.Customers_Data_TB.address} </p>
                            <p>{salesOrder?.Customers_Data_TB.phone}</p>
                        </CCol>}
                </CRow>
                <CRow className='d-flex justify-content-end'>
                    <CCol md={1}>
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Delivery Date </span></span>
                    </CCol>
                    <CCol md={2}>
                        <CFormInput type="date" defaultValue={new Date().toLocaleDateString('en-CA')} onChange={(e) => setDeliveryDate(e.target.value)} />
                    </CCol>


                </CRow>

                {/* Table */}

                <CRow className='p-2 mt-4 mb-5'>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                <CTableHeaderCell scope="col" className='text-center' >Item Details</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' >Qty</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='text-center' width={200}>Qty to Ship</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {itemList?.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className='text-center'>{item.item_details} ({getItemStock(item.type, item.size)})</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {item.qty_ordered ? <p>Ordered <br />{item.qty_ordered}</p> : null}
                                        {item.qty_invoiced ? <p>Invoiced <br />{item.qty_invoiced}</p> : null}
                                        {item.qty_shipped ? <p>Shipped <br />{item.qty_shipped}</p> : null}
                                        {item.qty_returned ? <p>Returned <br />{item.qty_returned}</p> : null}
                                    </CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        <CFormInput type="number" onChange={(e) => handleQTY(e.target.value, item.id, item.qty_ordered, item.qty_shipped, getItemStock(item.type, item.size))} />
                                        <CAlert width={200} color="warning" dismissible visible={validationAlert} onClose={() => setValidationAlert(false)} className="d-flex align-items-center mt-2">
                                            <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={10} height={10} />
                                            <div style={{ fontSize: '0.7em' }}>{validationMsg}</div>
                                        </CAlert>
                                    </CTableDataCell>


                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>

                </CRow>

                <CRow>
                    <CCol md={6}>
                        <CRow className='mt-5'>
                            <CForm>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    label="Notes"
                                    rows={3}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></CFormTextarea>
                            </CForm>
                        </CRow>

                    </CCol>
                    <CCol style={{ textAlign: 'end', marginTop: '100px' }} >
                        <CButton
                            color="success"
                            style={{ color: '#fff', width: "30%" }}
                            onClick={() => setPinVisibleModel(true)}
                        >
                            Submit Shipment
                        </CButton>

                    </CCol>
                </CRow>
            </CRow>

            <PinRequiredModel
                visible={pinVisibleModel}
                pinStatus={(status) => status ? createShipment() : setPinVisibleModel(false)}
                onClose={(val) => setPinVisibleModel(val)}
                page={PAGES.SALES_ORDER}
                action={"create"}
            />

            <EditShippingDetailsModel
                visible={visible}
                onClose={(val) => setVisible(val)}
                values={{
                    name: salesOrder?.Customers_Data_TB.name,
                    address: salesOrder?.Customers_Data_TB.address,
                    phone: salesOrder?.Customers_Data_TB.phone
                }}
                setValues={(values) => {
                    setShipementAddress(values)
                    setIsUpdatedShipAddress(true)

                }}
            />
        </>
    )
}

export default NewShipment