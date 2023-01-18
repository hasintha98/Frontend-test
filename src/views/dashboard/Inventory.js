import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Inventory = () => {
  const [visible, setVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
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
  return (
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
            <CInputGroup >
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search Production' />
              <CInputGroupText className='default-border'><span className="material-symbols-outlined">
                search
              </span></CInputGroupText>
            </CInputGroup>
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
              onClick={() => navigate('/production/add')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
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
              <CTableHeaderCell scope="col" className='text-center'><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
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
              <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
              <CTableDataCell className='d-flex justify-content-around'>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                  edit
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                  delete
                </span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
              <CTableDataCell className='d-flex justify-content-around'>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                  edit
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                  delete
                </span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
              <CTableDataCell className='d-flex justify-content-around'>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => navigate('/production/edit')}>
                  edit
                </span>
                <span className="material-symbols-outlined" style={{ cursor: "pointer" }} onClick={() => setDeleteVisible(true)}>
                  delete
                </span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
              <CTableHeaderCell scope="row" className='text-center'>#PW452</CTableHeaderCell>
              <CTableDataCell className='text-center'>9mm</CTableDataCell>
              <CTableDataCell className='text-center'>OK-G1</CTableDataCell>
              <CTableDataCell className='text-center'>12</CTableDataCell>
              <CTableDataCell className='text-center'>Low Stock</CTableDataCell>
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

              <CFormSelect id="pageNo" aria-label="Default select example" style={{ width: "100%" }}>
                <option>1</option>
                <option value="1">2</option>
                <option value="2">3</option>

              </CFormSelect>
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
      <CModal
        style={{ marginTop: "30%", padding: "5%" }}
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}>
        <CModalBody
          style={{ textAlign: "center" }}>
          <span
            style={{ fontSize: '5em', color: '#C55A11' }}
            className="material-symbols-outlined">
            warning
          </span>
          <p
            className='fs-3'>
            Are you sure?
          </p>
          <p
            className='fs-5'>
            Record <span style={{ color: 'red' }}>#9665</span> will delete from the system.
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
              onClick={() => setDeleteVisible(false)}>
              Cancel
            </CButton>
          </div>
        </CModalBody>
      </CModal>

      <CModal
        style={{ marginTop: "30%", padding: "5%" }}
        visible={visible}
        onClose={() => setVisible(false)}>
        <CModalBody
        >

          <p
            className='fs-3'>
            Export
          </p>
          <CRow className="mt-4">
            <CFormLabel htmlFor="period" className="col-sm-2 col-form-label">Period</CFormLabel>
            <CCol sm={10}>
              <CFormSelect id="period" aria-label="Default select example">
                <option>Last Week</option>
                <option value="1">Last Month</option>
                <option value="2">Last Year</option>

              </CFormSelect>
            </CCol>
          </CRow>

          <div
            className='d-grid gap-5 d-md-flex justify-content-md-around mt-5'>
            <CButton
              color="success"
              style={{ color: '#fff', width: "100%" }}
              onClick={() => setVisible(false)}>
              Download
            </CButton>
            <CButton
              color="danger"
              style={{ backgroundColor: '#FF5B5B', color: '#fff', width: "100%" }}
              onClick={() => setVisible(false)}>
              Cancel
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </>
  )
}

export default Inventory