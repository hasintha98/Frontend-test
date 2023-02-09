import React, { useEffect, useState } from 'react'

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
import DashBoardServices from 'src/services/DashBoardServices'
import { predefinedRanges } from 'src/data/preDefinedDateRanges'
import Select from 'react-select'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { colorArray } from 'src/data/color'



const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#ffff",
          padding: "5px",
          border: "1px solid #cccc",
        }}
      >
        <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {

  const [today_productions, setToday_productions] = useState(0);
  const [total_productions, setTotal_productions] = useState(0);
  const [orders_pending, setOrders_pending] = useState(0);
  const [orders_delivered, setOrders_delivered] = useState(0);
  const [orders_canceled, setOrders_canceled] = useState(0);

  const [quantity_InHand, setQuantity_InHand] = useState(0);
  const [quantity_Want, setQuantity_Want] = useState(0);

  const [raw_data_stats, setRaw_data_stats] = useState([]);

  const [pied_chart_data, setPie_chart_data] = useState([
    {
      name: "N/A",
      value: 0,
    },
  ]);
  const [pied_chart_colors, setPie_chart_colors] = useState(colorArray);

  const [startDate, setStartDate] = useState(predefinedRanges[3].value[0])
  const [endDate, setEndDate] = useState(predefinedRanges[3].value[1])

  useEffect(() => {
    DashBoardServices.getDashBoardInfo("dash_page", "dash_page_summary", startDate, endDate)
      .then(response => {
        const {
          today_productionsX,
          total_productionsX,
          orders_pendingX,
          orders_deliveredX,
          orders_canceledX,
          quantity_InHandX,
          quantity_WantX,
          pied_chart_dataX,
          raw_data_statsX,
        } = response.data;

        setRaw_data_stats(raw_data_statsX);
        setToday_productions(today_productionsX);
        setTotal_productions(total_productionsX);
        setOrders_pending(orders_pendingX);
        setOrders_delivered(orders_deliveredX);
        setOrders_canceled(orders_canceledX);
        setQuantity_InHand(quantity_InHandX);
        setQuantity_Want(quantity_WantX);
        setPie_chart_data(pied_chart_dataX);
      })
  }, [startDate, endDate])

  const handleDate = (e) => {
    setStartDate(e.value[0])
    setEndDate(e.value[1])
  }


  return (
    <>
      <CRow className='mb-4'>
        <CCol md={4}>
          <CCol md={9}>
            <CFormLabel htmlFor="nf-email">Total Summery</CFormLabel>
            <CCard className='border border-3'>
              <p className="d-flex justify-content-between m-2">
                <span htmlFor="nf-email">Total Productions</span>
                <span htmlFor="nf-email" style={{ color: '#00965E' }}>{total_productions}</span>
              </p>

            </CCard>
            <CCard className='border border-3 mt-2'>
              <p className="d-flex justify-content-between m-2">
                <span htmlFor="nf-email">Today Productions</span>
                <span htmlFor="nf-email" style={{ color: '#00965E' }}>{today_productions}</span>
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
                <span htmlFor="nf-email" style={{ color: '#00965E' }}>{quantity_InHand}</span>
              </p>

            </CCard>
            <CCard className='border border-3'>
              <p className="d-flex justify-content-between m-2">
                <span htmlFor="nf-email">Quantity Requirement</span>
                <span htmlFor="nf-email" style={{ color: 'red' }}>{quantity_Want}</span>
              </p>

            </CCard>
          </CCol>
        </CCol>
      </CRow>
      <hr style={{ backgroundColor: 'black', height: "3px" }} />
      <CRow className='pb-3'>
        <CFormLabel htmlFor="nf-email">Sales Activity</CFormLabel>
        <CRow>
          <CCol>
            <CCard className='p-3 border border-3' style={{ textAlign: 'center' }}>
              <span className='card-full-size text-blue'>{orders_pending}</span>
              <span className='card-mid-size'>Order</span>
              <span className='card-small-size'>TO BE PACKED</span>
            </CCard>
          </CCol>
          <CCol>
            <CCard className=' p-3 border border-3' style={{ textAlign: 'center' }}>
              <span className='card-full-size text-green'>{orders_delivered}</span>
              <span className='card-mid-size'>Order</span>
              <span className='card-small-size'>TO BE DELIVERED</span>
            </CCard>
          </CCol>
          <CCol>
            <CCard className='p-3 border border-3' style={{ textAlign: 'center' }}>
              <span className='card-full-size text-red'>{orders_canceled}</span>
              <span className='card-mid-size'>Order</span>
              <span className='card-small-size'>TO BE INVOICED</span>
            </CCard>
          </CCol>
          <CCol md={7}></CCol>
        </CRow>

      </CRow>
      <hr style={{ backgroundColor: 'black', height: "3px" }} />
      <CCard className='mt-3 border border-3'>
        <CRow className='p-2'>
          <CRow className='d-flex justify-content-between m-2'>
            <CCol md={10}>
              <CFormLabel >Sales Activity</CFormLabel>
            </CCol>
            <CCol>
              {/* <p><CIcon icon={cilCalendar} size="sm" /> <span> </span>
              <span >This Month</span></p> */}
              <Select
                defaultValue={predefinedRanges[3]}
                onChange={(e) => handleDate(e)}
                // value={pageAccessList.find(o => o.page_name === PAGES.Production)?.users}
                options={predefinedRanges}
              ></Select>
            </CCol>

          </CRow>
          <CCol md={7}>
            {/* <CChartLine
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
            /> */}
            <ResponsiveContainer width="99%" height={350}>
              <LineChart data={pied_chart_data} margin={{ right: 10 }}>
                <CartesianGrid />
                <XAxis dataKey="name" interval={"preserveStartEnd"} />
                <YAxis></YAxis>
                <Legend />
                <Tooltip />
                <Line dataKey="value" stroke="red" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CCol>
          <CCol md={5}>
          {/* <CChartPie
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

            /> */}
          <ResponsiveContainer width="99%" height={350}>
                <PieChart>
                  <Pie
                    data={pied_chart_data}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {pied_chart_data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          pied_chart_colors[index % pied_chart_colors.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
          </CCol>

        </CRow>
      </CCard>

    </>
  )
}

export default Dashboard
