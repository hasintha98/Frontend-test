import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ExportModel from 'src/components/Models/ExportModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';
import StockUpdateModel from 'src/components/Models/StockUpdateModel';

const Inventory = () => {
  const [visible, setVisible] = useState(false)
  const [visiblePinModel, setVisiblePinModel] = useState(true)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const search = useLocation().search
  const type = new URLSearchParams(search).get('type')
  const [selectedMenu, setSelectedMenu] = useState(type)
  useEffect(() => {
    setSelectedMenu(type)
  }, [type])

  const handleSelectedMenu = (value) => {
    navigate(`/inventory?type=${value}`)
    setSelectedMenu(value)
  }

  const navigate = useNavigate();
  return visiblePinModel ?  <PinRequiredModel visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} /> : (
    <>
      <CRow>
        <CCol>

          <CDropdown style={{ cursor: 'pointer' }}>
            <CDropdownToggle style={{ fontSize: "1.5em", fontWeight: "bold", backgroundColor: '#fff', border: 0 }} color="secondary">
              {selectedMenu == 'plywood' ? 'PlyWood' : (selectedMenu == 'raw' ? 'Row Material' : 'Others')}
            </CDropdownToggle>
            <CDropdownMenu >
              <CDropdownItem value={"plywood"} active={selectedMenu == 'plywood' ? true : false} onClick={() => handleSelectedMenu("plywood")}>PlyWood</CDropdownItem>
              <CDropdownItem value={"raw"} active={selectedMenu == 'raw' ? true : false} onClick={() => handleSelectedMenu("raw")}>Row Material</CDropdownItem>
              <CDropdownItem value={"others"} active={selectedMenu == 'others' ? true : false} onClick={() => handleSelectedMenu("others")}>Others</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
        <CCol className='d-flex justify-content-end gap-4'>
          <CCol md={5}>
            {selectedMenu == 'plywood' ? <CInputGroup >
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Type' />
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Size' />
              <CInputGroupText className='default-border' style={{ cursor: 'pointer' }}>
                <span className="material-symbols-outlined">
                  search
                </span></CInputGroupText>
            </CInputGroup> :
            <CInputGroup >
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search' />
              <CInputGroupText className='default-border'><span className="material-symbols-outlined">
                search
              </span></CInputGroupText>
            </CInputGroup> }
          </CCol>
          <CCol >
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
          <CCol>
            <CButton
              color="success"
              className='default-border'
              variant="outline"
              style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
              onClick={() => navigate('/inventory/add-plywood')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                add
              </span>{' '}Update</CButton>
          </CCol>
        </CCol>
      </CRow>

      <CRow className='mt-3'>
        <CCol md={2}>
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
        <CCol md={2}>
          <CFormSelect className='default-border' aria-label="Default select example">
            <option>Production</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3" disabled>Three</option>
          </CFormSelect>
        </CCol>
        <CCol md={1}>
          <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" >Filter</CButton>
        </CCol>
        <CCol md={2}>
          <CFormSelect className='default-border' aria-label="Default select example">
            <option>Type</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3" disabled>Three</option>
          </CFormSelect>
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

      {/* Table */}

      <CRow className='p-2 mt-4'>
        <CTable striped>
          <CTableHead>
            <CTableRow color="info">
              <CTableHeaderCell scope="col" className='text-center' width={5}><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
              <CTableHeaderCell scope="col" className='text-center'>SKU</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='text-center'>Production</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='text-center'>Type</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='text-center'>Stock on Hand</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='text-center'>Warnings</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='text-center'>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
              <CTableDataCell className='d-flex justify-content-around'>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setUpdateVisible(true)}>
                  upgrade
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                  edit
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                  delete
                </span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
              <CTableDataCell className='d-flex justify-content-around'>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setUpdateVisible(true)}>
                  upgrade
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                  edit
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                  delete
                </span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
              <CTableDataCell className='d-flex justify-content-around'>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setUpdateVisible(true)}>
                  upgrade
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                  edit
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                  delete
                </span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className='text-center'><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
              <CTableDataCell className='d-flex justify-content-around'>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setUpdateVisible(true)}>
                  upgrade
                </span>
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
      <StockUpdateModel visible={updateVisible} onClose={(val) => setUpdateVisible(val)} />
      <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
    </>
  )
}

export default Inventory