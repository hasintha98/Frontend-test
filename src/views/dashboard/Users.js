import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddEditCustomerModel from 'src/components/Models/AddEditCustomerModel';
import AddEditUsersModel from 'src/components/Models/AddEditUsersModel';
import ExportModel from 'src/components/Models/ExportModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';

const Users = () => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [visiblePinModel, setVisiblePinModel] = useState(true)
    const [addCustomerVisible, setAddCustomerVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [values, setValues] = useState(null)
    const navigate = useNavigate();

    const handleEditButton = (state) => {
        setIsEdit(true)
        setValues(
            {
                name: "Jhone Doe",
                email: "JhoneDoe@gmail.com",
                address: "Jhone Doe",
                phone: "07789252354"
            }
        )

        setAddCustomerVisible(state)

    }
    return visiblePinModel ? <PinRequiredModel visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} /> : (
        <>
            <CRow>
                <CCol md={8}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Users</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>

                    <CCol md={4}>
                        <CButton
                            color="success"
                            className='default-border'
                            variant="outline"
                            style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
                            onClick={() => setAddCustomerVisible(true)}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                add
                            </span>{' '}New</CButton>
                    </CCol>
                </CCol>
            </CRow>
            <CRow className='mt-5'>

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
                    <CInputGroup >
                        <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search here' />
                        <CInputGroupText className='default-border'><span className="material-symbols-outlined">
                            search
                        </span></CInputGroupText>
                    </CInputGroup>
                </CCol>
                <CCol md={1}>
                    <CButton
                        role="button"
                        className='blue-button'
                        style={{ width: "100%" }}
                        variant="outline"
                        onClick={() => setVisible(true)}
                    ><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                            download
                        </span>{' '}Export</CButton>
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
            {/* Table */}

            <CRow className='p-2 mt-4'>
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col" className='text-center'>Id #</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Role</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell className='text-center'>452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe </CTableDataCell>
                            <CTableDataCell className='text-center'>Admin</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>Active</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => handleEditButton(true)}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'>452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe </CTableDataCell>
                            <CTableDataCell className='text-center'>Admin</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>Active</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => handleEditButton(true)}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'>452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe </CTableDataCell>
                            <CTableDataCell className='text-center'>Admin</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>Active</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => handleEditButton(true)}>
                                    edit
                                </span>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                                    delete
                                </span>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell className='text-center'>452</CTableDataCell>
                            <CTableDataCell className='text-center'>John Doe </CTableDataCell>
                            <CTableDataCell className='text-center'>Admin</CTableDataCell>
                            <CTableDataCell className='text-center'>cashcustomer@cashcustomer.com</CTableDataCell>
                            <CTableDataCell className='text-center'>Active</CTableDataCell>
                            <CTableDataCell className='d-flex justify-content-around'>
                                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => handleEditButton(true)}>
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

                            {/* <CFormSelect id="pageNo" aria-label="Default select example" style={{ width: "100%" }} direction="dropup">
                                <option>1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>

                            </CFormSelect> */}
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
            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
            <AddEditUsersModel visible={addCustomerVisible} onClose={(val) => setAddCustomerVisible(val)} isEdit={isEdit} values={values} />
            <RecordDeleteModel visible={deleteVisible} onClose={(val) => setDeleteVisible(val)} recordId={"#5765"} />
        </>
    )
}

export default Users