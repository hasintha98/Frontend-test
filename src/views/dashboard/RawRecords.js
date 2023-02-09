import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import DailySummeryModel from 'src/components/Models/DailySummeryModel';
import ExportModel from 'src/components/Models/ExportModel';
import LoadingModel from 'src/components/Models/LoadingModel';
import PinRequiredModel from 'src/components/Models/PinRequiredModel';
import RecordDeleteModel from 'src/components/Models/RecordDeleteModel';
import { predefinedRanges } from 'src/data/preDefinedDateRanges';
import { PAGES } from 'src/hooks/constants';
import RawMaterialService from 'src/services/RawMaterialService';
import swal from 'sweetalert';

const RawRecords = () => {
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)
    const [isCheckingApi, setCheckingApi] = useState(false);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date().setMonth(new Date().getMonth() - 10))
    const [endDate, setEndDate] = useState(new Date().setMonth(new Date().getMonth() + 1))
    const [summeryModelVisible, setSummeryModelVisible] = useState(false)
    const [visiblePinModel, setVisiblePinModel] = useState(true)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10);
    const pageSizes = [10, 15, 20];
    const [rawRecordsList, setRawRecordsList] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null)
    const rawRecordsRef = useRef();
    rawRecordsRef.current = rawRecordsList;
    const [count, setCount] = useState(0);

    const [refreshPage, setRefreshPage] = useState(false)
    const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);
    const [isRawRecords, setRawRecordsState] = useState(false);
    const [searchTitle_Type, setSearchTitle_Type] = useState("");

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

    const handleDateRangeOptions = (val) => {
        //console.log("Date Range handling-> ", val);
        console.log(val)
        setStartDate(val[0])
        setEndDate(val[1])
    };

    const findByTitle = () => {
        setPage(1);
        retrieveRawRecords();
    };

    const getRequestParams = (
        searchTitle_Type,
        page,
        pageSize
    ) => {
        let params = {};

        if (searchTitle_Type) {
            params["title_type"] = searchTitle_Type;
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
        retrieveRawRecords()
    }, [page, pageSize, updateOnRefReshPage, refreshPage])

    const retrieveRawRecords = async () => {
        setCheckingApi(true);

        setLoadingMsg("Fetching Raw Records...")
        setLoading(true)

        const params = getRequestParams(
            searchTitle_Type,
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

        await RawMaterialService.getRawMatsRecordsDataInfo(
            page_role_type,
            page_req,
            size_req,
            title_type_req,
            startTime,
            endTime
        ).then(
            (response) => {
                console.log(response)
                const { rawMatList, totalPages } = response.data;

                if (rawMatList.length) {
                    var revUsersList = rawMatList;//.reverse();

                    setRawRecordsList(revUsersList);
                    setCount(totalPages);
                    setRawRecordsState(true);
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
                setRawRecordsState(false);
                setCheckingApi(false);
                setLoadingMsg(null)
                setLoading(false)
                swal("Error!", error.response.data.message, "error");
            }
        );
    };

    return visiblePinModel ? <PinRequiredModel isNavigate={true} page={PAGES.RAW_MATERIAL} visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} isNavigation={true} /> : (
        <>
            <CRow>
                <CCol
                    md={8}>

                    <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Raw Records</span>
                </CCol>
                <CCol className='d-flex justify-content-end gap-4'>
                    <CCol md={5}>
                        <CInputGroup >
                            <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Search here' onChange={onChangeSearchTitle_Type} />
                            <CInputGroupText className='default-border'><span className="material-symbols-outlined" onClick={findByTitle}>
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
                            onClick={() => setSummeryModelVisible(true)}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                                description
                            </span>{' '}Summery</CButton>
                    </CCol>
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
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" onClick={() => retrieveRawRecords()} >Filter</CButton>
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
            <CRow className='p-2 mt-4'>
                <CTable striped>
                    <CTableHead>
                        <CTableRow color="info">
                            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {rawRecordsList?.map((item, index) => (
                            <CTableRow key={index}>

                                <CTableHeaderCell scope="row" style={{ color: "blue", fontWeight: "800" }}>#PIN{item.pin}</CTableHeaderCell>
                                <CTableDataCell>{item.date}</CTableDataCell>
                                <CTableDataCell>{item.name}</CTableDataCell>
                                <CTableDataCell>{item.stock}</CTableDataCell>

                            </CTableRow>
                        ))}


                    </CTableBody>
                </CTable>
            </CRow>
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
            <DailySummeryModel visible={summeryModelVisible} onClose={(val) => setSummeryModelVisible(val)}/>
            <RecordDeleteModel page={PAGES.RAW_MATERIAL} visible={deleteVisible} onClose={(val) => setDeleteVisible(val)} recordId={"#5765"} />
            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default RawRecords