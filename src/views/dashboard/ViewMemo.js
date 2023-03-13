import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormCheck, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import SendEmailModel from 'src/components/Models/SendEmailModel';
import CreditMemoServices from 'src/services/CreditMemoService';
import CustomersServices from 'src/services/CustomersServices';
import swal from 'sweetalert';
const ViewMemo = () => {
    const navigate = useNavigate();
    const search = useLocation().search
    const memoId = new URLSearchParams(search).get('memoId')
    const sop = new URLSearchParams(search).get('sop')
    console.log(memoId)

    const [selectedData, setSelectedData] = useState(null)
    const [emailVisible, setEmailVisible] = useState(false)
    const [memoStatus, setMemoStatus] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [customerDetails, setCustomer] = useState(null)
    const [creditMemo, setCreditMemo] = useState(null)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useEffect(() => {
        getMemoDetails()
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getMemoDetails = () => {
        CreditMemoServices.getMemoList("dash_page", 0, 10, "", null, null, -1)
            .then(response => {
                console.log(response)
                const item = response.data.returnInvoiceList.find(obj => obj.id === Number(memoId));
                setTotalAmount(parseFloat(item.order_sub_chargers) - parseFloat(item.order_delivery_chargers))
                setCreditMemo(item)
                setMemoStatus(item.invoice_returned_status)
                CustomersServices.getAllCustomersInfo("dash_page", 0, 10, "")
                    .then(response => {

                        const customer = response.data.customersList.find(obj => obj.id === Number(item.Orders_Data_TB.customerId));
                        setCustomer(customer)
                        console.log(customer)
                    })
                console.log(item)
            })
    }

    const updateMemoStatus = () => {
        CreditMemoServices.updateMemoByStatus("dash_page", Number(creditMemo?.orderedId), Number(creditMemo?.id), memoStatus == 0 ? 1 : 0)
        .then(response => {
            swal("Success!", "Credit Memo Status Changed Successfully", "success")
            getMemoDetails()
            
        }).catch(error => {
            swal("Error!", error.response.data.message, "error")
        })
    }

    const handleEmailPDF = async () => {
        // Get the component's HTML element
        const element = document.getElementById('memo-to-export');

        // Use html2canvas to convert the element to a canvas
        const canvas = await html2canvas(element);

        // Use jsPDF to create a PDF from the canvas
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

        const file = new File([pdf.output('blob')], "document.pdf", { type: 'application/pdf' });

        setSelectedData({
            subject: "CREDIT MEMO: CM" + creditMemo?.rip,
            description: "This is to sending the credit memo invoice of CM" + creditMemo?.rip,
            file: file,
            fileName: "CM" + creditMemo?.rip
        })
        setEmailVisible(true)
    }


    return (
        <>
            <CRow style={{ overflow: 'hidden' }}>
                <CCol>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Order# SO{sop}</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>


                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"
                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => navigate('/memos')}
                        ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                arrow_back
                            </span>{' '}Back</CButton>
                    </CButtonGroup>
                    <CButtonGroup className="me-2" role="group" aria-label="Second group">
                        <CButton
                            role="button"
                            color='secondary'
                            style={{ width: "100%", backgroundColor: '#D9D9D9' }}
                            onClick={() => updateMemoStatus()}
                        >{memoStatus == 0 ? "Mark as Refunded" : "Mark as Refund Pending"}</CButton>
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
                            <span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }} onClick={() => handleEmailPDF()}>
                                mail
                            </span>
                        </CButton>
                    </CButtonGroup>

                </CCol>
            </CRow>
            <hr style={{ backgroundColor: '#000', height: "2px" }} />
            <div ref={componentRef} id="memo-to-export" style={{ padding: '50px' }}>
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
                                    <p style={{ fontSize: "2.5em", fontWeight: "bold", padding: 0, margin: 0 }}>Credit Memo</p>
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Order# SO{sop}</p>
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0, textAlign: 'end' }}>Memo# CM{creditMemo?.rip}</p>
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
                        <span style={{ textAlign: 'end' }}><span style={{ fontWeight: 'bold' }}>Invoice Date </span>: {moment(creditMemo?.invoiced_returned_date).format("YYYY-MM-DD")}</span>
                    </CRow>

                    {/* Table */}

                    <CRow className='p-2 mt-4 mb-1'>
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow style={{ backgroundColor: '#000', color: '#fff' }}>
                                    <CTableHeaderCell scope="col" className='text-start' >Item Details</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' >Qty</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' >Rate</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={80}>Discount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={80}>Tax</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='text-center' width={200}>Row Total</CTableHeaderCell>


                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {creditMemo?.ReturnedInvoice_Items_TBs.map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell className='text-start'>{item.item_details}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{item.qty_returned} </CTableDataCell>
                                        <CTableDataCell className='text-center'>{numberWithCommas(Number(item.sub_rates).toFixed(2))}</CTableDataCell>
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
                            <p>{creditMemo?.invoice_returned_remarks}.</p>


                        </CCol>
                        <CCol style={{ textAlign: 'end' }} >
                            <CRow className='mt-2'>
                                <CCol>
                                    <span className='ms-5'>Sub Total</span>
                                </CCol>
                                <CCol>
                                    <span className='ms-5'>{numberWithCommas(Number(creditMemo?.invoice_returned_sub_total).toFixed(2))}</span>
                                </CCol>

                            </CRow>
                            <CRow className='mt-2'>
                                <CCol>
                                    <span className='ms-5'>Adjustment Refund</span>
                                </CCol>
                                <CCol>
                                    <span className='ms-5'>{numberWithCommas(Number(creditMemo?.invoice_returned_adj_refunded).toFixed(2))}</span>
                                </CCol>
                            </CRow>

                            <CRow className='mt-4'>
                                <CCol >
                                    <span style={{ fontWeight: 'bold' }}>Total (LKR)</span>
                                </CCol>
                                <CCol>
                                    <span style={{ fontWeight: 'bold' }}>{numberWithCommas(Number(creditMemo?.invoice_returned_balance_total).toFixed(2))}</span>
                                </CCol>
                            </CRow>

                        </CCol>
                    </CRow>
                </CRow>
            </div>
            <SendEmailModel visible={emailVisible} onClose={(val) => setEmailVisible(val)} recordId={"CM" + creditMemo?.rip} data={selectedData} title="Credit Memo" />
        </>
    )
}

export default ViewMemo