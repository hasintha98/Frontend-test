import { CButton, CCol, CFormLabel, CFormSelect, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { predefinedRanges } from 'src/data/preDefinedDateRanges'
import Select from 'react-select'
import DashBoardServices from 'src/services/DashBoardServices'
const DailySummeryModel = ({ visible, onClose }) => {

    const [startDate, setStartDate] = useState(predefinedRanges[3].value[0])
    const [endDate, setEndDate] = useState(predefinedRanges[3].value[1])
    const [raw_data_stats, setRaw_data_stats] = useState([]);
    const handleDate = (e) => {
        setStartDate(e.value[0])
        setEndDate(e.value[1])
      }

      useEffect(() => {
        DashBoardServices.getDashBoardInfo("dash_page", "dash_page_summary", startDate, endDate)
        .then(response => {
          const {
            raw_data_statsX,
          } = response.data;
  
          setRaw_data_stats(raw_data_statsX);
        })
      }, [startDate, endDate])
      
    return (
        <CModal
            style={{ marginTop: "30%", padding: "5%" }}
            visible={visible}
            onClose={() => onClose(false)}>
            <CModalBody
            >
                <CRow>
                    <CCol>
                        <p
                            className='fs-3'>
                            Summery
                        </p>
                    </CCol>
                    <CCol>
                        <Select
                            defaultValue={predefinedRanges[3]}
                            onChange={(e) => handleDate(e)}
                            options={predefinedRanges}
                        ></Select>
                    </CCol>
                </CRow>

  
                <CRow className='p-2 mt-4'>
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col" width={200}>Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" width={100} >In / Out</CTableHeaderCell>
                            <CTableHeaderCell scope="col" >Stock</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {raw_data_stats?.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{item.name}</CTableDataCell>
                                <CTableDataCell >{item.in_out == 1 ? "IN" : "OUT"}</CTableDataCell>
                                <CTableDataCell>{item.total_stocks}</CTableDataCell>
                            </CTableRow>
                        ))}


                    </CTableBody>
                </CTable>
                </CRow>

            </CModalBody>
        </CModal>
    )
}

export default DailySummeryModel