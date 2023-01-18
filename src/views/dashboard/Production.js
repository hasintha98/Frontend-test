import { CButton, CCol, CFormCheck, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const Production = () => {
    const [visible, setVisible] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const navigate = useNavigate();

    function handleDateRange(event, picker) {
        setStartDate(moment(picker.startDate).format("DD/MM/YYYY"));
        setEndDate(moment(picker.endDate).format("DD/MM/YYYY"));
      }
    return (
        <>
            <CRow>
                <CCol>
                    <CRow>
                        <CCol md={4}>
                            <CInputGroup >
                                <CFormInput aria-label="Amount (to the nearest dollar)" placeholder='Search Production' />
                                <CInputGroupText><span className="material-symbols-outlined">
                                    search
                                </span></CInputGroupText>
                            </CInputGroup>
                        </CCol>
                        <CCol md={4}>
                            <CInputGroup >
                                <CFormInput aria-label="Amount (to the nearest dollar)" placeholder='Search Type' />
                                <CInputGroupText><span className="material-symbols-outlined">
                                    search
                                </span></CInputGroupText>
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CButton 
                            color="primary" 
                            variant="outline" 
                            onClick={() => setVisible(true)}
                            ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1em" }}>
                                download
                            </span>{' '}Export</CButton>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol className="d-flex flex-row-reverse mb-5">

                    <CButton 
                    color="success" 
                    variant="outline" 
                    style={{ fontSize: "1em" }} 
                    onClick={() => navigate('/production/add')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1em" }}>
                        add
                    </span>{' '}Add New</CButton>
                </CCol>
            </CRow>
            <CRow>

                <CCol md={3}>
                    <CFormSelect aria-label="Default select example">
                        <option>Bulk Action</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>Three</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton style={{ width: "100%" }} color="primary" variant="outline" >Apply</CButton>
                </CCol>
                <CCol md={2} >
                    <DateRangePicker
                        onApply={handleDateRange}
                        initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2014' }}
                    >
                        <CButton color="dark" variant="outline" style={{ fontSize: "1em", width: "100%" }} className="d-flex justify-content-between">{startDate ? startDate + " - " + endDate : 'Select range'}{' '}<span className="material-symbols-outlined pt-1" style={{ fontSize: "1em" }}>
                            date_range
                        </span>{' '}</CButton>
                    </DateRangePicker>
                </CCol>
                <CCol md={1}>
                    <CButton style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
                </CCol>

                <CCol className="d-flex justify-content-end">
                    <CRow>
                        <CCol>
                            <CButton style={{ width: "100%" }} color="primary" variant="outline" >Prev</CButton>
                        </CCol>
                        <CCol>
                            <span className='mt-1'>1 of 5</span>
                        </CCol>
                        <CCol>

                            <CButton style={{ width: "100%" }} color="primary" variant="outline" >Next</CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>

            <CRow className='p-2 mt-4'>
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col"><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Production</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row">Default</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow >
                            <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row">Default</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow >
                            <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row">Default</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow >
                            <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                            <CTableHeaderCell scope="row">Default</CTableHeaderCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell>Cell</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{cursor: "pointer"}}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>

                    </CTableBody>
                </CTable>
            </CRow>
            <CRow>
                <CCol className="d-flex justify-content-end">
                    <CRow>
                        <CCol>
                            <CButton style={{ width: "100%" }} color="primary" variant="outline" >Prev</CButton>
                        </CCol>
                        <CCol>
                            <span className='mt-1'>1 of 5</span>
                        </CCol>
                        <CCol>

                            <CButton style={{ width: "100%" }} color="primary" variant="outline" >Next</CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>
            <CModal
                style={{ marginTop: "30%", padding: "5%" }}
                visible={visible}
                onClose={() => setVisible(false)}>
                <CModalBody
                    style={{ textAlign: "center" }}>
                    <span
                        style={{ fontSize: '5em', color: '#DEE5F9' }}
                        className="material-symbols-outlined">
                        info
                    </span>
                    <p
                        className='fs-3'>
                        Are you sure?
                    </p>
                    <p
                        style={{ fontSize: '0.8em' }}>
                        To continue please enter admin pin code and press Enter key
                    </p>
                    <div
                        className='d-grid gap-2 d-md-flex justify-content-md-center'>
                        <CFormInput
                            style={{ backgroundColor: '#F2F2F2' }}
                            type="number"
                            autoFocus
                            id="qty" />
                        <CButton
                            color="danger"
                            style={{ backgroundColor: '#FF5B5B', color: '#fff' }}
                            onClick={() => setVisible(false)}>
                            Cancel
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
        </>
    )
}

export default Production