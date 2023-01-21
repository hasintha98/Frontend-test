import { CButton, CButtonGroup, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ActivityLogs = () => {
  const navigate = useNavigate();
  const search = useLocation().search
  const orderId = new URLSearchParams(search).get('id')
  return (
    <>
      <CRow style={{ overflow: 'hidden' }}>
        <CCol>

          <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Activity Log# {orderId}</span>
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
      <CRow>
        <CTable striped>
          <CTableBody>
            <CTableRow style={{height: '50px'}}>
              <CTableDataCell className='text-center'>Order Created</CTableDataCell>
              <CTableDataCell className='text-center'>31-12-2022 12:00 </CTableDataCell>
              <CTableDataCell className='text-center'>Admin</CTableDataCell>
            </CTableRow>
            <CTableRow style={{height: '50px'}}>
              <CTableDataCell className='text-center'>Order Edited</CTableDataCell>
              <CTableDataCell className='text-center'>31-12-2022 12:00 </CTableDataCell>
              <CTableDataCell className='text-center'>Admin</CTableDataCell>
            </CTableRow>
            <CTableRow style={{height: '50px'}}>
              <CTableDataCell className='text-center'>Shipment Created</CTableDataCell>
              <CTableDataCell className='text-center'>31-12-2022 12:00 </CTableDataCell>
              <CTableDataCell className='text-center'>Manger</CTableDataCell>
            </CTableRow>
            <CTableRow style={{height: '50px'}}>
              <CTableDataCell className='text-center'>Invoice Created</CTableDataCell>
              <CTableDataCell className='text-center'>31-12-2022 12:00 </CTableDataCell>
              <CTableDataCell className='text-center'>Manger</CTableDataCell>
            </CTableRow>
            <CTableRow style={{height: '50px'}}>
              <CTableDataCell className='text-center'>Payment received</CTableDataCell>
              <CTableDataCell className='text-center'>31-12-2022 12:00 </CTableDataCell>
              <CTableDataCell className='text-center'>Manger</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CRow>
    </>
  )
}

export default ActivityLogs