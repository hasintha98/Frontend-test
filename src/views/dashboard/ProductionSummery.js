import { CButton, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
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
import ProductionService from 'src/services/ProductionService';
import PlyWoodTypesServices from 'src/services/PlyWoodTypesServices';
import swal from 'sweetalert';
import LoadingModel from 'src/components/Models/LoadingModel';
import NoData from 'src/extra/NoData/NoData';
import { ACTIONS, PAGES } from 'src/hooks/constants';
import AuthService from 'src/services/AuthService';
import ActivityLogsService from 'src/services/ActivityLogsService';

const ProductionSummery = () => {
    const [loading, setLoading] = useState(false)
    const [loadingMsg, setLoadingMsg] = useState(null)

    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [visiblePinModel, setVisiblePinModel] = useState(true)
    const [startDate, setStartDate] = useState(new Date().setMonth(new Date().getMonth() - 10))
    const [endDate, setEndDate] = useState(new Date().setMonth(new Date().getMonth() + 1))
    const [deleteItem, setDeleteItem] = useState(null)
    const [refreshPage, setRefreshPage] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [plyWoodProductionList, setPlyWoodProductionList] = useState([]);

    const plyWoodProductionsRef = useRef();

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const pageSizes = [10, 25, 50];

    plyWoodProductionsRef.current = plyWoodProductionList;

    const [isPlyWoodProductions, setPlyWoodProductionsState] = useState(false);

    const [isCheckingApi, setCheckingApi] = useState(false);
    const [searchTitle_Type, setSearchTitle_Type] = useState("");
    const [searchTitle_Size, setSearchTitle_Size] = useState("");

    const [updateOnRefReshPage, setUpdateOnRefreshPage] = useState(0);

    useEffect(() => {
        retrievePlyWoodProductionList()
    }, [page, pageSize, updateOnRefReshPage])

    const retrievePlyWoodProductionList = async () => {
        setLoading(true)
        setLoadingMsg("Fetching Productions...")
        setCheckingApi(true);

        const params = getRequestParams(
            searchTitle_Type,
            searchTitle_Size,
            page,
            pageSize
        );

        var page_req = Number(params.page);
        var size_req = Number(params.size);
        var title_type_req = params.title_type
            ? params.title_type.toString().trim()
            : "";
        var title_size_req = params.title_size
            ? params.title_size.toString().trim()
            : "";

        var startTime = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
        var endTime = moment(endDate).format("YYYY-MM-DD HH:mm:ss");

        var page_role_type = "dash_page";

        await ProductionService.getProductionsSummaryList(
            page_role_type,
            page_req,
            size_req,
            title_type_req,
            title_size_req,
            startTime,
            endTime
        ).then(
            (response) => {
                //console.log("Productions  list-> ", response);

                const { productionList, totalPages } = response.data;

                if (productionList.length) {
                    var revproductionList = productionList;//.reverse();

                    setPlyWoodProductionList(revproductionList);
                    console.log(revproductionList)
                    setPlyWoodProductionsState(true);
                }

                setCount(totalPages);


                setCheckingApi(false);
                setLoading(false)
                setLoadingMsg(null)
            },
            (error) => {
                // const resMessage =
                //   (error.response &&
                //     error.response.data &&
                //     error.response.data.message) ||
                //   error.message ||
                //   error.toString();

                //console.log("login in error ", resMessage);
                setPlyWoodProductionsState(false);
                setPlyWoodProductionList([]);

                setCheckingApi(false);
                setLoading(false)
                setLoadingMsg(null)
                if (error.response.data.message != "No Production records data found")
                    swal("Error!", error.response.data.message, "error");
            }
        );
    };

    const onChangeSearchTitle_Type = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle_Type(searchTitle);

        var isSearchEmpty = searchTitle.trim().length ? false : true;

        if (isSearchEmpty) {
            setPage(1);
            //retrievePlyWoodProductionList();
            setUpdateOnRefreshPage(Math.random());

            //console.log("Search is empty type ...!! ");
        }

        //console.log("Search input changing type -> ", searchTitle);
    };

    const onChangeSearchTitle_Size = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle_Size(searchTitle);

        var isSearchEmpty = searchTitle.trim().length ? false : true;

        if (isSearchEmpty) {
            setPage(1);
            //retrievePlyWoodProductionList();
            setUpdateOnRefreshPage(Math.random());

            //console.log("Search is empty size ...!! ");
        }

        //console.log("Search input changing size -> ", searchTitle);
    };

    const findByTitle = () => {
        setPage(1);
        retrievePlyWoodProductionList();
    };

    const getRequestParams = (
        searchTitle_Type,
        searchTitle_Size,
        page,
        pageSize
    ) => {
        let params = {};

        if (searchTitle_Type) {
            params["title_type"] = searchTitle_Type;
        }
        if (searchTitle_Size) {
            params["title_size"] = searchTitle_Size;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const handleDateRangeOptions = (val) => {
        //console.log("Date Range handling-> ", val);
        console.log(val)
        setStartDate(val[0])
        setEndDate(val[1])
    };

    const navigate = useNavigate();

    function handleDateRange(event, picker) {
        setStartDate(moment(picker.startDate).format("DD/MM/YYYY"));
        setEndDate(moment(picker.endDate).format("DD/MM/YYYY"));
    }

    const deleteProduction = () => {
        PlyWoodTypesServices.deletePlyWoodTypesRecord("dash_page", [Number(deleteItem.id)])
            .then(response => {
                swal("Success!", "Production Deleted Successfully", "success");
                ActivityLogsService.createLog(PAGES.Production, AuthService.getCurrentUser().name, ACTIONS.DELETE, 1)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
                setRefreshPage(!refreshPage)
            }).catch(error => {
                console.log(error.response.data.message)
                swal("Error!", error.response.data.message, "error");
                ActivityLogsService.createLog(PAGES.Production, AuthService.getCurrentUser().name, ACTIONS.DELETE, 0)
                    .catch((error) => {
                        console.log(error)
                        swal("Error!", "Something Went Wrong With Logging", "error");
                    })
            })
    }

    let titlesObject = {
        h1: " No Production records Found. ",
        h2: " All time ",
        h3: " Add a new record by simply clicking the button on top right side",
    };

    var noDataContent = (
        <>
            <NoData Titles={titlesObject} />
        </>
    );

    return visiblePinModel ? <PinRequiredModel isNavigate={true} page={PAGES.Production} visible={visiblePinModel} onClose={(val) => setVisiblePinModel(val)} isNavigation={true} /> : (
        <>
            <CRow>
                <CCol>
                    <CRow>
                        <CCol
                            md={7}>

                            <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>Production Summery</span>
                        </CCol>
                        <CCol md={4} className="d-flex flex-row-reverse mb-5">
                            <CInputGroup >
                                <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Production' onChange={onChangeSearchTitle_Size} />
                                <CFormInput className='default-border' aria-label="Amount (to the nearest dollar)" placeholder='Type' onChange={onChangeSearchTitle_Type} />
                                <CInputGroupText className='default-border' style={{ cursor: 'pointer' }}>
                                    <span className="material-symbols-outlined" onClick={findByTitle}>
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

                {/* <CCol md={2} className="d-flex flex-row-reverse mb-5">

                    <CButton
                        color="success"
                        className='default-border'
                        variant="outline"
                        style={{ fontSize: "1em", fontWeight: '600' }}
                        onClick={() => navigate('/production/add')}><span className="material-symbols-outlined pt-1" style={{ fontSize: "1.1em" }}>
                            add
                        </span>{' '}Add New</CButton>
                </CCol> */}
            </CRow>
            <CRow>

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
                    <CButton className='blue-button' style={{ width: "100%" }} color="primary" variant="outline" onClick={() => retrievePlyWoodProductionList()} >Filter</CButton>
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
            {!isPlyWoodProductions ? noDataContent :
                <CRow className='p-2 mt-4'>
                    <CTable striped>
                        <CTableHead>
                            <CTableRow color="info">
                                <CTableHeaderCell scope="col"><CFormCheck id="flexCheckDefault" /></CTableHeaderCell>
                                <CTableHeaderCell scope="col" >Type</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Production</CTableHeaderCell>

                                <CTableHeaderCell scope="col"    width={200}>Total Qty</CTableHeaderCell>
                                {/* <CTableHeaderCell scope="col" className='text-center' width={100}>Action</CTableHeaderCell> */}
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {plyWoodProductionList.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell><CFormCheck id="flexCheckDefault" /></CTableDataCell>
                                    <CTableDataCell>{item.type}</CTableDataCell>
                                    <CTableDataCell>{item.size}mm</CTableDataCell>

                                    <CTableDataCell>{item.total_qty}</CTableDataCell>
                                    {/* <CTableDataCell className='d-flex justify-content-around'>
                                        <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/production/edit?pin=${item.pin}&date=${moment(new Date(item.date)).format('YYYY-MM-DDTHH:mm')}&size=${item.size}&type=${item.type}&qty=${item.qty}`)}>
                                            edit
                                        </span>
                                        <span className="material-symbols-outlined" style={{ cursor: "pointer" }}
                                            onClick={
                                                () => {
                                                    setDeleteItem(item)
                                                    setDeleteVisible(true)
                                                }}
                                        >
                                            delete
                                        </span>
                                    </CTableDataCell> */}
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
            <RecordDeleteModel
                visible={deleteVisible}
                onClose={(val, auth) => {
                    if (auth == "AUTHENTICATED") deleteProduction()
                    setDeleteVisible(val)
                }
                }
                page={PAGES.Production}
                recordId={`#PIN${deleteItem?.pin}`} />
            <ExportModel visible={visible} onClose={(val) => setVisible(val)} />
            <LoadingModel visible={loading} loadingMsg={loadingMsg} onClose={(val) => setLoading(false)} />
        </>
    )
}

export default ProductionSummery