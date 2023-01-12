import React from 'react'

import {
  CCard,
  CCol,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { CChartLine, CChartPie } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
} from '@coreui/icons'
const Dashboard = () => {

  return (
    <>
      <CRow className='mb-4'>
        <CCol md={4}>
          <CCol md={9}>
            <CFormLabel htmlFor="nf-email">Today Summery</CFormLabel>
            <CCard className='border border-3'>
              <p className="d-flex justify-content-between m-2">
                <span htmlFor="nf-email">Today Summery</span>
                <span htmlFor="nf-email" style={{ color: '#00965E' }}>3075</span>
              </p>

            </CCard>
          </CCol>
        </CCol>
        <CCol>
        </CCol>
        <CCol md={4}>
          <CCol md={9}>
            <CFormLabel htmlFor="nf-email">Inventory Summery</CFormLabel>
            <CCard className='mb-1 border border-3'>
              <p className="d-flex justify-content-between m-2">
                <span htmlFor="nf-email">Quantity in Hand</span>
                <span htmlFor="nf-email" style={{ color: '#00965E' }}>5075</span>
              </p>

            </CCard>
            <CCard className='border border-3'>
              <p className="d-flex justify-content-between m-2">
                <span htmlFor="nf-email">Quantity Requirement</span>
                <span htmlFor="nf-email" style={{ color: 'red' }}>285</span>
              </p>

            </CCard>
          </CCol>
        </CCol>
      </CRow>
      <hr style={{backgroundColor: 'black', height:"3px"}} />
      <CRow className='pb-3'>
        <CFormLabel htmlFor="nf-email">Sales Activity</CFormLabel>
        <CRow>
          <CCol>
            <CCard className='p-3 border border-3' style={{ textAlign: 'center' }}>
              <span className='card-full-size text-blue'>6</span>
              <span className='card-mid-size'>Order</span>
              <span className='card-small-size'>TO BE PACKED</span>
            </CCard>
          </CCol>
          <CCol>
            <CCard className=' p-3 border border-3' style={{ textAlign: 'center' }}>
              <span className='card-full-size text-green'>2</span>
              <span className='card-mid-size'>Order</span>
              <span className='card-small-size'>TO BE DELIVERED</span>
            </CCard>
          </CCol>
          <CCol>
            <CCard className='p-3 border border-3' style={{ textAlign: 'center' }}>
              <span className='card-full-size text-red'>1</span>
              <span className='card-mid-size'>Order</span>
              <span className='card-small-size'>TO BE INVOICED</span>
            </CCard>
          </CCol>
          <CCol md={7}></CCol>
        </CRow>

      </CRow>
      <hr style={{backgroundColor: 'black', height:"3px"}} />
      <CCard className='mt-3 border border-3'>
        <CRow className='p-2'>
          <CRow className='d-flex justify-content-between m-2'>
            <CCol md={10}>
              <CFormLabel >Sales Activity</CFormLabel>
            </CCol>
            <CCol style={{textAlign: 'right'}}>
              <p><CIcon icon={cilCalendar} size="sm" /> <span> </span>
              <span >This Month</span></p>
            </CCol>

          </CRow>
          <CCol md={7}>
            <CChartLine
              style={{ height: '400px', marginTop: '20px'}}
              data={{
                labels: ['', '04 Dec', '11 Dec', '18 Dec', '25 Dec', '01 Jan', '05 Jan', '15 Jan', '22 Jan', "29 Jan"],
                datasets: [
                  {
                    label: "Line Chart",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [120, 80, 60, 40, 20, 0, 0, 0, 0, 0, 0, 0]
                  },
                ],
              }}
            />
          </CCol>
          <CCol md={5}>
            <CChartPie
              options={
                {
                  maintainAspectRatio: true,
                  layout: {
                    padding: 100
                  }
                }
              }
              data={{
                datasets: [
                  {
                    backgroundColor: ['#0070C0', '#EB7C31', '#9E9E9E', '#FFC000'],
                    data: [60, 20, 10, 10],
                  },
                ]
                ,
              }}

            />

          </CCol>

        </CRow>
      </CCard>

    </>
  )
}

export default Dashboard
