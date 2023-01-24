import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
//import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'
import "rsuite/dist/rsuite.min.css"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'rsuite';
import { predefinedRanges } from 'src/data/preDefinedDateRanges';
import ExportModel from 'src/components/Models/ExportModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';

const Production = () => {
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [visiblePinModel, setVisiblePinModel] = useState(true)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const navigate = useNavigate();

    function handleDateRange(event, picker) {
        setStartDate(moment(picker.startDate).format("DD/MM/YYYY"));
        setEndDate(moment(picker.endDate).format("DD/MM/YYYY"));
    }
    return visiblePinModel ?  <PinRequiredModel visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} /> : (
        <>
            <CRow>
                <CCol>
                    <CRow>
                        <CCol md={6}>
                            <CInputGroup >
                                <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Production' />
                                <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Type' />
                                <CInputGroupText className='default-border' style={{ cursor: 'pointer' }}>
                                    <span className="material-symbols-outlined">
                                        search
                                    </span></CInputGroupText>
                            </CInputGroup>
                        </CCol>

                        <CCol>
                            <CButton
                                role="button"
                                className='blue-button'
                                // style={{color:"#2F5597"}}
                                variant="outline"
                                onClick={() => setVisible(true)}
                            ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                    download
                                </span>{' '}Export</CButton>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol className="d-flex flex-row-reverse mb-5">

                    <CButton
                        color="success"
                        className='default-border'
                        variant="outline"
                        style={{ fontSize: "1em", fontWeight: '600' }}
                        onClick={() => navigate('/production/add')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                            add
                        </span>{' '}Add New</CButton>
                </CCol>
            </CRow>
            <CRow>

                <CCol md={3}>
                    <CFormSelect className='default-border' aria-label="Default select example">
                        <option>Bulk Action</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3" disabled>Three</option>
                    </CFormSelect>
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Apply</CButton>
                </CCol>
                <CCol md={3} >
                    <DateRangePicker
                        ranges={predefinedRanges}
                        style={{ width: "100%" }}
                        placeholder="Date"
                        format="yyyy-MM-dd HH:mm:ss"
                        defaultCalendarValue={[new Date('2023-01-01 00:00:00'), new Date()]}
                    />
                </CCol>
                <CCol md={1}>
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
                </CCol>

                <CCol className="d-flex justify-content-end">
                    <CRow>
                        <CCol>
                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Prev</CButton>
                        </CCol>
                        <CCol>
                            <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>1 of 5</span>
                        </CCol>
                        <CCol>

                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Next</CButton>
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
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
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
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
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
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
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
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>

                    </CTableBody>
                </CTable>
            </CRow>
            <CRow>
                <CCol md={1}></CCol>
                <CCol className="d-flex justify-content-end" >
                    <CRow>
                        <CCol>

                            <CDropdown variant="btn-group" direction="dropup" >
                                <CDropdownToggle style={{ backgroundColor: '#fff' }} color="secondary">1</CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem href="#">2</CDropdownItem>
                                    <CDropdownItem href="#">3</CDropdownItem>
                                    <CDropdownItem href="#">4</CDropdownItem>

                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol>
                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Prev</CButton>
                        </CCol>
                        <CCol>
                            <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>1 of 5</span>
                        </CCol>
                        <CCol>

                            <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Next</CButton>
                        </CCol>


                    </CRow>
                </CCol>
            </CRow>
            <RecordDeleteModel visible={deleteVisible} onClose={(val) => setDeleteVisible(val)} recordId={"#5765"} />
            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
           
        </>
    )
}

export default Production