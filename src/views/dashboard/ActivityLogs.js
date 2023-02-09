import { CButton, CButtonGroup, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DateRangePicker } from 'rsuite'
import ExportModel from 'src/components/Models/ExportModel'
import LoadingModel from 'src/components/Models/LoadingModel'
import PinRequiredModel from 'src/components/Models/PinRequiredModel'
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel'
import ActivityLogsService from 'src/services/ActivityLogsService'
import { predefinedRanges } from 'src/data/preDefinedDateRanges';
import moment from 'moment'
import swal from 'sweetalert'
import NoData from 'src/extra/NoData/NoData'
import { PAGES } from 'src/hooks/constants'
const ActivityLogs = () => {
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(null)
  const [isCheckingApi, setCheckingApi] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date().setMonth(new Date().getMonth() - 10))
  const [endDate, setEndDate] = useState(new Date().setMonth(new Date().getMonth() + 1))
  const [visiblePinModel, setVisiblePinModel] = useState(true)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [10, 15, 20];
  const [logsList, setLogsList] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null)
  const logsRef = useRef();
  logsRef.current = logsList;
  const [count, setCount] = useState(0);

  const [refreshPage, setRefreshPage] = useState(false)
  const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);
  const [isLogs, setLogsState] = useState(false);
  const [searchTitle_Type, setSearchTitle_Type] = useState("");
  const [searchTitle_User, setSearchTitle_User] = useState("");

  const onChangeSearchTitle_Type = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle_Type(searchTitle);

    var isSearchEmpty = searchTitle.trim().length ? false : true;

    if (isSearchEmpty) {
      setPage(1);
      //retrievePlyWoodTypeList();
      setUpdateOnRefreshPage(Math.random());

      //console.log("Search is empty type ...!! ");
    }

    //console.log("Search input changing type -> ", searchTitle);
  };

  const onChangeSearchTitle_User = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle_User(searchTitle);

    var isSearchEmpty = searchTitle.trim().length ? false : true;

    if (isSearchEmpty) {
      setPage(1);
      //retrievePlyWoodTypeList();
      setUpdateOnRefreshPage(Math.random());

      //console.log("Search is empty type ...!! ");
    }

    //console.log("Search input changing type -> ", searchTitle);
  };

  const handleDateRangeOptions = (val) => {
    //console.log("Date Range handling-> ", val);
    console.log(val)
    setStartDate(val[0])
    setEndDate(val[1])
  };

  const findByTitle = () => {
    setPage(1);
    retrieveLogs();
  };

  const getRequestParams = (
    searchTitle_Type,
    searchTitle_User,
    page,
    pageSize
  ) => {
    let params = {};

    if (searchTitle_Type) {
      params["title_page"] = searchTitle_Type;
    }

    if (searchTitle_User) {
      params["title_user"] = searchTitle_User;
    }


    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  useEffect(() => {
    retrieveLogs()
  }, [page, pageSize, updateOnRefReshPage, refreshPage])

  const retrieveLogs = async () => {
    setCheckingApi(true);

    setLoadingMsg("Fetching Activity Logs...")
    setLoading(true)

    const params = getRequestParams(
      searchTitle_Type,
      searchTitle_User,
      page,
      pageSize
    );

    var page_req = Number(params.page);
    var size_req = Number(params.size);
    var title_type_req = params.title_type
      ? params.title_type.toString().trim()
      : "";

    var startTime = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
    var endTime = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
    //setPlyWoodTypeList(mock_data);

    var page_role_type = "dash_page";

    await ActivityLogsService.getLogsList(
      page_role_type,
      page_req,
      size_req,
      title_type_req,
      startTime,
      endTime
    ).then(
      (response) => {
        console.log(response)
        const { activityLists, totalPages } = response.data;

        if (activityLists.length) {
          var revUsersList = activityLists;//.reverse();

          setLogsList(revUsersList);
          setCount(totalPages);
          setLogsState(true);
        }
        setCheckingApi(false);
        setLoading(false)
        setLoadingMsg(null)

      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        //console.log("login in error ", resMessage);
        setLogsState(false);
        setCheckingApi(false);
        setLoadingMsg(null)
        setLoading(false)
        if (error.response.data.message != "No Activity Logs data found")
          swal("Error!", error.response.data.message, "error");
      }
    );
  };

  let titlesObject = {
    h1: "No Activity Logs Found. ",
    h2: "",
    h3: "",
  };

  var noDataContent = (
    <>
      <NoData Titles={titlesObject} />
    </>
  );


  return visiblePinModel ? <PinRequiredModel isNavigate={true} page={PAGES.ACTIVITY_LOGS} visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} isNavigation={true} /> : (
    <>
      <CRow>
        <CCol
          md={8}>

          <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Activity Logs</span>
        </CCol>
        <CCol className='d-flex justify-content-end gap-4'>
          <CCol md={8}>
            <CInputGroup >
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='User' onChange={onChangeSearchTitle_User} />
              <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Page' onChange={onChangeSearchTitle_Type} />
              <CInputGroupText className='default-border' style={{ cursor: 'pointer' }}>
                <span className="material-symbols-outlined" onClick={findByTitle}>
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
          {/* <CCol>
            <CButton
              color="success"
              className='default-border'
              variant="outline"
              disabled
              style={{ fontSize: "1em", fontWeight: '600', width: "100%" }}
              onClick={() => navigate('/sales/new')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                description
              </span>{' '}Summery</CButton>
          </CCol> */}
        </CCol>
      </CRow>
      <CRow className='mt-4'>

        <CCol md={3}>
          <CFormSelect className='default-border' aria-label="Default select example">
            <option>None</option>
            <option value="delete">Delete Selected</option>
            <option value="export">Export Selected</option>
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
            onOk={handleDateRangeOptions}
            onChange={handleDateRangeOptions}
            defaultCalendarValue={[new Date('2023-01-01 00:00:00'), new Date()]}
          />
        </CCol>
        <CCol md={1}>
          <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" onClick={() => retrieveLogs()} >Filter</CButton>
        </CCol>

        <CCol className="d-flex justify-content-end">
          <CRow>
            <CCol>
              <CButton
                disabled={page == 1}
                className='blue-button'
                style={{ width: "100%" }}
                color="primary"
                variant="outline"
                onClick={() => setPage(page - 1)} >
                Prev
              </CButton>
            </CCol>
            <CCol>
              <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>{page} of {count}</span>
            </CCol>
            <CCol>

              <CButton
                className='blue-button'
                style={{ width: "100%" }}
                color="primary"
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page == count}
              >
                Next
              </CButton>
            </CCol>


          </CRow>
        </CCol>
      </CRow>
      {!isLogs ? noDataContent :
        <CRow className='p-2 mt-4'>
          <CTable striped>
            <CTableHead>
              <CTableRow color="info">
                <CTableHeaderCell scope="col" width={300}>Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">User</CTableHeaderCell>
                <CTableHeaderCell scope="col">Page</CTableHeaderCell>
                <CTableHeaderCell scope="col" width={200}>Action Type</CTableHeaderCell>
                <CTableHeaderCell scope="col" width={200}>Action Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {logsList?.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{item.createdAt}</CTableDataCell>
                  <CTableDataCell>{item.user.name}</CTableDataCell>
                  <CTableDataCell>{item.page_name}</CTableDataCell>
                  <CTableDataCell>{item.action}</CTableDataCell>
                  <CTableDataCell>{item.action_status ? <p style={{ color: "green", fontWeight: 'bold' }}>SUCCESS</p> : <p style={{ color: "red", fontWeight: 'bold' }}>FAILED</p>}</CTableDataCell>

                </CTableRow>
              ))}


            </CTableBody>
          </CTable>
        </CRow>
      }
      <CRow>
        <CCol md={1}></CCol>
        <CCol className="d-flex justify-content-end" >
          <CRow>
            <CCol>

              <CDropdown style={{ width: "100%" }} variant="btn-group" direction="dropup" >
                <CDropdownToggle style={{ backgroundColor: '#fff' }} color="secondary">{pageSize}</CDropdownToggle>
                <CDropdownMenu>
                  {pageSizes.map((item, key) => (
                    <CDropdownItem key={key} value={item} onClick={() => setPageSize(item)}>{item}</CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            </CCol>
            <CCol>
              <CButton
                disabled={page == 1}
                className='blue-button'
                style={{ width: "100%" }}
                color="primary"
                variant="outline"
                onClick={() => setPage(page - 1)}
              >
                Prev
              </CButton>
            </CCol>
            <CCol>
              <span style={{ color: "#2F5597", fontWeight: "bold" }} className='mt-1'>{page} of {count}</span>
            </CCol>
            <CCol>

              <CButton
                className='blue-button'
                style={{ width: "100%" }}
                color="primary"
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page == count}>
                Next
              </CButton>
            </CCol>


          </CRow>

        </CCol>
      </CRow>

      <RecordDeleteModel visible={deleteVisible} onClose={(val) => setDeleteVisible(val)} recordId={"#5765"} />
      <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
      <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
    </>
  )
}

export default ActivityLogs